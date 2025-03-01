import { NextResponse } from 'next/server';

// SerpAPI endpoint and key
// In a production environment, this should be stored in environment variables
const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY || 'YOUR_SERPAPI_API_KEY';
const SERPAPI_API_URL = 'https://serpapi.com/search';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'AI tools OR AI agents OR artificial intelligence automation';
    
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

// Sample Google News data for fallback - focused on AI tools and tech news
function getSampleGoogleNews() {
  const today = new Date();
  
  // Function to subtract days from a date
  const subtractDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  };
  
  // Format date helper
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return [
    {
      id: "serpapi-1",
      title: "Stability AI Releases Stable Diffusion 3 With Unprecedented Image Quality",
      description: "Stability AI has officially launched Stable Diffusion 3, their new flagship image generation model that produces significantly higher quality images with improved text understanding and more accurate prompt following.",
      imageUrl: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=2080&auto=format&fit=crop",
      date: formatDate(today),
      readTime: "6 min read",
      url: "https://stability.ai",
      source: "Stability AI",
      categories: ["ai-tools", "image-generation"]
    },
    {
      id: "serpapi-2",
      title: "Notion AI Pro Introduces Custom AI Assistants for Teams and Projects",
      description: "Notion has expanded its AI capabilities with Notion AI Pro, allowing users to create specialized AI assistants tailored to specific teams, projects, or knowledge bases within their workspace.",
      imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 1)),
      readTime: "4 min read",
      url: "https://notion.so/ai",
      source: "Notion",
      categories: ["ai-tools", "productivity"]
    },
    {
      id: "serpapi-3",
      title: "Hugging Face Launches 'Agents Hub' for Open Source AI Agents Ecosystem",
      description: "Hugging Face has introduced 'Agents Hub', a central repository for developers to discover, share, and collaborate on open-source AI agents with standardized interfaces and evaluation benchmarks.",
      imageUrl: "https://images.unsplash.com/photo-1677442135807-8a2cdcd77f1e?q=80&w=2069&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 2)),
      readTime: "5 min read",
      url: "https://huggingface.co",
      source: "Hugging Face",
      categories: ["ai-tools", "agents"]
    },
    {
      id: "serpapi-4",
      title: "Adept Unveils 'Fuyu Core': Specialized AI That Runs on Laptops Without Internet",
      description: "Adept AI has released Fuyu Core, a lightweight AI assistant designed to run fully on regular laptops without internet connectivity, prioritizing privacy and offline functionality.",
      imageUrl: "https://images.unsplash.com/photo-1595327656903-2f54e914bd11?q=80&w=2835&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 3)),
      readTime: "3 min read",
      url: "https://adept.ai",
      source: "Adept AI",
      categories: ["ai-tools", "edge-computing"]
    },
    {
      id: "serpapi-5",
      title: "Zapier AI Actions: No-Code AI Workflow Automation for Everyone",
      description: "Zapier has launched AI Actions, allowing users to incorporate AI capabilities like content generation, data extraction, and classification into their automated workflows without coding knowledge.",
      imageUrl: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2070&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 4)),
      readTime: "4 min read",
      url: "https://zapier.com/ai",
      source: "Zapier",
      categories: ["ai-tools", "automation"]
    },
    {
      id: "serpapi-6",
      title: "Eleven Labs Voice Lab: Create Custom Synthetic Voices with Just One Minute of Audio",
      description: "Eleven Labs has released Voice Lab, a new tool that allows users to create personalized, natural-sounding synthetic voices with just 60 seconds of audio sample, revolutionizing voice content creation.",
      imageUrl: "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?q=80&w=2335&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 5)),
      readTime: "5 min read",
      url: "https://elevenlabs.io",
      source: "Eleven Labs",
      categories: ["ai-tools", "voice-synthesis"]
    },
    {
      id: "serpapi-7",
      title: "Scale AI Launches 'Data Engine' for Streamlined AI Training Data Management",
      description: "Scale AI has introduced Data Engine, a comprehensive platform that helps teams collect, clean, label, and manage training data for AI models with advanced quality controls and collaboration features.",
      imageUrl: "https://images.unsplash.com/photo-1677442135968-6db3d0aa9bf5?q=80&w=2070&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 6)),
      readTime: "4 min read",
      url: "https://scale.com",
      source: "Scale AI",
      categories: ["ai-tools", "data-management"]
    },
    {
      id: "serpapi-8",
      title: "Pinecone Serverless: Vector Database with Unlimited Scale for AI Applications",
      description: "Pinecone has launched a serverless vector database solution that automatically scales to handle any volume of AI application queries without infrastructure management, ideal for fluctuating workloads.",
      imageUrl: "https://images.unsplash.com/photo-1551739597-94f8f78a975d?q=80&w=2068&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 7)),
      readTime: "3 min read",
      url: "https://pinecone.io",
      source: "Pinecone",
      categories: ["ai-tools", "database"]
    }
  ];
}
