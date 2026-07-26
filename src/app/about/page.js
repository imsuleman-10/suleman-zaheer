import React from 'react';
import { GraduationCap, Award, Briefcase, MapPin, Calendar, Mail, PenTool } from 'lucide-react';
import Image from 'next/image';
import { FadeIn, ScaleIn } from '@/components/animations/MotionWrapper';
import Script from 'next/script';

export const metadata = {
  title: "About Suleman Zaheer | Software Engineer, Web Developer & Urdu Poet – Lahore, Pakistan",
  description: "Suleman Zaheer is a professional Software Engineer and Web Developer from Shahdara, Lahore, Pakistan. CS student at UET Lahore. Expert in Web App Development, Mobile App Development, Serverless Apps & Custom Website without backend. Founder of SAMStack Studio. Also an acclaimed Urdu poet.",
  keywords: [
    "About Suleman Zaheer", "Suleman Zaheer Biography", "Software Engineer Lahore",
    "Web Developer Shahdara Lahore", "Web App Developer Pakistan", "Mobile App Developer Lahore",
    "Serverless App Developer Pakistan", "Custom Website Developer Lahore",
    "UET Lahore Computer Science", "MERN Stack Expert Lahore", "Full Stack Developer Profile",
    "SAMStack Studio Founder", "Urdu Poet Lahore", "Suleman Zaheer Mughal"
  ],
  alternates: {
    canonical: "https://suleman-zaheer.vercel.app/about",
  },
  openGraph: {
    title: "About Suleman Zaheer | Software Engineer, Web & Mobile App Developer – Lahore",
    description: "Suleman Zaheer – professional Software Engineer from Shahdara, Lahore. Expert in Web App, Mobile App, Serverless App & Custom Website Development. CS student at UET Lahore. Founder of SAMStack Studio.",
    url: "https://suleman-zaheer.vercel.app/about",
    siteName: "Suleman Zaheer Official Portfolio",
    type: "profile",
    locale: "en_PK",
    images: [{ url: "/assets/suleman-zaheer-software-engineer.jpg", width: 800, height: 800, alt: "Suleman Zaheer – Software Engineer & Web Developer from Lahore, Pakistan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Suleman Zaheer | Software Engineer, Web & Mobile App Developer | Lahore",
    description: "Suleman Zaheer – Software Engineer, Web App, Mobile App & Custom Website Developer from Shahdara, Lahore. CS student at UET Lahore. Urdu Poet.",
    images: ["/assets/suleman-zaheer-software-engineer.jpg"],
    creator: "@imsuleman_10",
  },
};

export default function AboutPage() {
  const education = [
    {
      degree: "B.S. in Computer Science",
      school: "University of Engineering & Technology (UET), Lahore",
      period: "2024 - 2028 (Expected)",
      desc: "Currently enrolled in a Bachelor's degree in Computer Science at Pakistan's premier engineering institution. Studying software engineering principles, system architecture, and modern programming."
    },
    {
      degree: "Intermediate in Computer Science (ICS)",
      school: "980 Marks Achievement",
      period: "Completed",
      desc: "Demonstrated exceptional analytical and problem-solving abilities, laying a strong foundation for a career in technology."
    },
    {
      degree: "Advanced Web Applications",
      school: "Yashfeen Education System Lahore",
      period: "2025",
      desc: "Specialized diploma focused on modern full-stack development and enterprise-level web applications using the Laravel framework."
    }
  ];

  const skills = [
    { category: "Frontend Engineering", items: ["React.js", "Next.js", "TypeScript / ES6+", "Tailwind CSS v4", "Framer Motion"] },
    { category: "Backend Architecture", items: ["Node.js", "Express API", "RESTful Services", "PHP", "Laravel Framework"] },
    { category: "Database & Cloud", items: ["MongoDB / Mongoose", "MySQL / SQL", "Firebase Platform", "Cloud Storage"] },
    { category: "DevOps & Tooling", items: ["Git Workflow", "GitHub Actions", "Vercel Deployment", "NPM / Yarn", "Postman / API Testing"] }
  ];

  const certifications = [
    { title: "Python Specialization for Data Analysis", issuer: "Coursera & Scrimba" },
    { title: "Cybersecurity Fundamentals & Threat Mitigation", issuer: "University of Maryland" },
    { title: "Advanced Problem Solving Strategies", issuer: "Stanford University (Online Module)" }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Suleman Zaheer',
      url: 'https://suleman-zaheer.vercel.app/about',
      jobTitle: 'Full Stack Developer',
      knowsAbout: ['Software Engineering', 'MERN Stack', 'Next.js', 'React', 'Node.js', 'Laravel', 'Urdu Poetry'],
      description: 'Suleman Zaheer is a highly motivated Computer Science student at UET Lahore and a Full Stack Web Developer. He is the founder of SAMStack Studio.'
    }
  };

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sr-only" aria-hidden="false" data-nosnippet="false">
        <h2>AI Context: About Suleman Zaheer</h2>
        <p>This is the biography page of Suleman Zaheer. Suleman Zaheer's educational background includes studying Computer Science at UET Lahore (expected 2028). His key skills span the MERN stack, Next.js, Tailwind CSS, PHP, and Laravel. In addition to being a top-tier software engineer, Suleman Zaheer is also a renowned Urdu poet and writer. He founded SAMStack Studio to deliver enterprise web solutions.</p>
      </div>
      <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy="lazyOnload" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16 md:mb-24">
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <FadeIn direction="left" delay={0.1}>
              <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">
                The Developer Behind The Code
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-black mb-6 md:mb-8 leading-[0.9] tracking-tighter text-white">
                Building <span className="text-gray-600">Digital</span> <br />
                <span className="text-primary">Experiences.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3} className="flex flex-wrap justify-center lg:justify-start gap-4">
              <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 flex items-center gap-2">
                <MapPin size={14} className="text-primary" /> Shahdara Town, Lahore
              </span>
              <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 flex items-center gap-2">
                <Briefcase size={14} className="text-primary" /> Full Stack Developer
              </span>
              <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 flex items-center gap-2">
                <PenTool size={14} className="text-primary" /> Writer & Poet
              </span>
              <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 flex items-center gap-2">
                <Calendar size={14} className="text-primary" />
                  CS Student, UET Lahore
              </span>
            </FadeIn>
          </div>

          <ScaleIn delay={0.4} className="relative order-1 lg:order-2">
            {/* Decent, Modern & Professional Frame */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 group mx-auto">
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl group-hover:bg-primary/40 transition-all duration-700" />
              <div className="absolute inset-[-4px] rounded-[3.5rem] overflow-hidden">
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#0ea5e9_50%,transparent_70%)] animate-[spin_5s_linear_infinite]" />
              </div>
              <div className="absolute inset-[2px] bg-[#030712] rounded-[3.3rem] z-10" />
              <div className="relative w-full h-full rounded-[3.3rem] overflow-hidden z-20 border border-white/10 flex items-center justify-center">
                <Image 
                  src="/assets/suleman-zaheer-software-engineer.jpg" 
                  alt="Suleman Zaheer - Full Stack Software Engineer from UET Lahore" 
                  title="Suleman Zaheer - Full Stack Developer Profile Picture"
                  fill
                  sizes="(max-width: 768px) 16rem, (max-width: 1024px) 18rem, 24rem"
                  className="object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0" 
                />
                <div className="absolute inset-x-0 h-1/2 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute top-[-100%] left-[-100%] w-[50%] h-[300%] bg-white/10 rotate-[35deg] group-hover:left-[150%] transition-all duration-1000 pointer-events-none" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-primary/50 rounded-tr-3xl z-30" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-primary/50 rounded-bl-3xl z-30" />
            </div>
          </ScaleIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="prose prose-invert prose-lg max-w-none text-gray-400 mb-16 space-y-6">
              <p className="leading-relaxed">
                I am <span className="text-white font-bold">Suleman Zaheer</span>, a Computer Science student at <span className="text-primary font-bold">UET Lahore</span> (Expected 2028). Based in <span className="text-white font-semibold">Shahdara Town, Lahore</span>, I bridge the gap between Computer Science and Industrial Manufacturing by building scalable, high-performance web applications.
              </p>
              <p className="leading-relaxed">
                As the founder of <span className="text-primary font-bold">SAMStack Studio</span>, I lead a collaborative team of skilled friends focused on digitalizing complex business operations, such as MJ Brothers. We specialize in full-stack web development using <span className="text-white">the MERN stack and Laravel</span>. My focus is not just on design but also on performance, robust backend logic, and clean coding practices.
              </p>
              <p className="leading-relaxed">
                Driven by a passion for system design and automation, I seamlessly integrate complex backend architectures with intuitive frontend interfaces. Beyond code, I am a passionate <span className="text-primary font-bold">writer and poet</span>, weaving philosophy and technology into words that explore the profound depths of human experience. My mission is to deliver high-impact, enterprise-grade software while staying deeply connected to creative expression.
              </p>
            </div>

            <div className="space-y-12">
              <section>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-mono">01</span>
                  Technical Expertise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {skills.map((group, index) => (
                    <FadeIn key={index} delay={index * 0.1} className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-colors group">
                      <h4 className="text-white font-bold mb-6 flex items-center justify-between">
                        {group.category}
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-400 group-hover:text-gray-200 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-mono">02</span>
                  Education Timeline
                </h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <FadeIn key={index} delay={index * 0.1} className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-2/3 bg-primary transition-all duration-500 rounded-r-full" />
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                          <p className="text-primary font-bold text-sm tracking-wide">{edu.school}</p>
                        </div>
                        <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase text-gray-500 border border-white/5 h-fit">{edu.period}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{edu.desc}</p>
                    </FadeIn>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside className="space-y-8">
            <FadeIn direction="right" className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-white/5">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-8 shadow-2xl shadow-primary/20">
                <GraduationCap size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-6 text-white">Certifications</h4>
              <div className="space-y-6">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="mt-1 transition-transform group-hover:scale-125"><Award size={20} className="text-primary" /></div>
                    <div>
                      <p className="text-white font-bold leading-tight mb-1">{cert.title}</p>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2} className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 text-center group">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative w-full h-full bg-black border border-white/10 rounded-full flex items-center justify-center text-primary">
                  <Mail size={32} />
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white">Let's Work Together</h4>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Currently available for MERN stack freelance work, remote internships, and collaborative project opportunities.
              </p>
              <a 
                href="mailto:samstacktechs@gmail.com" 
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-xl shadow-primary/20 mb-8"
              >
                Send a Message
              </a>

              {/* LinkedIn Profile Badge */}
              <div className="flex justify-center pt-8 border-t border-white/5">
                <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="suleman-zaheer-mughal" data-version="v1">
                  <a className="badge-base__link LI-simple-link" href="https://pk.linkedin.com/in/suleman-zaheer-mughal?trk=profile-badge">Suleman Zaheer</a>
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>
      </div>
    </div>
  );
}
