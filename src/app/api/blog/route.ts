import { NextRequest, NextResponse } from 'next/server';
import { fetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/jsonbin';

// Enable detailed logging for API debugging
const ENABLE_LOGGING = true;

export async function GET(request: NextRequest) {
  try {
    if (ENABLE_LOGGING) {
      console.log('GET /api/blog - Fetching posts from JSONBin');
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    // Fetch all posts
    const posts = await fetchBlogPosts();
    
    if (ENABLE_LOGGING) {
      console.log(`GET /api/blog - Retrieved ${posts.length} posts`);
    }
    
    // If a slug is provided, return the specific post
    if (slug) {
      const post = posts.find(p => p.slug === slug);
      
      if (!post) {
        return NextResponse.json(
          { error: 'Post not found', slug },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ post }, { status: 200 });
    }
    
    // Otherwise return all posts
    return NextResponse.json(
      { posts, lastUpdated: new Date().toISOString() },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (ENABLE_LOGGING) {
      console.log('POST /api/blog - Creating new post');
    }
    
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Create default values for optional fields if not provided
    const post = {
      id: body.id || `post-${Date.now()}`,
      title: body.title,
      content: body.content,
      excerpt: body.excerpt || body.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      author: body.author || 'AI News Team',
      publishedDate: body.publishedDate || new Date().toISOString(),
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
      tags: body.tags || ['AI', 'Technology'],
      slug: body.slug || body.title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
    };
    
    // Create the post
    const createdPost = await createBlogPost(post);
    
    return NextResponse.json({ post: createdPost }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post', details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    if (ENABLE_LOGGING) {
      console.log('PUT /api/blog - Updating post');
    }
    
    // Parse the request body
    const body = await request.json();
    
    // Validate post ID
    if (!body.id) {
      return NextResponse.json(
        { error: 'Post ID is required for updates' },
        { status: 400 }
      );
    }
    
    // Update the post
    const updatedPost = await updateBlogPost(body);
    
    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post', details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    if (ENABLE_LOGGING) {
      console.log('DELETE /api/blog - Deleting post');
    }
    
    // Get the post ID from the URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Validate post ID
    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required for deletion' },
        { status: 400 }
      );
    }
    
    // Delete the post
    const success = await deleteBlogPost(id);
    
    return NextResponse.json({ success }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post', details: String(error) },
      { status: 500 }
    );
  }
} 