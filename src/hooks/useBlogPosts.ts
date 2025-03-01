'use client';

import { useState, useEffect } from 'react';

export function useBlogPosts(slug?: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const url = slug 
          ? `/api/blog?slug=${encodeURIComponent(slug)}`
          : '/api/blog';
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error fetching blog posts: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (slug) {
          setPost(data.post);
          setPosts([]);
        } else {
          setPosts(data.posts || []);
          setPost(null);
        }
        
        setError(null);
      } catch (err: any) {
        console.error('Error fetching blog posts:', err);
        setError(err.message || 'Failed to fetch blog posts');
        setPosts([]);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, [slug]);
  
  return { posts, post, loading, error };
} 