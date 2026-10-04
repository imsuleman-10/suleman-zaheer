import Link from 'next/link';

export const metadata = {
  title: 'Flutter App Development Services | Suleman Zaheer – Lahore, Pakistan',
  description: 'Hire Suleman Zaheer for expert Flutter mobile app development in Lahore. Cross-platform iOS & Android apps with Firebase, JazzCash/EasyPaisa integration, and Play Store/App Store deployment. Starting PKR 85,000.',
  keywords: [
    'Flutter Developer Lahore', 'Flutter App Development Pakistan', 'Hire Flutter Developer Lahore',
    'iOS Android App Developer Pakistan', 'Cross-Platform App Developer Lahore',
    'Flutter Firebase Developer Pakistan', 'JazzCash EasyPaisa App Developer Lahore',
    'Mobile App Developer Pakistan', 'Flutter Dart Developer Lahore'
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/services/flutter-app-development' },
  openGraph: {
    title: 'Flutter App Development Services | Suleman Zaheer – Lahore',
    description: 'Expert Flutter cross-platform mobile app development by Suleman Zaheer in Lahore. iOS & Android apps with Firebase, local payments, and Google Play/App Store deployment.',
    url: 'https://suleman-zaheer.vercel.app/services/flutter-app-development',
    siteName: 'Suleman Zaheer Official Portfolio',
    type: 'website',
    locale: 'en_PK',
    images: [{ url: '/assets/suleman-zaheer-full-stack-developer.jpg', width: 1200, height: 630, alt: 'Flutter App Development by Suleman Zaheer – Lahore, Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flutter App Development | Suleman Zaheer | Lahore',
    description: 'Expert Flutter iOS & Android app development in Lahore. Firebase, JazzCash, EasyPaisa integration. Hire Suleman Zaheer.',
    images: ['/assets/suleman-zaheer-full-stack-developer.jpg'],
    creator: '@imsuleman_10',
  },
};

export default function FlutterPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://suleman-zaheer.vercel.app/services/flutter-app-development#service',
      name: 'Flutter Mobile App Development Services',
      description: 'Professional Flutter cross-platform mobile application development in Lahore, Pakistan. Building high-performance iOS and Android apps with Firebase real-time database, JazzCash/EasyPaisa payment integration, and Google Play/App Store deployment.',
      url: 'https://suleman-zaheer.vercel.app/services/flutter-app-development',
      provider: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        url: 'https://suleman-zaheer.vercel.app',
        telephone: '+923285778715',
        email: 'samstacktechs@gmail.com',
        address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' }
      },
      serviceType: 'Mobile Application Development',
      areaServed: [{ '@type': 'Country', name: 'Pakistan' }, { '@type': 'Country', name: 'United States' }],
      offers: { '@type': 'Offer', priceRange: 'PKR 85,000 - PKR 350,000+', priceCurrency: 'PKR', availability: 'https://schema.org/InStock' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' },
        { '@type': 'ListItem', position: 3, name: 'Flutter App Development', item: 'https://suleman-zaheer.vercel.app/services/flutter-app-development' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Flutter and why is it the best choice for mobile development?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Flutter is Google\'s open-source UI toolkit for building natively compiled iOS and Android applications from a single Dart codebase. It delivers native-feeling 60fps performance, a rich set of Material and Cupertino widgets, and eliminates the cost of maintaining separate iOS and Android codebases. Flutter is used by Google, Alibaba, eBay, and BMW.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can Suleman Zaheer integrate JazzCash and EasyPaisa in a Flutter app?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Suleman Zaheer has direct experience integrating JazzCash and EasyPaisa payment gateways into Flutter mobile applications for the Pakistani market. This includes in-app payment flows, subscription billing, and secure transaction handling compliant with Pakistani financial regulations.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much does Flutter app development cost in Pakistan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Flutter mobile app development by Suleman Zaheer starts from PKR 85,000 for standard apps and scales to PKR 350,000+ for complex platforms with real-time features, payment gateways, and offline-first architecture. Contact samstacktechs@gmail.com for a free estimate.'
          }
        },
        {
          '@type': 'Question',
          name: 'Does the Flutter app work on both iOS and Android?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Flutter apps built by Suleman Zaheer run natively on both iOS (Apple App Store) and Android (Google Play Store) from a single codebase. This reduces development time by up to 40% compared to building separate native apps, while maintaining near-native performance and pixel-perfect UI consistency across both platforms.'
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
        <span className="text-primary">Flutter App Development</span>
      </nav>

      <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
        Flutter App <span className="text-primary">Development</span>
      </h1>
      <p className="text-gray-400 text-lg mb-10 max-w-3xl">
        Expert <strong className="text-white">Flutter & Dart</strong> cross-platform mobile application development by <strong className="text-white">Suleman Zaheer</strong> in Lahore. One codebase. Two platforms. Native performance.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {[
          'Flutter Cross-Platform (iOS & Android)', 'Firebase Real-Time Integration',
          'JazzCash & EasyPaisa Payments', 'Google Play & App Store Deployment',
          'Riverpod / Bloc State Management', 'Offline-First Architecture',
          'Push Notifications (FCM)', 'Material Design 3 & Custom UI'
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
          <div><span className="text-gray-500 text-sm">Starting Price</span><p className="text-white font-bold text-xl">PKR 85,000</p></div>
          <div><span className="text-gray-500 text-sm">Delivery Time</span><p className="text-white font-bold text-xl">4 – 12 Weeks</p></div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all">
          Hire for Flutter Development →
        </Link>
      </div>
    </div>
  );
}
