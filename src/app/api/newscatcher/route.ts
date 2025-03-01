import { NextResponse } from 'next/server';

// Newscatcher API endpoint and key
// In a production environment, this should be stored in environment variables
const NEWSCATCHER_API_KEY = process.env.NEWSCATCHER_API_KEY || 'YOUR_NEWSCATCHER_API_KEY';
const NEWSCATCHER_API_URL = 'https://api.newscatcherapi.com/v2/search';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'artificial intelligence OR AI tools OR machine learning';
    
    // Since we don't have API keys, we'll use sample data directly
    console.log(`Would fetch Newscatcher API with query: ${query}`);
    
    // Return sample data (for development without API keys)
    const sampleData = {
      news: getSampleNews(),
      lastUpdated: new Date().toISOString(),
      totalResults: 6,
      page: 1,
      pageSize: 10,
    };
    
    return NextResponse.json(sampleData, { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// Sample news data for fallback
function getSampleNews() {
  return [
    {
      id: "1",
      title: "OpenAI Introduces GPT-5 with Enhanced Reasoning Capabilities",
      description: "OpenAI has unveiled GPT-5, featuring significant improvements in reasoning, coding, and multimodal understanding. The new model demonstrates unprecedented abilities in complex problem-solving and creative tasks.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
      date: "Mar 1, 2025",
      readTime: "5 min read",
      url: "https://openai.com",
      source: "OpenAI",
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
      source: "Google DeepMind",
      categories: ["machine-learning", "computer-vision"]
    },
    // Add more sample news items as needed
  ];
}
