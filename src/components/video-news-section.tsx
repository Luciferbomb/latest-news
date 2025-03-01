"use client";

import { useState, useEffect, useCallback } from 'react';
import { VideoCarousel, VideoItem } from './ui/video-carousel';
import { PanelTop, RefreshCcw } from 'lucide-react';
import { getFallbackVideos, hasValidVideoId } from '@/lib/video-fallbacks';

export function VideoNewsSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Function to validate if a video has a valid embedUrl and ID
  const isValidVideo = (video: VideoItem): boolean => {
    return (
      !!video.id && 
      hasValidVideoId(video.id) &&
      !!video.title && 
      !!video.thumbnailUrl
    );
  };

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/youtube?refresh=true');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate videos to make sure they have required properties and valid IDs
      const validVideos = data.videos.filter(isValidVideo);
      
      // If we have no valid videos from the API, use our fallback videos
      if (validVideos.length === 0) {
        console.warn('No valid videos received from API, using fallbacks');
        setVideos(getFallbackVideos());
      } else {
        setVideos(validVideos);
      }
      
      if (data.lastUpdated) {
        setLastUpdated(new Date(data.lastUpdated));
      }
      
      if (data.notice) {
        console.info('Video API Notice:', data.notice);
      }
      
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos. Using fallback content.');
      // Use fallback videos
      setVideos(getFallbackVideos());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
    
    // Auto-refresh every 6 hours
    const interval = setInterval(fetchVideos, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchVideos]);

  return (
    <section className="pt-8 pb-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Featured AI Video Content
            </h2>
            <p className="text-white/60">
              Watch the latest videos on AI tools and technologies
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            {lastUpdated && (
              <span className="text-white/50 text-sm mr-4">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchVideos}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg text-white/80 text-sm transition-colors disabled:opacity-50"
              title="Refresh videos"
            >
              <RefreshCcw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="aspect-video w-full bg-black/30 animate-pulse rounded-xl"></div>
        ) : error ? (
          <div className="aspect-video w-full bg-black/30 rounded-xl flex items-center justify-center flex-col p-6">
            <PanelTop className="h-10 w-10 text-red-400 mb-4" />
            <h3 className="text-white text-xl mb-2">Failed to load videos from API</h3>
            <p className="text-white/60 mb-4 text-center">{error}</p>
            <button
              onClick={fetchVideos}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : videos.length > 0 ? (
          <VideoCarousel videos={videos} />
        ) : (
          <div className="aspect-video w-full bg-black/30 rounded-xl flex items-center justify-center flex-col p-6">
            <PanelTop className="h-10 w-10 text-white/50 mb-4" />
            <h3 className="text-white text-xl mb-2">No videos available</h3>
            <p className="text-white/60 mb-4 text-center">
              There are no videos to display at the moment.
            </p>
            <button
              onClick={fetchVideos}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
