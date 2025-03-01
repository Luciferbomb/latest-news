import { NextResponse } from 'next/server';

// SerpAPI endpoint and key
// In a production environment, this should be stored in environment variables
const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY || 'YOUR_SERPAPI_API_KEY';
const SERPAPI_API_URL = 'https://serpapi.com/search';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'artificial intelligence news';
    
    // Since we don't have API keys, we'll use sample data directly
    console.log(`Would fetch Google News via SerpAPI with query: ${query}`);
    
    // Return sample data (for development without API keys)
    const sampleData = {
      news: getSampleGoogleNews(),
      lastUpdated: new Date().toISOString(),
    };
    
    return NextResponse.json(sampleData, { status: 200 });
  } catch (error) {
    console.error('Error fetching Google News:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// Sample Google News data for fallback
function getSampleGoogleNews() {
  return [
    {
      id: "serpapi-1",
      title: "Meta's New AI Model Can Generate Photorealistic Videos from Text",
      description: "Meta has introduced a groundbreaking AI model capable of generating high-quality, photorealistic videos from text descriptions. The technology represents a significant advancement in generative AI for video content.",
      imageUrl: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=2080&auto=format&fit=crop",
      date: "Feb 26, 2025",
      readTime: "6 min read",
      url: "https://meta.com/ai",
      source: "Meta",
      categories: ["ai-tools", "computer-vision"]
    },
    {
      id: "serpapi-2",
      title: "Anthropic Releases Claude 3: The Most Human-Like AI Assistant Yet",
      description: "Anthropic has launched Claude 3, their most advanced AI assistant to date. The new model demonstrates remarkable conversational abilities and nuanced understanding of human emotions and context.",
      imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
      date: "Feb 25, 2025",
      readTime: "4 min read",
      url: "https://anthropic.com",
      source: "Anthropic",
      categories: ["nlp", "ai-tools"]
    },
    // Add more sample news items as needed
  ];
}
