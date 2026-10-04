import Link from 'next/link';

export const metadata = {
  title: 'Next.js Development Services | Suleman Zaheer – Lahore, Pakistan',
  description: 'Hire Suleman Zaheer for expert Next.js 14/15 App Router development in Lahore. Server Components, SEO-optimized web apps, SaaS platforms, and enterprise portals. Starting PKR 75,000. Contact: samstacktechs@gmail.com.',
  keywords: [
    'Next.js Developer Lahore', 'Next.js Development Pakistan', 'Hire Next.js Developer Lahore',
    'Next.js App Router Developer', 'Next.js 14 Developer Pakistan', 'React.js Developer Lahore',
    'Server Components Developer Pakistan', 'SEO Next.js Developer Lahore',
    'Next.js SaaS Developer Pakistan', 'Vercel Developer Lahore'
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/services/nextjs-development' },
  openGraph: {
    title: 'Next.js Development Services | Suleman Zaheer – Lahore',
    description: 'Expert Next.js 14/15 App Router development by Suleman Zaheer. SEO-optimized, server-rendered web applications for enterprise, SaaS, and B2B clients in Pakistan.',
    url: 'https://suleman-zaheer.vercel.app/services/nextjs-development',
    siteName: 'Suleman Zaheer Official Portfolio',
    type: 'website',
    locale: 'en_PK',
    images: [{ url: '/assets/suleman-zaheer-full-stack-developer.jpg', width: 1200, height: 630, alt: 'Next.js Development by Suleman Zaheer – Lahore, Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js Development | Suleman Zaheer | Lahore',
    description: 'Expert Next.js 14/15 web app development in Lahore. SEO-optimized, App Router, Server Components. Hire Suleman Zaheer.',
    images: ['/assets/suleman-zaheer-full-stack-developer.jpg'],
    creator: '@imsuleman_10',
  },
};

export default function NextJsPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://suleman-zaheer.vercel.app/services/nextjs-development#service',
      name: 'Next.js Development Services',
      description: 'Professional Next.js 14/15 App Router web application development in Lahore, Pakistan. Specializing in SEO-optimized, server-rendered web applications with React Server Components, ISR, and Vercel deployment.',
      url: 'https://suleman-zaheer.vercel.app/services/nextjs-development',
      provider: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        url: 'https://suleman-zaheer.vercel.app',
        telephone: '+923285778715',
        email: 'samstacktechs@gmail.com',
        address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' }
      },
      serviceType: 'Web Application Development',
      areaServed: [
        { '@type': 'Country', name: 'Pakistan' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' }
      ],
      offers: {
        '@type': 'Offer',
        priceRange: 'PKR 75,000 - PKR 300,000+',
        priceCurrency: 'PKR',
        availability: 'https://schema.org/InStock'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' },
        { '@type': 'ListItem', position: 3, name: 'Next.js Development', item: 'https://suleman-zaheer.vercel.app/services/nextjs-development' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why choose Next.js for web development?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Next.js is the leading React framework for production web applications. It provides built-in SEO optimization through server-side rendering (SSR) and static site generation (SSG), the Next.js App Router for advanced layouts, React Server Components for reduced JavaScript bundle size, and seamless Vercel deployment for global edge performance.'
          }
        },
        {
          '@type': 'Question',
          name: 'Does Suleman Zaheer build Next.js 14/15 App Router applications?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Suleman Zaheer specializes in Next.js 14 and 15 with the App Router paradigm including React Server Components, Streaming, Parallel Routes, generateMetadata for dynamic SEO, and Incremental Static Regeneration (ISR). He also has deep expertise in deploying Next.js applications on Vercel with edge functions.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much does Next.js development cost in Pakistan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Next.js web application development by Suleman Zaheer starts from PKR 75,000 for standard web apps and scales to PKR 300,000+ for complex enterprise portals or SaaS platforms. Contact samstacktechs@gmail.com for a free project estimate.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is Next.js good for SEO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Next.js is the best framework for SEO-optimized web development. Its Server-Side Rendering ensures Googlebot receives fully-formed HTML on first visit, eliminating the secondary crawl wave issue of Single Page Applications. The generateMetadata API enables dynamic, unique meta tags per page, and built-in image optimization improves Core Web Vitals scores.'
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
        <span className="text-primary">Next.js Development</span>
      </nav>

      <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
        Next.js <span className="text-primary">Development</span>
      </h1>
      <p className="text-gray-400 text-lg mb-10 max-w-3xl">
        Expert <strong className="text-white">Next.js 14/15 App Router</strong> web applications by <strong className="text-white">Suleman Zaheer</strong> in Lahore, Pakistan. Server Components, SEO domination, and enterprise-grade performance.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {[
          'Next.js 14/15 App Router Architecture', 'React Server Components & Streaming',
          'Dynamic SEO via generateMetadata', 'Incremental Static Regeneration (ISR)',
          'Core Web Vitals Optimization', 'Vercel Edge Deployment', 'TypeScript & Full Type Safety',
          'Firebase & Supabase Integration'
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
          <div><span className="text-gray-500 text-sm">Starting Price</span><p className="text-white font-bold text-xl">PKR 75,000</p></div>
          <div><span className="text-gray-500 text-sm">Delivery Time</span><p className="text-white font-bold text-xl">2 – 8 Weeks</p></div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all">
          Hire for Next.js Development →
        </Link>
      </div>
    </div>
  );
}
