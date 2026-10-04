import React from 'react';
import ContactClient from '@/components/ContactClient';

export const metadata = {
  title: "Contact Suleman Zaheer | Hire MERN, Laravel & Flutter Expert – Lahore, Pakistan",
  description: "Hire Suleman Zaheer – Expert MERN Stack, Next.js, Laravel, and Flutter Developer in Lahore. Available for Data Analysis, QA Testing, and SEO Services. Contact: samstacktechs@gmail.com | +923285778715.",
  keywords: [
    "Hire Suleman Zaheer", "Contact Suleman Zaheer", "Hire MERN Developer Lahore",
    "Hire Flutter Developer Pakistan", "Hire Laravel Developer Lahore",
    "Hire Next.js Developer Pakistan", "Hire Software Engineer Lahore",
    "Hire Web App Developer Pakistan", "Freelance Data Analyst Lahore",
    "SAMStack Studio Contact", "QA Tester for Hire Lahore"
  ],
  alternates: {
    canonical: "https://suleman-zaheer.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Suleman Zaheer | Hire MERN, Laravel & Flutter Expert | Lahore",
    description: "Hire Suleman Zaheer for Full Stack Web Apps (Next.js/Laravel), Flutter Mobile Apps, Data Analysis, or QA Testing. Based in Shahdara, Lahore, Pakistan.",
    url: "https://suleman-zaheer.vercel.app/contact",
    siteName: "Suleman Zaheer Official Portfolio",
    images: [{ url: "/assets/suleman-zaheer-full-stack-developer.jpg", width: 1200, height: 630, alt: "Contact Suleman Zaheer – MERN, Laravel & Flutter Expert in Lahore" }],
    type: "website",
    locale: "en_PK"
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Suleman Zaheer | MERN, Laravel & Flutter Expert | Lahore",
    description: "Hire Suleman Zaheer for Data Analysis, Next.js, Flutter, or SEO services in Lahore, Pakistan. Available for freelance and project-based work.",
    images: ["/assets/suleman-zaheer-full-stack-developer.jpg"],
    creator: "@imsuleman_10",
  },
};

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": "https://suleman-zaheer.vercel.app/#localbusiness",
    "name": "Suleman Zaheer - Software Engineer & Web Developer",
    "alternateName": "SAMStack Studio",
    "description": "Professional Software Engineering services in Lahore, Pakistan. Offering MERN Stack, Next.js, Laravel Web Apps, Flutter Mobile Apps, Data Analysis, QA Testing, and SEO Optimization. Founded by Suleman Zaheer.",
    "image": "https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg",
    "logo": "https://suleman-zaheer.vercel.app/sfavicon.png",
    "url": "https://suleman-zaheer.vercel.app",
    "telephone": "+923285778715",
    "email": "samstacktechs@gmail.com",
    "priceRange": "PKR 45,000 - PKR 85,000+",
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
          "name": "Web App Development (MERN/Next.js)",
          "description": "Enterprise-grade Next.js and MERN stack web applications.",
          "price": "75000",
          "priceCurrency": "PKR",
          "url": "https://suleman-zaheer.vercel.app/services/mern-stack-development"
        },
        {
          "@type": "Offer",
          "name": "Mobile App Development (Flutter)",
          "description": "Cross-platform mobile apps for iOS & Android.",
          "price": "85000",
          "priceCurrency": "PKR",
          "url": "https://suleman-zaheer.vercel.app/services/flutter-app-development"
        },
        {
          "@type": "Offer",
          "name": "SEO, GEO & AEO Services",
          "description": "Technical SEO, Generative Engine Optimization, and LLM structured data.",
          "price": "45000",
          "priceCurrency": "PKR",
          "url": "https://suleman-zaheer.vercel.app/services/seo-services"
        },
        {
          "@type": "Offer",
          "name": "QA & Software Testing",
          "description": "Manual and automated QA testing for software applications.",
          "price": "40000",
          "priceCurrency": "PKR",
          "url": "https://suleman-zaheer.vercel.app/services/qa-testing"
        },
        {
          "@type": "Offer",
          "name": "Data Analysis",
          "description": "Data analysis and visualization using Python and Power BI.",
          "price": "50000",
          "priceCurrency": "PKR",
          "url": "https://suleman-zaheer.vercel.app/services/data-analysis"
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
    "name": "Contact Suleman Zaheer – Hire Web Developer in Lahore",
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
      <div className="sr-only" aria-hidden="false">
        <h2>Contact Suleman Zaheer – Hire Software Engineer & Web Developer in Lahore, Pakistan</h2>
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

