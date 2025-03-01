"use client";

import { useState, useEffect } from 'react';
import { NewsItem } from './useNewsData';

// Interface for news with sentiment and summary
export interface EnhancedNewsItem extends NewsItem {
  sentiment?: 'positive' | 'negative' | 'neutral';
  sentimentScore?: number;
  summary?: string;
  source?: string;
}

// Function to get time until next update
export const getTimeUntilNextUpdate = (lastUpdated: Date | null): string => {
  if (!lastUpdated) return 'Unknown';
  
  const updateInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  const nextUpdate = new Date(lastUpdated.getTime() + updateInterval);
  const now = new Date();
  const timeRemaining = nextUpdate.getTime() - now.getTime();
  
  if (timeRemaining <= 0) return 'Now';
  
  const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

export function useRealTimeNews(searchQuery?: string) {
  const [news, setNews] = useState<EnhancedNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Function to fetch news from our combined API
  const fetchNews = async () => {
    setIsLoading(true);
    try {
      // Build the API URL for our combined endpoint
      let apiUrl = '/api/combined-news';
      
      // Add search query if provided
      if (searchQuery) {
        apiUrl += `?q=${encodeURIComponent(searchQuery)}`;
      } else {
        // Default query for AI news if no specific search
        apiUrl += '?q=artificial+intelligence+OR+AI+tools+OR+machine+learning';
      }
      
      // Fetch data from our combined API
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Process the news data
      setNews(data.news);
      setLastUpdated(new Date(data.lastUpdated));
      setError(null);
      
      // Return the fetched news for potential further processing
      return data.news;
    } catch (err: any) {
      console.error('Error fetching news:', err);
      setError(err.message || 'Failed to fetch news data. Please try again later.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to analyze sentiment and generate summaries for news items
  const enhanceNewsWithAI = async (newsItems: EnhancedNewsItem[]) => {
    if (!newsItems.length) return;
    
    try {
      // We'll process a few items at a time to avoid overwhelming the API
      const itemsToProcess = newsItems.slice(0, 5).filter(item => !item.summary || !item.sentiment);
      
      if (itemsToProcess.length === 0) return;
      
      // Call our text analysis API
      const response = await fetch('/api/text-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: itemsToProcess.map(item => ({
            id: item.id,
            text: item.description
          }))
        }),
      });
      
      if (!response.ok) return;
      
      const enhancedData = await response.json();
      
      // Update the news items with AI-enhanced data
      setNews(prevNews => {
        return prevNews.map(item => {
          const enhanced = enhancedData.results.find((r: any) => r.id === item.id);
          if (enhanced) {
            return {
              ...item,
              summary: enhanced.summary || item.summary,
              sentiment: enhanced.sentiment || item.sentiment,
              sentimentScore: enhanced.sentimentScore || item.sentimentScore
            };
          }
          return item;
        });
      });
    } catch (err) {
      console.error('Error enhancing news with AI:', err);
    }
  };

  // Initial fetch
  useEffect(() => {
    const initialFetch = async () => {
      const newsItems = await fetchNews();
      // After fetching news, enhance them with AI
      enhanceNewsWithAI(newsItems);
    };
    
    initialFetch();
    
    // Set up interval to update news 4 times a day (every 6 hours)
    const updateInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
    const interval = setInterval(initialFetch, updateInterval);
    
    return () => clearInterval(interval);
  }, [searchQuery]);

  return { 
    news, 
    isLoading, 
    error, 
    lastUpdated,
    refreshNews: fetchNews, // Expose refresh function for manual updates
    getTimeUntilNextUpdate: () => getTimeUntilNextUpdate(lastUpdated)
  };
}
