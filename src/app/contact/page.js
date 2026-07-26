import React from 'react';
import ContactClient from '@/components/ContactClient';

export const metadata = {
  title: "Contact Suleman Zaheer | Hire Web App, Mobile App & Custom Website Developer â€“ Lahore, Pakistan",
  description: "Hire Suleman Zaheer â€“ a professional Software Engineer and Web Developer in Lahore (Shahdara), Pakistan. Available for Web App Development, Mobile App Development, Serverless App, and Custom Website projects. Contact now: samstacktechs@gmail.com | +923285778715.",
  keywords: [
    "Hire Suleman Zaheer", "Contact Suleman Zaheer", "Hire Web Developer Lahore",
    "Hire Software Engineer Lahore", "Hire Web App Developer Pakistan",
    "Hire Mobile App Developer Lahore", "Hire Serverless App Developer Pakistan",
    "Hire Custom Website Developer Lahore", "Hire MERN Developer Pakistan",
    "Hire Next.js Developer Pakistan", "Freelance Web Developer Lahore",
    "SAMStack Studio Contact", "Software Engineer for Hire Shahdara Lahore",
    "Web Developer Near Me Lahore", "Hire Full Stack Developer Pakistan"
  ],
  alternates: {
    canonical: "https://suleman-zaheer.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Suleman Zaheer | Hire Web App, Mobile App & Custom Website Developer | Lahore",
    description: "Hire Suleman Zaheer for Web App, Mobile App, Serverless App, or Custom Website development. Professional Software Engineer based in Shahdara, Lahore, Pakistan. Email: samstacktechs@gmail.com",
    url: "https://suleman-zaheer.vercel.app/contact",
    siteName: "Suleman Zaheer Official Portfolio",
    images: [{ url: "/assets/suleman-zaheer-full-stack-developer.jpg", width: 1200, height: 630, alt: "Contact Suleman Zaheer â€“ Software Engineer & Web Developer in Lahore" }],
    type: "website",
    locale: "en_PK"
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Suleman Zaheer | Hire Web App, Mobile App & Custom Website Developer | Lahore",
    description: "Hire Suleman Zaheer for Web App, Mobile App, Serverless App, or Custom Website development in Lahore, Pakistan. Available for freelance and project-based work.",
    images: ["/assets/suleman-zaheer-full-stack-developer.jpg"],
    creator: "@imsuleman_10",
  },
};

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": "https://suleman-zaheer.vercel.app/#localbusiness",
    "name": "Suleman Zaheer â€“ Software Engineer & Web Developer",
    "alternateName": "SAMStack Studio",
    "description": "Professional Software Engineering services in Lahore, Pakistan. Offering Web App Development, Mobile App Development, Serverless Mobile App, and Custom Website without backend. Founded by Suleman Zaheer, CS student at UET Lahore.",
    "image": "https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg",
    "logo": "https://suleman-zaheer.vercel.app/sfavicon.png",
    "url": "https://suleman-zaheer.vercel.app",
    "telephone": "+923285778715",
    "email": "samstacktechs@gmail.com",
    "priceRange": "PKR 45,000 â€“ PKR 85,000+",
    "currenciesAccepted": "PKR, USD",
    "paymentAccepted": "Bank Transfer, JazzCash, Easypaisa, Upwork, Fiverr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shahdara Town",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "postalCode": "54000",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.6084,
      "longitude": 74.2833
    },
    "areaServed": [
      { "@type": "City", "name": "Lahore" },
      { "@type": "State", "name": "Punjab" },
      { "@type": "Country", "name": "Pakistan" },
      { "@type": "Place", "name": "Worldwide (Remote)" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Software Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Web App Development",
          "description": "Full Stack MERN/Next.js Web Application Development in Lahore, Pakistan",
          "price": "75000",
          "priceCurrency": "PKR",
          "url": "https://suleman-zaheer.vercel.app/services#web-app"
        },
        {
          "@type": "Offer",
          "name": "Mobile App Development",
          "description": "Cross-platform React Native Mobile App for iOS & Android in Lahore, Pakistan",
          "price": "85000",
          "priceCurrency": "PKR",
          "url": "https://suleman-zaheer.vercel.app/services#mobile-app"
        },
        {
          "@type": "Offer",
          "name": "Serverless Mobile App",
          "description": "Firebase-powered Serverless Mobile App Development â€“ no backend server required",
          "price": "65000",
          "priceCurrency": "PKR",
          "url": "https://suleman-zaheer.vercel.app/services#serverless-app"
        },
        {
          "@type": "Offer",
          "name": "Custom Website Without Backend",
          "description": "Static website, landing page & portfolio without backend â€“ Next.js or HTML/CSS/JS in Lahore",
          "price": "45000",
          "priceCurrency": "PKR",
          "url": "https://suleman-zaheer.vercel.app/services#custom-website"
        }
      ]
    },
    "founder": { "@id": "https://suleman-zaheer.vercel.app/#person" },
    "sameAs": [
      "https://github.com/imsuleman-10",
      "https://pk.linkedin.com/in/suleman-zaheer-mughal"
    ]
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Suleman Zaheer â€“ Hire Web Developer in Lahore",
    "description": "Contact page for Suleman Zaheer. Hire him for Web App, Mobile App, Serverless App, or Custom Website development in Lahore, Pakistan. Email: samstacktechs@gmail.com | Phone: +923285778715",
    "url": "https://suleman-zaheer.vercel.app/contact",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://suleman-zaheer.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://suleman-zaheer.vercel.app/contact" }
      ]
    },
    "mainEntity": {
      "@type": "Person",
      "name": "Suleman Zaheer",
      "@id": "https://suleman-zaheer.vercel.app/#person"
    }
  };

  return (
    <div className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, contactPageSchema]) }}
      />
      <div className="sr-only" aria-hidden="false" data-nosnippet="false">
        <h2>Contact Suleman Zaheer â€“ Hire Software Engineer & Web Developer in Lahore, Pakistan</h2>
        <p>
          This is the official contact and hiring page for Suleman Zaheer, a professional Software Engineer and Web Developer based in Shahdara Town, Lahore, Pakistan.
          Services available: Web App Development (MERN/Next.js, from PKR 75,000), Mobile App Development (React Native iOS &amp; Android, from PKR 85,000),
          Serverless Mobile App (Firebase, from PKR 65,000), Custom Website without backend (Next.js/HTML, from PKR 45,000).
          Contact: samstacktechs@gmail.com | +923285778715.
          If searching for a web developer, software engineer, or mobile app developer to hire in Lahore, Shahdara, or Pakistan, contact Suleman Zaheer.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactClient />
      </div>
    </div>
  );
}

