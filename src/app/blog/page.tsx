import { Metadata } from 'next';
import Link from 'next/link';
import { fetchBlogPosts } from '@/lib/jsonbin';
import { BlogPostCard } from '@/components/ui/blog-post-card';

export const metadata: Metadata = {
  title: 'AI Tech Blog | Latest Insights & News',
  description: 'Deep dives and analyses on the latest AI trends, tools, and technological advancements',
  openGraph: {
    title: 'AI Tech Blog | Latest Insights & News',
    description: 'Deep dives and analyses on the latest AI trends, tools, and technological advancements',
    type: 'website',
  },
};

async function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function BlogPage() {
  const posts = await fetchBlogPosts();
  
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  // If we have at least two posts, split them between featured and regular
  const hasMultiplePosts = sortedPosts.length > 1;
  const featuredPost = sortedPosts[0];
  const regularPosts = hasMultiplePosts ? sortedPosts.slice(1) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <header className="mb-16 text-center">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">AI Tech Insights</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            In-depth analyses and reflections on the latest AI trends, tools, and technological breakthroughs.
          </p>
        </header>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
              {hasMultiplePosts ? "Featured Article" : "Latest Tech Insights"}
            </h2>
            <BlogPostCard post={featuredPost} featured={true} />
          </div>
        )}

        {/* Regular Posts - Only show if we have more than one post */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">Recent Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {regularPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
        
        {/* If no posts are available */}
        {posts.length === 0 && (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10m2 2v-6a2 2 0 00-2-2h-6m4 6h2m-2-8h2m-8 8v-6a2 2 0 012-2h2" />
            </svg>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-xl">No blog posts available at the moment.</p>
            <Link 
              href="/"
              className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 