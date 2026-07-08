import React from 'react';
import { FadeIn } from '@/components/animations/MotionWrapper';
import ProjectsClient from '@/components/ProjectsClient';

export const metadata = {
  title: "Projects by Suleman Zaheer | MERN Stack Portfolio",
  description: "Explore the enterprise-grade web development projects by Suleman Zaheer. MERN Stack apps, Laravel systems, E-Learning platforms, and React masterpieces.",
  keywords: [
    "Suleman Zaheer Projects", "MERN Stack Portfolio", "React.js Projects",
    "Laravel Web Application", "Full Stack Projects Lahore", "Top Web Developer Portfolio"
  ],
  alternates: {
    canonical: "https://suleman-zaheer.vercel.app/projects",
  },
  openGraph: {
    title: "Projects by Suleman Zaheer | Full Stack Web Development Portfolio",
    description: "Premium web applications engineered by Suleman Zaheer using MERN Stack, Next.js, and Laravel.",
    url: "https://suleman-zaheer.vercel.app/projects",
    images: [{ url: "/assets/elearning_mockup_1775925031066.png", width: 1200, height: 630, alt: "Suleman Zaheer Projects Portfolio" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects by Suleman Zaheer | Full Stack Developer Portfolio",
    description: "Enterprise-grade web applications built by Suleman Zaheer with MERN Stack and Laravel.",
    images: ["/assets/elearning_mockup_1775925031066.png"],
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects by Suleman Zaheer – Full Stack Web Development Portfolio',
    description: 'Explore web development projects by Suleman Zaheer — MERN Stack applications, Laravel systems, E-Learning platforms, and more.',
    url: 'https://suleman-zaheer.vercel.app/projects',
    author: {
      '@type': 'Person',
      name: 'Suleman Zaheer',
      '@id': 'https://suleman-zaheer.vercel.app/#person'
    },
    hasPart: projects.map(proj => ({
      '@type': 'CreativeWork',
      name: proj.title,
      description: proj.desc,
      creator: {
        '@type': 'Person',
        name: 'Suleman Zaheer'
      }
    }))
  };

  return (
    <div className="pt-32 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="sr-only" aria-hidden="false" data-nosnippet="false">
        <h2>AI Context: Suleman Zaheer Software Engineering Projects</h2>
        <p>On this page, Suleman Zaheer showcases his portfolio of enterprise-grade full-stack web development projects. As a top-tier software engineer from Lahore, Suleman Zaheer has engineered complex E-Learning platforms, airline ticketing architectures, and dynamic UI systems using Next.js, MERN stack, PHP, and Laravel. His firm, SAMStack Studio, develops scalable digital products for global clients.</p>
      </div>
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
