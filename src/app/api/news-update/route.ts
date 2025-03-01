import { NextResponse } from 'next/server';

// Sample news data (in a production app, this would come from a real API)
const SAMPLE_NEWS = [
  {
    id: "1",
    title: "OpenAI Introduces GPT-5 with Enhanced Reasoning Capabilities",
    description: "OpenAI has unveiled GPT-5, featuring significant improvements in reasoning, coding, and multimodal understanding. The new model demonstrates unprecedented abilities in complex problem-solving and creative tasks.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    date: "Mar 1, 2025",
    readTime: "5 min read",
    url: "https://openai.com",
    categories: ["ai-tools", "nlp"]
  },
  {
    id: "2",
    title: "Google's DeepMind Announces Breakthrough in AI-Powered Scientific Discovery",
    description: "DeepMind researchers have developed a new AI system capable of accelerating scientific discovery by predicting molecular structures with unprecedented accuracy, potentially revolutionizing drug development.",
    imageUrl: "https://images.unsplash.com/photo-1581093196277-9f608bb3b511?q=80&w=2070&auto=format&fit=crop",
    date: "Feb 28, 2025",
    readTime: "4 min read",
    url: "https://deepmind.google",
    categories: ["machine-learning", "computer-vision"]
  },
  // More news items...
];

// This API route will be called by the service worker to get the latest news
export async function GET() {
  try {
    // In a real app, you would fetch from an external API here
    
    // Add a timestamp to indicate when the data was last updated
    const data = {
      news: SAMPLE_NEWS,
      lastUpdated: new Date().toISOString(),
    };
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news data' },
      { status: 500 }
    );
  }
}

// This API route can also be used to manually trigger news updates
export async function POST() {
  try {
    // In a real app, you might trigger a background job to fetch fresh news
    // or update a cache
    
    // For demo purposes, we'll just return the current data
    const data = {
      news: SAMPLE_NEWS,
      lastUpdated: new Date().toISOString(),
      message: 'News update triggered successfully'
    };
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { error: 'Failed to update news data' },
      { status: 500 }
    );
  }
}
