"use client";

import { useState, useEffect } from "react";
import { VideoCarousel, VideoItem } from "@/components/ui/video-carousel";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

// Featured AI YouTube channels and their videos
const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: "1",
    title: "I Tested 10 AI Tools That Will Change Everything",
    description: "Ripley AI explores the latest AI tools that are revolutionizing productivity and creativity, with hands-on demonstrations and practical use cases.",
    thumbnailUrl: "https://images.unsplash.com/photo-1677442135136-760c813a1e2a?q=80&w=1932&auto=format&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", // Sample video URL - would be YouTube embed in production
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Sample embed URL
    source: "Ripley AI",
    date: "Mar 1, 2025",
    channelUrl: "https://youtube.com/@RipleyAI"
  },
  {
    id: "2",
    title: "How to Build an AI SaaS in 1 Hour | Builder Central",
    description: "Builder Central shows you how to create a complete AI SaaS application in just one hour using the latest development tools and frameworks.",
    thumbnailUrl: "https://images.unsplash.com/photo-1581093196277-9f608bb3b511?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4", // Sample video URL
    embedUrl: "https://www.youtube.com/embed/jNQXAC9IVRw", // Sample embed URL
    source: "Builder Central",
    date: "Feb 28, 2025",
    channelUrl: "https://www.youtube.com/@BuildersCentral"
  },
  {
    id: "3",
    title: "GPT-5 vs Claude 3 vs Gemini 2 | The ULTIMATE AI Model Comparison",
    description: "A comprehensive comparison of the latest AI language models, testing their capabilities across reasoning, coding, creativity, and factual knowledge.",
    thumbnailUrl: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=1780&auto=format&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4", // Sample video URL
    embedUrl: "https://www.youtube.com/embed/9bZkp7q19f0", // Sample embed URL
    source: "AI Explained",
    date: "Feb 25, 2025",
    channelUrl: "https://youtube.com/@AIExplained"
  },
  {
    id: "4",
    title: "How Midjourney v6 is Changing the Art Industry Forever",
    description: "An in-depth look at how Midjourney's latest version is transforming digital art creation and disrupting traditional creative workflows.",
    thumbnailUrl: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=2080&auto=format&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4", // Sample video URL
    embedUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk", // Sample embed URL
    source: "Two Minute Papers",
    date: "Feb 22, 2025",
    channelUrl: "https://youtube.com/@TwoMinutePapers"
  },
  {
    id: "5",
    title: "The Dark Side of AI: Privacy Concerns You Need to Know",
    description: "An investigative look into the privacy implications of modern AI systems and what users should be aware of when using these technologies.",
    thumbnailUrl: "https://images.unsplash.com/photo-1611273426858-450e7f08d0bf?q=80&w=1770&auto=format&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4", // Sample video URL
    source: "AI Ethics with Lex",
    date: "Feb 20, 2025",
    channelUrl: "https://youtube.com/@AIEthics"
  },
  {
    id: "6",
    title: "I Built a Complete AI Agent That Runs My Business",
    description: "A developer shares how they created an autonomous AI agent system that handles various aspects of their online business operations.",
    thumbnailUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1770&auto=format&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4", // Sample video URL
    source: "Matt Wolfe",
    date: "Feb 18, 2025",
    channelUrl: "https://youtube.com/@MattWolfe"
  },
  {
    id: "7",
    title: "The Future of AI: 2025 Predictions from Industry Leaders",
    description: "Top AI researchers and industry executives share their predictions for how artificial intelligence will evolve in the coming year.",
    thumbnailUrl: "https://images.unsplash.com/photo-1620063633487-4ced43f0a40d?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4", // Sample video URL
    source: "Lex Fridman",
    date: "Feb 15, 2025",
    channelUrl: "https://youtube.com/@lexfridman"
  },
  {
    id: "8",
    title: "How to Use AI to 10x Your Productivity | Practical Guide",
    description: "A practical tutorial on integrating AI tools into your daily workflow to dramatically increase productivity across various professional tasks.",
    thumbnailUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4", // Sample video URL
    source: "Ali Abdaal",
    date: "Feb 12, 2025",
    channelUrl: "https://youtube.com/@aliabdaal"
  }
];

export default function VideoNewsSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      // Fetch videos from our YouTube API endpoint focused on AI image generation
      const response = await fetch('/api/youtube?q=AI+image+generation+midjourney+stable+diffusion+dall-e');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.videos && data.videos.length > 0) {
        // Transform the API response to match our VideoItem interface
        const fetchedVideos = data.videos.map((video: any) => ({
          id: video.id,
          title: video.title,
          description: video.description,
          thumbnailUrl: video.thumbnailUrl,
          videoUrl: video.videoUrl,
          embedUrl: video.embedUrl,
          source: video.source,
          date: video.date,
          channelUrl: video.channelUrl
        }));
        
        // Filter videos to focus on image generation
        const filteredVideos = fetchedVideos.filter((video: VideoItem) => {
          const content = `${video.title.toLowerCase()} ${video.description.toLowerCase()}`;
          const imageGenKeywords = ['image generation', 'ai art', 'midjourney', 'stable diffusion', 'dall-e', 'dall e', 'ai image', 'generated image'];
          return imageGenKeywords.some(keyword => content.includes(keyword));
        });
        
        if (filteredVideos.length > 0) {
          setVideos(filteredVideos);
          setLastUpdated(new Date());
          setError(null);
        } else {
          // If no filtered videos, use all videos as fallback
          setVideos(fetchedVideos);
          setLastUpdated(new Date());
          setError(null);
        }
      } else {
        // If no videos were returned, show an error
        console.log('No videos returned from API');
        setVideos([]);
        setLastUpdated(new Date());
        setError('No videos available. Please try again later.');
      }
    } catch (err: any) {
      console.error('Error fetching videos:', err);
      setError('Failed to fetch video content. Please try again later.');
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchVideos();
    
    // Set up interval to update videos 4 times a day (every 6 hours)
    const updateInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
    const interval = setInterval(fetchVideos, updateInterval);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Latest AI Image Generation Videos
          </h2>
          {lastUpdated && (
            <div className="flex items-center text-sm text-white/60">
              <span>Updated {lastUpdated.toLocaleTimeString()}</span>
              <button 
                onClick={fetchVideos}
                className="ml-2 p-1.5 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Refresh videos"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="aspect-video w-full max-w-5xl mx-auto rounded-xl bg-white/5 animate-pulse" />
        ) : error ? (
          <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={fetchVideos}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : videos.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VideoCarousel videos={videos} />
          </motion.div>
        ) : (
          <div className="aspect-video w-full max-w-5xl mx-auto bg-white/5 rounded-xl flex flex-col items-center justify-center p-6 text-center">
            <p className="text-white/60 text-xl mb-4">No video content available at this time.</p>
            <button 
              onClick={fetchVideos}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh Videos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
