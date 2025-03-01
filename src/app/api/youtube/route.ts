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
}

// AI-related YouTube channel IDs - focusing on latest AI content creators
const AI_CHANNELS = [
  'UCbfYPyITQ-7l4upoX8nvctg', // Two Minute Papers
  'UC8wZnXYK_CGKlBcZp-GxYPA', // AI Explained
  'UCgBVkKC1MsaZHVBWdmjJ_Wg', // Ripley AI
  'UCdj9K0dcfBVbDlJsQ8Rp2bQ', // Builder's Central
  'UCJIfeSCssxSC_Dhc5s7woww', // Matt Wolfe
  'UCv83tO5cePwHMt1952IVVHw', // Prompt Engineering
  'UCG-DIzZxEv1hGm7ItSFEooQ', // AI Foundations
  'UCUyeluBRhGPCW4rPe_UvBZQ'  // AI Advantage
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'artificial intelligence';
    
    console.log('Fetching YouTube videos...');
    
    // Prepare to store all video results
    let allVideos: VideoType[] = [];
    
    try {
      // First approach: Search for videos with the query and channel filter
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=15&relevanceLanguage=en&key=${YOUTUBE_API_KEY}&videoDuration=medium&order=date&publishedAfter=${encodeURIComponent(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())}`
      );
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        
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
          })
        }));
        
        allVideos = [...allVideos, ...searchVideos];
      }
      
      // Second approach: Get latest videos from AI-focused channels
      const channelRequests = AI_CHANNELS.map(channelId => 
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=3&type=video&key=${YOUTUBE_API_KEY}`)
          .then(res => res.ok ? res.json() : { items: [] })
          .catch(() => ({ items: [] }))
      );
      
      const channelResults = await Promise.all(channelRequests);
      
      // Process each channel's videos
      channelResults.forEach(result => {
        if (result.items && result.items.length > 0) {
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
            })
          }));
          
          allVideos = [...allVideos, ...channelVideos];
        }
      });
      
      // Remove duplicates (same video ID)
      const uniqueVideos = Array.from(
        new Map(allVideos.map(video => [video.id, video])).values()
      );
      
      // Filter out non-AI content
      const aiKeywords = ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural', 'gpt', 'llm', 'chatgpt', 'openai', 'midjourney', 'stable diffusion', 'claude', 'gemini', 'dall-e', 'image generation', 'ai image', 'ai art'];
      
      const aiVideos = uniqueVideos.filter(video => {
        const content = `${video.title.toLowerCase()} ${video.description.toLowerCase()}`;
        return aiKeywords.some(keyword => content.includes(keyword));
      });
      
      // Sort by date (most recent first)
      aiVideos.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      
      return NextResponse.json({
        videos: aiVideos.slice(0, 15), // Return top 15 videos
        lastUpdated: new Date().toISOString()
      }, { status: 200 });
      
    } catch (apiError) {
      console.error('YouTube API error:', apiError);
      throw new Error('Failed to fetch videos from YouTube API');
    }
    
  } catch (error: any) {
    console.error('Error in YouTube API route:', error);
    
    return NextResponse.json({
      videos: [],
      lastUpdated: new Date().toISOString(),
      error: error.message
    }, { status: 500 });
  }
}
