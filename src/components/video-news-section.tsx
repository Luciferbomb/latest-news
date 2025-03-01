"use client";

import { useState, useEffect, useCallback } from 'react';
import { VideoCarousel, VideoItem } from './ui/video-carousel';
import { PanelTop, RefreshCcw } from 'lucide-react';

// Sample videos to display if the API fails
const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: "sample-1",
    title: "GPT-4 Turbo: Everything You Need to Know",
    description: "Learn about OpenAI's latest model GPT-4 Turbo, its capabilities, and how it compares to previous models.",
    thumbnailUrl: "https://images.unsplash.com/photo-1677442135555-3e0f312a8ebe?w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    source: "AI News",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  },
  {
    id: "sample-2",
    title: "The Rise of Multimodal AI Models",
    description: "Explore how the latest AI models are combining text, images, and audio for more powerful applications.",
    thumbnailUrl: "https://images.unsplash.com/photo-1675256484473-ec5c847608f3?w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    source: "Tech Insights",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
];

export function VideoNewsSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  // Function to fetch videos with improved error handling
  const fetchVideos = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);
    setDebugInfo(null);
    
    try {
      // Using a specific query related to AI tools and image generation
      const response = await fetch(`/api/youtube?q=ai tools image generation${forceRefresh ? '&refresh=true' : ''}`);
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Log debug information
      if (data.notice || data.fromCache || data.fromFallback) {
        setDebugInfo(
          `${data.notice ? data.notice + ". " : ""}` +
          `${data.fromCache ? "Using cached data. " : ""}` +
          `${data.fromFallback ? "Using fallback videos. " : ""}`
        );
      }
      
      // Validate that we got actual video data
      if (!data.videos || !Array.isArray(data.videos) || data.videos.length === 0) {
        console.warn("No videos returned from API, using sample videos", data);
        setVideos(SAMPLE_VIDEOS);
      } else {
        // Validate and sanitize each video before setting
        const sanitizedVideos = data.videos
          .filter((video: any) => 
            video && video.id && video.title && 
            (video.videoUrl || video.embedUrl) && 
            video.thumbnailUrl
          )
          .map((video: any): VideoItem => ({
            id: video.id,
            title: video.title,
            description: video.description || "No description available",
            thumbnailUrl: video.thumbnailUrl,
            videoUrl: video.videoUrl,
            embedUrl: video.embedUrl,
            source: video.source || "Unknown source",
            date: video.date || new Date().toLocaleDateString(),
            channelUrl: video.channelUrl
          }));
        
        if (sanitizedVideos.length > 0) {
          setVideos(sanitizedVideos);
        } else {
          console.warn("No valid videos after filtering, using sample videos");
          setVideos(SAMPLE_VIDEOS);
        }
      }
      
      // Set last updated time
      if (data.lastUpdated) {
        const date = new Date(data.lastUpdated);
        setLastUpdated(date.toLocaleString());
      } else {
        setLastUpdated(new Date().toLocaleString());
      }
      
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos. Using sample content instead.");
      setVideos(SAMPLE_VIDEOS);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Fetch videos on component mount
  useEffect(() => {
    fetchVideos();
    
    // Update every 6 hours
    const intervalId = setInterval(() => {
      fetchVideos();
    }, 6 * 60 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [fetchVideos]);
  
  return (
    <section className="py-10 px-4 bg-black/5 dark:bg-white/5 rounded-xl">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <PanelTop className="h-5 w-5" />
            AI Video News
          </h2>
          <p className="text-muted-foreground mt-1">
            Latest videos about AI tools and technology
          </p>
          {debugInfo && (
            <p className="text-amber-600 dark:text-amber-400 text-xs mt-1">
              {debugInfo}
            </p>
          )}
          {error && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1">
              {error}
            </p>
          )}
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
        <button 
          onClick={() => fetchVideos(true)}
          disabled={isLoading}
          className="mt-2 sm:mt-0 flex items-center gap-1 text-sm px-3 py-1.5 rounded-md 
                    bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 
                    transition-colors disabled:opacity-50"
          aria-label="Refresh videos"
        >
          <RefreshCcw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      
      {isLoading && videos.length === 0 ? (
        <div className="w-full aspect-video bg-black/10 dark:bg-white/5 animate-pulse rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading videos...</p>
          </div>
        </div>
      ) : (
        <VideoCarousel videos={videos} />
      )}
    </section>
  );
}
