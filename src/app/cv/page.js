import React from 'react';
import CVClient from '@/components/CVClient';

export const metadata = {
  title: "Suleman Zaheer CV – Professional Resume | Full Stack Developer",
  description: "View and download the professional resume/CV of Suleman Zaheer — Full Stack MERN Developer and CS student at UET Lahore. View qualifications, skills, and project experience.",
  keywords: [
    "Suleman Zaheer CV", "Suleman Zaheer Resume", "Suleman Zaheer Skills",
    "Software Engineer CV Pakistan", "MERN Stack Developer Resume",
    "Full Stack Developer CV Lahore", "UET Lahore Student CV"
  ],
  alternates: {
    canonical: "https://suleman-zaheer.web.app/cv",
  },
  openGraph: {
    title: "Suleman Zaheer CV – Professional Resume & Qualifications",
    description: "View and download the professional CV of Suleman Zaheer. Full Stack Developer and CS student at UET Lahore.",
    url: "https://suleman-zaheer.web.app/cv",
    images: [{ url: "/assets/suleman-zaheer-full-stack-developer.jpg", width: 1200, height: 630, alt: "Suleman Zaheer CV" }],
  },
};

export default function CVPage() {
  return <CVClient />;
}
