import React from 'react';
import CVClient from '@/components/CVClient';

export const metadata = {
  title: "Suleman Zaheer CV – Professional Resume | Full Stack Developer & Software Engineer",
  description: "Download and view the professional resume of Suleman Zaheer — Full Stack MERN Developer, CS student at UET Lahore. Skills: React, Next.js, Node.js, Laravel, MongoDB, MySQL.",
  keywords: [
    "Suleman Zaheer CV", "Suleman Zaheer Resume", "Suleman Zaheer Skills",
    "Software Engineer CV Pakistan", "MERN Stack Developer Resume",
    "Full Stack Developer CV Lahore", "UET Lahore Student CV",
    "React Developer Resume Pakistan", "Next.js Developer CV",
    "Node.js Developer Resume Pakistan", "Laravel Developer CV Lahore"
  ],
  alternates: {
    canonical: "https://suleman-zaheer.vercel.app/cv",
  },
  openGraph: {
    title: "Suleman Zaheer CV – Professional Resume & Qualifications",
    description: "View and download the professional CV of Suleman Zaheer. Full Stack MERN Developer and CS student at UET Lahore with expertise in React, Next.js, Node.js, and Laravel.",
    url: "https://suleman-zaheer.vercel.app/cv",
    images: [{ url: "/assets/suleman-zaheer-full-stack-developer.jpg", width: 1200, height: 630, alt: "Suleman Zaheer CV – Full Stack Developer Resume" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suleman Zaheer CV – Full Stack Developer Resume",
    description: "Professional CV of Suleman Zaheer. MERN Stack, React, Next.js, Node.js, Laravel expert. CS student at UET Lahore, Pakistan.",
    images: ["/assets/suleman-zaheer-full-stack-developer.jpg"],
    creator: "@imsuleman_10",
  },
};

export default function CVPage() {
  return <CVClient />;
}
