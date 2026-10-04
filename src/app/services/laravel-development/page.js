import Link from 'next/link';

export const metadata = {
  title: 'Laravel Development Services | Suleman Zaheer – Lahore, Pakistan',
  description: 'Hire Suleman Zaheer for expert Laravel (PHP) web application development in Lahore. REST APIs, Enterprise backends, E-commerce, Custom CMS, and secure PHP systems. Starting PKR 65,000. Contact: samstacktechs@gmail.com.',
  keywords: [
    'Laravel Developer Lahore', 'Laravel Development Pakistan', 'Hire Laravel Developer Lahore',
    'PHP Developer Lahore', 'Laravel REST API Developer Pakistan', 'Laravel Backend Developer Lahore',
    'Laravel E-commerce Pakistan', 'Custom CMS Laravel Lahore', 'Laravel Enterprise Application Pakistan'
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/services/laravel-development' },
  openGraph: {
    title: 'Laravel Development Services | Suleman Zaheer – Lahore',
    description: 'Expert Laravel PHP web development by Suleman Zaheer in Lahore, Pakistan. Building secure REST APIs, enterprise backends, e-commerce platforms, and custom CMS solutions.',
    url: 'https://suleman-zaheer.vercel.app/services/laravel-development',
    siteName: 'Suleman Zaheer Official Portfolio',
    type: 'website',
    locale: 'en_PK',
    images: [{ url: '/assets/suleman-zaheer-full-stack-developer.jpg', width: 1200, height: 630, alt: 'Laravel Development by Suleman Zaheer – Lahore, Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laravel Development | Suleman Zaheer | Lahore',
    description: 'Expert Laravel (PHP) web development in Lahore. REST APIs, secure enterprise backends. Hire Suleman Zaheer.',
    images: ['/assets/suleman-zaheer-full-stack-developer.jpg'],
    creator: '@imsuleman_10',
  },
};

export default function LaravelPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://suleman-zaheer.vercel.app/services/laravel-development#service',
      name: 'Laravel Development Services',
      description: 'Professional Laravel PHP web application and REST API development in Lahore, Pakistan. Building secure, scalable enterprise backends, e-commerce platforms, custom CMS solutions, and RESTful APIs.',
      url: 'https://suleman-zaheer.vercel.app/services/laravel-development',
      provider: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        url: 'https://suleman-zaheer.vercel.app',
        telephone: '+923285778715',
        email: 'samstacktechs@gmail.com',
        address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' }
      },
      serviceType: 'Web Backend Development',
      areaServed: [{ '@type': 'Country', name: 'Pakistan' }, { '@type': 'Country', name: 'United States' }],
      offers: { '@type': 'Offer', priceRange: 'PKR 65,000 - PKR 250,000+', priceCurrency: 'PKR', availability: 'https://schema.org/InStock' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' },
        { '@type': 'ListItem', position: 3, name: 'Laravel Development', item: 'https://suleman-zaheer.vercel.app/services/laravel-development' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why use Laravel for web development?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Laravel is the most popular PHP framework for building enterprise-grade web applications. It provides elegant syntax, built-in authentication, an ORM (Eloquent), a powerful queue system, built-in testing tools, and robust security features like CSRF protection and SQL injection prevention. It is ideal for B2B backends, REST APIs, and e-commerce platforms.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can Suleman Zaheer build REST APIs with Laravel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Suleman Zaheer specializes in building secure, versioned REST APIs with Laravel using Laravel Sanctum or Passport for token-based authentication, API Resource Controllers, rate limiting, and comprehensive API documentation. These APIs integrate seamlessly with Next.js frontends, Flutter mobile apps, or third-party systems.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much does Laravel development cost in Pakistan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Laravel web application development by Suleman Zaheer starts from PKR 65,000 for standard systems and scales to PKR 250,000+ for complex enterprise platforms. Contact samstacktechs@gmail.com for a free quote and project scope assessment.'
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
        <span className="text-primary">Laravel Development</span>
      </nav>

      <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
        Laravel <span className="text-primary">Development</span>
      </h1>
      <p className="text-gray-400 text-lg mb-10 max-w-3xl">
        Expert <strong className="text-white">Laravel (PHP)</strong> web application and REST API development by <strong className="text-white">Suleman Zaheer</strong> in Lahore, Pakistan. Secure, scalable, and enterprise-grade backends.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {[
          'Laravel REST API Engineering', 'Eloquent ORM & Database Design', 'Laravel Sanctum / Passport Auth',
          'Queue Systems & Background Jobs', 'Laravel E-commerce Development', 'Custom CMS with Filament',
          'Automated Testing (PHPUnit)', 'cPanel / VPS Deployment'
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
          <div><span className="text-gray-500 text-sm">Starting Price</span><p className="text-white font-bold text-xl">PKR 65,000</p></div>
          <div><span className="text-gray-500 text-sm">Delivery Time</span><p className="text-white font-bold text-xl">2 – 10 Weeks</p></div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all">
          Hire for Laravel Development →
        </Link>
      </div>
    </div>
  );
}
