import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engines
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Google AI (Gemini AI Overview, SGE)
      {
        userAgent: 'GoogleOther',
        allow: '/',
      },
      // ChatGPT Browse & GPT plugins
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      // Anthropic Claude AI
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      // Perplexity AI search
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Amazon Alexa / Rufus
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      // Meta AI
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      // Apple Intelligence
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      // Cohere AI
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
    ],
    sitemap: 'https://vptrockenbau.de/sitemap.xml',
  };
}

