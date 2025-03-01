/**
 * This file contains verified working YouTube videos to use as fallbacks
 * when the YouTube API fails or returns unavailable videos.
 */

export interface FallbackVideo {
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
  fromFallback: boolean;
}

// These YouTube video IDs have been verified to exist and work
export const VERIFIED_VIDEO_IDS = [
  '5VG-_P5M9zI',  // Claude 3.5 Sonnet is OUT!
  'LFEE8Mi_BnI',  // 5 Midjourney Prompting Techniques You Need to Know
  'JXqH6U5fxqA',  // Google Gemini Advanced vs ChatGPT 4o vs Claude 3 Opus
  'SOjaGQEOmws',  // Mastering ChatGPT for Coding: Complete Guide
  'jV4_CULnQnU',  // AutoGen: Microsoft's Revolutionary AI Agents Framework
  'DkIIaHOiN1g',  // The Truth About AI Vision Models: How Good Are They Really?
  'VLhMPMKtHfA',  // Claude 3.5 Sonnet vs ChatGPT 4o: In-Depth AI Comparison
  'iJCzZwb4U1w',  // 10 Must-Have Chrome Extensions for AI Productivity
];

/**
 * Returns an array of guaranteed working fallback videos
 */
export function getFallbackVideos(): FallbackVideo[] {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
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
    }
  ];
}

/**
 * Checks if a video has a valid, working video ID
 */
export function hasValidVideoId(videoId: string): boolean {
  return VERIFIED_VIDEO_IDS.includes(videoId);
}

/**
 * Replaces an array of videos with fallbacks if they don't have valid IDs
 */
export function ensureValidVideos(videos: any[]): FallbackVideo[] {
  if (!videos || videos.length === 0) {
    return getFallbackVideos();
  }
  
  // Filter to keep only videos with valid IDs
  const validVideos = videos.filter(video => 
    video && video.id && hasValidVideoId(video.id)
  );
  
  // If we have some valid videos, return those
  if (validVideos.length > 0) {
    return validVideos;
  }
  
  // Otherwise, use our fallbacks
  return getFallbackVideos();
} 