"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Calendar, Clock, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  readTime: string;
  url: string;
  categories?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  sentimentScore?: number;
  summary?: string;
  source?: string;
  className?: string;
}

export function NewsCard({
  title,
  description,
  imageUrl,
  date,
  readTime,
  url,
  categories,
  sentiment,
  sentimentScore,
  summary,
  source,
  className,
}: NewsCardProps) {
  return (
    <Link 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm transition-all hover:shadow-lg block",
        className
      )}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/30 z-10" />
      
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // If image fails to load, replace with a fallback
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop";
            }}
            unoptimized={true} // Skip image optimization for external images
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <ImageIcon className="h-12 w-12 text-gray-500" />
          </div>
        )}
      </div>
      
      <div className="relative z-20 p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
          
          {source && (
            <div className="ml-auto px-2 py-0.5 bg-black/30 rounded-full text-[10px] font-medium text-white/80">
              {source}
            </div>
          )}
          
          {/* Sentiment indicator */}
          {sentiment && (
            <div className="w-full mt-2 flex items-center gap-2">
              <div 
                className={cn(
                  "h-2 w-2 rounded-full",
                  sentiment === 'positive' ? "bg-green-500" : 
                  sentiment === 'negative' ? "bg-red-500" : "bg-gray-400"
                )}
              />
              <span className="text-[10px] capitalize">
                {sentiment} {sentimentScore !== undefined && `(${(sentimentScore * 100).toFixed(0)}%)`}
              </span>
            </div>
          )}
          
          {categories && categories.length > 0 && (
            <div className="w-full mt-2 flex flex-wrap gap-1.5">
              {categories.map((category) => (
                <span 
                  key={category} 
                  className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-medium text-white/80"
                >
                  {category.replace('-', ' ')}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-sm text-white/70 mb-2 line-clamp-3">
          {summary || description}
        </p>
        
        {summary && summary !== description && (
          <div className="mb-4">
            <details className="text-xs">
              <summary className="text-indigo-300 cursor-pointer hover:text-indigo-200 transition-colors inline-flex items-center gap-1">
                View full description
              </summary>
              <p className="mt-2 text-white/60 pl-2 border-l border-white/10">
                {description}
              </p>
            </details>
          </div>
        )}
        
        <span 
          className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors"
        >
          Read more <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
