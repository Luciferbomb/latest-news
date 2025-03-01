"use client";

import { useState, useEffect } from 'react';

// Define the news item interface
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  readTime: string;
  url: string;
  categories?: string[];
}

// Sample news data (in a real app, this would come from an API)
const SAMPLE_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI Introduces GPT-5 with Enhanced Reasoning Capabilities",
    description: "OpenAI has unveiled GPT-5, featuring significant improvements in reasoning, coding, and multimodal understanding. The new model demonstrates unprecedented abilities in complex problem-solving and creative tasks.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    date: "Mar 1, 2025",
    readTime: "5 min read",
    url: "https://openai.com"
  },
  {
    id: "2",
    title: "Google's DeepMind Announces Breakthrough in AI-Powered Scientific Discovery",
    description: "DeepMind researchers have developed a new AI system capable of accelerating scientific discovery by predicting molecular structures with unprecedented accuracy, potentially revolutionizing drug development.",
    imageUrl: "https://images.unsplash.com/photo-1581093196277-9f608bb3b511?q=80&w=2070&auto=format&fit=crop",
    date: "Feb 28, 2025",
    readTime: "4 min read",
    url: "https://deepmind.google"
  },
  {
    id: "3",
    title: "Microsoft Launches AI-Powered Copilot Pro for Creative Professionals",
    description: "Microsoft has released Copilot Pro, an advanced AI assistant specifically designed for creative professionals. The tool integrates seamlessly with design software and offers enhanced capabilities for content creation.",
    imageUrl: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=1780&auto=format&fit=crop",
    date: "Feb 27, 2025",
    readTime: "3 min read",
    url: "https://microsoft.com/copilot"
  },
  {
    id: "4",
    title: "Meta's New AI Model Can Generate Photorealistic Videos from Text",
    description: "Meta has introduced a groundbreaking AI model capable of generating high-quality, photorealistic videos from text descriptions. The technology represents a significant advancement in generative AI for video content.",
    imageUrl: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=2080&auto=format&fit=crop",
    date: "Feb 26, 2025",
    readTime: "6 min read",
    url: "https://meta.com/ai"
  },
  {
    id: "5",
    title: "Anthropic Releases Claude 3: The Most Human-Like AI Assistant Yet",
    description: "Anthropic has launched Claude 3, their most advanced AI assistant to date. The new model demonstrates remarkable conversational abilities and nuanced understanding of human emotions and context.",
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
    date: "Feb 25, 2025",
    readTime: "4 min read",
    url: "https://anthropic.com"
  },
  {
    id: "6",
    title: "New Open-Source AI Tool Democratizes Access to Advanced Machine Learning",
    description: "A coalition of researchers has released a powerful open-source AI framework that aims to democratize access to advanced machine learning capabilities, making cutting-edge AI accessible to developers worldwide.",
    imageUrl: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=1932&auto=format&fit=crop",
    date: "Feb 24, 2025",
    readTime: "5 min read",
    url: "https://github.com/open-ai-framework"
  }
];

// In a real application, you would fetch from an API
// This is a mock implementation
export function useNewsData(searchQuery?: string) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from an API like this:
        // const response = await fetch('https://api.example.com/ai-news');
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use sample data for now
        setNews(SAMPLE_NEWS);
        
        // If searchQuery is provided, filter the news
        if (searchQuery) {
          const filtered = SAMPLE_NEWS.filter(
            (item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredNews(filtered);
        } else {
          setFilteredNews(SAMPLE_NEWS);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
    
    // Set up polling for real-time updates (every 5 minutes)
    const intervalId = setInterval(fetchNews, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return { news, isLoading, error };
}
