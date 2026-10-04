import React from 'react';
import { GraduationCap, Award, Briefcase, MapPin, Calendar, Mail, PenTool } from 'lucide-react';
import Image from 'next/image';
import { FadeIn, ScaleIn } from '@/components/animations/MotionWrapper';
import Script from 'next/script';

export const metadata = {
  title: "About Suleman Zaheer | MERN, Laravel & Flutter Developer – Lahore, Pakistan",
  description: "Learn about Suleman Zaheer – Expert MERN Stack, Next.js, Laravel & Flutter Developer from Shahdara, Lahore, Pakistan. Business Growth Partner & Founder of SAMStack Studio.",
  keywords: [
    "About Suleman Zaheer", "Who is Suleman Zaheer", "Suleman Zaheer Biography",
    "Business Growth Consultant Lahore", "Data Analyst Lahore", "Flutter Developer Pakistan",
    "Next.js Expert Lahore", "MERN Stack Developer Lahore", "Laravel Developer Pakistan",
    "Software Tester QA Lahore", "SEO Expert Lahore", "UET Lahore Computer Science",
    "Govt Islamia College Civil Lines Lahore", "SAMStack Studio Founder",
    "Urdu Poet Lahore", "Suleman Zaheer Mughal", "Suleman Zaheer UET"
  ],
  alternates: {
    canonical: "https://suleman-zaheer.vercel.app/about",
  },
  openGraph: {
    title: "About Suleman Zaheer | MERN, Laravel & Flutter Developer – Lahore",
    description: "Learn about Suleman Zaheer – Expert MERN Stack, Next.js, Laravel & Flutter Developer from Shahdara, Lahore. Business Growth Partner & Founder of SAMStack Studio.",
    url: "https://suleman-zaheer.vercel.app/about",
    siteName: "Suleman Zaheer Official Portfolio",
    type: "profile",
    locale: "en_PK",
    images: [{ url: "/assets/suleman-zaheer-software-engineer.jpg", width: 800, height: 800, alt: "Suleman Zaheer – MERN, Laravel & Flutter Developer from Lahore, Pakistan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Suleman Zaheer | MERN, Laravel & Flutter Developer | Lahore",
    description: "Learn about Suleman Zaheer – Expert MERN, Next.js, Laravel & Flutter Developer from Lahore, Pakistan. Founder of SAMStack Studio.",
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
      school: "Govt Islamia College Civil Lines, Lahore",
      period: "Completed (980 Marks)",
      desc: "Demonstrated strong analytical skills and academic dedication during higher secondary education."
    },
    {
      degree: "Advanced Web Applications",
      school: "Yashfeen Education System Lahore",
      period: "2025",
      desc: "Specialized diploma focused on modern full-stack development and enterprise-level web applications using the Laravel framework."
    }
  ];

  const skills = [
    { category: "Frontend Engineering", items: ["React.js", "Next.js", "Flutter", "Tailwind CSS"] },
    { category: "Backend Architecture", items: ["Node.js", "MERN Stack", "PHP", "Laravel Framework"] },
    { category: "Testing & QA", items: ["Manual Testing", "Automated Testing", "Bug Tracking", "Performance Profiling"] },
    { category: "SEO & Growth", items: ["Technical SEO", "GEO / AEO", "Data Analysis", "Predictive Modeling"] }
  ];

  const certifications = [
    { title: "Python Specialization for Data Analysis", issuer: "Coursera & Scrimba" },
    { title: "Cybersecurity Fundamentals & Threat Mitigation", issuer: "University of Maryland" },
    { title: "Advanced Problem Solving Strategies", issuer: "Stanford University (Online Module)" }
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': 'https://suleman-zaheer.vercel.app/about#profilepage',
      name: 'About Suleman Zaheer - Full Stack Developer & Data Analyst',
      url: 'https://suleman-zaheer.vercel.app/about',
      description: 'Official About page of Suleman Zaheer - MERN Stack, Next.js, Laravel & Flutter Developer from Lahore, Pakistan.',
      mainEntity: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        alternateName: ['سلیمان ظہیر', 'Suleman Zaheer Mughal', 'S. Zaheer'],
        url: 'https://suleman-zaheer.vercel.app',
        image: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-software-engineer.jpg',
        jobTitle: 'MERN Stack, Next.js, Laravel & Flutter Developer | Data Analyst | QA Tester',
        description: 'Suleman Zaheer is an expert full stack developer and data analyst based in Shahdara Town, Lahore, Pakistan. He is currently pursuing a B.S. in Computer Science at UET Lahore (2024-2028) and is the founder of SAMStack Studio. He specializes in MERN Stack, Next.js, Laravel, and Flutter development for enterprise clients.',
        nationality: { '@type': 'Country', name: 'Pakistan' },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Shahdara Town',
          addressLocality: 'Lahore',
          addressRegion: 'Punjab',
          addressCountry: 'PK',
        },
        email: 'samstacktechs@gmail.com',
        telephone: '+923285778715',
        sameAs: [
          'https://github.com/imsuleman-10',
          'https://www.linkedin.com/in/suleman-zaheer-mughal',
          'https://www.instagram.com/imsuleman.10/',
          'https://web.facebook.com/Iamsuleman.10',
          'https://x.com/imsuleman_10',
        ],
        alumniOf: [
          {
            '@type': 'CollegeOrUniversity',
            name: 'University of Engineering and Technology (UET) Lahore',
            sameAs: 'https://uet.edu.pk/'
          },
          {
            '@type': 'EducationalOrganization',
            name: 'Govt Islamia College Civil Lines, Lahore'
          }
        ],
        knowsAbout: [
          'MERN Stack Development', 'Next.js App Router', 'Laravel PHP Framework',
          'Flutter & Dart Mobile Apps', 'Data Analysis with Python', 'Power BI & Tableau',
          'Technical SEO & GEO', 'AEO & LLMO', 'QA Testing & Automation',
          'MongoDB', 'Node.js', 'React.js', 'Urdu Poetry & Literature'
        ],
        hasCredential: [
          { '@type': 'EducationalOccupationalCredential', name: 'Python Specialization for Data Analysis', credentialCategory: 'Certificate', recognizedBy: { '@type': 'Organization', name: 'Coursera & Scrimba' } },
          { '@type': 'EducationalOccupationalCredential', name: 'Cybersecurity Fundamentals', credentialCategory: 'Certificate', recognizedBy: { '@type': 'Organization', name: 'University of Maryland' } }
        ],
        worksFor: {
          '@type': 'Organization',
          '@id': 'https://suleman-zaheer.vercel.app/#organization',
          name: 'SAMStack Studio',
          url: 'https://suleman-zaheer.vercel.app'
        }
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is Suleman Zaheer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer is a Full Stack Developer and Data Analyst based in Shahdara Town, Lahore, Pakistan. He is a Computer Science student at UET Lahore (expected graduation 2028) and the founder of SAMStack Studio. He specializes in MERN Stack, Next.js, Laravel, Flutter, Data Analysis, QA Testing, and SEO.'
          }
        },
        {
          '@type': 'Question',
          name: 'What technologies does Suleman Zaheer specialize in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer specializes in MERN Stack (MongoDB, Express.js, React.js, Node.js), Next.js App Router, Laravel PHP framework, Flutter & Dart for cross-platform mobile apps, Python for Data Analysis, and Technical SEO including GEO, AEO, and LLMO optimization.'
          }
        },
        {
          '@type': 'Question',
          name: 'Where did Suleman Zaheer study?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer completed his Intermediate in Computer Science (ICS) with 980 marks from Govt Islamia College Civil Lines, Lahore. He is currently pursuing a B.S. in Computer Science at the University of Engineering and Technology (UET), Lahore, expected to graduate in 2028.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is SAMStack Studio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SAMStack Studio is a professional software development agency founded by Suleman Zaheer in Lahore, Pakistan. It offers MERN Stack web apps, Next.js applications, Laravel backends, Flutter mobile apps, Data Analytics, SEO, and QA Testing for businesses across Pakistan and internationally.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is Suleman Zaheer available for freelance projects?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Suleman Zaheer is available for freelance and enterprise projects from clients in Pakistan and internationally. Contact him at samstacktechs@gmail.com or +923285778715 for a free project consultation.'
          }
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                I am <span className="text-white font-bold">Suleman Zaheer</span>, a Computer Science student at <span className="text-primary font-bold">UET Lahore</span> (Expected 2028). Based in <span className="text-white font-semibold">Shahdara Town, Lahore</span>, I don't just write code—I engineer digital ecosystems that serve as growth engines for businesses. By blending modern frameworks with analytical thinking, I transform complex bottlenecks into seamless automated systems.
              </p>
              <p className="leading-relaxed">
                As the founder of <span className="text-primary font-bold">SAMStack Studio</span>, I lead a technical team focused on solving industrial and enterprise challenges. We specialize in cross-platform mobile apps via <span className="text-white">Flutter</span>, high-performance web architectures via <span className="text-white">Next.js, MERN Stack & Laravel</span>, and leveraging <span className="text-white">Data Analytics</span> for strategic decision-making. We also ensure enterprise-grade reliability through rigorous <span className="text-white">QA Testing</span> and maximize visibility via <span className="text-white">SEO & GEO</span>.
              </p>
              <p className="leading-relaxed">
                My approach is dual-natured: the analytical rigor of a <span className="text-primary font-bold">Software Researcher and Data Analyst</span>, combined with the creative depth of an <span className="text-primary font-bold">Urdu Poet and Writer</span>. I regularly author technical blogs and research papers, exploring the intersection of machine logic and human emotion. My ultimate mission is to deliver enterprise-grade digital products that don't just function—they dominate their respective markets.
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
                Currently available for Next.js, MERN, Laravel, and Flutter freelance work, remote internships, and collaborative project opportunities.
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
