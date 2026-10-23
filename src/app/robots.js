const siteUrl = 'https://suleman-zaheer.vercel.app';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login', '/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Amazonbot'
        ],
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
          '/photos',
          '/about',
          '/author',
          '/projects',
          '/services',
          '/blog',
          '/poetry',
          '/cv'
        ],
        disallow: ['/admin', '/login', '/api/'],
      }
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/sitemap-images.xml`,
    ],
    host: siteUrl,
  };
}
