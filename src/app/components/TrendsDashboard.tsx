'use client';

import { useState, useEffect } from 'react';
import { BarChart, TrendingUp, Hash } from 'lucide-react';

interface NewsItem {
  title: string;
  description: string;
  date: string;
}

interface TrendData {
  topic: string;
  currentCount: number;
  previousCount: number;
  percentageChange: number;
  trend: 'up' | 'down' | 'stable';
}

export function TrendsDashboard() {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define topics and their related keywords
  const topicKeywords = {
    'Large Language Models': ['llm', 'language model', 'gpt', 'claude', 'llama', 'palm', 'gemini'],
    'AI Agents': ['ai agent', 'autonomous agent', 'agent', 'copilot', 'assistant'],
    'Image Generation': ['image generation', 'stable diffusion', 'dall-e', 'midjourney', 'imagen'],
    'AI Ethics': ['ai ethics', 'responsible ai', 'ai safety', 'ai regulation', 'ai bias'],
    'AI Tools': ['ai tool', 'ai application', 'ai software', 'ai platform'],
    'Machine Learning': ['machine learning', 'deep learning', 'neural network', 'ml model'],
    'Natural Language Processing': ['nlp', 'natural language', 'text processing', 'language understanding'],
    'Computer Vision': ['computer vision', 'image recognition', 'object detection', 'visual ai'],
    'AI Research': ['ai research', 'ai breakthrough', 'ai paper', 'ai study']
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/combined-news');
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched news items:', data.news?.length || 0);
        
        if (!data.news || data.news.length === 0) {
          setError('No news data available');
          setTrends([]);
          return;
        }

        // Group news by date
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const todayNews = data.news.filter((item: NewsItem) => {
          const itemDate = new Date(item.date);
          return itemDate.toDateString() === today.toDateString();
        });

        const yesterdayNews = data.news.filter((item: NewsItem) => {
          const itemDate = new Date(item.date);
          return itemDate.toDateString() === yesterday.toDateString();
        });

        console.log('Today news items:', todayNews.length);
        console.log('Yesterday news items:', yesterdayNews.length);

        // Calculate trends for each topic
        const trendData: TrendData[] = Object.entries(topicKeywords).map(([topic, keywords]) => {
          const currentCount = todayNews.filter((item: NewsItem) => 
            keywords.some(keyword => 
              (item.title?.toLowerCase() || '').includes(keyword) || 
              (item.description?.toLowerCase() || '').includes(keyword)
            )
          ).length;

          const previousCount = yesterdayNews.filter((item: NewsItem) => 
            keywords.some(keyword => 
              (item.title?.toLowerCase() || '').includes(keyword) || 
              (item.description?.toLowerCase() || '').includes(keyword)
            )
          ).length;

          const percentageChange = previousCount === 0 
            ? currentCount > 0 ? 100 : 0
            : ((currentCount - previousCount) / previousCount) * 100;

          let trend: 'up' | 'down' | 'stable';
          if (Math.abs(percentageChange) < 5) {
            trend = 'stable';
          } else {
            trend = percentageChange > 0 ? 'up' : 'down';
          }

          console.log(`Topic: ${topic}, Current: ${currentCount}, Previous: ${previousCount}, Change: ${percentageChange.toFixed(1)}%, Trend: ${trend}`);

          return {
            topic,
            currentCount,
            previousCount,
            percentageChange,
            trend
          };
        });

        // Sort by current count and take top 6
        const sortedTrends = trendData
          .sort((a, b) => b.currentCount - a.currentCount)
          .slice(0, 6);

        setTrends(sortedTrends);
      } catch (err) {
        console.error('Error fetching trends:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch trends');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    // Refresh every 30 minutes
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">AI Trends</h2>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800/50 p-4 rounded-lg h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">AI Trends</h2>
        <div className="bg-red-900/20 border border-red-500/20 text-red-400 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (trends.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">AI Trends</h2>
        <div className="bg-gray-800/20 border border-gray-700 text-gray-400 px-4 py-3 rounded">
          No trends available at the moment. Please check back later.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">AI Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trends.map((item) => (
          <div key={item.topic} className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-700/50 hover:bg-gray-800/50 transition-colors">
            <h3 className="font-semibold text-lg mb-2 text-white">{item.topic}</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Today: {item.currentCount} mentions
                </p>
                <p className="text-sm text-gray-400">
                  Yesterday: {item.previousCount} mentions
                </p>
              </div>
              <div className={`flex items-center ${
                item.trend === 'up' ? 'text-green-400' :
                item.trend === 'down' ? 'text-red-400' :
                'text-gray-400'
              }`}>
                <span className="text-lg font-semibold">
                  {item.percentageChange > 0 ? '+' : ''}
                  {item.percentageChange.toFixed(1)}%
                </span>
                {item.trend === 'up' && (
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
                {item.trend === 'down' && (
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {item.trend === 'stable' && (
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 