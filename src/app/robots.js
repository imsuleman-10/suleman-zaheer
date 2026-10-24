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
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Amazonbot',
          'Bytespider',
          'cohere-ai',
          'Meta-ExternalAgent'
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
          '/services/desktop-app-development',
          '/services/automation-development',
          '/services/ai-solutions',
          '/services/mern-stack-development',
          '/services/nextjs-development',
          '/services/flutter-app-development',
          '/services/data-analysis',
          '/services/seo-services',
          '/services/qa-testing',
          '/blog',
          '/poetry',
          '/cv',
          '/contact'
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
