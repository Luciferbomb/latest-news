"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  onSearch,
  placeholder = "Search for AI news...",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative max-w-2xl mx-auto ${className}`}
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Search
        </button>
      </div>
    </motion.form>
  );
}
