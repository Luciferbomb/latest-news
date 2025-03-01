// Service worker type declarations
declare const self: ServiceWorkerGlobalScope;

// This service worker can be customized
self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  event.waitUntil(self.clients.claim());
});

// Cache the app shell and static assets
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For navigation requests, try the network first, then fall back to the cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If we don't have a cached response, return a fallback page
          return caches.match('/');
        });
      })
    );
    return;
  }

  // For other requests, try the cache first, then fall back to the network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return the cached response
        return cachedResponse;
      }
      
      // If not in cache, fetch from network
      return fetch(event.request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response since we need to use it twice
        const responseToCache = response.clone();

        // Add the response to the cache
        caches.open('v1').then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Background sync for news updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'news-update') {
    event.waitUntil(updateNews());
  }
});

// Periodic background sync for news updates (every 6 hours)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'news-update') {
    event.waitUntil(updateNews());
  }
});

// Function to update news in the background
async function updateNews() {
  try {
    const response = await fetch('/api/news-update', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news updates');
    }

    const data = await response.json();
    
    // Store the updated news in the cache
    const cache = await caches.open('news-cache');
    await cache.put(
      new Request('/api/news-update'),
      new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      })
    );

    // Notify all clients about the update
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'NEWS_UPDATED',
        lastUpdated: data.lastUpdated
      });
    });

    return data;
  } catch (error) {
    console.error('Background news update failed:', error);
    return null;
  }
}

// Schedule periodic news updates (every 6 hours)
setInterval(() => {
  updateNews();
}, 6 * 60 * 60 * 1000);

// Push notification handler
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    
    // Show notification for new AI news
    const options = {
      body: data.description || 'Check out the latest AI news!',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      data: {
        url: data.url || '/'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification('AI News Hub: ' + (data.title || 'New Update'), options)
    );
  } catch (error) {
    console.error('Error showing notification:', error);
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Open the target URL when notification is clicked
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then(clientList => {
        // Check if there's already a window open with the target URL
        for (const client of clientList) {
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If no window is open with that URL, open a new one
        if (self.clients.openWindow) {
          return self.clients.openWindow(event.notification.data.url);
        }
      })
    );
  }
});
