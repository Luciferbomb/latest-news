"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

interface AIImage {
  id: string;
  url: string;
  width: number;
  height: number;
  prompt?: string;
  source?: string;
}

interface AIImageGalleryProps {
  query?: string;
  className?: string;
}

export function AIImageGallery({ query = 'artificial intelligence news', className }: AIImageGalleryProps) {
  const [images, setImages] = useState<AIImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch images from our API
  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/image-generation?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const data = await response.json();
      setImages(data.images || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching images:', err);
      setError(err.message || 'Failed to load images');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate images with custom prompt
  const generateImages = async () => {
    if (!customPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/image-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: customPrompt }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate images');
      }
      
      const data = await response.json();
      setImages(data.images || []);
      setCurrentIndex(0);
      setError(null);
    } catch (err: any) {
      console.error('Error generating images:', err);
      setError(err.message || 'Failed to generate images');
    } finally {
      setIsGenerating(false);
    }
  };

  // Navigate to the next image
  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Navigate to the previous image
  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Initial fetch
  useEffect(() => {
    fetchImages();
  }, [query]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateImages();
  };

  return (
    <div className={`relative rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10 ${className}`}>
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-4">AI-Generated Images</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="h-8 w-8 text-indigo-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-400 p-4 text-center">
            {error}
            <button 
              onClick={fetchImages}
              className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white block mx-auto"
            >
              Try Again
            </button>
          </div>
        ) : images.length > 0 ? (
          <div className="relative">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].prompt || 'AI-generated image'}
                fill
                className="object-cover"
              />
              
              {/* Image source attribution */}
              {images[currentIndex].source && (
                <div className="absolute bottom-2 right-2 bg-black/60 text-white/80 text-xs px-2 py-1 rounded">
                  {images[currentIndex].source}
                </div>
              )}
              
              {/* Navigation buttons */}
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                aria-label="Next image"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            
            {/* Image prompt */}
            {images[currentIndex].prompt && (
              <p className="mt-2 text-sm text-white/70 italic">
                "{images[currentIndex].prompt}"
              </p>
            )}
            
            {/* Image counter */}
            <div className="mt-2 text-xs text-white/60">
              {currentIndex + 1} of {images.length}
            </div>
          </div>
        ) : (
          <div className="text-white/70 p-4 text-center">
            No images found. Try a different query.
          </div>
        )}
        
        {/* Custom prompt form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter a custom prompt..."
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={isGenerating || !customPrompt.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800/50 disabled:cursor-not-allowed rounded-md text-white flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
