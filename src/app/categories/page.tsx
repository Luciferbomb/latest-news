"use client";

import { useState } from "react";
import { NewsCard } from "@/components/ui/news-card";
import { useNewsData } from "@/hooks/useNewsData";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Define categories
const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "ai-tools", name: "AI Tools" },
  { id: "machine-learning", name: "Machine Learning" },
  { id: "nlp", name: "Natural Language Processing" },
  { id: "computer-vision", name: "Computer Vision" },
  { id: "robotics", name: "Robotics" },
];

// For demo purposes, we'll assign random categories to news items
const getRandomCategories = () => {
  const categories = CATEGORIES.slice(1).map(cat => cat.id);
  const numCategories = Math.floor(Math.random() * 3) + 1; // 1 to 3 categories
  const shuffled = [...categories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numCategories);
};

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { news, isLoading, error } = useNewsData();
  
  // Assign random categories to news items (in a real app, this would come from the API)
  const newsWithCategories = news.map(item => ({
    ...item,
    categories: getRandomCategories()
  }));
  
  // Filter news by selected category
  const filteredNews = activeCategory === "all" 
    ? newsWithCategories 
    : newsWithCategories.filter(item => item.categories.includes(activeCategory));

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
    <main className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-[#030303] to-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold text-white mb-6">AI News Categories</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-indigo-500 to-rose-500 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] rounded-xl bg-white/5"></div>
            ))}
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredNews.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredNews.map((newsItem) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-white/40">
              No news articles found in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
