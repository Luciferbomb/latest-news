"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from "lucide-react";

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
}

interface VideoCarouselProps {
  videos: VideoItem[];
}

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeError, setIframeError] = useState(false);
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
  };

  const togglePlayPause = () => {
    if (currentVideo.embedUrl && !iframeError) {
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

  // Handle iFrame errors by showing a fallback
  const handleIframeError = () => {
    console.error("Error loading embedded video");
    setIframeError(true);
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

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl bg-black">
      <div className="relative aspect-video w-full">
        {/* Video - use iframe for YouTube videos, fallback to regular video element or image */}
        {currentVideo.embedUrl && !iframeError ? (
          <iframe
            ref={iframeRef}
            src={`${currentVideo.embedUrl}?autoplay=${isPlaying ? 1 : 0}&mute=0`}
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={handleIframeError}
          />
        ) : currentVideo.videoUrl && currentVideo.videoUrl.endsWith('.mp4') ? (
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
          // Fallback to just showing the thumbnail if no valid video source
          <div className="relative w-full h-full">
            <img 
              src={currentVideo.thumbnailUrl} 
              alt={currentVideo.title}
              className="w-full h-full object-cover"
            />
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
              {(currentVideo.embedUrl && !iframeError) || 
               (currentVideo.videoUrl && currentVideo.videoUrl.endsWith('.mp4')) ? (
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
