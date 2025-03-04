import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchBlogPosts } from '@/lib/jsonbin';

// Define the BlogPost interface to match the structure from jsonbin
interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  publishedDate: string;
  imageUrl: string;
  tags: string[];
  slug: string;
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// This ensures the page can be statically generated
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const posts = await fetchBlogPosts();
    const post = posts.find((post) => post.slug === params.slug);
    
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found',
      };
    }
    
    return {
      title: `${post.title} | AI News Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [post.imageUrl],
        type: 'article',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'AI News Blog',
      description: 'Loading blog post...',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post: BlogPost | null = null;
  let relatedPosts: BlogPost[] = [];
  
  try {
    const posts = await fetchBlogPosts();
    post = posts.find((p) => p.slug === params.slug) || null;
    
    if (!post) {
      notFound();
    }
    
    // Get related posts based on tags (up to 3)
    const currentPost = post; // Create a non-null reference
    relatedPosts = posts.length > 1 
      ? posts
          .filter((p) => 
            p.id !== currentPost.id && // Not the current post
            p.tags.some((tag) => currentPost.tags.includes(tag)) // Has at least one common tag
          )
          .slice(0, 3)
      : [];
  } catch (error) {
    console.error('Error fetching blog post:', error);
    // We'll handle this with client-side fallback
  }
  
  // If we couldn't fetch the post, render a loading state that will be replaced client-side
  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-12"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            </div>
          </div>
          
          {/* Client-side fallback script */}
          <script
            id="blog-post-fallback-loader"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  fetch('/data/blog-fallback.json')
                    .then(response => response.json())
                    .then(posts => {
                      const slug = window.location.pathname.split('/').pop();
                      const post = posts.find(p => p.slug === slug);
                      
                      if (post) {
                        // Replace the loading state with the actual post
                        document.getElementById('blog-post-container').innerHTML = \`
                          <div class="max-w-4xl mx-auto">
                            <Link href="/blog" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                              </svg>
                              Back to Blog
                            </Link>
                            
                            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">\${post.title}</h1>
                            
                            <div class="flex items-center mb-8">
                              <span class="text-gray-600 dark:text-gray-400">\${new Date(post.publishedDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}</span>
                              <span class="mx-3 text-gray-400">•</span>
                              <span class="text-gray-600 dark:text-gray-400">\${post.author}</span>
                            </div>
                            
                            <div class="mb-12 rounded-xl overflow-hidden">
                              <img 
                                src="\${post.imageUrl}" 
                                alt="\${post.title}" 
                                class="w-full h-auto object-cover"
                              />
                            </div>
                            
                            <div class="prose prose-lg dark:prose-invert max-w-none mb-16">
                              \${marked.parse(post.content)}
                            </div>
                            
                            <div class="flex flex-wrap gap-2 mb-16">
                              \${post.tags.map(tag => \`
                                <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                  \${tag}
                                </span>
                              \`).join('')}
                            </div>
                          </div>
                        \`;
                        
                        // Add related posts if available
                        const relatedPosts = posts.filter(p => 
                          p.id !== post.id && 
                          p.tags.some(tag => post.tags.includes(tag))
                        ).slice(0, 3);
                        
                        if (relatedPosts.length > 0) {
                          const relatedSection = document.createElement('div');
                          relatedSection.className = 'mt-16 border-t border-gray-200 dark:border-gray-800 pt-16';
                          relatedSection.innerHTML = \`
                            <h2 class="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Related Articles</h2>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                              \${relatedPosts.map(relatedPost => \`
                                <a href="/blog/\${relatedPost.slug}" class="block group">
                                  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                                    <div class="relative h-48 overflow-hidden">
                                      <img 
                                        src="\${relatedPost.imageUrl}" 
                                        alt="\${relatedPost.title}" 
                                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      />
                                    </div>
                                    <div class="p-6 flex-1 flex flex-col">
                                      <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        \${relatedPost.title}
                                      </h3>
                                      <p class="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-1">
                                        \${relatedPost.excerpt}
                                      </p>
                                      <span class="text-blue-600 dark:text-blue-400 font-medium">Read more →</span>
                                    </div>
                                  </div>
                                </a>
                              \`).join('')}
                            </div>
                          \`;
                          document.getElementById('blog-post-container').appendChild(relatedSection);
                        }
                      } else {
                        window.location.href = '/blog';
                      }
                    })
                    .catch(error => {
                      console.error('Error loading fallback blog data:', error);
                      window.location.href = '/blog';
                    });
                })();
              `
            }}
          />
        </div>
      </div>
    );
  }
  
  // Format the date
  const publishedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Rest of the component remains the same
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16" id="blog-post-container">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">{post.title}</h1>
          
          <div className="flex items-center mb-8">
            <span className="text-gray-600 dark:text-gray-400">{publishedDate}</span>
            <span className="mx-3 text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">{post.author}</span>
          </div>
          
          <div className="mb-12 rounded-xl overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="flex flex-wrap gap-2 mb-16">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={relatedPost.imageUrl} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-1">
                        {relatedPost.excerpt || relatedPost.content.substring(0, 500).replace(/<[^>]*>/g, '').trim().replace(/\s+[^\s]+$/, '') + '...'}
                      </p>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">Read more →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 