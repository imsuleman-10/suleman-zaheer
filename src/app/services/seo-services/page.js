import Link from 'next/link';

export const metadata = {
  title: 'SEO Services in Lahore | Technical SEO, GEO, AEO & LLMO – Suleman Zaheer',
  description: 'Hire Suleman Zaheer for professional Technical SEO, Local SEO, GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), and LLMO in Lahore. Rank on Google, ChatGPT, Gemini & Perplexity. Starting PKR 45,000.',
  keywords: [
    'SEO Services Lahore', 'SEO Expert Lahore', 'Technical SEO Pakistan',
    'Local SEO Lahore', 'GEO Optimization Pakistan', 'AEO Pakistan',
    'LLMO Expert Lahore', 'Generative Engine Optimization Pakistan', 'Answer Engine Optimization Lahore',
    'Google Ranking Expert Pakistan', 'AI SEO Expert Lahore', 'ChatGPT SEO Pakistan'
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/services/seo-services' },
  openGraph: {
    title: 'SEO Services | Technical SEO, GEO, AEO & LLMO – Suleman Zaheer | Lahore',
    description: 'Expert Technical SEO, GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), and LLMO by Suleman Zaheer in Lahore. Rank on Google, ChatGPT, Gemini, and Perplexity.',
    url: 'https://suleman-zaheer.vercel.app/services/seo-services',
    siteName: 'Suleman Zaheer Official Portfolio',
    type: 'website',
    locale: 'en_PK',
    images: [{ url: '/assets/suleman-zaheer-full-stack-developer.jpg', width: 1200, height: 630, alt: 'SEO Services by Suleman Zaheer – Technical SEO, GEO, AEO in Lahore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO, GEO, AEO & LLMO Services | Suleman Zaheer | Lahore',
    description: 'Expert Technical SEO, GEO, AEO, and LLMO services in Lahore. Rank on Google and AI search engines. Hire Suleman Zaheer.',
    images: ['/assets/suleman-zaheer-full-stack-developer.jpg'],
    creator: '@imsuleman_10',
  },
};

export default function SEOServicesPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://suleman-zaheer.vercel.app/services/seo-services#service',
      name: 'Technical SEO, GEO, AEO & LLMO Services',
      description: 'Full-service SEO in Lahore covering Technical SEO audits, Local SEO, Generative Engine Optimization (GEO) for AI search engines like ChatGPT and Gemini, Answer Engine Optimization (AEO) via FAQPage JSON-LD schema, and Large Language Model Optimization (LLMO) via llms.txt and semantic entity structuring.',
      url: 'https://suleman-zaheer.vercel.app/services/seo-services',
      provider: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        url: 'https://suleman-zaheer.vercel.app',
        telephone: '+923285778715',
        email: 'samstacktechs@gmail.com',
        address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' }
      },
      serviceType: 'Search Engine Optimization',
      areaServed: [{ '@type': 'Country', name: 'Pakistan' }, { '@type': 'Country', name: 'United States' }],
      offers: { '@type': 'Offer', priceRange: 'PKR 45,000 - PKR 200,000+', priceCurrency: 'PKR', availability: 'https://schema.org/InStock' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' },
        { '@type': 'ListItem', position: 3, name: 'SEO Services', item: 'https://suleman-zaheer.vercel.app/services/seo-services' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is GEO (Generative Engine Optimization)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Generative Engine Optimization (GEO) is the practice of optimizing digital content to appear in AI-generated search summaries produced by tools like Google AI Overviews, ChatGPT, Perplexity, and Microsoft Copilot. Unlike traditional SEO which targets the link graph, GEO targets the Knowledge Graph by establishing your brand as a verified entity through Schema Markup (JSON-LD), structured data, and semantic content density.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is AEO (Answer Engine Optimization)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Answer Engine Optimization (AEO) focuses on structuring your content so that AI assistants and voice search engines directly provide your content as the answer to user queries. This is primarily achieved through FAQPage, HowTo, and QAPage JSON-LD schemas. When implemented correctly, AEO content appears in Google Featured Snippets, Google AI Overviews, and ChatGPT direct answers.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is LLMO (Large Language Model Optimization)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'LLMO (Large Language Model Optimization) is the process of structuring your website\'s content so that AI models like ChatGPT, Claude, and Gemini can accurately cite your brand as an authoritative source. Key LLMO practices include creating a llms.txt file at your domain root, using semantic entity declarations, maintaining high semantic density in content, and ensuring consistent entity representation across all online citations.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is included in a Technical SEO audit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Technical SEO audit by Suleman Zaheer covers: Core Web Vitals analysis (LCP, FID, CLS), crawlability and indexation audit, XML sitemap validation, robots.txt optimization, canonical URL structure, duplicate content detection, mobile responsiveness audit, structured data (JSON-LD) validation, page speed optimization, and internal linking architecture review.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much do SEO services cost in Lahore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SEO services by Suleman Zaheer start from PKR 45,000 for a comprehensive Technical SEO audit and fixes. Monthly retainer SEO packages including GEO, AEO, content optimization, and LLMO start from PKR 70,000/month. Contact samstacktechs@gmail.com for a custom quote.'
          }
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-gray-500 mb-10 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
        <span>/</span>
        <span className="text-primary">SEO Services</span>
      </nav>

      <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
        SEO, GEO, AEO & <span className="text-primary">LLMO Services</span>
      </h1>
      <p className="text-gray-400 text-lg mb-10 max-w-3xl">
        Rank on Google, <strong className="text-white">ChatGPT</strong>, <strong className="text-white">Gemini</strong>, and <strong className="text-white">Perplexity</strong>. <strong className="text-white">Suleman Zaheer</strong> provides full-spectrum search optimization for the AI era — Technical SEO, GEO, AEO, and LLMO.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {[
          'Technical SEO Audit & Fix', 'Core Web Vitals Optimization', 'JSON-LD Schema Markup',
          'Local SEO & Google Business Profile', 'GEO (Generative Engine Optimization)',
          'AEO (Answer Engine Optimization)', 'LLMO via llms.txt', 'XML Sitemap & robots.txt'
        ].map(f => (
          <div key={f} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-primary text-lg">✓</span>
            <span className="text-gray-300 text-sm font-medium">{f}</span>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Pricing & Timeline</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div><span className="text-gray-500 text-sm">Starting Price</span><p className="text-white font-bold text-xl">PKR 45,000</p></div>
          <div><span className="text-gray-500 text-sm">Delivery Time</span><p className="text-white font-bold text-xl">1 – 6 Weeks</p></div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all">
          Hire for SEO / GEO / AEO →
        </Link>
      </div>
    </div>
  );
}
