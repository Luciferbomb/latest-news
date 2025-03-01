import { NextResponse } from 'next/server';

// Helper function to format dates
function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Helper function to subtract days from current date
function subtractDays(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

// Sample news data focused on AI tools and agents
const SAMPLE_NEWS = [
  {
    id: "1",
    title: "Anthropic's Claude 3 Opus Achieves Human-Level Performance Across Key Benchmarks",
    description: "Anthropic has released Claude 3 Opus, its most powerful AI model yet. The model demonstrates exceptional capabilities in coding, reasoning, and creative tasks, matching or exceeding human-level performance on several industry benchmarks.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    date: formatDate(subtractDays(1)),
    readTime: "5 min read",
    url: "https://anthropic.com/claude",
    categories: ["ai-tools", "llm", "agents"]
  },
  {
    id: "2",
    title: "Microsoft Introduces AI Agent Framework for Enterprise Applications",
    description: "Microsoft has launched a comprehensive framework for developing AI agents integrated with enterprise systems. The framework allows businesses to build custom AI agents that can access internal data, perform complex workflows, and interact with users naturally.",
    imageUrl: "https://images.unsplash.com/photo-1581093196277-9f608bb3b511?q=80&w=2070&auto=format&fit=crop",
    date: formatDate(subtractDays(2)),
    readTime: "4 min read",
    url: "https://microsoft.com/ai-agents",
    categories: ["ai-tools", "enterprise", "agents"]
  },
  {
    id: "3",
    title: "Cursor IDE Revolutionizes Coding with Advanced AI Pair Programming",
    description: "Cursor, the AI-powered coding IDE, has introduced breakthrough features that transform pair programming. The latest update includes real-time code suggestions, automatic documentation generation, and intelligent debugging assistance powered by state-of-the-art AI models.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1770&auto=format&fit=crop",
    date: formatDate(subtractDays(3)),
    readTime: "6 min read",
    url: "https://cursor.sh",
    categories: ["ai-tools", "development", "productivity"]
  },
  {
    id: "4",
    title: "DALL-E 3 Integration Comes to Microsoft Designer and Copilot",
    description: "Microsoft has integrated OpenAI's DALL-E 3 image generation technology into its Designer app and Copilot. The integration allows users to create highly detailed and accurate visuals from text descriptions within Microsoft's creative and productivity applications.",
    imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1932&auto=format&fit=crop",
    date: formatDate(subtractDays(4)),
    readTime: "3 min read",
    url: "https://microsoft.com/designer",
    categories: ["ai-tools", "creative", "image-generation"]
  },
  {
    id: "5",
    title: "Perplexity AI Raises $73M to Expand AI-Powered Search Capabilities",
    description: "Perplexity AI has secured $73 million in Series B funding to further develop its AI-powered search technology. The company plans to enhance its real-time information processing, improve source attribution, and expand its Pro features for enterprise users.",
    imageUrl: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1932&auto=format&fit=crop",
    date: formatDate(subtractDays(5)),
    readTime: "4 min read",
    url: "https://perplexity.ai",
    categories: ["ai-tools", "search", "information-retrieval"]
  },
  {
    id: "6",
    title: "Adept Unveils AI Assistant that Can Navigate Complex Software Interfaces",
    description: "Adept has released a groundbreaking AI assistant capable of interacting with software interfaces like a human user. The tool can perform complex sequences of actions across different applications, dramatically streamlining workflows in fields like data analysis and design.",
    imageUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop",
    date: formatDate(subtractDays(6)),
    readTime: "5 min read",
    url: "https://adept.ai",
    categories: ["ai-tools", "automation", "agents"]
  }
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
