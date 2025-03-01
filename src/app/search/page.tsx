"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { NewsCard } from "@/components/ui/news-card";
import { SearchBar } from "@/components/ui/search-bar";
import { useNewsData, NewsItem } from "@/hooks/useNewsData";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Search component that uses useSearchParams
function SearchPageContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const { news, isLoading, error } = useNewsData();

  useEffect(() => {
    if (queryParam) {
      handleSearch(queryParam);
    }
  }, [queryParam, news]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Update URL without page refresh
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.pushState({}, "", url);
    
    // Filter news based on search query
    if (!isLoading && news.length > 0) {
      const results = news.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
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
          
          <h1 className="text-3xl font-bold text-white mb-6">Search AI News</h1>
          
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for AI news, tools, and technologies..." 
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] rounded-xl bg-white/5"></div>
            ))}
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center mt-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : searchQuery ? (
          <>
            <div className="mb-8">
              <p className="text-white/60">
                {searchResults.length === 0
                  ? "No results found for "
                  : `Found ${searchResults.length} results for `}
                <span className="text-white font-medium">"{searchQuery}"</span>
              </p>
            </div>

            {searchResults.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {searchResults.map((newsItem) => (
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
                <p className="text-white/40 mb-4">
                  No results match your search criteria. Try different keywords.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/40">
              Enter a search term above to find AI news and articles.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

// Main component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#030303] to-[#050505]">
      <div className="text-white/60">Loading search...</div>
    </div>}>
      <SearchPageContent />
    </Suspense>
  );
}
