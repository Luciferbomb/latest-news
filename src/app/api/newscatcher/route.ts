import { NextResponse } from 'next/server';

// Newscatcher API endpoint and key
// In a production environment, this should be stored in environment variables
const NEWSCATCHER_API_KEY = process.env.NEWSCATCHER_API_KEY || 'YOUR_NEWSCATCHER_API_KEY';
const NEWSCATCHER_API_URL = 'https://api.newscatcherapi.com/v2/search';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'AI tools OR AI agents OR GPT OR artificial intelligence automation';
    
    // Since we don't have API keys, we'll use sample data directly
    console.log(`Would fetch Newscatcher API with query: ${query}`);
    
    // Return sample data (for development without API keys)
    const sampleData = {
      news: getSampleNews(),
      lastUpdated: new Date().toISOString(),
      totalResults: 8,
      page: 1,
      pageSize: 10,
    };
    
    return NextResponse.json(sampleData, { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// Sample news data for fallback - focused on AI tools and technology
function getSampleNews() {
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
      id: "ai-tool-1",
      title: "Claude 3.5 Sonnet: Anthropic's New AI Model Outperforms GPT-4 on Reasoning Benchmarks",
      description: "Anthropic has released Claude 3.5 Sonnet, their newest AI model that reportedly outperforms OpenAI's GPT-4 on various reasoning and coding benchmarks while maintaining enhanced safety features.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
      date: formatDate(today),
      readTime: "5 min read",
      url: "https://anthropic.com",
      source: "Anthropic",
      categories: ["ai-tools", "nlp"]
    },
    {
      id: "ai-tool-2",
      title: "Microsoft Copilot Studio: Build Custom AI Agents Without Coding Experience",
      description: "Microsoft has launched Copilot Studio, a no-code platform that allows users to create, customize and deploy specialized AI agents for business applications without programming expertise.",
      imageUrl: "https://images.unsplash.com/photo-1581093196277-9f608bb3b511?q=80&w=2070&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 1)),
      readTime: "4 min read",
      url: "https://microsoft.com/copilot",
      source: "Microsoft",
      categories: ["ai-tools", "no-code"]
    },
    {
      id: "ai-tool-3",
      title: "OpenAI Announces GPT-4o API General Availability With Reduced Pricing",
      description: "OpenAI has made GPT-4o available to all developers through its API with significantly reduced pricing compared to previous models, enabling more affordable multimodal AI capabilities for applications.",
      imageUrl: "https://images.unsplash.com/photo-1677442135968-6db3d0aa9bf5?q=80&w=2070&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 2)),
      readTime: "6 min read",
      url: "https://openai.com",
      source: "OpenAI",
      categories: ["ai-tools", "api"]
    },
    {
      id: "ai-tool-4",
      title: "Google Introduces Gemini 1.5 Flash: Smallest and Fastest AI Model for Mobile Devices",
      description: "Google has unveiled Gemini 1.5 Flash, a compact yet powerful AI model designed specifically for on-device usage on smartphones and tablets, promising faster responses while protecting user privacy.",
      imageUrl: "https://images.unsplash.com/photo-1675271591211-728bc2c0c995?q=80&w=2187&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 3)),
      readTime: "4 min read",
      url: "https://deepmind.google",
      source: "Google DeepMind",
      categories: ["ai-tools", "mobile"]
    },
    {
      id: "ai-tool-5",
      title: "Midjourney V6 Alpha Introduces Real-Time Image Generation and Editing",
      description: "Midjourney has released version 6 Alpha with breakthrough features including real-time image generation and interactive editing capabilities, allowing users to see their creations form instantly and make adjustments on the fly.",
      imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      date: formatDate(subtractDays(today, 4)),
      readTime: "3 min read",
      url: "https://midjourney.com",
      source: "Midjourney",
      categories: ["ai-tools", "image-generation"]
    },
    {
      id: "ai-tool-6",
      title: "Perplexity Unveils New API for Developers to Build AI-Powered Search Applications",
      description: "Perplexity has launched a developer API giving access to its AI-powered search technology, enabling developers to build applications with advanced information retrieval and summarization capabilities.",
      imageUrl: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
      date: formatDate(subtractDays(today, 5)),
      readTime: "4 min read",
      url: "https://perplexity.ai",
      source: "Perplexity AI",
      categories: ["ai-tools", "search"]
    },
    {
      id: "ai-tool-7",
      title: "GitHub Copilot Workspace: AI-Powered Development Environment Enters Public Beta",
      description: "GitHub has announced Copilot Workspace, an integrated development environment with advanced code generation, explanation, and transformation features powered by AI, now available in public beta for developers.",
      imageUrl: "https://images.unsplash.com/photo-1684469499849-3db7d9e04c06?q=80&w=1964&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 6)),
      readTime: "5 min read",
      url: "https://github.com/features/copilot",
      source: "GitHub",
      categories: ["ai-tools", "coding"]
    },
    {
      id: "ai-tool-8",
      title: "AutoGPT 2.0: Open-Source Autonomous AI Agent Framework Gets Major Upgrade",
      description: "AutoGPT has released version 2.0 of its open-source framework for building autonomous AI agents, featuring improved reasoning capabilities, better tool integration, and enhanced memory management for more complex tasks.",
      imageUrl: "https://images.unsplash.com/photo-1673174422679-48863d2bca24?q=80&w=1964&auto=format&fit=crop",
      date: formatDate(subtractDays(today, 7)),
      readTime: "7 min read",
      url: "https://github.com/autogpt",
      source: "AutoGPT",
      categories: ["ai-tools", "agents"]
    }
  ];
}
