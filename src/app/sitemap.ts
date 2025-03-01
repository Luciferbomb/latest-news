import { MetadataRoute } from 'next';

// Base URL for the site
const BASE_URL = 'https://ai-news-pwa.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch the latest news to include in the sitemap
  let newsItems = [];
  
  try {
    const response = await fetch(`${BASE_URL}/api/combined-news`);
    if (response.ok) {
      const data = await response.json();
      newsItems = data.news || [];
    }
  } catch (error) {
    console.error('Error fetching news for sitemap:', error);
  }
  
  // Static routes
  const routes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ] as MetadataRoute.Sitemap;
  
  // Add dynamic news routes
  const newsRoutes = newsItems.map((item: any) => ({
    url: `${BASE_URL}/news/${item.id}`,
    lastModified: new Date(item.date || new Date()),
    changeFrequency: 'weekly',
    priority: 0.7,
  })) as MetadataRoute.Sitemap;
  
  return [...routes, ...newsRoutes];
}
