"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from "lucide-react";
import { hasValidVideoId } from "@/lib/video-fallbacks";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  embedUrl?: string;
  source: string;
  date: string;
  channelUrl?: string;
  fromFallback?: boolean;
}

interface VideoCarouselProps {
  videos: VideoItem[];
}

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [thumbnailError, setThumbnailError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    resetPlayState();
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    resetPlayState();
  };

  const resetPlayState = () => {
    setIsPlaying(false);
    setIframeError(false);
    setIframeLoading(true);
    setThumbnailError(false);
  };

  const togglePlayPause = () => {
    if (isValidYouTubeVideo(currentVideo) && !iframeError) {
      // For YouTube videos, we just toggle the state and the iframe src will update
      setIsPlaying(!isPlaying);
    } else if (videoRef.current) {
      // For regular videos, use the video element API
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.error("Error playing video:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle iFrame load success
  const handleIframeLoad = () => {
    console.log("Iframe loaded successfully");
    setIframeLoading(false);
    setIframeError(false);
  };

  // Handle iFrame errors by showing a fallback
  const handleIframeError = () => {
    console.error("Error loading embedded video");
    setIframeError(true);
    setIframeLoading(false);
  };

  // Check if it's a valid YouTube video
  const isValidYouTubeVideo = (video: VideoItem): boolean => {
    return (
      !!video.id && 
      hasValidVideoId(video.id) && 
      !!video.embedUrl && 
      video.embedUrl.includes('youtube.com/embed/')
    );
  };

  // Get optimized embed URL with safeguards
  const getEmbedUrl = (embedUrl: string, isPlaying: boolean): string => {
    if (!embedUrl || typeof embedUrl !== 'string') {
      console.warn('Invalid embed URL:', embedUrl);
      return '';
    }
    
    try {
      // Make sure we're using the correct YouTube embed URL format
      let url = embedUrl;
      
      // Clean up the URL to remove any existing parameters
      if (url.includes('?')) {
        url = url.split('?')[0];
      }
      
      // Extract video ID to use proper embed URL
      let videoId = "";
      
      // Handle different YouTube URL formats
      if (url.includes('/embed/')) {
        videoId = url.split('/embed/').pop() || "";
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/').pop() || "";
      } else if (url.includes('youtube.com/watch')) {
        try {
          const urlObj = new URL(url);
          videoId = urlObj.searchParams.get('v') || "";
        } catch (e) {
          // Handle case where URL might be malformed
          const match = url.match(/[?&]v=([^&]+)/);
          videoId = match ? match[1] : "";
        }
      } else {
        // Fallback extraction - assume the last part of the path is the ID
        const parts = url.split('/');
        videoId = parts[parts.length - 1] || "";
      }
      
      // Remove any extra path segments after the ID
      if (videoId.includes('/')) {
        videoId = videoId.split('/')[0];
      }
      
      // If no video ID could be extracted, return empty string
      if (!videoId) {
        console.error("Could not extract video ID from URL:", embedUrl);
        return '';
      }
      
      // Verify the ID is in our list of known good IDs
      if (!hasValidVideoId(videoId)) {
        console.warn("Video ID not in list of verified IDs:", videoId);
      }
      
      // Build the final embed URL with necessary parameters
      const params = new URLSearchParams({
        autoplay: isPlaying ? '1' : '0',
        mute: isPlaying ? '1' : '0',
        enablejsapi: '1',
        modestbranding: '1',
        rel: '0',
        showinfo: '0',
        fs: '1',
        origin: typeof window !== 'undefined' ? window.location.origin : '',
      }).toString();
      
      return `https://www.youtube.com/embed/${videoId}?${params}`;
    } catch (error) {
      console.error('Error generating embed URL:', error);
      return '';
    }
  };

  // Auto-advance carousel every 10 seconds if not playing video
  useEffect(() => {
    if (!isPlaying) {
      const interval = setInterval(() => {
        handleNext();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Reset video state when changing videos
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    resetPlayState();
  }, [currentIndex]);

  if (!videos || videos.length === 0) {
    return null;
  }

  const currentVideo = videos[currentIndex];
  
  // Make sure we have a valid video with required fields
  if (!currentVideo || !currentVideo.title || (!currentVideo.videoUrl && !currentVideo.embedUrl)) {
    console.error("Invalid video data", currentVideo);
    return null;
  }

  // Check if this is a valid YouTube video that should work
  const hasValidEmbed = isValidYouTubeVideo(currentVideo);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl bg-black">
      <div className="relative aspect-video w-full">
        {/* Video - use iframe for YouTube videos, fallback to regular video or image */}
        {hasValidEmbed && !iframeError ? (
          <>
            {iframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={getEmbedUrl(currentVideo.embedUrl!, isPlaying)}
              className="w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title={currentVideo.title}
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
              loading="lazy"
            />
          </>
        ) : currentVideo.videoUrl?.endsWith('.mp4') ? (
          <video
            ref={videoRef}
            src={currentVideo.videoUrl}
            poster={currentVideo.thumbnailUrl}
            className="w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => console.error("Video error")}
          />
        ) : (
          // Fallback to just showing the thumbnail with a link to YouTube
          <div className="relative w-full h-full bg-black">
            {thumbnailError ? (
              // Show a placeholder when thumbnail fails to load
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <div className="text-white text-center p-4">
                  <div className="text-4xl mb-2">📺</div>
                  <div className="text-xl font-semibold">{currentVideo.title}</div>
                  <div className="text-sm text-gray-400 mt-2">Video preview unavailable</div>
                </div>
              </div>
            ) : (
              <img 
                src={currentVideo.thumbnailUrl} 
                alt={currentVideo.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  console.error("Image loading error for thumbnail:", currentVideo.thumbnailUrl);
                  setThumbnailError(true);
                }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <a 
                href={currentVideo.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <ExternalLink className="h-8 w-8 text-white" />
              </a>
            </div>
            {iframeError ? (
              <div className="absolute bottom-0 left-0 right-0 bg-red-700/80 text-white text-center text-sm py-1">
                {currentVideo.fromFallback ? 
                  "Using sample video data. YouTube API needs configuration." : 
                  "Could not load embedded video. Click to view on YouTube."
                }
              </div>
            ) : (
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-center text-sm py-1">
                Click to view video on YouTube
              </div>
            )}
          </div>
        )}

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 md:p-6">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg md:text-xl font-semibold text-white line-clamp-1">
              {currentVideo.title}
            </h3>
            <p className="text-sm text-white/70 line-clamp-2 mb-2">
              {currentVideo.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-white/60">
                <a 
                  href={currentVideo.channelUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors"
                >
                  {currentVideo.source}
                </a>
                <span>•</span>
                <span>{currentVideo.date}</span>
              </div>
              {hasValidEmbed && !iframeError ? (
                <button
                  onClick={togglePlayPause}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 text-white" />
                  ) : (
                    <Play className="h-5 w-5 text-white" />
                  )}
                </button>
              ) : (
                <a 
                  href={currentVideo.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ExternalLink className="h-5 w-5 text-white" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {videos.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            aria-label="Next video"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Indicators */}
      {videos.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
          <div className="flex space-x-1.5">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
