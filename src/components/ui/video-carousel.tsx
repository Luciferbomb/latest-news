"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink, AlertTriangle } from "lucide-react";
import { hasValidVideoId } from "@/lib/video-fallbacks";
import Image from "next/image";

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

  // Move currentVideo declaration here, before it's used in any hooks
  const currentVideo = videos && videos.length > 0 ? videos[currentIndex] : null;

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

  // Check if it's a valid YouTube video
  const isValidYouTubeVideo = (video: VideoItem): boolean => {
    if (!video) return false;
    
    // Check if we have a valid embed URL
    try {
      const embedUrl = video.embedUrl || '';
      
      // Check if it's a valid YouTube URL
      const isYouTubeUrl = 
        embedUrl.includes('youtube.com') || 
        embedUrl.includes('youtu.be') ||
        (video.videoUrl && (video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be')));
      
      // Extract video ID and check if it's valid
      let videoId = '';
      
      if (embedUrl.includes('youtube.com/embed/')) {
        videoId = embedUrl.split('youtube.com/embed/')[1]?.split('?')[0] || '';
      } else if (embedUrl.includes('youtube.com/watch')) {
        const urlObj = new URL(embedUrl);
        videoId = urlObj.searchParams.get('v') || '';
      } else if (embedUrl.includes('youtu.be/')) {
        videoId = embedUrl.split('youtu.be/')[1]?.split('?')[0] || '';
      }
      
      // Ensure we return a boolean value
      return Boolean(isYouTubeUrl && videoId.length === 11);
    } catch (error) {
      console.error('Error validating YouTube video:', error);
      return false;
    }
  };

  const togglePlayPause = useCallback(() => {
    if (!currentVideo || !isValidYouTubeVideo(currentVideo)) {
      console.warn('Cannot toggle play/pause: Invalid or missing video');
      return;
    }
    
    setIsPlaying((prev) => !prev);
  }, [currentVideo, isValidYouTubeVideo]);

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

  // Get optimized embed URL with safeguards
  const getEmbedUrl = (url: string, autoplay: boolean = false): string => {
    try {
      if (!url) return '';
      
      // If it's already a valid embed URL, just add parameters
      if (url.includes('youtube.com/embed/')) {
        const baseUrl = url.split('?')[0];
        return `${baseUrl}?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}&enablejsapi=1`;
      }
      
      // Extract video ID from various YouTube URL formats
      let videoId = '';
      
      // youtube.com/watch?v=VIDEO_ID format
      if (url.includes('youtube.com/watch')) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get('v') || '';
      } 
      // youtu.be/VIDEO_ID format
      else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      }
      // youtube.com/v/VIDEO_ID format
      else if (url.match(/youtube\.com\/v\/([^?&]+)/)) {
        videoId = url.match(/youtube\.com\/v\/([^?&]+)/)?.[1] || '';
      }
      // Direct video ID
      else if (/^[A-Za-z0-9_-]{11}$/.test(url)) {
        videoId = url;
      }
      
      if (!videoId) {
        console.error('Invalid YouTube URL format:', url);
        return '';
      }
      
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}&enablejsapi=1`;
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
        {currentVideo && currentVideo.embedUrl && !iframeError ? (
          <div className="relative w-full h-full">
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              src={getEmbedUrl(currentVideo.embedUrl, isPlaying)}
              title={currentVideo.title || "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => {
                console.error('Error loading iframe');
                setIframeError(true);
              }}
            />
          </div>
        ) : (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            {currentVideo?.thumbnailUrl ? (
              <Image
                src={currentVideo.thumbnailUrl}
                alt={currentVideo.title || "Video thumbnail"}
                fill
                className="object-contain"
                onError={() => {
                  console.error('Error loading thumbnail');
                  setThumbnailError(true);
                }}
              />
            ) : (
              <div className="text-white text-center p-4">
                <AlertTriangle className="mx-auto mb-2 h-12 w-12" />
                <p>Video unavailable</p>
                {currentVideo?.videoUrl && (
                  <a 
                    href={currentVideo.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline mt-2 block"
                  >
                    View on YouTube
                  </a>
                )}
              </div>
            )}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-white text-center">
                  <AlertTriangle className="mx-auto mb-2 h-12 w-12" />
                  <p>Unable to play this video</p>
                  {currentVideo?.videoUrl && (
                    <a 
                      href={currentVideo.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline mt-2 block"
                    >
                      View on YouTube
                    </a>
                  )}
                </div>
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
