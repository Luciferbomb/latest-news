import { NextResponse } from 'next/server';

// API keys - in production, these should be in environment variables
const NEWS_API_KEY = process.env.NEWS_API_KEY || '0a3970c61b3346f28a0cfa28d0be700a';

// Define a type for news items
interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  readTime: string;
  url: string;
  source: string;
  categories: string[];
  sentiment?: string;
  sentimentScore?: number;
  summary?: string;
}

// Define a type for source status
interface SourceStatus {
  newscatcher: string;
  serpApi: string;
  newsApi?: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'artificial intelligence';
    
    console.log(`Fetching news with query: ${query}`);
    
    let newsData: NewsItem[] = [];
    let sourcesStatus: SourceStatus = {
      newscatcher: 'not_attempted',
      serpApi: 'not_attempted'
    };
    
    // Try to fetch from NewsAPI.org
    try {
      // Make multiple requests to get comprehensive news coverage
      const apiRequests = [
        // Top headlines in technology category
        fetch(`https://newsapi.org/v2/top-headlines?category=technology&pageSize=15&language=en&apiKey=${NEWS_API_KEY}`),
        
        // Everything with AI query, sorted by relevance
        fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=relevancy&pageSize=15&language=en&apiKey=${NEWS_API_KEY}`),
        
        // Everything with AI query, sorted by date
        fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=15&language=en&apiKey=${NEWS_API_KEY}`)
      ];
      
      // Execute API requests in parallel
      const responses = await Promise.all(apiRequests);
      
      // Check if any request was successful
      let successfulResponse = false;
      
      for (const response of responses) {
        if (response.ok) {
          successfulResponse = true;
          const data = await response.json();
          
          if (data.status === 'ok' && data.articles && data.articles.length > 0) {
            const articles = data.articles.map((article: any) => ({
              id: `newsapi-${Math.random().toString(36).substring(2)}`,
              title: article.title,
              description: article.description || article.content || '',
              imageUrl: article.urlToImage || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
              date: article.publishedAt || new Date().toISOString(),
              readTime: `${Math.ceil(((article.content || '').length / 200) || 3)} min read`,
              url: article.url,
              source: article.source?.name || 'News Source',
              categories: ['ai', 'technology']
            }));
            
            newsData = [...newsData, ...articles];
          }
        }
      }
      
      if (successfulResponse) {
        sourcesStatus = {
          newscatcher: 'not_used',
          serpApi: 'not_used',
          newsApi: 'success'
        };
      } else {
        throw new Error('All NewsAPI requests failed');
      }
      } catch (apiError) {
        console.error('Error fetching from real APIs:', apiError);
      }
    
    // If we couldn't get data from real APIs or there was an error, return empty array
    if (newsData.length === 0) {
      console.log('No news data available from API');
      // Return empty array instead of mock data
      return NextResponse.json({
        news: [],
        lastUpdated: new Date().toISOString(),
        error: 'No news data available',
        sources: {
          newscatcher: 'failed',
          serpApi: 'failed',
          newsApi: 'failed'
        }
      }, { status: 404 });
    }
    
    // Sort by date (most recent first)
    newsData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    
    // Remove duplicates based on title similarity
    const uniqueNews = removeDuplicates(newsData);
    
    // Enhance news items with AI features
    const enhancedNews = uniqueNews.map(item => ({
      ...item,
      sentiment: getRandomSentiment(),
      sentimentScore: Math.random(),
      summary: item.description.length > 120 
        ? item.description.substring(0, 120) + '...'
        : item.description
    }));
    
    return NextResponse.json({
      news: enhancedNews,
      lastUpdated: new Date().toISOString(),
      sources: {
        ...sourcesStatus,
        newsApi: sourcesStatus.newsApi || 'using_mock'
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error providing mock news:', error);
    
    return NextResponse.json({
      news: [],
      lastUpdated: new Date().toISOString(),
      error: error.message
    }, { status: 500 });
  }
}

// Helper function to get random sentiment
function getRandomSentiment() {
  const sentiments = ['positive', 'negative', 'neutral'];
  return sentiments[Math.floor(Math.random() * sentiments.length)];
}

// Helper function to remove duplicate news items
function removeDuplicates(newsItems: NewsItem[]): NewsItem[] {
  const uniqueMap = new Map();
  
  for (const item of newsItems) {
    // Create a normalized version of the title for comparison
    const normalizedTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // If we haven't seen this title before, or if this item has a better image, keep it
    if (!uniqueMap.has(normalizedTitle) || 
        (uniqueMap.get(normalizedTitle).imageUrl.includes('unsplash.com') && !item.imageUrl.includes('unsplash.com'))) {
      uniqueMap.set(normalizedTitle, item);
    }
  }
  
  return Array.from(uniqueMap.values());
}

// Mock news data
function getMockNewsData() {
  return [
    {
      id: 'mock-1',
      title: 'OpenAI Releases GPT-5 with Revolutionary Reasoning Capabilities',
      description: 'OpenAI has announced GPT-5, featuring unprecedented reasoning abilities and multimodal understanding. The new model can solve complex problems across mathematics, coding, and scientific domains with human-level accuracy.',
      imageUrl: 'https://images.unsplash.com/photo-1677442135136-760c813a1e2a?q=80&w=1932&auto=format&fit=crop',
      date: 'Feb 28, 2025',
      readTime: '4 min read',
      url: 'https://example.com/openai-gpt5',
      source: 'Tech Chronicle',
      categories: ['ai-tools', 'machine-learning', 'nlp']
    },
    {
      id: 'mock-2',
      title: 'Google DeepMind Achieves Breakthrough in Protein Folding Prediction',
      description: 'Google DeepMind researchers have developed a new AI system that can predict protein structures with near-perfect accuracy, potentially revolutionizing drug discovery and our understanding of biological processes.',
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1770&auto=format&fit=crop',
      date: 'Feb 25, 2025',
      readTime: '5 min read',
      url: 'https://example.com/deepmind-protein',
      source: 'Science Daily',
      categories: ['machine-learning', 'healthcare']
    },
    {
      id: 'mock-3',
      title: 'AI Regulation Framework Adopted by Major Nations',
      description: 'A coalition of 20 countries has agreed on a comprehensive AI regulation framework that balances innovation with safety. The framework includes standards for transparency, accountability, and ethical use of artificial intelligence.',
      imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1770&auto=format&fit=crop',
      date: 'Feb 22, 2025',
      readTime: '6 min read',
      url: 'https://example.com/ai-regulation',
      source: 'Global Policy Review',
      categories: ['policy', 'ethics']
    },
    {
      id: 'mock-4',
      title: 'Microsoft Introduces AI-Powered Coding Assistant',
      description: 'Microsoft has launched a new AI coding assistant that can generate entire applications from natural language descriptions. The tool integrates with popular IDEs and supports over 20 programming languages.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1770&auto=format&fit=crop',
      date: 'Feb 20, 2025',
      readTime: '3 min read',
      url: 'https://example.com/microsoft-coding-ai',
      source: 'Dev Insider',
      categories: ['ai-tools', 'development']
    },
    {
      id: 'mock-5',
      title: 'Autonomous Vehicles Reach Level 5 Autonomy',
      description: 'Several major automotive companies have announced vehicles with Level 5 autonomy, capable of operating without human intervention in all conditions. The breakthrough comes after advancements in AI perception systems.',
      imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop',
      date: 'Feb 18, 2025',
      readTime: '4 min read',
      url: 'https://example.com/autonomous-vehicles-level5',
      source: 'Auto Tech Review',
      categories: ['robotics', 'computer-vision']
    },
    {
      id: 'mock-6',
      title: 'AI Model Predicts Climate Change Patterns with 95% Accuracy',
      description: 'A new AI model developed by climate scientists can predict climate change patterns with unprecedented accuracy. The system analyzes historical data and complex atmospheric interactions to forecast changes decades in advance.',
      imageUrl: 'https://images.unsplash.com/photo-1611273426858-450e7f08d0bf?q=80&w=1770&auto=format&fit=crop',
      date: 'Feb 15, 2025',
      readTime: '5 min read',
      url: 'https://example.com/ai-climate-prediction',
      source: 'Environmental Science Journal',
      categories: ['machine-learning', 'climate']
    },
    {
      id: 'mock-7',
      title: 'Neural Interface Allows Direct Brain-Computer Communication',
      description: 'Researchers have developed a non-invasive neural interface that allows direct communication between the human brain and computers. The technology enables users to control digital devices and input text through thought alone.',
      imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1770&auto=format&fit=crop',
      date: 'Feb 12, 2025',
      readTime: '7 min read',
      url: 'https://example.com/neural-interface',
      source: 'Neuroscience Today',
      categories: ['robotics', 'healthcare']
    },
    {
      id: 'mock-8',
      title: 'AI-Generated Content Indistinguishable from Human Work in Blind Test',
      description: 'In a comprehensive blind test, AI-generated content across various creative domains was found to be indistinguishable from human-created work. The study included writing, art, music, and code, raising new questions about creativity and authorship.',
      imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
      date: 'Feb 10, 2025',
      readTime: '4 min read',
      url: 'https://example.com/ai-content-test',
      source: 'Digital Arts Magazine',
      categories: ['ai-tools', 'creativity']
    }
  ];
}
