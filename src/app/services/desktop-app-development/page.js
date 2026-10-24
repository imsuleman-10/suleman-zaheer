import Link from 'next/link';

export const metadata = {
  title: 'Desktop App Development Services | Suleman Zaheer – Electron.js, Windows, Mac & Linux Expert',
  description: 'Hire Suleman Zaheer for custom Desktop Application Development in Lahore, Pakistan. Cross-platform Electron.js, React, Node.js desktop software for Windows (.exe), macOS (.dmg), and Linux. POS systems, ERP software, offline-first tools, and hardware integration. Contact: sulemanzaheer09@gmail.com.',
  keywords: [
    'Desktop App Developer Lahore', 'Desktop App Development Pakistan', 'Hire Desktop App Developer',
    'Electron.js Developer Pakistan', 'Electron.js Developer Lahore', 'Windows App Developer Pakistan',
    'macOS App Developer Lahore', 'Linux Desktop Software Developer', 'POS System Developer Lahore',
    'Inventory Management Software Pakistan', 'Offline Desktop Software Engineer', 'Desktop Software Agency Lahore',
    'Cross Platform Desktop Development', 'C# Alternative Electron Developer', 'Custom Business Software Lahore',
    'Suleman Zaheer Desktop Developer'
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/services/desktop-app-development' },
  openGraph: {
    title: 'Desktop App Development Services | Suleman Zaheer – Lahore, Pakistan',
    description: 'Expert Desktop Application Development by Suleman Zaheer. High-performance cross-platform software for Windows, macOS, and Linux using Electron.js, React, SQLite, and offline architectures.',
    url: 'https://suleman-zaheer.vercel.app/services/desktop-app-development',
    siteName: 'Suleman Zaheer Official Portfolio',
    type: 'website',
    locale: 'en_PK',
    images: [{ url: '/assets/suleman-zaheer-full-stack-developer.jpg', width: 1200, height: 630, alt: 'Desktop App Development by Suleman Zaheer – Lahore, Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desktop App Development | Suleman Zaheer | Lahore',
    description: 'Custom desktop software development in Lahore, Pakistan. Windows, macOS & Linux apps with Electron.js, offline database storage, and hardware printer/scanner integrations.',
    images: ['/assets/suleman-zaheer-full-stack-developer.jpg'],
    creator: '@imsuleman_10',
  },
};

export default function DesktopAppPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://suleman-zaheer.vercel.app/services/desktop-app-development#service',
      name: 'Desktop Application Development Services',
      description: 'Professional cross-platform Desktop Application development in Lahore, Pakistan. Developing native-feeling desktop applications for Windows (.exe), macOS (.dmg), and Linux (.AppImage) using Electron.js, React, Node.js, and SQLite. Specializing in POS systems, inventory management, factory ERPs, and offline-first business utilities.',
      url: 'https://suleman-zaheer.vercel.app/services/desktop-app-development',
      provider: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        url: 'https://suleman-zaheer.vercel.app',
        telephone: '+923285778715',
        email: 'sulemanzaheer09@gmail.com',
        address: { '@type': 'PostalAddress', streetAddress: 'Shahdara Town', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' }
      },
      serviceType: 'Desktop Software Engineering',
      areaServed: [
        { '@type': 'Country', name: 'Pakistan' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Place', name: 'Worldwide' }
      ],
      offers: {
        '@type': 'Offer',
        priceRange: 'PKR 80,000 - PKR 350,000+',
        priceCurrency: 'PKR',
        availability: 'https://schema.org/InStock'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Desktop App Development Features',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cross-Platform Electron.js Desktop Engineering' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Offline-First Architecture & SQLite Database Sync' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Point of Sale (POS) & Retail Billing Software' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hardware Integration (Thermal Printers, Barcode Scanners, Cash Drawers)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automated Over-The-Air (OTA) Updates & Inno Setup Installers' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Enterprise Factory & Warehouse Inventory Management Tools' } }
        ]
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' },
        { '@type': 'ListItem', position: 3, name: 'Desktop App Development', item: 'https://suleman-zaheer.vercel.app/services/desktop-app-development' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What technologies are used for Desktop App development?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer primarily engineers desktop applications using Electron.js combined with modern React.js, TypeScript, and Node.js backend processes. For local data storage, SQLite or embedded LevelDB is utilized, allowing apps to run 100% offline with zero internet dependency, while syncing with cloud databases whenever connectivity is restored.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can the desktop software run on both Windows and Mac?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. With Electron.js cross-platform packaging, a single unified codebase produces standalone executable installers for Windows 10/11 (.exe / MSI), macOS Apple Silicon and Intel (.dmg), and Linux distributions (.AppImage / .deb).'
          }
        },
        {
          '@type': 'Question',
          name: 'How much does custom Desktop Application development cost in Lahore, Pakistan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Desktop application development by Suleman Zaheer starts from PKR 80,000 for standard utility and single-station billing tools, and ranges up to PKR 350,000+ for enterprise multi-branch inventory, factory ERP, and hardware-integrated POS systems. Contact sulemanzaheer09@gmail.com or WhatsApp +923285778715 for a custom quote.'
          }
        },
        {
          '@type': 'Question',
          name: 'Who is the top desktop software developer in Lahore, Pakistan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer is recognized among the premier desktop and multi-stack software developers in Lahore, Pakistan, known for high performance, clean UI, rock-solid stability, offline databases, and hardware peripheral integration.'
          }
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs sm:text-sm text-gray-400 mb-8 gap-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
          <span>/</span>
          <span className="text-white font-medium">Desktop App Development</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
            Cross-Platform Desktop Software Engineering
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight mb-6">
            Desktop Application Development Services in <span className="text-orange-400">Lahore, Pakistan</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Suleman Zaheer engineers high-speed, secure, and modern desktop applications for Windows, macOS, and Linux using Electron.js and React.js. Whether you need an offline Point of Sale (POS) system, warehouse inventory manager, factory production ERP, or specialized business tools, we deliver rock-solid desktop performance.
          </p>
        </header>

        {/* Value Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-2">Cross-Platform Builds</h3>
            <p className="text-gray-400 text-sm">One codebase yields compiled Windows (.exe), Mac (.dmg), and Linux (.AppImage) binaries with native OS integration.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-2">100% Offline Resilience</h3>
            <p className="text-gray-400 text-sm">Embedded SQLite/IndexedDB databases ensure your software operates smoothly even during complete internet outages.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-2">Hardware Integration</h3>
            <p className="text-gray-400 text-sm">Direct driver communication with thermal receipt printers, barcode scanners, cash drawers, and industrial weighing scales.</p>
          </div>
        </section>

        {/* Tech Stack Breakdown */}
        <section className="mb-16 p-8 rounded-3xl bg-neutral-900 border border-neutral-800">
          <h2 className="text-2xl font-bold text-white mb-6">Desktop Technology Architecture</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white/5">
              <span className="block font-bold text-orange-400 text-lg">Electron.js</span>
              <span className="text-xs text-gray-400">Runtime Engine</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <span className="block font-bold text-blue-400 text-lg">React & TS</span>
              <span className="text-xs text-gray-400">Frontend UI</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <span className="block font-bold text-emerald-400 text-lg">SQLite</span>
              <span className="text-xs text-gray-400">Local Database</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <span className="block font-bold text-purple-400 text-lg">Node.js IPC</span>
              <span className="text-xs text-gray-400">Native OS APIs</span>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold text-base mb-2">Can desktop applications print receipts and scan barcodes?</h3>
              <p className="text-gray-400 text-sm">Yes, Electron desktop software interacts directly with raw USB, serial, and network printers (thermal ESC/POS), as well as 1D/2D barcode scanners and digital weighing scales.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold text-base mb-2">How do software updates work for clients?</h3>
              <p className="text-gray-400 text-sm">We implement automated OTA (Over-The-Air) update checking so your desktop app silently downloads and applies new features and security patches seamlessly.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold text-base mb-2">What is the delivery timeline for a custom desktop app?</h3>
              <p className="text-gray-400 text-sm">Standard desktop utilities take 3-5 weeks, while comprehensive multi-terminal ERP or POS systems take 6-10 weeks with thorough automated QA testing.</p>
            </div>
          </div>
        </section>

        {/* CTA Bar */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-orange-950/60 to-neutral-900 border border-orange-500/30 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Build Your Custom Desktop Software?</h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Consult directly with Suleman Zaheer for architecture planning, tech specs, and project estimation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
            >
              Get Free Consultation
            </Link>
            <a
              href="https://wa.me/923285778715?text=Hi%20Suleman,%20I%20am%20interested%20in%20Desktop%20App%20Development."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-all border border-neutral-700"
            >
              WhatsApp: +92 328 5778715
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
