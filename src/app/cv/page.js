import React from 'react';
import CVClient from '@/components/CVClient';

export const metadata = {
  title: "Hire Suleman Zaheer | MERN, Laravel & Flutter Expert Resume",
  description: "Download the official CV of Suleman Zaheer. Expert MERN Stack, Next.js, Laravel, and Flutter Developer in Lahore, Pakistan. Also providing Data Analysis, SEO & QA Testing.",
  keywords: [
    "Suleman Zaheer CV", "Hire MERN Developer Lahore",
    "Hire Laravel Developer Pakistan", "Hire Flutter Developer Pakistan",
    "Data Analyst CV Pakistan", "SEO Expert Resume Lahore", "QA Tester CV Pakistan",
    "Next.js Expert CV"
  ],
  alternates: {
    canonical: "https://suleman-zaheer.vercel.app/cv",
  },
  openGraph: {
    title: "Hire Suleman Zaheer | MERN, Laravel & Flutter Expert Resume",
    description: "View the official CV of Suleman Zaheer. Expert MERN Stack, Next.js, Laravel, and Flutter Developer based in Lahore, Pakistan.",
    url: "https://suleman-zaheer.vercel.app/cv",
    images: [{ url: "/assets/suleman-zaheer-full-stack-developer.jpg", width: 1200, height: 630, alt: "Suleman Zaheer CV - MERN, Laravel & Flutter Developer" }],
    type: "profile"
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Suleman Zaheer | MERN, Laravel & Flutter Expert Resume",
    description: "Professional CV of Suleman Zaheer. MERN, Next.js, Laravel & Flutter Developer from Lahore, Pakistan.",
    images: ["/assets/suleman-zaheer-full-stack-developer.jpg"],
    creator: "@imsuleman_10",
  },
};

export default function CVPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': 'https://suleman-zaheer.vercel.app/cv#profilepage',
      name: 'Suleman Zaheer - Professional Resume & CV',
      url: 'https://suleman-zaheer.vercel.app/cv',
      description: 'Official professional resume and CV of Suleman Zaheer - MERN, Next.js, Laravel & Flutter Developer from Lahore, Pakistan.',
      mainEntity: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        alternateName: ['سلیمان ظہیر', 'Suleman Zaheer Mughal'],
        url: 'https://suleman-zaheer.vercel.app',
        image: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg',
        email: 'samstacktechs@gmail.com',
        telephone: '+923285778715',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Shahdara Town',
          addressLocality: 'Lahore',
          addressRegion: 'Punjab',
          addressCountry: 'PK',
        },
        jobTitle: 'MERN Stack, Next.js, Laravel & Flutter Developer | Data Analyst | QA Tester | SEO Expert',
        description: 'Suleman Zaheer is a professional Full Stack Developer, Data Analyst, and QA Tester based in Lahore, Pakistan. He is the founder of SAMStack Studio and a Computer Science student at UET Lahore.',
        sameAs: [
          'https://github.com/imsuleman-10',
          'https://www.linkedin.com/in/suleman-zaheer-mughal',
          'https://x.com/imsuleman_10',
        ],
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'University of Engineering and Technology (UET) Lahore', sameAs: 'https://uet.edu.pk/' },
          { '@type': 'EducationalOrganization', name: 'Govt Islamia College Civil Lines, Lahore' }
        ],
        knowsAbout: [
          'MERN Stack', 'Next.js', 'Laravel', 'Flutter', 'React.js', 'Node.js',
          'MongoDB', 'Python', 'Data Analysis', 'Power BI', 'SQL',
          'QA Testing', 'Selenium', 'Playwright', 'Technical SEO', 'GEO', 'AEO', 'LLMO'
        ],
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Full Stack Software Developer',
          description: 'Builds enterprise web and mobile applications using MERN Stack, Next.js, Laravel, and Flutter.',
          skills: 'MERN Stack, Next.js, Laravel, Flutter, Data Analysis, QA Testing, SEO'
        },
        worksFor: {
          '@type': 'Organization',
          name: 'SAMStack Studio',
          url: 'https://suleman-zaheer.vercel.app'
        }
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Resume / CV', item: 'https://suleman-zaheer.vercel.app/cv' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Suleman Zaheer\'s primary tech stack?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer\'s primary tech stack includes MERN Stack (MongoDB, Express.js, React.js, Node.js), Next.js 14/15 with App Router, Laravel (PHP), and Flutter (Dart) for cross-platform mobile development. He also works with Python for Data Analysis and Playwright/Jest for QA Testing.'
          }
        },
        {
          '@type': 'Question',
          name: 'How many years of experience does Suleman Zaheer have?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer has been building professional web and mobile applications since 2022, with over 2 years of production-level experience in MERN Stack, Next.js, Laravel, and Flutter development, as well as Data Analysis and SEO.'
          }
        },
        {
          '@type': 'Question',
          name: 'Does Suleman Zaheer have a degree in Computer Science?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Suleman Zaheer is currently pursuing a B.S. in Computer Science at the University of Engineering and Technology (UET) Lahore, one of Pakistan\'s top-ranked engineering universities. He is expected to graduate in 2028. He previously completed his ICS from Govt Islamia College Civil Lines with 980 marks.'
          }
        },
        {
          '@type': 'Question',
          name: 'What services does Suleman Zaheer offer as a freelancer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'As a freelancer, Suleman Zaheer offers: MERN Stack & Next.js web app development, Laravel backend development, Flutter mobile app development (iOS & Android), Data Analysis & Business Intelligence (Python, Power BI), QA & Software Testing, and Technical SEO including GEO & AEO optimization.'
          }
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <CVClient />
    </>
  );
}
