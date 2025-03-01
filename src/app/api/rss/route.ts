import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch the latest news
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/combined-news`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch news data');
    }
    
    const data = await response.json();
    const newsItems = data.news || [];
    
    // Generate RSS XML
    const rssXml = generateRssXml(newsItems);
    
    // Return RSS feed with appropriate content type
    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to generate RSS feed' },
      { status: 500 }
    );
  }
}

function generateRssXml(newsItems: any[]) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const now = new Date().toUTCString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI News Hub</title>
    <link>${baseUrl}</link>
    <description>The latest news and updates from the world of artificial intelligence</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
`;

  // Add items to feed
  newsItems.forEach(item => {
    const pubDate = new Date(item.date).toUTCString();
    
    xml += `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <guid isPermaLink="false">${item.id}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${item.description}]]></description>
      ${item.imageUrl ? `<enclosure url="${item.imageUrl}" type="image/jpeg" />` : ''}
      ${item.categories?.map((category: string) => `<category>${category}</category>`).join('\n      ') || ''}
      ${item.source ? `<source url="${item.url}">${item.source}</source>` : ''}
    </item>
`;
  });

  xml += `  </channel>
</rss>`;

  return xml;
}
