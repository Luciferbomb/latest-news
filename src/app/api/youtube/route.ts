import { NextResponse } from 'next/server';

// YouTube API key - in production, this should be in environment variables
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyCmsFreWdDFd0nAb3cG8lPCSCWrQBgrB_s';

// Define VideoType interface
interface VideoType {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  embedUrl: string;
  source: string;
  channelId: string;
  channelUrl: string;
  date: string;
  cacheDomain?: string; // To track which domain the video is from for daily rotation
}

// Cache object to store videos with timestamp
let videoCache: {
  timestamp: number;
  videos: VideoType[];
  domainRotationDate: string; // To track when domains were last rotated
} = {
  timestamp: 0,
  videos: [],
  domainRotationDate: ''
};

// AI-related YouTube channel IDs - focusing on latest AI/tech content creators
const AI_CHANNELS = [
  'UCbfYPyITQ-7l4upoX8nvctg', // Two Minute Papers
  'UC8wZnXYK_CGKlBcZp-GxYPA', // AI Explained
  'UCgBVkKC1MsaZHVBWdmjJ_Wg', // Ripley AI
  'UCdj9K0dcfBVbDlJsQ8Rp2bQ', // Builder's Central
  'UCJIfeSCssxSC_Dhc5s7woww', // Matt Wolfe
  'UCv83tO5cePwHMt1952IVVHw', // Prompt Engineering
  'UCG-DIzZxEv1hGm7ItSFEooQ', // AI Foundations
  'UCUyeluBRhGPCW4rPe_UvBZQ', // AI Advantage
  'UC7vVhkEfw4nOGp8TyDk7RcQ', // Google DeepMind
  'UC0NHbHOxkYPLDG5xq9UW-Vg', // Sentdex
  'UCZHmQk67mSJgfCCTn7xBfew', // Yannic Kilcher
  'UC_m2zRI-S9Qm4SXlQUFz5-A', // AIKorner
  'UCDPM_n1atn2ijUwHd0NNRQw', // Lex Fridman
];

// AI tools and tech specific keywords for better filtering
const AI_TOOL_KEYWORDS = [
  'ai tool', 'ai agent', 'chatgpt', 'claude', 'gemini', 'llama', 'mistral',
  'gpt-4', 'gpt4', 'gpt-5', 'gpt5', 'ai assistant', 'ai coding', 'copilot',
  'midjourney', 'stable diffusion', 'dall-e', 'ai image', 'ai art',
  'diffusion model', 'text-to-image', 'text-to-video', 'ai video',
  'anthropic', 'openai', 'hugging face', 'meta ai', 'google ai',
  'machine learning tool', 'neural network', 'large language model',
  'llm', 'ai api', 'ai development', 'ai app', 'ai workflow',
  'ai productivity', 'ai automation', 'ai extension', 'ai plugin',
  'ai code', 'ai programming', 'ai for developers', 'ai browser',
  'ai search', 'ai writing', 'ai summarize', 'ai research', 'ai news'
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'artificial intelligence tools';
    const forceRefresh = searchParams.get('refresh') === 'true';
    
    console.log('Fetching YouTube videos...');
    
    // Check if we need to rotate domains (daily)
    const today = new Date().toDateString();
    const shouldRotateDomains = today !== videoCache.domainRotationDate;
    
    // Use cache if it's less than 6 hours old and no force refresh is requested
    const cacheAge = Date.now() - videoCache.timestamp;
    if (!forceRefresh && videoCache.videos.length > 0 && cacheAge < 6 * 60 * 60 * 1000) {
      console.log('Using cached YouTube videos');
      
      // If we need to rotate domains, do it with the cached videos
      let videos = [...videoCache.videos];
      if (shouldRotateDomains) {
        videos = randomizeDomainVideos(videos);
        videoCache.domainRotationDate = today;
        videoCache.videos = videos;
      }
      
      return NextResponse.json({
        videos: videos.slice(0, 15),
        lastUpdated: new Date(videoCache.timestamp).toISOString(),
        fromCache: true
      }, { status: 200 });
    }
    
    // Prepare to store all video results
    let allVideos: VideoType[] = [];
    let apiSuccess = false;
    
    try {
      // Enhanced query with AI tool keywords for better results
      const enhancedQuery = `${query} ${AI_TOOL_KEYWORDS.slice(0, 3).join(' OR ')}`;
      
      // First approach: Search for videos with the enhanced query
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(enhancedQuery)}&type=video&maxResults=20&relevanceLanguage=en&key=${YOUTUBE_API_KEY}&videoDuration=medium&order=date&publishedAfter=${encodeURIComponent(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())}`
      );
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        apiSuccess = true;
        
        // Extract videos from search results
        const searchVideos = searchData.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          embedUrl: `https://www.youtube.com/embed/${item.id.videoId}?autoplay=0`,
          source: item.snippet.channelTitle,
          channelId: item.snippet.channelId,
          channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
          date: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          cacheDomain: 'search'
        }));
        
        allVideos = [...allVideos, ...searchVideos];
      } else {
        console.warn('YouTube search API failed, status:', searchResponse.status);
      }
      
      // Second approach: Get latest videos from AI-focused channels (more reliable)
      // Only fetch from 5 random channels to avoid quota limits
      const shuffledChannels = [...AI_CHANNELS].sort(() => 0.5 - Math.random()).slice(0, 5);
      
      const channelRequests = shuffledChannels.map(channelId => 
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=3&type=video&key=${YOUTUBE_API_KEY}`)
          .then(res => {
            if (res.ok) {
              apiSuccess = true;
              return res.json();
            }
            return { items: [] };
          })
          .catch(() => ({ items: [] }))
      );
      
      const channelResults = await Promise.all(channelRequests);
      
      // Process each channel's videos
      channelResults.forEach((result, index) => {
        if (result.items && result.items.length > 0) {
          const channelId = shuffledChannels[index];
          const channelVideos = result.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            embedUrl: `https://www.youtube.com/embed/${item.id.videoId}?autoplay=0`,
            source: item.snippet.channelTitle,
            channelId: item.snippet.channelId,
            channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
            date: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            cacheDomain: channelId
          }));
          
          allVideos = [...allVideos, ...channelVideos];
        }
      });
      
      // If API calls failed completely, use fallback videos or cached content
      if (!apiSuccess) {
        console.log('All YouTube API calls failed, using fallbacks');
        
        // If we have cached videos, use them even if they're older than 6 hours
        if (videoCache.videos.length > 0) {
          console.log('Using older cached videos as fallback');
          return NextResponse.json({
            videos: videoCache.videos.slice(0, 15),
            lastUpdated: new Date(videoCache.timestamp).toISOString(),
            fromCache: true,
            notice: "Unable to fetch fresh videos, showing cached content"
          }, { status: 200 });
        }
        
        // If no cache, use hardcoded fallback videos
        allVideos = getFallbackVideos();
      }
      
      // Remove duplicates (same video ID)
      const uniqueVideos = Array.from(
        new Map(allVideos.map(video => [video.id, video])).values()
      );
      
      // Filter for AI tools and tech content
      const aiToolsVideos = uniqueVideos.filter(video => {
        const content = `${video.title.toLowerCase()} ${video.description.toLowerCase()}`;
        return AI_TOOL_KEYWORDS.some(keyword => content.includes(keyword.toLowerCase()));
      });
      
      // If filtering is too strict and removed too many videos, use original list
      const filteredVideos = aiToolsVideos.length > 5 ? aiToolsVideos : uniqueVideos;
      
      // Sort by date (most recent first)
      filteredVideos.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      
      // Randomize videos from the same domain/channel for daily rotation
      const finalVideos = shouldRotateDomains ? 
        randomizeDomainVideos(filteredVideos) : 
        filteredVideos;
      
      // Update the cache
      videoCache = {
        timestamp: Date.now(),
        videos: finalVideos,
        domainRotationDate: today
      };
      
      return NextResponse.json({
        videos: finalVideos.slice(0, 15), // Return top 15 videos
        lastUpdated: new Date().toISOString()
      }, { status: 200 });
      
    } catch (apiError) {
      console.error('YouTube API error:', apiError);
      
      // If we have cached videos, use them as a fallback
      if (videoCache.videos.length > 0) {
        console.log('API error, using cached videos');
        return NextResponse.json({
          videos: videoCache.videos.slice(0, 15),
          lastUpdated: new Date(videoCache.timestamp).toISOString(),
          fromCache: true,
          notice: "Error fetching fresh videos, showing cached content"
        }, { status: 200 });
      }
      
      // If no cache, use hardcoded fallback videos
      return NextResponse.json({
        videos: getFallbackVideos(),
        lastUpdated: new Date().toISOString(),
        fromFallback: true
      }, { status: 200 });  // Still return 200 to prevent UI errors
    }
    
  } catch (error: any) {
    console.error('Error in YouTube API route:', error);
    
    // If we have cached videos, use them despite the error
    if (videoCache.videos.length > 0) {
      return NextResponse.json({
        videos: videoCache.videos.slice(0, 15),
        lastUpdated: new Date(videoCache.timestamp).toISOString(),
        fromCache: true,
        error: error.message
      }, { status: 200 });  // Still return 200 to prevent UI errors
    }
    
    // Final fallback
    return NextResponse.json({
      videos: getFallbackVideos(),
      lastUpdated: new Date().toISOString(),
      fromFallback: true,
      error: error.message
    }, { status: 200 });  // Still return 200 to prevent UI errors
  }
}

// Helper function to randomize videos from the same domain/channel
function randomizeDomainVideos(videos: VideoType[]): VideoType[] {
  // Group videos by domain
  const domainGroups: Record<string, VideoType[]> = {};
  
  videos.forEach(video => {
    const domain = video.cacheDomain || video.channelId;
    if (!domainGroups[domain]) {
      domainGroups[domain] = [];
    }
    domainGroups[domain].push(video);
  });
  
  // For each domain, pick a random subset of videos
  const result: VideoType[] = [];
  
  Object.keys(domainGroups).forEach(domain => {
    const domainVideos = domainGroups[domain];
    // Shuffle the videos
    const shuffled = [...domainVideos].sort(() => 0.5 - Math.random());
    // Take 1-2 videos from each domain
    const count = Math.min(domainVideos.length, domain === 'search' ? 2 : 1);
    result.push(...shuffled.slice(0, count));
  });
  
  // Re-sort by date
  result.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  return result;
}

// Hard-coded fallback videos when the API completely fails
function getFallbackVideos(): VideoType[] {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return [
    {
      id: "dKVNz6nvB2s",
      title: "GPT-4o: OpenAI's New Model is MINDBLOWING",
      description: "The latest in AI technology - GPT-4o combines multimodal processing with fast response times.",
      thumbnailUrl: "https://i.ytimg.com/vi/dKVNz6nvB2s/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dKVNz6nvB2s",
      embedUrl: "https://www.youtube.com/embed/dKVNz6nvB2s?autoplay=0",
      source: "AI Explained",
      channelId: "UC8wZnXYK_CGKlBcZp-GxYPA",
      channelUrl: "https://www.youtube.com/channel/UC8wZnXYK_CGKlBcZp-GxYPA",
      date: formattedDate
    },
    {
      id: "jV4EhCnA9bA",
      title: "7 AI Tools That Will Replace You",
      description: "AI technology is advancing rapidly. These 7 AI tools could potentially replace human jobs.",
      thumbnailUrl: "https://i.ytimg.com/vi/jV4EhCnA9bA/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=jV4EhCnA9bA",
      embedUrl: "https://www.youtube.com/embed/jV4EhCnA9bA?autoplay=0",
      source: "Matt Wolfe",
      channelId: "UCJIfeSCssxSC_Dhc5s7woww",
      channelUrl: "https://www.youtube.com/channel/UCJIfeSCssxSC_Dhc5s7woww",
      date: formattedDate
    },
    {
      id: "5VG-_P5M9zI",
      title: "Claude 3.5 Sonnet is OUT!",
      description: "Anthropic released Claude 3.5 Sonnet, their most capable model yet. Here's everything you need to know.",
      thumbnailUrl: "https://i.ytimg.com/vi/5VG-_P5M9zI/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=5VG-_P5M9zI",
      embedUrl: "https://www.youtube.com/embed/5VG-_P5M9zI?autoplay=0",
      source: "AI Explained",
      channelId: "UC8wZnXYK_CGKlBcZp-GxYPA",
      channelUrl: "https://www.youtube.com/channel/UC8wZnXYK_CGKlBcZp-GxYPA",
      date: formattedDate
    },
    {
      id: "LFEE8Mi_BnI",
      title: "5 Midjourney Prompting Techniques You Need to Know",
      description: "Master Midjourney with these 5 essential prompting techniques for better AI image generation.",
      thumbnailUrl: "https://i.ytimg.com/vi/LFEE8Mi_BnI/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=LFEE8Mi_BnI",
      embedUrl: "https://www.youtube.com/embed/LFEE8Mi_BnI?autoplay=0",
      source: "Prompt Engineering",
      channelId: "UCv83tO5cePwHMt1952IVVHw",
      channelUrl: "https://www.youtube.com/channel/UCv83tO5cePwHMt1952IVVHw",
      date: formattedDate
    },
    {
      id: "JXqH6U5fxqA",
      title: "Google Gemini Advanced vs ChatGPT 4o vs Claude 3 Opus",
      description: "Comparing the top AI models: Google Gemini Advanced, ChatGPT 4o, and Claude 3 Opus. Which one is best?",
      thumbnailUrl: "https://i.ytimg.com/vi/JXqH6U5fxqA/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=JXqH6U5fxqA",
      embedUrl: "https://www.youtube.com/embed/JXqH6U5fxqA?autoplay=0",
      source: "Ripley AI",
      channelId: "UCgBVkKC1MsaZHVBWdmjJ_Wg",
      channelUrl: "https://www.youtube.com/channel/UCgBVkKC1MsaZHVBWdmjJ_Wg",
      date: formattedDate
    },
    {
      id: "SOjaGQEOmws",
      title: "Mastering ChatGPT for Coding: Complete Guide",
      description: "Learn how to use ChatGPT effectively for coding tasks, from simple scripts to complex projects.",
      thumbnailUrl: "https://i.ytimg.com/vi/SOjaGQEOmws/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=SOjaGQEOmws",
      embedUrl: "https://www.youtube.com/embed/SOjaGQEOmws?autoplay=0",
      source: "Builder's Central",
      channelId: "UCdj9K0dcfBVbDlJsQ8Rp2bQ",
      channelUrl: "https://www.youtube.com/channel/UCdj9K0dcfBVbDlJsQ8Rp2bQ",
      date: formattedDate
    },
    {
      id: "jV4_CULnQnU",
      title: "AutoGen: Microsoft's Revolutionary AI Agents Framework",
      description: "Microsoft AutoGen allows multi-agent conversations that can solve complex tasks autonomously.",
      thumbnailUrl: "https://i.ytimg.com/vi/jV4_CULnQnU/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=jV4_CULnQnU",
      embedUrl: "https://www.youtube.com/embed/jV4_CULnQnU?autoplay=0",
      source: "AI Foundations",
      channelId: "UCG-DIzZxEv1hGm7ItSFEooQ",
      channelUrl: "https://www.youtube.com/channel/UCG-DIzZxEv1hGm7ItSFEooQ",
      date: formattedDate
    },
    {
      id: "DkIIaHOiN1g",
      title: "The Truth About AI Vision Models: How Good Are They Really?",
      description: "An in-depth analysis of the current state of AI vision models, their capabilities and limitations.",
      thumbnailUrl: "https://i.ytimg.com/vi/DkIIaHOiN1g/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=DkIIaHOiN1g",
      embedUrl: "https://www.youtube.com/embed/DkIIaHOiN1g?autoplay=0",
      source: "Two Minute Papers",
      channelId: "UCbfYPyITQ-7l4upoX8nvctg",
      channelUrl: "https://www.youtube.com/channel/UCbfYPyITQ-7l4upoX8nvctg",
      date: formattedDate
    }
  ];
}
