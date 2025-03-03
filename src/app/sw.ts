// Service Worker for AI News PWA
// This service worker handles caching, offline support, and background updates

// Cache names
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';
const NEWS_CACHE = 'news-cache-v1';
const API_CACHE = 'api-cache-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/offline'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, NEWS_CACHE, API_CACHE];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - network first with cache fallback for API routes, cache first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          // Only cache successful responses
          if (response.ok) {
            caches.open(API_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
          }
          
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
  }
});

// Background sync for news updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'news-update') {
    event.waitUntil(updateNews());
  }
});

// Periodic background sync for news updates (daily)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'news-update') {
    event.waitUntil(updateNews());
  }
});

// Function to update news in the background
async function updateNews() {
  try {
    // Check if we've already updated today
    const lastUpdateKey = 'last-news-update';
    const lastUpdate = localStorage.getItem(lastUpdateKey);
    const now = new Date();
    
    // If we have a last update time and it's from today, skip the update
    if (lastUpdate) {
      const lastUpdateDate = new Date(lastUpdate);
      if (lastUpdateDate.toDateString() === now.toDateString()) {
        console.log('News already updated today, skipping');
        return;
      }
    }
    
    console.log('Fetching fresh news data...');
    
    // Fetch from multiple endpoints to ensure comprehensive coverage
    const endpoints = [
      '/api/combined-news',
      '/api/news-update',
      '/api/blog'
    ];
    
    // Fetch from all endpoints in parallel
    const fetchPromises = endpoints.map(endpoint => 
      fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
      })
    );
    
    const responses = await Promise.all(fetchPromises);
    
    // Store all successful responses in the cache
    const cache = await caches.open('news-cache');
    
    for (let i = 0; i < responses.length; i++) {
      if (responses[i].ok) {
        await cache.put(
          new Request(endpoints[i]),
          responses[i].clone()
        );
      }
    }
    
    // Update the last update timestamp
    localStorage.setItem(lastUpdateKey, now.toISOString());
    
    console.log('News data updated successfully');
    
    // Notify any open clients about the update
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'NEWS_UPDATED',
        timestamp: now.toISOString()
      });
    });
    
    return true;
  } catch (error) {
    console.error('Error updating news:', error);
    return false;
  }
}

// Register for periodic sync when supported
if (self.registration && 'periodicSync' in self.registration) {
  // Try to register for daily updates
  try {
    self.registration.periodicSync.register('news-update', {
      minInterval: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    });
    console.log('Registered for daily news updates');
  } catch (error) {
    console.error('Failed to register periodic sync:', error);
  }
}

// Handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  
  const options = {
    body: data.body || 'Check out the latest AI news!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'New Update', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
