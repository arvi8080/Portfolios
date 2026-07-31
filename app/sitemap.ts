import { MetadataRoute } from 'next';
import { inMemoryStore } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-sde.dev';

  const blogRoutes = inMemoryStore.blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.publishedAt || new Date().toISOString(),
  }));

  const routes = ['', '/about', '/projects', '/blog', '/contact', '/resume'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blogRoutes];
}
