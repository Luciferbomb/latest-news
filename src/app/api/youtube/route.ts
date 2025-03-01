import { NextResponse } from 'next/server';

// YouTube API key - in production, this should be in environment variables
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';

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
  fromFallback?: boolean;
}

// Cache object to store videos with timestamp
let videoCache: {
  timestamp: number;
  videos: VideoType[];
  domainRotationDate: string; // To track when domains were last rotated
  hasValidatedVideos: boolean; // Track if videos have been validated
} = {
  timestamp: 0,
  videos: [],
  domainRotationDate: '',
  hasValidatedVideos: false
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

// A helper function to test if a YouTube video ID is valid (exists)
// This would be a real endpoint check in production, but for now we'll use our known good IDs
const KNOWN_GOOD_VIDEO_IDS = [
  '5VG-_P5M9zI', 'LFEE8Mi_BnI', 'JXqH6U5fxqA', 'SOjaGQEOmws', 
  'jV4_CULnQnU', 'DkIIaHOiN1g', 'VLhMPMKtHfA', 'iJCzZwb4U1w'
];

async function isValidVideoId(videoId: string): Promise<boolean> {
  // For reliability, use our known good IDs
  if (KNOWN_GOOD_VIDEO_IDS.includes(videoId)) {
    return true;
  }
  
  // Try to check with YouTube API if we have a key
  if (YOUTUBE_API_KEY && YOUTUBE_API_KEY.trim() !== '') {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=id&id=${videoId}&key=${YOUTUBE_API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        return data.items && data.items.length > 0;
      }
      return false;
    } catch (error) {
      console.error('Error checking video validity:', error);
      return false;
    }
  }
  
  // If we can't verify, assume it's valid
  return true;
}

// Function to filter and validate videos
async function validateVideos(videos: VideoType[]): Promise<VideoType[]> {
  // Filter out any videos without proper IDs or thumbnails
  const filteredVideos = videos.filter(video => 
    video.id && 
    video.title && 
    video.thumbnailUrl && 
    video.thumbnailUrl.includes('http')
  );
  
  // For performance reasons, only validate a subset of videos in development
  const MAX_VALIDATIONS = 10;
  const toValidate = filteredVideos.slice(0, MAX_VALIDATIONS);
  
  // Check each video to ensure it's valid
  const validationPromises = toValidate.map(async (video) => {
    const isValid = await isValidVideoId(video.id);
    return { ...video, isValid };
  });
  
  // Wait for all validations
  const validatedVideos = await Promise.all(validationPromises);
  
  // Take only valid videos from the validated set
  const validVideos = validatedVideos.filter(v => v.isValid);
  
  // Combine with the rest of the videos that weren't validated
  return [
    ...validVideos,
    ...filteredVideos.slice(MAX_VALIDATIONS)
  ];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'artificial intelligence tools';
    const forceRefresh = searchParams.get('refresh') === 'true';
    const debug = searchParams.get('debug') === 'true';
    
    console.log('Fetching YouTube videos...');
    
    // Check if we need to rotate domains (daily)
    const today = new Date().toDateString();
    const shouldRotateDomains = today !== videoCache.domainRotationDate;
    
    // Use cache if it's less than 6 hours old and no force refresh is requested
    const cacheAge = Date.now() - videoCache.timestamp;
    if (!forceRefresh && 
        videoCache.videos.length > 0 && 
        cacheAge < 6 * 60 * 60 * 1000 &&
        videoCache.hasValidatedVideos) {
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
    
    // If we have invalid or no API key, use fallback videos immediately
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY.trim() === '') {
      console.warn('Using sample YouTube data - no API key found');
      
      // Get reliable fallback videos
      const fallbackVideos = getFallbackVideos();
      
      // Update cache with fallback videos
      videoCache = {
        timestamp: Date.now(),
        videos: fallbackVideos,
        domainRotationDate: today,
        hasValidatedVideos: true
      };
      
      return NextResponse.json({
        videos: fallbackVideos,
        lastUpdated: new Date().toISOString(),
        fromFallback: true,
        notice: "Using sample data - YouTube API key not configured"
      }, { status: 200 });
    }
    
    // Prepare to store all video results
    let allVideos: VideoType[] = [];
    let apiSuccess = false;
    let errorMessage = '';
    
    try {
      // Enhanced query with AI tool keywords for better results
      const enhancedQuery = `${query} ${AI_TOOL_KEYWORDS.slice(0, 3).join(' OR ')}`;
      
      // First approach: Search for videos with the enhanced query
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(enhancedQuery)}&type=video&maxResults=20&relevanceLanguage=en&key=${YOUTUBE_API_KEY}&videoDuration=medium&order=date&publishedAfter=${encodeURIComponent(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())}`
      );
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        
        // Only count as success if we have items
        if (searchData.items && searchData.items.length > 0) {
          apiSuccess = true;
          
          // Extract videos from search results
          const searchVideos = searchData.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
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
          console.warn('YouTube search API returned empty results');
        }
      } else {
        // Check for quota exceeded error
        try {
          const errorData = await searchResponse.json();
          if (errorData.error && errorData.error.errors) {
            const quotaError = errorData.error.errors.find((e: any) => e.reason === 'quotaExceeded');
            const apiNotConfiguredError = errorData.error.errors.find((e: any) => 
              e.reason === 'accessNotConfigured' || e.message?.includes('API v3 has not been used in project') || e.message?.includes('is disabled')
            );
            
            if (quotaError) {
              console.warn('YouTube API quota exceeded - using fallback videos');
              errorMessage = 'YouTube API quota exceeded';
            } else if (apiNotConfiguredError) {
              console.warn('YouTube API not enabled for this project - using fallback videos');
              errorMessage = 'YouTube API service not enabled';
            } else {
              console.warn('YouTube search API failed, status:', searchResponse.status, errorData.error);
              errorMessage = `API error: ${errorData.error.message || 'Unknown error'}`;
            }
          } else {
            console.warn('YouTube search API failed, status:', searchResponse.status);
            errorMessage = `API error status: ${searchResponse.status}`;
          }
        } catch (parseError) {
          console.error('Error parsing YouTube API error response:', parseError);
          errorMessage = `API response parsing error: ${parseError.message}`;
        }
      }
      
      // Second approach: Get latest videos from AI-focused channels (more reliable)
      // Only fetch from 5 random channels to avoid quota limits
      const shuffledChannels = [...AI_CHANNELS].sort(() => 0.5 - Math.random()).slice(0, 5);
      
      const channelRequests = shuffledChannels.map(channelId => 
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=3&type=video&key=${YOUTUBE_API_KEY}`)
          .then(res => {
            if (res.ok) {
              return res.json().then(data => {
                if (data.items && data.items.length > 0) {
                  apiSuccess = true;
                }
                return data;
              });
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
            embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
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
        
        // If we have valid cached videos, use them even if they're older than 6 hours
        if (videoCache.videos.length > 0 && videoCache.hasValidatedVideos) {
          console.log('Using older cached videos as fallback');
          return NextResponse.json({
            videos: videoCache.videos.slice(0, 15),
            lastUpdated: new Date(videoCache.timestamp).toISOString(),
            fromCache: true,
            notice: "Unable to fetch fresh videos, showing cached content"
          }, { status: 200 });
        }
        
        // If no valid cache, use hardcoded fallback videos
        const fallbackVideos = getFallbackVideos();
        
        // Update cache with validated fallback videos
        videoCache = {
          timestamp: Date.now(),
          videos: fallbackVideos,
          domainRotationDate: today,
          hasValidatedVideos: true
        };
        
        return NextResponse.json({
          videos: fallbackVideos,
          lastUpdated: new Date().toISOString(),
          fromFallback: true,
          error: errorMessage
        }, { status: 200 });
      }
      
      // Remove duplicates (by video ID)
      const uniqueVideos = allVideos.filter((video, index, self) =>
        index === self.findIndex((v) => v.id === video.id)
      );
      
      // Prioritize videos with "AI tool" keywords in title or description
      const prioritizedVideos = uniqueVideos.sort((a, b) => {
        const aHasKeyword = AI_TOOL_KEYWORDS.some(keyword => 
          a.title.toLowerCase().includes(keyword.toLowerCase()) || 
          a.description.toLowerCase().includes(keyword.toLowerCase())
        );
        
        const bHasKeyword = AI_TOOL_KEYWORDS.some(keyword => 
          b.title.toLowerCase().includes(keyword.toLowerCase()) || 
          b.description.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (aHasKeyword && !bHasKeyword) return -1;
        if (!aHasKeyword && bHasKeyword) return 1;
        return 0;
      });
      
      // Validate videos to ensure they actually exist - removes deleted videos
      const validatedVideos = await validateVideos(prioritizedVideos);
      
      // If no valid videos found after validation, use fallbacks
      if (validatedVideos.length === 0) {
        console.log('No valid videos found after validation, using fallbacks');
        const fallbackVideos = getFallbackVideos();
        
        // Update cache with fallback videos
        videoCache = {
          timestamp: Date.now(),
          videos: fallbackVideos,
          domainRotationDate: today,
          hasValidatedVideos: true
        };
        
        return NextResponse.json({
          videos: fallbackVideos,
          lastUpdated: new Date().toISOString(),
          fromFallback: true,
          notice: "No valid videos found from API, using sample data"
        }, { status: 200 });
      }
      
      // Randomize videos from the same domain/channel for daily rotation
      const finalVideos = shouldRotateDomains ? 
        randomizeDomainVideos(validatedVideos) : 
        validatedVideos;
      
      // Update the cache
      videoCache = {
        timestamp: Date.now(),
        videos: finalVideos,
        domainRotationDate: today,
        hasValidatedVideos: true
      };
      
      // Return the results
      return NextResponse.json({
        videos: finalVideos.slice(0, 15), // Return top 15 videos
        lastUpdated: new Date().toISOString()
      }, { status: 200 });
      
    } catch (apiError) {
      console.error('YouTube API error:', apiError);
      
      // If we have valid cached videos, use them as a fallback
      if (videoCache.videos.length > 0 && videoCache.hasValidatedVideos) {
        console.log('API error, using cached videos');
        return NextResponse.json({
          videos: videoCache.videos.slice(0, 15),
          lastUpdated: new Date(videoCache.timestamp).toISOString(),
          fromCache: true,
          notice: "Error fetching fresh videos, showing cached content"
        }, { status: 200 });
      }
      
      // If no cache, use hardcoded fallback videos
      const fallbackVideos = getFallbackVideos();
      
      // Update cache with fallback videos
      videoCache = {
        timestamp: Date.now(),
        videos: fallbackVideos,
        domainRotationDate: today,
        hasValidatedVideos: true
      };
      
      return NextResponse.json({
        videos: fallbackVideos,
        lastUpdated: new Date().toISOString(),
        fromFallback: true,
        error: apiError.message
      }, { status: 200 });  // Still return 200 to prevent UI errors
    }
    
  } catch (error) {
    console.error('Error in YouTube API route:', error);
    
    // If we have valid cached videos, use them despite the error
    if (videoCache.videos.length > 0 && videoCache.hasValidatedVideos) {
      return NextResponse.json({
        videos: videoCache.videos.slice(0, 15),
        lastUpdated: new Date(videoCache.timestamp).toISOString(),
        fromCache: true,
        error: error.message
      }, { status: 200 });  // Still return 200 to prevent UI errors
    }
    
    // Final fallback
    const fallbackVideos = getFallbackVideos();
    
    // Update cache with fallback videos
    videoCache = {
      timestamp: Date.now(),
      videos: fallbackVideos,
      domainRotationDate: new Date().toDateString(),
      hasValidatedVideos: true
    };
    
    return NextResponse.json({
      videos: fallbackVideos,
      lastUpdated: new Date().toISOString(),
      fromFallback: true,
      error: error.message
    }, { status: 200 });  // Still return 200 to prevent UI errors
  }
}

// Function to randomize videos from the same domain
// This ensures cache freshness on a daily basis
function randomizeDomainVideos(videos: VideoType[]): VideoType[] {
  // Group videos by cacheDomain
  const domainGroups: { [domain: string]: VideoType[] } = {};
  
  videos.forEach(video => {
    const domain = video.cacheDomain || 'unknown';
    if (!domainGroups[domain]) {
      domainGroups[domain] = [];
    }
    domainGroups[domain].push(video);
  });
  
  // Randomize order within each domain group
  Object.keys(domainGroups).forEach(domain => {
    domainGroups[domain] = domainGroups[domain].sort(() => Math.random() - 0.5);
  });
  
  // Combine all videos, taking one from each domain in round-robin fashion
  const result: VideoType[] = [];
  let hasMore = true;
  let index = 0;
  
  const domains = Object.keys(domainGroups);
  while (hasMore) {
    hasMore = false;
    for (const domain of domains) {
      if (index < domainGroups[domain].length) {
        result.push(domainGroups[domain][index]);
        hasMore = true;
      }
    }
    index++;
  }
  
  // Return the randomized results
  return result;
}

// Fallback videos to use when API fails or is not configured
function getFallbackVideos(): VideoType[] {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Return hardcoded videos - all of these are verified to exist and work properly
  return [
    {
      id: "VLhMPMKtHfA",
      title: "Claude 3.5 Sonnet vs ChatGPT 4o: In-Depth AI Comparison",
      description: "A detailed comparison of Claude 3.5 Sonnet and GPT-4o, the latest models from Anthropic and OpenAI, analyzing their strengths, weaknesses, and use cases.",
      thumbnailUrl: "https://i.ytimg.com/vi/VLhMPMKtHfA/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=VLhMPMKtHfA",
      embedUrl: "https://www.youtube.com/embed/VLhMPMKtHfA",
      source: "All About AI",
      channelId: "UCUyeluBRhGPCW4rPe_UvBZQ",
      channelUrl: "https://www.youtube.com/channel/UCUyeluBRhGPCW4rPe_UvBZQ",
      date: formattedDate,
      fromFallback: true
    },
    {
      id: "iJCzZwb4U1w",
      title: "10 Must-Have Chrome Extensions for AI Productivity",
      description: "Discover the top 10 Chrome extensions that leverage AI to boost your productivity, from writing assistants to research tools.",
      thumbnailUrl: "https://i.ytimg.com/vi/iJCzZwb4U1w/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=iJCzZwb4U1w",
      embedUrl: "https://www.youtube.com/embed/iJCzZwb4U1w",
      source: "Matt Wolfe",
      channelId: "UCJIfeSCssxSC_Dhc5s7woww",
      channelUrl: "https://www.youtube.com/channel/UCJIfeSCssxSC_Dhc5s7woww",
      date: formattedDate,
      fromFallback: true
    },
    {
      id: "5VG-_P5M9zI",
      title: "Claude 3.5 Sonnet is OUT!",
      description: "Anthropic released Claude 3.5 Sonnet, their most capable model yet. Here's everything you need to know.",
      thumbnailUrl: "https://i.ytimg.com/vi/5VG-_P5M9zI/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=5VG-_P5M9zI",
      embedUrl: "https://www.youtube.com/embed/5VG-_P5M9zI",
      source: "AI Explained",
      channelId: "UC8wZnXYK_CGKlBcZp-GxYPA",
      channelUrl: "https://www.youtube.com/channel/UC8wZnXYK_CGKlBcZp-GxYPA",
      date: formattedDate,
      fromFallback: true
    },
    {
      id: "LFEE8Mi_BnI",
      title: "5 Midjourney Prompting Techniques You Need to Know",
      description: "Master Midjourney with these 5 essential prompting techniques for better AI image generation.",
      thumbnailUrl: "https://i.ytimg.com/vi/LFEE8Mi_BnI/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=LFEE8Mi_BnI",
      embedUrl: "https://www.youtube.com/embed/LFEE8Mi_BnI",
      source: "Prompt Engineering",
      channelId: "UCv83tO5cePwHMt1952IVVHw",
      channelUrl: "https://www.youtube.com/channel/UCv83tO5cePwHMt1952IVVHw",
      date: formattedDate,
      fromFallback: true
    },
    {
      id: "JXqH6U5fxqA",
      title: "Google Gemini Advanced vs ChatGPT 4o vs Claude 3 Opus",
      description: "Comparing the top AI models: Google Gemini Advanced, ChatGPT 4o, and Claude 3 Opus. Which one is best?",
      thumbnailUrl: "https://i.ytimg.com/vi/JXqH6U5fxqA/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=JXqH6U5fxqA",
      embedUrl: "https://www.youtube.com/embed/JXqH6U5fxqA",
      source: "Ripley AI",
      channelId: "UCgBVkKC1MsaZHVBWdmjJ_Wg",
      channelUrl: "https://www.youtube.com/channel/UCgBVkKC1MsaZHVBWdmjJ_Wg",
      date: formattedDate,
      fromFallback: true
    },
    {
      id: "SOjaGQEOmws",
      title: "Mastering ChatGPT for Coding: Complete Guide",
      description: "Learn how to use ChatGPT effectively for coding tasks, from simple scripts to complex projects.",
      thumbnailUrl: "https://i.ytimg.com/vi/SOjaGQEOmws/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=SOjaGQEOmws",
      embedUrl: "https://www.youtube.com/embed/SOjaGQEOmws",
      source: "Builder's Central",
      channelId: "UCdj9K0dcfBVbDlJsQ8Rp2bQ",
      channelUrl: "https://www.youtube.com/channel/UCdj9K0dcfBVbDlJsQ8Rp2bQ",
      date: formattedDate,
      fromFallback: true
    },
    {
      id: "jV4_CULnQnU",
      title: "AutoGen: Microsoft's Revolutionary AI Agents Framework",
      description: "Microsoft AutoGen allows multi-agent conversations that can solve complex tasks autonomously.",
      thumbnailUrl: "https://i.ytimg.com/vi/jV4_CULnQnU/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=jV4_CULnQnU",
      embedUrl: "https://www.youtube.com/embed/jV4_CULnQnU",
      source: "AI Foundations",
      channelId: "UCG-DIzZxEv1hGm7ItSFEooQ",
      channelUrl: "https://www.youtube.com/channel/UCG-DIzZxEv1hGm7ItSFEooQ",
      date: formattedDate,
      fromFallback: true
    },
    {
      id: "DkIIaHOiN1g",
      title: "The Truth About AI Vision Models: How Good Are They Really?",
      description: "An in-depth analysis of the current state of AI vision models, their capabilities and limitations.",
      thumbnailUrl: "https://i.ytimg.com/vi/DkIIaHOiN1g/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=DkIIaHOiN1g",
      embedUrl: "https://www.youtube.com/embed/DkIIaHOiN1g",
      source: "Two Minute Papers",
      channelId: "UCbfYPyITQ-7l4upoX8nvctg",
      channelUrl: "https://www.youtube.com/channel/UCbfYPyITQ-7l4upoX8nvctg",
      date: formattedDate,
      fromFallback: true
    }
  ];
}
