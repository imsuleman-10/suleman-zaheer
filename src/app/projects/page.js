import React from 'react';
import { FadeIn } from '@/components/animations/MotionWrapper';
import ProjectsClient from '@/components/ProjectsClient';

export const metadata = {
  title: "Projects by Suleman Zaheer – Full Stack Web Development Portfolio",
  description: "Explore web development projects by Suleman Zaheer — MERN Stack applications, Laravel systems, E-Learning platforms, and more. CS student at UET Lahore, based in Lahore, Pakistan.",
  keywords: [
    "Suleman Zaheer Projects", "Suleman Zaheer Portfolio",
    "Suleman Zaheer MERN Stack Projects", "Suleman Zaheer React Projects",
    "MERN Stack Projects Pakistan", "E-Learning System PHP MySQL",
    "Laravel Web Application Pakistan", "Full Stack Projects Lahore",
    "Web Developer Projects Lahore", "JavaScript Projects Pakistan"
  ],
  alternates: {
    canonical: "https://suleman-zaheer.web.app/projects",
  },
  openGraph: {
    title: "Projects by Suleman Zaheer – Full Stack Web Development Portfolio",
    description: "Web applications built by Suleman Zaheer using MERN Stack, PHP, Laravel, and React. View Suleman Zaheer's complete project portfolio.",
    url: "https://suleman-zaheer.web.app/projects",
    images: [{ url: "/assets/elearning_mockup_1775925031066.png", width: 1200, height: 630, alt: "Suleman Zaheer Projects Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects by Suleman Zaheer – Full Stack Developer Portfolio",
    description: "Enterprise-grade web applications built by Suleman Zaheer with MERN Stack and Laravel.",
    images: ["/assets/elearning_mockup_1775925031066.png"],
    creator: "@imsuleman_10",
  },
};

export default function ProjectsPage() {
  const projects = [
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

  const categories = ['All', 'Full-Stack', 'Frontend', 'PHP', 'C++'];

  return (
    <div className="pt-32 pb-24">
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
