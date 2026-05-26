import React from 'react';
import ContactClient from '@/components/ContactClient';

export const metadata = {
  title: "Contact Suleman Zaheer – Hire Full Stack MERN Developer in Lahore",
  description: "Contact Suleman Zaheer for professional web development services. Available for MERN Stack, Next.js, React, Node.js, and Laravel projects. Based in Lahore, Pakistan.",
  keywords: [
    "Contact Suleman Zaheer", "Hire Suleman Zaheer", "Suleman Zaheer WhatsApp", "Suleman Zaheer Email",
    "Hire MERN Developer Lahore", "Hire Full Stack Developer Pakistan",
    "Web Developer Lahore", "Hire React Developer Pakistan",
    "Hire Next.js Developer Pakistan", "Hire Node.js Developer Pakistan"
  ],
  alternates: {
    canonical: "https://suleman-zaheer.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Suleman Zaheer – Hire Full Stack Developer",
    description: "Hire Suleman Zaheer for enterprise-grade web development. MERN Stack, Next.js, React, Node.js expert based in Lahore, Pakistan.",
    url: "https://suleman-zaheer.vercel.app/contact",
    images: [{ url: "/assets/suleman-zaheer-full-stack-developer.jpg", width: 1200, height: 630, alt: "Contact Suleman Zaheer – Full Stack Developer" }],
  },
};

export default function ContactPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Suleman Zaheer Web Development Services",
    "image": "https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg",
    "url": "https://suleman-zaheer.vercel.app/contact",
    "telephone": "+923284146031",
    "priceRange": "$$",
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
      "latitude": 31.6211,
      "longitude": 74.3031
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://github.com/imsuleman-10",
      "https://pk.linkedin.com/in/suleman-zaheer-mughal"
    ]
  };

  return (
    <div className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactClient />
      </div>
    </div>
  );
}
