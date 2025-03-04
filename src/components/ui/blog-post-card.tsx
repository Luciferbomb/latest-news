import Link from 'next/link';

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  // Ensure the post has all required properties
  const safePost = {
    ...post,
    tags: post.tags || ['Technology', 'AI'],
    imageUrl: post.imageUrl || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
    author: post.author || 'AI News Team',
    excerpt: post.excerpt || post.content.substring(0, 500).replace(/<[^>]*>/g, '').trim().replace(/\s+[^\s]+$/, '') + '...'
  };
  
  // Format the date properly
  const formattedDate = new Date(safePost.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <article 
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
        featured ? 'hover:translate-y-[-8px]' : 'hover:translate-y-[-5px]'
      } border border-gray-100 dark:border-gray-700`}
    >
      <div className={`overflow-hidden ${featured ? 'h-72 sm:h-80' : 'h-48 sm:h-56'}`}>
        <img 
          src={safePost.imageUrl} 
          alt={safePost.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {safePost.tags.slice(0, featured ? 4 : 2).map((tag) => (
            <span 
              key={tag} 
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className={`font-bold mb-4 text-gray-900 dark:text-white ${featured ? 'text-2xl' : 'text-xl'} leading-tight`}>
          <Link href={`/blog/${safePost.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {safePost.title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-4 overflow-hidden">
          {safePost.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            By {safePost.author}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </p>
        </div>
        {featured && (
          <div className="mt-6">
            <Link 
              href={`/blog/${safePost.slug}`}
              className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 group"
            >
              Read Full Article
              <svg 
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
} 