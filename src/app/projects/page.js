import React from 'react';
import { FadeIn } from '@/components/animations/MotionWrapper';
import ProjectsClient from '@/components/ProjectsClient';

export const metadata = {
  title: "Projects & Case Studies by Suleman Zaheer | Next.js, Flutter & Enterprise Portfolio – Lahore, Pakistan",
  description: "Explore enterprise-grade case studies by Suleman Zaheer – Business Growth Partner & Software Engineer in Lahore. Portfolio includes Next.js Web Apps, Flutter Mobile Apps, Data Analytics Dashboards, and B2B SaaS Platforms.",
  keywords: [
    "Suleman Zaheer Projects", "Software Development Portfolio Lahore", "Next.js Projects Pakistan",
    "Flutter App Portfolio", "Data Analytics Case Studies", "B2B SaaS Portfolio",
    "Enterprise Web App Portfolio Lahore", "Business Growth Case Studies Pakistan",
    "Software Engineer Portfolio Lahore", "SAMStack Studio Projects"
  ],
  alternates: {
    canonical: "https://suleman-zaheer.vercel.app/projects",
  },
  openGraph: {
    title: "Projects & Case Studies by Suleman Zaheer | Next.js, Flutter & Enterprise Portfolio | Lahore",
    description: "Portfolio of Suleman Zaheer – Enterprise Next.js Web Apps, Flutter Mobile Apps, Data Analytics, and B2B Platforms. Business Growth Partner from Lahore, Pakistan.",
    url: "https://suleman-zaheer.vercel.app/projects",
    siteName: "Suleman Zaheer Official Portfolio",
    images: [{ url: "/assets/suleman-zaheer-full-stack-developer.jpg", width: 1200, height: 630, alt: "Suleman Zaheer Projects Portfolio – Next.js, Flutter & Data Analytics in Lahore" }],
    type: "website",
    locale: "en_PK"
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects by Suleman Zaheer | Next.js, Flutter & Enterprise Solutions | Lahore",
    description: "Enterprise-grade projects by Suleman Zaheer – Next.js, Flutter, Data Analytics & B2B SaaS Platforms. Business Growth Partner from Lahore, Pakistan.",
    images: ["/assets/suleman-zaheer-full-stack-developer.jpg"],
    creator: "@imsuleman_10",
  },
};

export default function ProjectsPage() {
  const projects = [
    {
      title: "SAMStack Tech",
      category: "Next.js",
      tech: ["Next.js", "React", "Firebase", "TypeScript", "Tailwind"],
      desc: "An elite software engineering agency website built for SAMStack Tech. Features enterprise-grade service listings, internship programs, case studies, a blog, and AI-powered inquiry flows. Built with Next.js and Firebase.",
      image: "/assets/samstack_preview_v3.png",
      link: "https://samstack-tech.vercel.app/",
      github: "https://github.com/imsuleman-10/SAMStack.git"
    },
    {
      title: "SAM AI Clinic",
      category: "Next.js",
      tech: ["Next.js", "Firebase", "AI", "Tailwind", "TypeScript"],
      desc: "A premium AI-powered clinical management platform. Features patient onboarding, real-time appointment booking, electronic health records (EHR), digital billing, integrated pharmacy, and an AI health assistant — all secured with AES-256 encryption.",
      image: "/assets/samclinic_preview.png",
      link: "https://sam-clinic.vercel.app/",
      github: "https://github.com/imsuleman-10/SAM-AI-Clinic.git"
    },
    {
      title: "E-Learning System",
      category: "Full-Stack",
      tech: ["HTML", "CSS", "JS", "PHP", "MySQL"],
      desc: "A full system for student enrollment, video links, quizzes, and certificate generation.",
      image: "/assets/elearning_mockup_1775925031066.png",
      link: "#",
      github: "https://github.com/imsuleman-10/sam_college"
    },
    {
      title: "Airline Reservation",
      category: "PHP",
      tech: ["PHP", "MySQL", "Bootstrap"],
      desc: "Booking and managing flight reservations, including user accounts and ticket generation.",
      image: "/assets/airline_booking_ui_1775925066474.png",
      link: "#",
      github: "#"
    },
    {
      title: "Neon Portfolio",
      category: "Frontend",
      tech: ["HTML", "CSS", "JavaScript"],
      desc: "My professional portfolio website designed with Neon Glassmorphism.",
      image: "/assets/neon_portfolio_preview_1775925082987.png",
      link: "#",
      github: "#"
    },
    {
      title: "CGPA Calculator",
      category: "C++",
      tech: ["C++"],
      desc: "A client-side tool to calculate Cumulative Grade Point Average based on course data.",
      image: "/assets/cgpa_calculator_app_1775925552108.png",
      link: "#",
      github: "#"
    },
    {
      title: "Pharmacy Management",
      category: "Full-Stack",
      tech: ["HTML", "CSS", "Node.js"],
      desc: "Automates inventory and patient data for efficient pharmacy workflow.",
      image: "/assets/pharmacy_management_system_1775925936332.png",
      link: "#",
      github: "#"
    }
  ];

  const categories = ['All', 'Next.js', 'Full-Stack', 'Frontend', 'PHP', 'C++'];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://suleman-zaheer.vercel.app/projects#collectionpage',
      name: 'Projects & Case Studies by Suleman Zaheer',
      description: 'Enterprise-grade web and mobile application projects by Suleman Zaheer — MERN Stack, Next.js, Laravel, Flutter, Data Analytics, and AI-powered platforms built for businesses in Pakistan and internationally.',
      url: 'https://suleman-zaheer.vercel.app/projects',
      author: { '@type': 'Person', '@id': 'https://suleman-zaheer.vercel.app/#person', name: 'Suleman Zaheer' },
      mainEntity: {
        '@type': 'ItemList',
        name: 'Software Projects by Suleman Zaheer',
        itemListElement: projects.map((proj, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: proj.title,
            description: proj.desc,
            url: proj.link !== '#' ? proj.link : 'https://suleman-zaheer.vercel.app/projects',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web Browser',
            author: { '@type': 'Person', name: 'Suleman Zaheer', '@id': 'https://suleman-zaheer.vercel.app/#person' },
            keywords: proj.tech.join(', ')
          }
        }))
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://suleman-zaheer.vercel.app/projects' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What kind of projects has Suleman Zaheer built?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer has built enterprise-grade web and mobile applications including: SAMStack Studio (Next.js agency platform), SAM AI Clinic (AI-powered healthcare management), an E-Learning System (PHP/MySQL), Airline Reservation System, and various full-stack applications using MERN Stack, Laravel, and Flutter.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can Suleman Zaheer build a Next.js or MERN Stack web app?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Suleman Zaheer specializes in building production-grade Next.js and MERN Stack web applications. His projects include SaaS platforms, ERP systems, clinic management platforms, and agency websites with Firebase real-time databases and RESTful APIs.'
          }
        },
        {
          '@type': 'Question',
          name: 'Does Suleman Zaheer have Flutter or mobile app projects?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Suleman Zaheer builds cross-platform Flutter applications for iOS and Android. His mobile projects include healthcare apps, e-commerce stores, fintech wallets, and enterprise field-agent tools with Firebase, REST API, and local payment integrations (JazzCash, EasyPaisa).'
          }
        },
        {
          '@type': 'Question',
          name: 'Where can I see Suleman Zaheer\'s GitHub portfolio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer\'s open-source code and projects are available on GitHub at https://github.com/imsuleman-10. You can also view his full portfolio and case studies at https://suleman-zaheer.vercel.app/projects.'
          }
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-black leading-tight tracking-tight text-white">
              Featured <span className="text-gray-600">Works</span><br/>
              <span className="text-primary italic font-medium">& Case Studies</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-8">
              Exploring the intersection of design and technology through a variety of web and software projects.
            </p>
          </FadeIn>
        </div>

        <ProjectsClient projects={projects} categories={categories} />
      </div>
    </div>
  );
}
