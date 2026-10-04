import Link from 'next/link';

export const metadata = {
  title: 'MERN Stack Development Services | Suleman Zaheer – Lahore, Pakistan',
  description: 'Hire Suleman Zaheer for expert MERN Stack development in Lahore. MongoDB, Express.js, React.js, Node.js – scalable B2B web apps, SaaS platforms, ERP systems, and REST APIs. Contact: samstacktechs@gmail.com.',
  keywords: [
    'MERN Stack Developer Lahore', 'MERN Stack Development Pakistan', 'Hire MERN Developer Lahore',
    'MongoDB Developer Pakistan', 'Express.js Developer Lahore', 'React.js Developer Pakistan',
    'Node.js Developer Lahore', 'Full Stack Developer Lahore', 'B2B SaaS Developer Pakistan',
    'ERP Web App Lahore', 'REST API Developer Pakistan', 'MERN Stack Agency Lahore'
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/services/mern-stack-development' },
  openGraph: {
    title: 'MERN Stack Development Services | Suleman Zaheer – Lahore',
    description: 'Expert MERN Stack development by Suleman Zaheer. Build scalable MongoDB, Express.js, React.js, Node.js web applications for enterprise and B2B clients in Pakistan.',
    url: 'https://suleman-zaheer.vercel.app/services/mern-stack-development',
    siteName: 'Suleman Zaheer Official Portfolio',
    type: 'website',
    locale: 'en_PK',
    images: [{ url: '/assets/suleman-zaheer-full-stack-developer.jpg', width: 1200, height: 630, alt: 'MERN Stack Development by Suleman Zaheer – Lahore, Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MERN Stack Development | Suleman Zaheer | Lahore',
    description: 'Expert MERN Stack web app development in Lahore, Pakistan. Hire Suleman Zaheer for scalable, production-grade MongoDB, Express, React, Node.js applications.',
    images: ['/assets/suleman-zaheer-full-stack-developer.jpg'],
    creator: '@imsuleman_10',
  },
};

export default function MERNStackPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://suleman-zaheer.vercel.app/services/mern-stack-development#service',
      name: 'MERN Stack Development Services',
      description: 'Professional MERN Stack (MongoDB, Express.js, React.js, Node.js) web application development in Lahore, Pakistan. Building scalable B2B SaaS platforms, ERP systems, REST APIs, and enterprise web applications.',
      url: 'https://suleman-zaheer.vercel.app/services/mern-stack-development',
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
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'MERN Stack Development Features',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full Stack MERN Web Application' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'REST & GraphQL API Engineering' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MongoDB Database Architecture' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'React.js Frontend Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Node.js & Express.js Backend' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'B2B SaaS Platform Development' } }
        ]
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' },
        { '@type': 'ListItem', position: 3, name: 'MERN Stack Development', item: 'https://suleman-zaheer.vercel.app/services/mern-stack-development' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is MERN Stack development?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MERN Stack is a JavaScript-based full-stack development framework consisting of MongoDB (database), Express.js (backend framework), React.js (frontend library), and Node.js (runtime). It enables building fast, scalable, and modern web applications with a single programming language (JavaScript) across the entire stack.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much does MERN Stack development cost in Lahore, Pakistan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MERN Stack web application development by Suleman Zaheer starts from PKR 75,000 for standard web apps and goes up to PKR 300,000+ for enterprise-grade B2B SaaS platforms, ERP systems, or complex APIs. Contact samstacktechs@gmail.com for a free project estimate.'
          }
        },
        {
          '@type': 'Question',
          name: 'Who is the best MERN Stack developer in Lahore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer is a leading MERN Stack developer in Lahore, Pakistan with experience building production-grade B2B web applications, SaaS platforms, and enterprise ERP systems. Contact him at samstacktechs@gmail.com or visit https://suleman-zaheer.vercel.app/contact.'
          }
        },
        {
          '@type': 'Question',
          name: 'What can be built with MERN Stack?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'With MERN Stack you can build: B2B SaaS platforms, E-commerce marketplaces, ERP and inventory management systems, Real-time collaboration tools, Social media platforms, Healthcare management systems, Fintech dashboards, and any data-intensive web application.'
          }
        },
        {
          '@type': 'Question',
          name: 'How long does MERN Stack development take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A standard MERN Stack web application takes 2-8 weeks depending on complexity. Simple CRUD apps take 2-3 weeks, while complex B2B SaaS platforms with authentication, dashboards, and third-party integrations typically take 6-12 weeks.'
          }
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-10 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
        <span>/</span>
        <span className="text-primary">MERN Stack Development</span>
      </nav>

      <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
        MERN Stack <span className="text-primary">Development</span>
      </h1>
      <p className="text-gray-400 text-lg mb-10 max-w-3xl">
        Expert MongoDB, Express.js, React.js & Node.js web application development by <strong className="text-white">Suleman Zaheer</strong> — Lahore, Pakistan. Building scalable B2B SaaS platforms, enterprise ERP systems, and production-grade REST APIs.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {[
          'Full Stack MERN Web Applications', 'REST & GraphQL API Engineering', 'MongoDB Database Architecture',
          'React.js Component Libraries', 'Node.js & Express.js Backend', 'JWT & Role-Based Authentication',
          'B2B SaaS Platform Development', 'Real-time Features with WebSockets'
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

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'What can be built with MERN Stack?', a: 'B2B SaaS platforms, ERP systems, e-commerce marketplaces, real-time collaboration tools, fintech dashboards, social media platforms, and any complex data-intensive web application.' },
            { q: 'Do you offer post-deployment support?', a: 'Yes. All MERN Stack projects include 30 days of free post-deployment bug fixing and support. Extended maintenance packages are available.' },
          ].map(({ q, a }) => (
            <div key={q} className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-white font-semibold mb-2">{q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all">
          Hire Suleman Zaheer for MERN Stack →
        </Link>
      </div>
    </div>
  );
}
