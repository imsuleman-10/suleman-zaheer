import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://suleman-zaheer.vercel.app'),
  title: {
    default: 'Suleman Zaheer | Business Growth Partner & Multi-Stack Expert – Lahore, Pakistan',
    template: '%s | Suleman Zaheer',
  },
  description:
    'Suleman Zaheer – Business Growth Partner & Software Engineer in Lahore, Pakistan. Core Stack: MERN, Next.js, Laravel, Flutter, Data Analysis, SEO, and QA Testing. Founder of SAMStack Studio.',
  keywords: [
    'Suleman Zaheer',
    'MERN Stack Developer Lahore',
    'Next.js Expert Pakistan',
    'Laravel Developer Lahore',
    'Flutter App Developer Pakistan',
    'Data Analyst Lahore',
    'SEO Expert Lahore',
    'QA Tester Pakistan',
    'Software Engineer Lahore',
    'Business Growth Consultant',
    'Website Development Lahore',
    'Web App Development Lahore',
    'SAMStack Studio',
    'Technical SEO Pakistan',
  ],
  authors: [{ name: 'Suleman Zaheer', url: 'https://suleman-zaheer.vercel.app/' }],
  creator: 'Suleman Zaheer',
  publisher: 'Suleman Zaheer',
  alternates: {
    canonical: 'https://suleman-zaheer.vercel.app/',
  },
  verification: {
    google: 'uBDdd9LVXSMHdf7bez07kPshlb4k5-mAPjCA1MbMGco',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  sitemaps: [
    'https://suleman-zaheer.vercel.app/sitemap.xml',
    'https://suleman-zaheer.vercel.app/sitemap-images.xml',
  ],
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: '/sfavicon-small.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Suleman Zaheer | Business Growth Partner & Multi-Stack Expert',
    description:
      'Official portfolio of Suleman Zaheer, an engineer focused on scaling businesses through Data Analysis, Next.js, and Flutter in Pakistan.',
    url: 'https://suleman-zaheer.vercel.app/',
    siteName: 'Suleman Zaheer Portfolio',
    images: [
      {
        url: '/assets/suleman-zaheer-full-stack-developer.jpg',
        width: 1200,
        height: 630,
        alt: 'Suleman Zaheer – Business Growth Partner and Software Engineer from Lahore, Pakistan',
      },
    ],
    locale: 'en_PK',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suleman Zaheer | Business Growth Partner',
    description:
      'Building digital ecosystems to scale businesses via Next.js, Flutter, and Data Analytics in Pakistan.',
    images: ['/assets/suleman-zaheer-full-stack-developer.jpg'],
    creator: '@imsuleman_10',
    site: '@imsuleman_10',
  },
  other: {
    'application-name': 'Suleman Zaheer Portfolio',
    'apple-mobile-web-app-title': 'Suleman Zaheer',
    'theme-color': '#000000',
    'format-detection': 'telephone=no',
  },
};

import Providers from "@/components/Providers";

export default function RootLayout({ children }) {
  // ============================================================================
  // ULTRA-COMPREHENSIVE JSON-LD STRUCTURED DATA FOR "SULEMAN ZAHEER" ENTITY
  // Google Knowledge Graph + Entity Disambiguation + Rich Results
  // ============================================================================
  const jsonLd = [
    // 1. WebSite Schema with SearchAction (Sitelinks Search Box)
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://suleman-zaheer.vercel.app/#website',
      name: 'Suleman Zaheer – Official Portfolio',
      alternateName: [
        'Suleman Zaheer Portfolio',
        'Suleman Zaheer Website',
        'Suleman Zaheer Official',
        'SAMStack Studio',
        'Suleman Zaheer Developer'
      ],
      description: 'Official portfolio of Suleman Zaheer – Business Growth Partner, Data Analyst, Next.js & Flutter Expert, and Literature Author based in Lahore, Pakistan. Founder of SAMStack Studio.',
      url: 'https://suleman-zaheer.vercel.app/',
      inLanguage: ['en-PK', 'ur'],
      publisher: {
        '@id': 'https://suleman-zaheer.vercel.app/#person'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://suleman-zaheer.vercel.app/?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    },

    // 2. PRIMARY Person Schema – THE CORE ENTITY
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://suleman-zaheer.vercel.app/#person',
      name: 'Suleman Zaheer',
      givenName: 'Suleman',
      familyName: 'Zaheer',
      additionalName: 'Mughal',
      alternateName: ['سلیمان ظہیر', 'Suleman Zaheer Mughal', 'imsuleman-10'],
      url: 'https://suleman-zaheer.vercel.app/',
      image: {
        '@type': 'ImageObject',
        '@id': 'https://suleman-zaheer.vercel.app/#primaryimage',
        url: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg',
        width: 1200,
        height: 630,
        caption: 'Suleman Zaheer – Software Engineer, Web Developer and Urdu Poet from Lahore, Pakistan'
      },
      description: 'Suleman Zaheer is a Business Growth Partner, Data Analyst, MERN Stack Developer, Next.js Architect, Laravel Developer, Flutter Expert, SEO Specialist, QA Tester, and Urdu Poet based in Shahdara Town, Lahore, Pakistan.',
      jobTitle: 'Business Growth Partner, MERN/Next.js/Laravel/Flutter Developer, Data Analyst, SEO Specialist & QA Tester',
      disambiguatingDescription: 'Suleman Zaheer (سلیمان ظہیر) – Software Engineer and Data Analyst with expertise in MERN, Next.js, Laravel, Flutter, SEO, and Testing.',
      knowsAbout: [
        'MERN Stack',
        'Next.js',
        'Laravel',
        'Flutter',
        'Data Analysis',
        'SEO',
        'Software Testing',
        'QA (Quality Assurance)',
        'React.js',
        'Node.js',
        'MongoDB',
        'PostgreSQL',
        'Python',
        'Power BI',
        'Technical SEO',
        'GEO – Generative Engine Optimization',
        'Business Growth Strategy'
      ],
      knowsLanguage: [
        { '@type': 'Language', name: 'English' },
        { '@type': 'Language', name: 'Urdu' },
        { '@type': 'Language', name: 'Punjabi' }
      ],
      nationality: { '@type': 'Country', name: 'Pakistan' },
      birthPlace: { '@type': 'Place', name: 'Lahore, Punjab, Pakistan' },
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://suleman-zaheer.vercel.app/#organization',
        name: 'SAMStack Studio',
        url: 'https://suleman-zaheer.vercel.app/',
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'University of Engineering and Technology (UET), Lahore',
          alternateName: ['UET Lahore', 'UET'],
          sameAs: 'https://uet.edu.pk/',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Lahore',
            addressRegion: 'Punjab',
            addressCountry: 'Pakistan'
          }
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Govt Islamia College Civil Lines, Lahore',
          alternateName: ['Islamia College Civil Lines', 'Govt Islamia College Lahore'],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Civil Lines, Lahore',
            addressRegion: 'Punjab',
            addressCountry: 'Pakistan'
          }
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Yashfeen Education System Lahore',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Shahdara, Lahore',
            addressRegion: 'Punjab',
            addressCountry: 'Pakistan'
          }
        }
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Bachelor of Science in Computer Science (In Progress)',
          credentialCategory: 'degree',
          recognizedBy: {
            '@type': 'CollegeOrUniversity',
            name: 'University of Engineering and Technology, Lahore'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Python Specialization for Data Analysis',
          credentialCategory: 'certificate',
          recognizedBy: { '@type': 'Organization', name: 'Coursera & Scrimba' }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Cybersecurity Fundamentals & Threat Mitigation',
          credentialCategory: 'certificate',
          recognizedBy: { '@type': 'CollegeOrUniversity', name: 'University of Maryland' }
        }
      ],
      hasOccupation: [
        {
          '@type': 'Occupation',
          name: 'Software Engineer (MERN, Next.js, Laravel & Flutter)',
          occupationLocation: { '@type': 'City', name: 'Lahore, Pakistan' },
          skills: 'MERN Stack, Next.js, Laravel, Flutter, React.js, Node.js, MongoDB, PostgreSQL, PHP, Dart'
        },
        {
          '@type': 'Occupation',
          name: 'Business Growth Partner & Data Analyst',
          occupationLocation: { '@type': 'City', name: 'Lahore, Pakistan' },
          skills: 'Business Growth Strategy, Data Analysis, Python, Pandas, SQL, Power BI, Predictive Modeling'
        },
        {
          '@type': 'Occupation',
          name: 'SEO Specialist & QA Tester',
          occupationLocation: { '@type': 'City', name: 'Lahore, Pakistan' },
          skills: 'Technical SEO, Local SEO, GEO, AEO, Software Testing, Quality Assurance, Automated Testing, Manual Testing'
        },
        {
          '@type': 'Occupation',
          name: 'Urdu Poet & Writer',
          occupationLocation: { '@type': 'City', name: 'Lahore, Pakistan' },
          skills: 'Urdu Poetry, Ghazal, Nazm, Creative Writing'
        }
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Qazi Park, Shahdara Town',
        addressLocality: 'Lahore',
        addressRegion: 'Punjab',
        postalCode: '54000',
        addressCountry: 'PK'
      },
      email: 'mailto:samstacktechs@gmail.com',
      telephone: '+923285778715',
      gender: 'Male',
      sameAs: [
        'https://github.com/imsuleman-10',
        'https://www.linkedin.com/in/suleman-zaheer-mughal',
        'https://www.instagram.com/imsuleman.10/',
        'https://web.facebook.com/Iamsuleman.10',
        'https://x.com/imsuleman_10',
        'https://twitter.com/imsuleman_10',
        'https://suleman-zaheer.vercel.app/'
      ],
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://suleman-zaheer.vercel.app/'
      }
    },

    // 3. WebPage Schema
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://suleman-zaheer.vercel.app/#webpage',
      url: 'https://suleman-zaheer.vercel.app/',
      name: 'Suleman Zaheer – Software Engineer, Web Developer & Poet | Official Portfolio',
      description: 'Official portfolio of Suleman Zaheer – Software Engineer, Web App Developer, Mobile App Developer and Urdu Poet from Shahdara, Lahore, Pakistan.',
      inLanguage: 'en-PK',
      isPartOf: { '@id': 'https://suleman-zaheer.vercel.app/#website' },
      about: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
      datePublished: '2024-01-01T00:00:00Z',
      dateModified: new Date().toISOString(),
      author: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg'
      },
      breadcrumb: { '@id': 'https://suleman-zaheer.vercel.app/#breadcrumb' },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2', '.speakable', '[data-speakable="true"]']
      }
    },

    // 4. BreadcrumbList Schema
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': 'https://suleman-zaheer.vercel.app/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'About Suleman Zaheer', item: 'https://suleman-zaheer.vercel.app/about' },
        { '@type': 'ListItem', position: 3, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' },
        { '@type': 'ListItem', position: 4, name: 'Projects by Suleman Zaheer', item: 'https://suleman-zaheer.vercel.app/projects' },
        { '@type': 'ListItem', position: 5, name: 'Suleman Zaheer Blog', item: 'https://suleman-zaheer.vercel.app/blog' },
        { '@type': 'ListItem', position: 6, name: 'Suleman Zaheer CV', item: 'https://suleman-zaheer.vercel.app/cv' },
        { '@type': 'ListItem', position: 7, name: 'Contact Suleman Zaheer', item: 'https://suleman-zaheer.vercel.app/contact' }
      ]
    },

    // 5. LocalBusiness + ProfessionalService Schema – GEO SEO
    {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://suleman-zaheer.vercel.app/#localbusiness',
      name: 'Suleman Zaheer – Business Growth Partner',
      alternateName: 'SAMStack Studio',
      description: 'Professional Data Analysis, Flutter App Development, Next.js Web Apps, and International SEO services by Suleman Zaheer. Based in Shahdara, Lahore, Pakistan.',
      url: 'https://suleman-zaheer.vercel.app/',
      image: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg',
      logo: 'https://suleman-zaheer.vercel.app/sfavicon.png',
      telephone: '+923285778715',
      email: 'samstacktechs@gmail.com',
      priceRange: '$$',
      currenciesAccepted: 'PKR, USD',
      paymentAccepted: 'Bank Transfer, JazzCash, EasyPaisa, PayPal',
      founder: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Qazi Park, Shahdara Town',
        addressLocality: 'Lahore',
        addressRegion: 'Punjab',
        postalCode: '54000',
        addressCountry: 'PK'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 31.6084,
        longitude: 74.2833
      },
      hasMap: 'https://maps.google.com/?q=Shahdara+Town,+Lahore,+Pakistan',
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Shahdara Town, Lahore' },
        { '@type': 'City', name: 'Lahore' },
        { '@type': 'AdministrativeArea', name: 'Punjab, Pakistan' },
        { '@type': 'Country', name: 'Pakistan' },
        { '@type': 'Place', name: 'Worldwide (Remote)' }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Software Development & Digital Services by Suleman Zaheer',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Data Analysis & Business Intelligence',
            description: 'Data cleaning, visualization (Power BI/Tableau), and predictive modeling for business growth in Pakistan.',
            priceCurrency: 'PKR',
            price: '50000',
            url: 'https://suleman-zaheer.vercel.app/services#data-analysis'
          },
          {
            '@type': 'Offer',
            name: 'Web App Development',
            description: 'Enterprise Next.js & MERN Architecture for scalable B2B SaaS platforms and portals.',
            priceCurrency: 'PKR',
            price: '75000',
            url: 'https://suleman-zaheer.vercel.app/services#web-app'
          },
          {
            '@type': 'Offer',
            name: 'Mobile App Development',
            description: 'High-performance cross-platform Mobile App Development using Flutter for iOS and Android.',
            priceCurrency: 'PKR',
            price: '85000',
            url: 'https://suleman-zaheer.vercel.app/services#mobile-app'
          },
          {
            '@type': 'Offer',
            name: 'Android App Development',
            description: 'Dedicated Android App Development using Flutter for Google Play Store. Push notifications, Google Maps, Firebase.',
            priceCurrency: 'PKR',
            price: '70000',
            url: 'https://suleman-zaheer.vercel.app/services#android-app'
          },
          {
            '@type': 'Offer',
            name: 'Desktop App Development',
            description: 'Cross-platform Desktop Application Development using Electron.js and React.js for Windows, macOS, and Linux. POS systems, inventory management, business tools.',
            priceCurrency: 'PKR',
            price: '80000',
            url: 'https://suleman-zaheer.vercel.app/services#desktop-app'
          },
          {
            '@type': 'Offer',
            name: 'Shopify Store Development',
            description: 'Complete e-commerce Shopify store setup, custom theme development, JazzCash/EasyPaisa/Stripe payment integration, and Shopify SEO for businesses in Pakistan.',
            priceCurrency: 'PKR',
            price: '55000',
            url: 'https://suleman-zaheer.vercel.app/services#shopify-store'
          },
          {
            '@type': 'Offer',
            name: 'SEO & Website Optimization',
            description: 'Full SEO services: Technical SEO, Local SEO for Lahore/Pakistan, GEO (AI Search), AEO, LLM Optimization, Core Web Vitals, and schema markup.',
            priceCurrency: 'PKR',
            price: '30000',
            url: 'https://suleman-zaheer.vercel.app/services#seo'
          },
          {
            '@type': 'Offer',
            name: 'Serverless Mobile App',
            description: 'Serverless Mobile App Development using Firebase (Firestore, Auth, Cloud Functions) – no dedicated backend required.',
            priceCurrency: 'PKR',
            price: '65000',
            url: 'https://suleman-zaheer.vercel.app/services#serverless-app'
          },
          {
            '@type': 'Offer',
            name: 'Custom Website (No Backend)',
            description: 'Custom, beautifully designed websites without a backend – static sites, landing pages, portfolios using Next.js or HTML/CSS/JS.',
            priceCurrency: 'PKR',
            price: '45000',
            url: 'https://suleman-zaheer.vercel.app/services#custom-website'
          }
        ]
      },
      serviceType: [
        'Data Analysis & Business Intelligence',
        'Web App Development',
        'Mobile App Development',
        'Flutter Development',
        'Next.js Enterprise Architecture',
        'Desktop App Development',
        'Shopify Store Development',
        'SEO – Search Engine Optimization',
        'GEO – Generative Engine Optimization',
        'AEO – Answer Engine Optimization',
        'LLM Optimization',
        'Technical SEO',
        'Local SEO Lahore',
        'Python Predictive Modeling',
        'Power BI Dashboards'
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '23:00'
      },
      sameAs: [
        'https://github.com/imsuleman-10',
        'https://www.linkedin.com/in/suleman-zaheer-mughal',
        'https://www.instagram.com/imsuleman.10/',
        'https://web.facebook.com/Iamsuleman.10'
      ]
    },

    // 7. Organization Schema – SAMStack Studio

    // 6. Organization Schema – SAMStack Studio
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://suleman-zaheer.vercel.app/#organization',
      name: 'SAMStack Studio',
      alternateName: ['SAMStack Tech', 'Suleman Zaheer Tech'],
      url: 'https://suleman-zaheer.vercel.app/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://suleman-zaheer.vercel.app/sfavicon.png',
        width: 512,
        height: 512
      },
      founder: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
      description: 'SAMStack Studio is a full-service software engineering and digital agency founded by Suleman Zaheer in Lahore, Pakistan. Services: Web App Development, Mobile App Development, Android App Development, Desktop App Development, Shopify Store Development, SEO & Website Optimization, Serverless Apps, and Custom Websites.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Qazi Park, Shahdara Town',
        addressLocality: 'Lahore',
        addressRegion: 'Punjab',
        addressCountry: 'PK'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+923285778715',
        contactType: 'customer service',
        email: 'samstacktechs@gmail.com',
        availableLanguage: ['English', 'Urdu']
      },
      sameAs: [
        'https://github.com/imsuleman-10',
        'https://www.linkedin.com/in/suleman-zaheer-mughal'
      ]
    },

    // 7. ItemList Schema – Site Navigation
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'SiteNavigationElement', position: 1, name: 'Home', url: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'SiteNavigationElement', position: 2, name: 'About Suleman Zaheer', url: 'https://suleman-zaheer.vercel.app/about' },
        { '@type': 'SiteNavigationElement', position: 3, name: 'Services by Suleman Zaheer', url: 'https://suleman-zaheer.vercel.app/services' },
        { '@type': 'SiteNavigationElement', position: 4, name: 'Projects by Suleman Zaheer', url: 'https://suleman-zaheer.vercel.app/projects' },
        { '@type': 'SiteNavigationElement', position: 5, name: 'Suleman Zaheer Blog', url: 'https://suleman-zaheer.vercel.app/blog' },
        { '@type': 'SiteNavigationElement', position: 6, name: 'Suleman Zaheer Poetry', url: 'https://suleman-zaheer.vercel.app/poetry' },
        { '@type': 'SiteNavigationElement', position: 7, name: 'Suleman Zaheer CV', url: 'https://suleman-zaheer.vercel.app/cv' },
        { '@type': 'SiteNavigationElement', position: 8, name: 'Contact Suleman Zaheer', url: 'https://suleman-zaheer.vercel.app/contact' }
      ]
    },

    // 8. HowTo Schema – AEO: How to hire Suleman Zaheer
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Hire Suleman Zaheer – Business Growth Partner & Flutter/Next.js Expert in Lahore',
      description: 'Step-by-step guide to hiring Suleman Zaheer for Data Analysis, Flutter Mobile Apps, Next.js Web Apps, Shopify Store development, or SEO services.',
      totalTime: 'PT24H',
      tool: [
        { '@type': 'HowToTool', name: 'Email' },
        { '@type': 'HowToTool', name: 'Contact Form' },
        { '@type': 'HowToTool', name: 'WhatsApp' }
      ],
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Visit the Services Page',
          text: 'Go to suleman-zaheer.vercel.app/services and choose your required service: Web App, Mobile App, Serverless App, or Custom Website.',
          url: 'https://suleman-zaheer.vercel.app/services'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Contact via Email or Form',
          text: 'Send your project requirements to samstacktechs@gmail.com or use the contact form at suleman-zaheer.vercel.app/contact.',
          url: 'https://suleman-zaheer.vercel.app/contact'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Get a Free Consultation',
          text: 'Suleman Zaheer will respond within 24 hours with a free consultation, timeline estimate, and project proposal.'
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Project Kickoff',
          text: 'Agree on terms, timeline and milestone payments. Suleman starts building your project with regular progress updates.'
        }
      ]
    },

    // 9. ProfilePage Schema – Google's 2024 Standard for Personal Entities
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': 'https://suleman-zaheer.vercel.app/#profilepage',
      mainEntity: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
      name: 'Suleman Zaheer – Official Profile',
      headline: 'Software Engineer, Web Developer, and Urdu Poet from Lahore, Pakistan',
      url: 'https://suleman-zaheer.vercel.app/',
      image: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg',
      dateCreated: '2024-01-01T00:00:00Z',
      dateModified: new Date().toISOString()
    },

    // 10. CreativeWork (Poetry) – Establishes the "Writer/Poet" Entity
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': 'https://suleman-zaheer.vercel.app/#poetry-collection',
      name: 'Suleman Zaheer Poetry Collection',
      alternateName: 'سلیمان ظہیر کی شاعری',
      author: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
      genre: 'Urdu Poetry, Ghazal, Nazm',
      url: 'https://suleman-zaheer.vercel.app/poetry',
      inLanguage: 'ur',
      description: 'A collection of classic and contemporary Urdu poetry written by Suleman Zaheer.'
    },

    // 11. SoftwareApplication – Establishes the "Engineer/Developer" Entity
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://suleman-zaheer.vercel.app/#software-projects',
      name: 'SAMStack Software Solutions',
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web, iOS, Android',
      author: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
      url: 'https://suleman-zaheer.vercel.app/projects',
      description: 'Enterprise-grade Web Applications, Mobile Apps, and Serverless Systems developed by Suleman Zaheer.'
    },

    // 12. ImageObject – Targeted SEO for Personal Photos
    {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      '@id': 'https://suleman-zaheer.vercel.app/#primaryimage',
      url: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg',
      contentUrl: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg',
      name: 'Suleman Zaheer – Business Growth Partner & Software Engineer',
      caption: 'Suleman Zaheer (سلیمان ظہیر), a professional Data Analyst, Flutter/Next.js Expert, and Literature Author from Shahdara, Lahore, Pakistan.',
      description: 'Portrait of Suleman Zaheer working as a Full Stack Web Developer and Mobile App Developer in Lahore, Pakistan.',
      keywords: 'Suleman Zaheer, Software Engineer, Web Developer, Lahore, Shahdara, Poet, MERN Stack',
      author: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
      creator: { '@id': 'https://suleman-zaheer.vercel.app/#person' }
    }
  ];

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Primary JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to critical third-party origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS Prefetch for social & analytics domains */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Providers>
          <div className="min-h-screen bg-neutral-950 text-white selection:bg-primary/30 selection:text-primary relative">
            <NavbarWrapper />
            <main>{children}</main>
            <FooterWrapper />
          </div>
        </Providers>
      </body>
    </html>
  );
}
