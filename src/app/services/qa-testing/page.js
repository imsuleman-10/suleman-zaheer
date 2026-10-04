import Link from 'next/link';

export const metadata = {
  title: 'QA Testing & Software Testing Services | Suleman Zaheer – Lahore, Pakistan',
  description: 'Hire Suleman Zaheer for professional QA Testing and Software Quality Assurance in Lahore. Manual testing, automated testing with Playwright/Cypress, regression testing, and bug tracking for web and mobile apps. Starting PKR 40,000.',
  keywords: [
    'QA Tester Lahore', 'Software Testing Services Pakistan', 'Hire QA Engineer Lahore',
    'Automated Testing Pakistan', 'Playwright Testing Lahore', 'Cypress Testing Pakistan',
    'Manual Testing Lahore', 'Regression Testing Pakistan', 'Bug Testing Web App Lahore',
    'Software Quality Assurance Pakistan', 'QA Testing Agency Lahore'
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/services/qa-testing' },
  openGraph: {
    title: 'QA Testing & Software Quality Assurance | Suleman Zaheer – Lahore',
    description: 'Professional software QA testing by Suleman Zaheer in Lahore. Manual testing, Playwright automation, regression testing, and comprehensive bug tracking for enterprise web and mobile applications.',
    url: 'https://suleman-zaheer.vercel.app/services/qa-testing',
    siteName: 'Suleman Zaheer Official Portfolio',
    type: 'website',
    locale: 'en_PK',
    images: [{ url: '/assets/suleman-zaheer-full-stack-developer.jpg', width: 1200, height: 630, alt: 'QA Testing Services by Suleman Zaheer – Lahore, Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QA & Software Testing | Suleman Zaheer | Lahore',
    description: 'Professional QA testing in Lahore. Manual, Playwright, Cypress automation, regression testing. Hire Suleman Zaheer.',
    images: ['/assets/suleman-zaheer-full-stack-developer.jpg'],
    creator: '@imsuleman_10',
  },
};

export default function QATestingPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://suleman-zaheer.vercel.app/services/qa-testing#service',
      name: 'QA Testing & Software Quality Assurance Services',
      description: 'Professional software quality assurance and testing services in Lahore, Pakistan. Providing manual testing, automated E2E testing with Playwright and Cypress, regression testing, performance profiling, and comprehensive bug tracking for web and mobile applications.',
      url: 'https://suleman-zaheer.vercel.app/services/qa-testing',
      provider: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        url: 'https://suleman-zaheer.vercel.app',
        telephone: '+923285778715',
        email: 'samstacktechs@gmail.com',
        address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' }
      },
      serviceType: 'Software Quality Assurance',
      areaServed: [{ '@type': 'Country', name: 'Pakistan' }, { '@type': 'Country', name: 'United States' }],
      offers: { '@type': 'Offer', priceRange: 'PKR 40,000 - PKR 150,000+', priceCurrency: 'PKR', availability: 'https://schema.org/InStock' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' },
        { '@type': 'ListItem', position: 3, name: 'QA Testing', item: 'https://suleman-zaheer.vercel.app/services/qa-testing' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why is QA Testing important for software projects?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'QA Testing is critical because a software bug discovered after deployment costs 6-10x more to fix than one caught during development. Comprehensive testing ensures software reliability, security, and performance, protecting your business reputation and reducing long-term maintenance costs. Enterprise software without proper QA testing typically suffers 15-25% higher post-launch bug rates.'
          }
        },
        {
          '@type': 'Question',
          name: 'What testing tools does Suleman Zaheer use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer uses Playwright and Cypress for End-to-End (E2E) automated testing, Jest and Vitest for unit and integration testing, Postman and Hoppscotch for API testing, Chrome DevTools for performance profiling, and Jira/Linear for bug tracking and test case management.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the difference between manual testing and automated testing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Manual testing involves a QA engineer executing test cases by hand to identify bugs, usability issues, and edge cases. Automated testing uses scripts (Playwright, Cypress, Jest) to run thousands of test cases automatically on every code change. A professional QA strategy uses both: manual testing for exploratory and UX testing, and automation for regression and performance testing.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much does QA Testing cost in Pakistan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'QA Testing services by Suleman Zaheer start from PKR 40,000 for basic manual testing of a web or mobile application. Comprehensive automated testing suites with Playwright or Cypress start from PKR 80,000. Full project QA lifecycle management for enterprise applications is quoted on scope. Contact samstacktechs@gmail.com for a free estimate.'
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
        <span className="text-primary">QA Testing</span>
      </nav>

      <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
        QA Testing & <span className="text-primary">Quality Assurance</span>
      </h1>
      <p className="text-gray-400 text-lg mb-10 max-w-3xl">
        Professional software testing by <strong className="text-white">Suleman Zaheer</strong> in Lahore, Pakistan. Ensuring your web and mobile applications are bug-free, performant, and enterprise-grade before launch.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {[
          'Manual Functional Testing', 'Playwright E2E Automation', 'Cypress Component Testing',
          'API Testing (Postman)', 'Regression Testing', 'Performance & Load Testing',
          'Cross-Browser & Mobile Testing', 'Bug Tracking & Test Reporting'
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
          <div><span className="text-gray-500 text-sm">Starting Price</span><p className="text-white font-bold text-xl">PKR 40,000</p></div>
          <div><span className="text-gray-500 text-sm">Delivery Time</span><p className="text-white font-bold text-xl">1 – 3 Weeks</p></div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all">
          Hire for QA Testing →
        </Link>
      </div>
    </div>
  );
}
