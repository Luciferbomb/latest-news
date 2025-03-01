import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Blog Post Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">
        We couldn't find the blog post you were looking for.
      </p>
      <div className="flex justify-center gap-4">
        <Link 
          href="/blog" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Back to Blog
        </Link>
        <Link 
          href="/" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
} 