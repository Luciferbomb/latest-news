import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchBlogPosts } from '@/lib/jsonbin';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
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
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const posts = await fetchBlogPosts();
  const post = posts.find((post) => post.slug === params.slug);
  
  if (!post) {
    notFound();
  }
  
  // Format the date
  const publishedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Get related posts based on tags (up to 3)
  // For the new JSON Bin format, we might not have related posts
  // so this section is conditional
  const relatedPosts = posts.length > 1 
    ? posts
        .filter((p) => 
          p.id !== post.id && // Not the current post
          p.tags.some((tag) => post.tags.includes(tag)) // Has at least one common tag
        )
        .slice(0, 3)
    : [];

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-10">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>

        <article className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl mb-16">
          {/* Featured Image - Only show if we have an image */}
          {post.imageUrl && (
            <div className="h-72 sm:h-96 md:h-[500px] overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Header */}
          <div className="px-6 sm:px-10 py-8 sm:py-12">
            {/* Show tags if available */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">{post.title}</h1>
            
            <div className="flex items-center mb-10 border-b border-gray-100 pb-8">
              <div>
                <p className="text-gray-700 font-medium">By {post.author}</p>
                <p className="text-gray-500 text-sm mt-1">{publishedDate}</p>
              </div>
            </div>
            
            {/* Post Content with improved styling */}
            <div 
              className="prose prose-lg sm:prose-xl max-w-none 
                        prose-headings:text-gray-800
                        prose-headings:mt-10 prose-headings:mb-6 
                        prose-p:text-gray-700 prose-p:my-6 
                        prose-img:rounded-lg prose-hr:my-10 
                        prose-ul:my-6 prose-li:my-2 prose-li:text-gray-700
                        prose-strong:text-gray-900
                        prose-a:text-blue-600 hover:prose-a:text-blue-800" 
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
        
        {/* Related Posts - Only show if we have related posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {relatedPosts.map((relatedPost) => (
                <div 
                  key={relatedPost.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedPost.imageUrl} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 text-gray-800">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-blue-600 transition">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        By {relatedPost.author}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(relatedPost.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 