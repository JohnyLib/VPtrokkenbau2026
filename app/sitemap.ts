import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vptrockenbau.de';

  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date('2026-05-31'),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/leistungen`,
      lastModified: new Date('2026-05-31'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date('2026-05-31'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/karriere`,
      lastModified: new Date('2026-05-31'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date('2026-05-31'),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date('2026-05-31'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  return staticPages;
}

