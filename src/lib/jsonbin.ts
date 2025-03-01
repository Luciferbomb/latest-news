/**
 * Utility functions for interacting with JSONBin.io
 */

import { marked } from 'marked';

// Simple JSONBin configuration with the exact values
const JSONBIN_BIN_ID = '67c34ae2ad19ca34f814aca1';
const JSONBIN_API_KEY = '$2a$10$rtwshaMuYk6Q9LntsiCyL.AoGKxDHXFOyzzHCSXR80bNzQWd0LDfC';
const JSONBIN_ACCESS_KEY = '$2a$10$UBrokAKDwwYxrZRzPU6T4On66a9FvvZB1ZVXsUuRYoKeWpyW9NT7q';

// Enable console logging for debugging
const ENABLE_LOGGING = true;

/**
 * Simple function to fetch blog posts from JSONBin
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (ENABLE_LOGGING) {
    console.log('Fetching blog posts from JSONBin');
  }

  try {
    // Direct fetch with X-Access-Key
    const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
      method: 'GET',
      headers: {
        'X-Access-Key': JSONBIN_ACCESS_KEY
      }
    });

    if (!response.ok) {
      if (ENABLE_LOGGING) {
        console.error(`Error fetching from JSONBin: ${response.status} ${response.statusText}`);
      }
      // Try fallback approach with Master Key
      const fallbackResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': JSONBIN_API_KEY,
          'X-Bin-Meta': 'false'
        }
      });

      if (!fallbackResponse.ok) {
        if (ENABLE_LOGGING) {
          console.error(`Fallback also failed: ${fallbackResponse.status} ${fallbackResponse.statusText}`);
          const errorText = await fallbackResponse.text();
          console.error(`Response body: ${errorText}`);
        }
        return getSampleBlogPosts();
      }

      const data = await fallbackResponse.json();
      if (ENABLE_LOGGING) {
        console.log('Successfully fetched data with Master Key');
        console.log('Data type:', typeof data);
        console.log('Data structure:', JSON.stringify(data).substring(0, 200) + '...');
      }

      return processJsonBinData(data);
    }

    const data = await response.json();
    if (ENABLE_LOGGING) {
      console.log('Successfully fetched data with Access Key');
      console.log('Data type:', typeof data);
      console.log('Data preview:', JSON.stringify(data).substring(0, 200) + '...');
    }

    return processJsonBinData(data);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return getSampleBlogPosts(); // Fallback to sample data in case of error
  }
}

/**
 * Simplified data processing function
 */
function processJsonBinData(data: any): BlogPost[] {
  try {
    if (!data) {
      console.log('No data returned from JSONBin');
      return [];
    }

    // Case 1: Direct array of posts
    if (Array.isArray(data)) {
      return data.map((item: any) => convertToBlogPost(item));
    }

    // Case 2: Data with record property (standard JSONBin format)
    if (data.record) {
      if (Array.isArray(data.record)) {
        return data.record.map((item: any) => convertToBlogPost(item));
      }
      
      // If record is an object with posts
      if (data.record.posts && Array.isArray(data.record.posts)) {
        return data.record.posts.map((item: any) => convertToBlogPost(item));
      }
      
      // If record is an object but not an array
      if (typeof data.record === 'object') {
        // Try to extract any objects that look like posts
        const possiblePosts = Object.values(data.record);
        if (Array.isArray(possiblePosts)) {
          return possiblePosts
            .filter((item: any) => item && typeof item === 'object')
            .map((item: any) => convertToBlogPost(item));
        }
      }
      
      // If record itself looks like a single post
      if (data.record.title || data.record.topic || data.record.content) {
        return [convertToBlogPost(data.record)];
      }
    }

    // If the data itself looks like a post
    if (data.title || data.topic || data.content) {
      return [convertToBlogPost(data)];
    }

    console.log('Could not determine data structure, returning empty array');
    return [];
  } catch (err) {
    console.error('Error processing data:', err);
    return [];
  }
}

/**
 * Simplified function to convert JSON to BlogPost
 */
function convertToBlogPost(item: any): BlogPost {
  // Handle topic/content format
  const title = item.title || item.topic || 'Untitled Post';
  const content = item.content || '';
  
  // Create a slug from title if not provided
  const slug = item.slug || title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
  
  // Use a consistent ID
  const id = item.id || `post-${Date.now()}`;
  
  // Ensure tags is an array
  let tags = item.tags || [];
  if (!Array.isArray(tags)) {
    tags = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : ['Technology', 'AI'];
  }
  
  // Create the blog post object
  return {
    id,
    title,
    content: convertMarkdownToHtml(content),
    excerpt: item.excerpt || content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
    author: item.author || 'AI News Team',
    publishedDate: item.publishedDate || item.date || new Date().toISOString(),
    updatedDate: item.updatedDate || new Date().toISOString(),
    imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
    tags,
    slug
  };
}

/**
 * Simple function to convert markdown to HTML
 */
function convertMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  // If content already contains HTML tags, return as is
  if (/<[a-z][\s\S]*>/i.test(markdown)) {
    return markdown;
  }
  
  try {
    return marked.parse(markdown) as string;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return markdown;
  }
}

/**
 * Sample blog posts for fallback
 */
function getSampleBlogPosts(): BlogPost[] {
  return [
    {
      id: "1",
      title: "Latest Tech News, Tools, and Controversies",
      content: "<p>The tech world is evolving rapidly in 2023. Key developments include:</p><ul><li>AI regulation becomes a major focus for governments worldwide</li><li>Tech layoffs continue amid economic uncertainty</li><li>Climate tech investments reach record highs despite market downturn</li><li>Quantum computing achieves new milestones in practical applications</li></ul><p>Industry leaders are navigating these changes while preparing for potential disruptions in the coming months.</p>",
      excerpt: "A roundup of the most significant tech developments and industry shifts happening this month, from AI regulation to quantum computing breakthroughs.",
      author: "Tech Insights Team",
      publishedDate: "2023-06-15T08:30:00Z",
      updatedDate: "2023-06-15T14:45:00Z",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      tags: ["technology", "industry", "ai", "quantum-computing"],
      slug: "latest-tech-news-tools-controversies"
    },
    {
      id: "2",
      title: "The Rise of AI Agents in Daily Productivity",
      content: "<p>AI agents are transforming how professionals work across industries:</p><h3>Key Functions</h3><p>Modern AI agents can schedule meetings, draft emails, research topics, and even code simple functions based on natural language requests. The integration with existing workflows has been surprisingly seamless in many organizations.</p><h3>Industry Adoption</h3><p>Financial services, healthcare, and legal professions are seeing the fastest adoption rates, with specialized AI assistants handling industry-specific tasks and knowledge bases.</p><h3>Future Developments</h3><p>The next generation of AI agents will feature improved long-term memory, better reasoning capabilities, and more seamless integration with physical world tasks through robotics and IoT connectivity.</p>",
      excerpt: "AI agents are revolutionizing productivity across industries by automating routine tasks and augmenting human capabilities in unexpected ways.",
      author: "Maria Rodriguez",
      publishedDate: "2023-06-10T10:15:00Z",
      updatedDate: "2023-06-12T09:30:00Z",
      imageUrl: "https://images.unsplash.com/photo-1685094488370-cb1786d4c7e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      tags: ["ai", "productivity", "future-of-work"],
      slug: "rise-of-ai-agents-daily-productivity"
    },
    {
      id: "3",
      title: "Breaking Down Large Language Models: How They Work",
      content: "<p>Large Language Models (LLMs) like GPT-4, Claude, and PaLM represent a significant leap in AI capabilities. This article explores their inner workings:</p><h3>Architecture Basics</h3><p>At their core, modern LLMs use transformer architectures with attention mechanisms that allow them to process text with an understanding of context and relationships between words and concepts.</p><h3>Training Process</h3><p>These models undergo several training phases:</p><ol><li><strong>Pre-training</strong>: Learning patterns from vast text corpora</li><li><strong>Supervised Fine-tuning</strong>: Learning from human-labeled examples</li><li><strong>Reinforcement Learning from Human Feedback</strong>: Refining outputs based on human preferences</li></ol><h3>Limitations</h3><p>Despite their capabilities, current LLMs still struggle with factuality, reasoning consistency, and avoiding hallucinations when knowledge boundaries are reached.</p>",
      excerpt: "An in-depth look at how large language models like GPT-4 and Claude work under the hood, from their transformer architecture to training methods.",
      author: "Dr. Alan Thompkins",
      publishedDate: "2023-06-05T14:00:00Z",
      updatedDate: "2023-06-07T11:20:00Z",
      imageUrl: "https://images.unsplash.com/photo-1677442135994-e21fcb407d61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      tags: ["ai", "llm", "machine-learning", "deep-learning"],
      slug: "breaking-down-large-language-models"
    }
  ];
}

/**
 * Create a new blog post
 */
export async function createBlogPost(post: BlogPost): Promise<BlogPost> {
  try {
    // Get current posts
    const currentPosts = await fetchBlogPosts();
    
    // Add the new post
    const newPost = {
      ...post,
      id: post.id || `post-${Date.now()}`
    };
    
    // Create updated array with the new post
    const updatedPosts = [...currentPosts, newPost];
    
    // Update JSONBin 
    const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY
      },
      body: JSON.stringify(updatedPosts)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.status}`);
    }
    
    return newPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

/**
 * Update an existing blog post
 */
export async function updateBlogPost(post: BlogPost): Promise<BlogPost> {
  try {
    // Get current posts
    const currentPosts = await fetchBlogPosts();
    
    // Find and update the post
    const updatedPosts = currentPosts.map(p => 
      p.id === post.id ? { ...p, ...post, updatedDate: new Date().toISOString() } : p
    );
    
    // Update JSONBin
    const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY
      },
      body: JSON.stringify(updatedPosts)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update post: ${response.status}`);
    }
    
    return post;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(postId: string): Promise<boolean> {
  try {
    // Get current posts
    const currentPosts = await fetchBlogPosts();
    
    // Filter out the post to delete
    const updatedPosts = currentPosts.filter(p => p.id !== postId);
    
    // Update JSONBin
    const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY
      },
      body: JSON.stringify(updatedPosts)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}