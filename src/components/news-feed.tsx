"use client";

import { NewsCard } from "./ui/news-card";
import { motion } from "framer-motion";
import { useRealTimeNews } from "@/hooks/useRealTimeNews";
import { RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

export function NewsFeed() {
  // Use the real-time news hook
  const { news, isLoading, error, lastUpdated, refreshNews } = useRealTimeNews();
  
  // State for auto-refresh countdown
  const [nextRefreshIn, setNextRefreshIn] = useState<number>(6 * 60 * 60); // 6 hours in seconds
  
  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setNextRefreshIn(prev => {
        if (prev <= 1) {
          // Refresh when countdown reaches zero
          refreshNews();
          return 6 * 60 * 60; // Reset to 6 hours
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [refreshNews]);
  
  // Format the countdown time
  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-[#030303] to-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400 mb-4">
            Latest AI News
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-center mb-4">
            Stay updated with the most recent developments, breakthroughs, and releases in the world of artificial intelligence.
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-2">
            {lastUpdated && (
              <div className="text-sm text-white/60">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
            <button 
              onClick={() => {
                refreshNews();
                setNextRefreshIn(6 * 60 * 60);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-white/80 hover:text-white text-sm transition-colors"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Now
            </button>
            <div className="text-sm text-white/60">
              Next update in: {formatCountdown(nextRefreshIn)}
            </div>
          </div>
        </div>

        {error ? (
          <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={refreshNews}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] rounded-xl bg-white/5"></div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-4 text-xl">No news articles available at the moment</div>
            <button 
              onClick={refreshNews}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {news.map((newsItem) => (
              <motion.div key={newsItem.id} variants={item}>
                <NewsCard
                  title={newsItem.title}
                  description={newsItem.description}
                  imageUrl={newsItem.imageUrl}
                  date={newsItem.date}
                  readTime={newsItem.readTime}
                  url={newsItem.url}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
