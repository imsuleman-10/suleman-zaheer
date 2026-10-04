import React from 'react';
import Link from 'next/link';
import { Globe, Smartphone, Zap, Layout, ArrowUpRight, CheckCircle, MapPin, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: "Services by Suleman Zaheer | Web App, Mobile App, Android App, Desktop App, Shopify Store, SEO – Lahore, Pakistan",
  description: "Hire Suleman Zaheer for professional Web App Development, Mobile App Development, Android App Development, Desktop App Development, Shopify Store Development, and SEO Services in Lahore, Pakistan. Expert Software Engineer & SEO Specialist based in Shahdara, Lahore. CS student at UET Lahore.",
  keywords: [
    "Web App Development Lahore", "Mobile App Developer Pakistan", "Android App Developer Lahore",
    "Android App Development Pakistan", "Desktop App Developer Pakistan", "Desktop App Development Lahore",
    "Shopify Developer Lahore", "Shopify Store Development Pakistan", "Shopify Expert Pakistan",
    "SEO Services Lahore", "SEO Expert Pakistan", "SEO Expert Lahore",
    "Technical SEO Pakistan", "Local SEO Lahore", "GEO Optimization Pakistan",
    "Serverless App Developer Lahore", "Custom Website Without Backend Pakistan",
    "Hire Software Engineer Lahore", "React Native Developer Pakistan",
    "Firebase App Developer Lahore", "Next.js Developer Pakistan", "MERN Stack Developer Lahore",
    "Shopify Theme Developer Lahore", "E-Commerce Developer Pakistan",
    "Electron.js Desktop App Developer Lahore",
    "Website Development Lahore Pakistan", "Website Developer Near Me Lahore",
    "Custom Website Developer Shahdara Lahore", "Web Developer Near Me Lahore",
    "Suleman Zaheer Services", "SAMStack Studio Services",
    "Full Stack Developer for Hire Lahore", "Professional Web Developer Pakistan"
  ],
  alternates: { canonical: "https://suleman-zaheer.vercel.app/services" },
  openGraph: {
    title: "Services | Suleman Zaheer – Web App, Mobile App, Android, Desktop, Shopify & SEO | Lahore",
    description: "Professional Software Development & Digital Services by Suleman Zaheer in Lahore, Pakistan. Web Apps, Mobile Apps, Android Apps, Desktop Apps, Shopify Stores, and SEO Services.",
    url: "https://suleman-zaheer.vercel.app/services",
    siteName: "Suleman Zaheer Official Portfolio",
    type: "website",
    locale: "en_PK",
    images: [{ url: "/assets/suleman-zaheer-full-stack-developer.jpg", width: 1200, height: 630, alt: "Suleman Zaheer Services – Software Engineer, Android Developer, Shopify Expert & SEO Specialist in Lahore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Suleman Zaheer – Web App, Mobile App, Android, Desktop, Shopify & SEO",
    description: "Hire Suleman Zaheer for Web App, Mobile App, Android App, Desktop App, Shopify Store, and SEO services in Lahore, Pakistan.",
    images: ["/assets/suleman-zaheer-full-stack-developer.jpg"],
    creator: "@imsuleman_10",
  },
};

const services = [
  {
    id: "web-app",
    icon: Globe,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
    title: "Web App Development",
    subtitle: "Full Stack MERN & Next.js Applications",
    description: "Build powerful, scalable, and enterprise-grade web applications using the MERN Stack (MongoDB, Express.js, React, Node.js) and Next.js. Suleman Zaheer delivers high-performance, SEO-optimized web apps for businesses and startups in Lahore and across Pakistan.",
    features: [
      "Full Stack MERN (MongoDB, Express, React, Node.js)",
      "Next.js App Router with Server Components",
      "REST API & Database Architecture",
      "User Authentication & Authorization",
      "Admin Dashboards & CMS",
      "SEO Optimization & Core Web Vitals",
      "Responsive & Mobile-First Design",
      "Firebase & Cloud Integration"
    ],
    technologies: ["React.js", "Next.js", "Node.js", "MongoDB", "Express.js", "Firebase", "TypeScript", "Tailwind CSS"],
    useCases: ["E-Commerce Platforms", "Business Management Systems", "SaaS Applications", "Educational Portals", "Booking Systems"],
    price: "Starting from PKR 75,000",
    deliveryTime: "2–8 weeks",
  },
  {
    id: "mobile-app",
    icon: Smartphone,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/20",
    title: "Mobile App Development",
    subtitle: "Cross-Platform iOS & Android Apps",
    description: "Develop cross-platform mobile applications for iOS and Android using React Native. Suleman Zaheer builds beautiful, performant, and user-friendly mobile apps for businesses in Lahore, Pakistan, and internationally. One codebase, two platforms – maximum efficiency.",
    features: [
      "React Native Cross-Platform Development",
      "iOS & Android from One Codebase",
      "Firebase Backend Integration",
      "Push Notifications & Real-time Data",
      "Offline-First Architecture",
      "App Store & Play Store Submission",
      "UI/UX Design & Animations",
      "Performance Optimization"
    ],
    technologies: ["React Native", "Firebase", "Expo", "JavaScript", "TypeScript", "Redux", "Zustand"],
    useCases: ["Delivery & Logistics Apps", "Healthcare Apps", "E-Commerce Mobile Apps", "Social Platforms", "Business Tools"],
    price: "Starting from PKR 85,000",
    deliveryTime: "4–12 weeks",
  },
  {
    id: "android-app",
    icon: Smartphone,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20",
    title: "Android App Development",
    subtitle: "Dedicated Android Apps for Google Play Store",
    description: "Get a dedicated, high-performance Android application built by Suleman Zaheer in Lahore. Specialized Android development optimized for Pakistani market needs – Google Play Store submission, Urdu language support, JazzCash/EasyPaisa integration, Google Maps, and Firebase-powered real-time features.",
    features: [
      "Android-Optimized React Native Development",
      "Google Play Store Submission & Listing",
      "Google Maps Integration",
      "JazzCash & EasyPaisa In-App Payments",
      "Firebase Push Notifications (FCM)",
      "Offline Mode with Local Storage",
      "Urdu Language & RTL Support",
      "Material Design UI/UX"
    ],
    technologies: ["React Native", "Android SDK", "Firebase", "Google Play Console", "FCM", "Google Maps API", "Expo"],
    useCases: ["Local Delivery Services", "Food Ordering Apps", "POS Android Apps", "Community Platforms", "Business Management"],
    price: "Starting from PKR 70,000",
    deliveryTime: "3–10 weeks",
  },
  {
    id: "desktop-app",
    icon: Layout,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/20",
    title: "Desktop App Development",
    subtitle: "Windows, macOS & Linux Apps with Electron.js",
    description: "Suleman Zaheer builds powerful cross-platform desktop applications using Electron.js and React.js. Perfect for businesses in Lahore needing offline software – POS systems, inventory management, factory management tools, and enterprise internal tools that run natively on Windows, macOS, and Linux.",
    features: [
      "Electron.js + React.js Desktop Apps",
      "Windows (.exe), macOS (.dmg), Linux (.AppImage) Builds",
      "Offline-First with Local SQLite Database",
      "System Tray & Native Notifications",
      "Auto-Updater (OTA Updates)",
      "Custom Installer & Packaging",
      "Print & PDF Generation",
      "Hardware Integration (Barcode, Printers)"
    ],
    technologies: ["Electron.js", "React.js", "Node.js", "SQLite", "Tailwind CSS", "IPC Renderer"],
    useCases: ["POS (Point of Sale) Systems", "Inventory Management", "Factory Management Software", "Auto-Parts Business Tools", "Offline Enterprise Tools"],
    price: "Starting from PKR 80,000",
    deliveryTime: "4–12 weeks",
  },
  {
    id: "shopify-store",
    icon: Globe,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/20",
    title: "Shopify Store Development",
    subtitle: "Complete E-Commerce Shopify Stores for Pakistan & International",
    description: "Suleman Zaheer builds complete, professional Shopify stores optimized for Pakistani and international markets. From custom theme development to JazzCash/EasyPaisa payment integration, product catalog setup, and Shopify SEO – everything you need to start selling online.",
    features: [
      "Custom Shopify Theme Development / Premium Theme Customization",
      "JazzCash, EasyPaisa, Stripe & PayPal Payment Integration",
      "Product Catalog & Collection Setup",
      "Shopify SEO Optimization",
      "Mobile-Responsive Design",
      "Abandoned Cart Recovery",
      "Shopify App Integration (Email, Chat, Reviews)",
      "Shipping & Tax Configuration"
    ],
    technologies: ["Shopify", "Liquid", "HTML/CSS", "JavaScript", "Shopify CLI", "Shopify Apps", "Metafields"],
    useCases: ["Clothing & Fashion Brands", "Electronics Sellers", "Food & Grocery Stores", "Handmade Crafts", "International Dropshipping"],
    price: "Starting from PKR 55,000",
    deliveryTime: "1–4 weeks",
  },
  {
    id: "seo",
    icon: ArrowUpRight,
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
    borderColor: "border-rose-400/20",
    title: "SEO & Website Optimization",
    subtitle: "Technical SEO, Local SEO, GEO, AEO & LLM Optimization",
    description: "Suleman Zaheer provides full-service SEO to help your website rank on Google, appear in AI answers (ChatGPT, Gemini, Perplexity), and attract clients in Lahore and Pakistan. Covers Technical SEO, Local SEO, GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), Core Web Vitals, and LLM optimization via llms.txt.",
    features: [
      "Technical SEO Audit & Fix",
      "On-Page SEO (Meta Tags, Headings, Keywords)",
      "Local SEO for Lahore/Pakistan Businesses",
      "GEO – Appear in ChatGPT, Gemini & Perplexity Results",
      "AEO – FAQ Schema & Structured Answer Content",
      "LLM Optimization via llms.txt Implementation",
      "Core Web Vitals (LCP, CLS, INP) Optimization",
      "Sitemap, robots.txt & Google Search Console Setup"
    ],
    technologies: ["Next.js", "JSON-LD Schema", "Google Search Console", "Google Analytics 4", "Core Web Vitals", "Sitemap XML"],
    useCases: ["Local Businesses in Lahore", "E-Commerce Stores", "Freelancers & Agencies", "Restaurant & Food Businesses", "Professional Portfolios"],
    price: "Starting from PKR 30,000",
    deliveryTime: "2–6 weeks (ongoing)",
  },
  {
    id: "serverless-app",
    icon: Zap,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20",
    title: "Serverless Mobile App",
    subtitle: "Firebase-Powered Apps – No Backend Server Required",
    description: "Build modern, scalable mobile apps without a dedicated backend server using Firebase's serverless architecture. Suleman Zaheer specializes in Firebase Firestore, Firebase Auth, Cloud Functions, and Firebase Storage – giving you a full-stack app experience at a fraction of the cost.",
    features: [
      "Firebase Firestore (NoSQL Database)",
      "Firebase Authentication (Email, Google, Phone)",
      "Firebase Cloud Functions (Serverless Logic)",
      "Firebase Storage for Media Files",
      "Firebase Cloud Messaging (Push Notifications)",
      "Real-time Data Sync",
      "Auto-Scaling – No Server Management",
      "Cost-Effective & Rapid Deployment"
    ],
    technologies: ["Firebase", "React Native", "Firestore", "Cloud Functions", "Firebase Auth", "Firebase Storage"],
    useCases: ["Startup MVPs", "Social Apps", "Chat Applications", "Real-time Dashboards", "Community Platforms"],
    price: "Starting from PKR 65,000",
    deliveryTime: "3–8 weeks",
  },
  {
    id: "custom-website",
    icon: Layout,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20",
    title: "Custom Website (No Backend)",
    subtitle: "Beautiful Static Sites, Landing Pages & Portfolios",
    description: "Get a stunning, fast, and fully custom website without any backend server. Suleman Zaheer designs and develops beautiful static websites, landing pages, portfolios, and business brochure sites using Next.js static export, HTML, CSS, and JavaScript. Perfect for businesses and professionals in Lahore.",
    features: [
      "Next.js Static Export (Maximum Performance)",
      "Custom HTML/CSS/JavaScript",
      "Pixel-Perfect Responsive Design",
      "Animations with Framer Motion",
      "SEO Optimized Out of the Box",
      "Ultra-Fast Loading (No Server Required)",
      "Contact Forms (EmailJS or Formspree)",
      "Free Hosting on Vercel / Netlify"
    ],
    technologies: ["Next.js", "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    useCases: ["Business Landing Pages", "Personal Portfolios", "Event Pages", "Restaurant Menus", "Agency Brochures"],
    price: "Starting from PKR 45,000",
    deliveryTime: "1–3 weeks",
  }
];

export default function ServicesPage() {
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://suleman-zaheer.vercel.app/services',
        url: 'https://suleman-zaheer.vercel.app/services',
        name: 'Services by Suleman Zaheer – Web App, Mobile App, Serverless & Custom Website | Lahore',
        description: 'Professional Software Development services by Suleman Zaheer in Lahore, Pakistan.',
        inLanguage: 'en-PK',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' }
          ]
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '.speakable']
        }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#web-app',
        name: 'Web App Development',
        description: 'Full Stack MERN/Next.js Web Application Development by Suleman Zaheer. Scalable, enterprise-grade web apps for businesses in Lahore and Pakistan.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }],
        serviceType: 'Web App Development',
        url: 'https://suleman-zaheer.vercel.app/services#web-app',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '75000' }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#mobile-app',
        name: 'Mobile App Development',
        description: 'Cross-platform Mobile App Development for iOS and Android using React Native by Suleman Zaheer in Lahore, Pakistan.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }],
        serviceType: 'Mobile App Development',
        url: 'https://suleman-zaheer.vercel.app/services#mobile-app',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '85000' }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#android-app',
        name: 'Android App Development',
        description: 'Dedicated Android App Development using React Native for Google Play Store submission. JazzCash/EasyPaisa payments, Google Maps, Firebase push notifications, offline mode.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }],
        serviceType: 'Android App Development',
        url: 'https://suleman-zaheer.vercel.app/services#android-app',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '70000' }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#desktop-app',
        name: 'Desktop App Development',
        description: 'Cross-platform desktop application development using Electron.js for Windows, macOS, and Linux. POS systems, inventory management, factory management tools, and enterprise software.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }],
        serviceType: 'Desktop App Development',
        url: 'https://suleman-zaheer.vercel.app/services#desktop-app',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '80000' }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#shopify-store',
        name: 'Shopify Store Development',
        description: 'Complete e-commerce Shopify store setup, custom theme development, JazzCash/EasyPaisa/Stripe/PayPal payment integration, and Shopify SEO optimization for businesses in Pakistan.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }],
        serviceType: 'Shopify Store Development',
        url: 'https://suleman-zaheer.vercel.app/services#shopify-store',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '55000' }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#seo',
        name: 'SEO & Website Optimization',
        description: 'Full SEO services by Suleman Zaheer: Technical SEO, Local SEO for Lahore/Pakistan, GEO (AI Search Engines), AEO (Answer Engine Optimization), LLM Optimization, Core Web Vitals, and JSON-LD structured data.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }, { '@type': 'Place', name: 'Worldwide' }],
        serviceType: 'SEO & Website Optimization',
        url: 'https://suleman-zaheer.vercel.app/services#seo',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '30000' }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#serverless-app',
        name: 'Serverless Mobile App Development',
        description: 'Serverless Mobile App Development using Firebase (Firestore, Auth, Cloud Functions) by Suleman Zaheer – no dedicated backend server required.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }],
        serviceType: 'Serverless App Development',
        url: 'https://suleman-zaheer.vercel.app/services#serverless-app',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '65000' }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#custom-website',
        name: 'Custom Website Without Backend',
        description: 'Custom static website, landing page, and portfolio development without any backend server. Next.js static export, HTML/CSS/JS by Suleman Zaheer in Lahore, Pakistan.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }],
        serviceType: 'Custom Website Development',
        url: 'https://suleman-zaheer.vercel.app/services#custom-website',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '45000' }
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What software development services does Suleman Zaheer offer in Lahore?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Suleman Zaheer offers 8 services in Lahore: 1) Web App Development (MERN/Next.js), 2) Mobile App Development (React Native), 3) Android App Development (Google Play Store), 4) Desktop App Development (Electron.js), 5) Shopify Store Development, 6) SEO & Website Optimization, 7) Serverless Mobile App (Firebase), 8) Custom Website without backend (Next.js/HTML/CSS/JS).'
            }
          },
          {
            '@type': 'Question',
            name: 'How much does it cost to hire Suleman Zaheer for a web app in Pakistan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Suleman Zaheer pricing: SEO from PKR 30,000 | Custom website from PKR 45,000 | Shopify store from PKR 55,000 | Serverless mobile app from PKR 65,000 | Android app from PKR 70,000 | Web app from PKR 75,000 | Desktop app from PKR 80,000 | Mobile app from PKR 85,000.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Suleman Zaheer build Android apps in Lahore?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Suleman Zaheer is a professional Android App Developer in Lahore, Pakistan. He builds Android applications using React Native and submits them to Google Play Store. Features include Google Maps, JazzCash/EasyPaisa payments, Firebase push notifications, and Urdu language support.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Suleman Zaheer build Shopify stores in Pakistan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Suleman Zaheer is a Shopify Expert in Lahore, Pakistan. He builds complete Shopify stores with custom theme development, JazzCash, EasyPaisa, Stripe, and PayPal payment integration, SEO optimization, and full product catalog setup.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Suleman Zaheer provide SEO services in Lahore?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Suleman Zaheer provides full SEO services in Lahore including Technical SEO, Local SEO, GEO (Generative Engine Optimization for AI like ChatGPT/Gemini), AEO (Answer Engine Optimization), LLM Optimization via llms.txt, Core Web Vitals optimization, and structured data schema markup.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Suleman Zaheer build desktop applications?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Suleman Zaheer builds cross-platform desktop applications for Windows, macOS, and Linux using Electron.js and React.js. Ideal for POS systems, inventory management, factory management tools, and enterprise business software.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I get a website without a backend from Suleman Zaheer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Suleman Zaheer specializes in custom websites without any backend server, built using Next.js static export or HTML/CSS/JavaScript and hosted for free on Vercel or Netlify.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Suleman Zaheer build mobile apps in Lahore?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Suleman Zaheer builds cross-platform mobile apps for iOS and Android using React Native. He also builds dedicated Android apps and serverless mobile apps using Firebase with no dedicated backend needed.'
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />



      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <MapPin size={12} /> Shahdara, Lahore, Pakistan – Available Worldwide
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight speakable" data-speakable="true">
            Professional <span className="text-primary italic">Development</span>
            <br className="hidden sm:block" />
            <span className="text-gray-500">Services in Lahore</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed speakable">
            I am <span className="text-white font-bold">Suleman Zaheer</span>, a Software Engineer &amp; Web Developer based in{' '}
            <span className="text-primary font-semibold">Shahdara, Lahore</span>. I build{' '}
            <strong className="text-white">Web Apps, Mobile Apps, Serverless Apps &amp; Custom Websites</strong>{' '}
            for businesses and professionals across Pakistan and worldwide.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="space-y-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`group relative rounded-[2.5rem] border ${service.borderColor} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden`}
              >
                <div className="p-8 sm:p-12 lg:p-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    <div>
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${service.bgColor} border ${service.borderColor} mb-6`}>
                        <Icon size={32} className={service.color} />
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-gray-500 text-sm font-mono">0{idx + 1}</span>
                        <span className={`text-xs font-bold uppercase tracking-widest ${service.color} px-3 py-1 rounded-full ${service.bgColor}`}>
                          {service.subtitle}
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight speakable">
                        {service.title}
                      </h2>
                      <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className={`font-bold text-sm ${service.color}`}>{service.price}</span>
                        <span className="text-gray-600 text-sm">|</span>
                        <span className="text-sm text-gray-400">Delivery: <span className="text-white font-semibold">{service.deliveryTime}</span></span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        href="/contact"
                        className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${service.bgColor} ${service.color} border ${service.borderColor} hover:scale-105`}
                      >
                        Hire Me for This <ArrowUpRight size={16} />
                      </Link>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-white font-bold text-lg mb-4">What&apos;s Included:</h3>
                        <ul className="space-y-3">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-gray-400 text-sm">
                              <CheckCircle size={16} className={`${service.color} flex-shrink-0 mt-0.5`} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-4">Use Cases:</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.useCases.map((useCase) => (
                            <span key={useCase} className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-400">
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Hire Suleman Zaheer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 speakable" data-speakable="true">
            Why Hire <span className="text-primary">Suleman Zaheer</span>?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-2xl">
            A professional <strong className="text-white">Software Engineer &amp; Web Developer in Lahore, Pakistan</strong>{' '}
            with real-world experience and a CS degree from UET Lahore.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "UET Lahore – CS Student", desc: "Studying Computer Science at Pakistan's top engineering university, ensuring a deep theoretical foundation." },
              { title: "Real-World Projects", desc: "Built enterprise platforms, AI clinics, e-learning systems, and airline reservation systems." },
              { title: "Lahore & Shahdara Based", desc: "Local developer in Lahore (Shahdara Town) – available for in-person meetings and local projects." },
              { title: "Full Transparency", desc: "Regular progress updates, clean code, detailed documentation, and post-delivery support." },
              { title: "Modern Tech Stack", desc: "Latest technologies: Next.js 14, React Native, Firebase, TypeScript, and Tailwind CSS." },
              { title: "Competitive PKR Pricing", desc: "Professional-quality development at Pakistan-friendly pricing with flexible milestone-based payments." }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors">
                <h3 className="text-primary font-bold text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[2.5rem] p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 relative z-10 speakable">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-2 relative z-10">
            <strong>Suleman Zaheer</strong> – Software Engineer &amp; Web Developer, Lahore, Pakistan
          </p>
          <p className="text-white/70 text-sm mb-10 relative z-10">
            Shahdara Town, Lahore | samstacktechs@gmail.com | +923285778715
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-neutral-100 transition-all shadow-xl"
            >
              <Mail size={16} /> Contact Me Now
            </Link>
            <a
              href="tel:+923285778715"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-all"
            >
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

