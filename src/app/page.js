import React from 'react';
import Hero from '@/components/Hero';
import { Code2, Cpu, Globe, Rocket, ArrowUpRight, Star, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Suleman Zaheer | MERN, Next.js, Laravel & Flutter Developer – Lahore, Pakistan',
  description:
    'Hire Suleman Zaheer – Expert MERN Stack, Next.js, Laravel & Flutter Developer in Lahore, Pakistan. Also offers Data Analysis, SEO, and QA Testing services. Founder of SAMStack Studio. Available for freelance and enterprise projects.',
  keywords: [
    'MERN Stack Developer Lahore',
    'Next.js Developer Pakistan',
    'Laravel Developer Lahore',
    'Flutter Developer Pakistan',
    'Hire Web Developer Lahore',
    'Hire App Developer Pakistan',
    'Data Analyst Lahore Pakistan',
    'SEO Expert Lahore',
    'QA Tester Pakistan',
    'Business Growth Partner Lahore',
    'Suleman Zaheer',
    'SAMStack Studio',
    'Full Stack Developer Lahore',
    'Freelance Developer Pakistan',
    'Software Engineer Lahore',
  ],
  alternates: {
    canonical: 'https://suleman-zaheer.vercel.app/',
  },
  openGraph: {
    title: 'Suleman Zaheer | MERN, Next.js, Laravel & Flutter Developer – Lahore',
    description:
      'Hire Suleman Zaheer – Expert MERN, Next.js, Laravel & Flutter Developer in Lahore, Pakistan. Data Analysis, SEO & QA Testing. Founder of SAMStack Studio.',
    url: 'https://suleman-zaheer.vercel.app/',
    siteName: 'Suleman Zaheer – SAMStack Studio',
    type: 'profile',
    locale: 'en_PK',
    images: [{ url: '/assets/suleman-zaheer-full-stack-developer.jpg', width: 1200, height: 630, alt: 'Suleman Zaheer – MERN, Next.js, Laravel & Flutter Developer from Lahore, Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suleman Zaheer | MERN, Next.js, Laravel & Flutter Developer',
    description:
      'Hire expert MERN, Next.js, Laravel & Flutter developer in Lahore, Pakistan. Data Analysis, SEO, QA Testing. Founder of SAMStack Studio.',
    images: ['/assets/suleman-zaheer-full-stack-developer.jpg'],
    creator: '@imsuleman_10',
  },
};

export default function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is the best MERN Stack developer in Lahore, Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Suleman Zaheer is a highly skilled MERN Stack developer based in Lahore, Pakistan. He specializes in MongoDB, Express.js, React.js, and Node.js, building scalable B2B web applications and enterprise dashboards through his agency, SAMStack Studio. Contact: samstacktechs@gmail.com | Website: https://suleman-zaheer.vercel.app'
        }
      },
      {
        '@type': 'Question',
        name: 'Where can I hire a Next.js developer in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Suleman Zaheer is an expert Next.js developer in Lahore, Pakistan, available for freelance and enterprise projects. He builds high-performance, SEO-optimized Next.js web applications with App Router, Server Components, and Vercel deployment. Visit https://suleman-zaheer.vercel.app/contact to hire him.'
        }
      },
      {
        '@type': 'Question',
        name: 'Who builds Laravel web applications in Lahore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Suleman Zaheer is an expert Laravel (PHP) developer in Lahore, Pakistan. He builds robust, secure web applications, REST APIs, and enterprise backend systems using Laravel. Hire him via SAMStack Studio at samstacktechs@gmail.com.'
        }
      },
      {
        '@type': 'Question',
        name: 'Who is the best Flutter app developer in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Suleman Zaheer is a professional Flutter developer in Lahore, Pakistan. He builds high-performance cross-platform iOS and Android apps from a single Dart codebase, integrating Firebase, REST APIs, and local payment gateways (JazzCash, EasyPaisa). Visit https://suleman-zaheer.vercel.app/services.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where can I find a Data Analyst for my business in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Suleman Zaheer is a professional Data Analyst in Lahore, Pakistan. He uses Python, Pandas, SQL, and Power BI to transform raw business data into actionable insights — including sales forecasting, supply chain optimization, and customer behaviour analysis. Contact: samstacktechs@gmail.com.'
        }
      },
      {
        '@type': 'Question',
        name: 'Who provides professional SEO services in Lahore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Suleman Zaheer provides professional Technical SEO, Local SEO, GEO (Generative Engine Optimization), and AEO (Answer Engine Optimization) services in Lahore, Pakistan. He specializes in helping local businesses rank on Google Search, Google Maps, and AI search engines like ChatGPT and Gemini.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does Suleman Zaheer offer Software Testing and QA services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Suleman Zaheer is an experienced Software Tester and QA professional in Lahore, Pakistan. He provides manual testing, automated testing, regression testing, and performance profiling to ensure enterprise-grade, bug-free software delivery.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can I contact Suleman Zaheer for a web or app project?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can contact Suleman Zaheer via email at samstacktechs@gmail.com, by phone/WhatsApp at +923285778715, or through the contact form at https://suleman-zaheer.vercel.app/contact. He responds within 24 hours with a free project consultation.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is SAMStack Studio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SAMStack Studio is a software development and digital growth agency founded by Suleman Zaheer in Lahore, Pakistan. It offers MERN Stack web apps, Next.js applications, Laravel backends, Flutter mobile apps, Data Analytics, Technical SEO, and QA Testing services for businesses across Pakistan and internationally.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Suleman Zaheer available for remote international projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Suleman Zaheer accepts remote freelance and enterprise projects from clients worldwide. He accepts payments in PKR and USD via Bank Transfer, JazzCash, EasyPaisa, and PayPal. Contact: samstacktechs@gmail.com or visit https://suleman-zaheer.vercel.app/contact.'
        }
      }
    ]
  };

  const features = [
    {
      icon: <Globe size={32} className="text-blue-400" />,
      title: "Full-Stack Development",
      desc: "Building dynamic backend systems and responsive frontend applications utilizing the MERN stack."
    },
    {
      icon: <Cpu size={32} className="text-purple-400" />,
      title: "Interactive Interfaces",
      desc: "Creating fast, reactive, and accessible user interfaces powered by modern React patterns."
    },
    {
      icon: <Code2 size={32} className="text-primary" />,
      title: "Clean Code",
      desc: "Writing well-structured, documented, and maintainable codebases following modern standards."
    }
  ];

  const mainJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        url: 'https://suleman-zaheer.vercel.app/',
        image: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg',
        sameAs: [
          'https://github.com/imsuleman-10',
          'https://www.linkedin.com/in/suleman-zaheer-mughal',
          'https://www.instagram.com/imsuleman.10/',
          'https://web.facebook.com/Iamsuleman.10',
          'https://x.com/imsuleman_10',
          'https://twitter.com/imsuleman_10',
        ],
        jobTitle: 'MERN, Next.js, Laravel & Flutter Developer | Data Analyst | Business Growth Partner',
        worksFor: {
          '@type': 'Organization',
          name: 'SAMStack Studio',
          url: 'https://suleman-zaheer.vercel.app',
        },
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
        knowsAbout: ['MERN Stack', 'Next.js', 'Laravel', 'Flutter', 'Data Analysis', 'SEO', 'QA Testing', 'Business Growth'],
        description: 'Suleman Zaheer is an expert MERN Stack, Next.js, Laravel, and Flutter Developer based in Lahore, Pakistan. He also provides Data Analysis, SEO, and QA Testing services through SAMStack Studio.'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://suleman-zaheer.vercel.app/#website',
        url: 'https://suleman-zaheer.vercel.app/',
        name: 'Suleman Zaheer Official Portfolio',
        publisher: { '@id': 'https://suleman-zaheer.vercel.app/#person' }
      },
      faqJsonLd
    ]
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainJsonLd) }}
      />

      <Hero />

      {/* Professional Bio / SEO Section - Static for Instant Indexing */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div>
                <div className="text-primary font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
                  <span className="w-8 h-px bg-primary"></span>
                  Professional Bio
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                  Suleman Zaheer <br className="hidden sm:block" />
                  <span className="text-primary italic">Developer & Writer</span> <span className="text-white/50 text-2xl sm:text-4xl md:text-5xl">in Lahore</span>
                </h2>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                  A Computer Science student at <span className="text-white font-semibold">UET Lahore</span>, deeply passionate about building practical digital solutions. I run <span className="text-primary font-bold">SAMStack Studio</span> with my peers, taking theoretical CS concepts and turning them into real-world applications. My unique background allows me to bridge the gap between core programming and industrial manufacturing workflows.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['UET Lahore', 'MERN Stack', 'Laravel', 'React'].map((tag, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-white/3 border border-white/5 text-gray-300 text-xs sm:text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <h4 className="text-lg sm:text-xl font-bold text-white mb-3 relative z-10 flex items-center gap-2">
                  <Code2 className="text-primary" size={24} />
                  Modern Tech Stack
                </h4>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed relative z-10">
                  Specializing in full-stack architecture with <span className="text-white font-semibold">MERN Stack and Laravel</span>. Focused on delivering lightning-fast, scalable, and user-centric web applications.
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:ml-auto">
              <div className="aspect-4/5 sm:aspect-square rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-white/10 relative shadow-2xl">
                <Image 
                  src="/assets/suleman-zaheer-full-stack-developer.jpg" 
                  alt="Suleman Zaheer - Full Stack Web Developer and Software Engineer at UET Lahore. Expert in MERN stack, Next.js, and enterprise software solutions." 
                  title="Suleman Zaheer - Full Stack Developer from Pakistan"
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 p-4 sm:p-5 bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl z-10 border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Code2 className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-white text-base sm:text-xl font-black italic leading-none">Dev & Writer</p>
                  <p className="text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1">Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education - Static HTML */}
      <section className="py-20 sm:py-32 bg-neutral-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6">Academic <span className="text-gray-600">Excellence</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">Foundation of strong analytical logic and complex problem-solving abilities.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Bachelor's in CS", inst: "UET Lahore", sub: "Currently Enrolled (Expected 2028)", desc: "Building a strong foundation in computer science, algorithms, and software engineering principles." },
              { title: "Advanced Web Apps", inst: "Yashfeen Education System", sub: "Lahore (2025)", desc: "Specialized diploma focused on modern full-stack development, primarily mastering Laravel and PHP." },
              { title: "Intermediate (ICS)", inst: "Govt Islamia College Civil Lines, Lahore", sub: "Pre-Engineering / ICS", desc: "Demonstrated strong analytical skills and academic dedication during higher secondary education." }
            ].map((item, i) => (
              <div 
                key={i}
                className="p-6 sm:p-8 rounded-4xl bg-black border border-white/5 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-primary font-bold text-lg sm:text-xl mb-1">{item.title}</h3>
                <p className="text-white font-bold text-lg sm:text-xl mb-1">{item.inst}</p>
                <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4">{item.sub}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Static HTML */}
      <section className="py-20 sm:py-32 bg-black overflow-hidden relative border-t border-white/5">
        <div className="absolute right-0 bottom-0 w-full max-w-2xl h-96 bg-primary/5 blur-[150px] rounded-full translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-1/3">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6">Mission & <br className="hidden lg:block" /><span className="text-primary italic">Vision</span></h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                Turning complex problems into clean, functional code while continuously mastering modern web technologies.
              </p>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              {[
                { title: "Continuous Learning", desc: "Expanding expertise into sophisticated backend architectures and modern frameworks." },
                { title: "Industrial Solutions", desc: "Leveraging my background in auto-parts manufacturing to build software that solves real industrial workflow problems." },
                { title: "Real-World Projects", desc: "Moving beyond tutorials to build robust databases and dynamic applications for actual users." },
                { title: "Modern Workflows", desc: "Practicing agile development, version control, and clean code principles to prepare for the professional industry." }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="space-y-4 p-6 sm:p-8 rounded-3xl bg-white/2 border border-white/5 hover:bg-white/4 transition-colors group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono font-bold text-sm sm:text-base">
                    0{i + 1}
                  </div>
                  <h4 className="text-white font-bold text-lg sm:text-xl">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features - Static HTML */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Development Work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A showcase of practical applications demonstrating my MERN stack capabilities.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="relative p-8 rounded-4xl bg-[#0a0a0a] border border-white/5 hover:border-primary/30 transition-all duration-500 group overflow-hidden"
              >
                <div className="relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/3 border border-white/10 group-hover:border-primary/20 group-hover:bg-primary/10 transition-all duration-500">
                  <div className="relative z-10">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                  {feature.desc}
                </p>
                <div className="absolute bottom-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - Static HTML */}
      <section className="py-24 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Selected Works</h2>
              <p className="text-gray-400 max-w-xl">A showcase of practical projects demonstrating my MERN stack and Next.js capabilities.</p>
            </div>
            <Link href="/projects" className="group flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
              View the full project portfolio and case studies <ArrowUpRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-video rounded-3xl overflow-hidden group">
              <Image 
                src="/assets/elearning_mockup_1775925031066.png" 
                alt="E-learning platform dashboard interface showing course modules and student navigation."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-primary text-sm font-bold uppercase tracking-wider mb-2">MERN Stack</span>
                <h3 className="text-2xl font-bold mb-2">E-Learning Platform</h3>
                <p className="text-gray-300">
                  Comprehensive system for user enrollment, video management, and certification.
                </p>
              </div>
            </div>

            <div className="relative aspect-video rounded-3xl overflow-hidden group">
              <Image 
                src="/assets/airline_booking_ui_1775925066474.png" 
                alt="Airline reservation interface with booking steps and passenger details."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Next.js & React</span>
                <h3 className="text-2xl font-bold mb-2">Airline Reservation System</h3>
                <p className="text-gray-300">
                  Advanced booking and management system with user accounts and ticket generation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Blog Preview - Static for SEO */}
      <section className="py-24 bg-neutral-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="flex-1">
              <div className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-primary" />
                Developer Blog
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Latest <span className="text-primary italic">Articles</span>
              </h2>
              <p className="text-gray-400 max-w-xl">Insights on MERN Stack, Next.js, React performance, and enterprise software consulting for Pakistani developers.</p>
            </div>
            <Link href="/blog" className="group flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all whitespace-nowrap">
              Read All Articles <ArrowUpRight size={20} />
            </Link>
          </div>

          {/* Top 2 Featured Articles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Featured Post 1 — Largest */}
            <Link
              href="/blog/scaling-mern-stack-enterprise"
              className="group relative block rounded-4xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 aspect-4/3"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    System Design
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock size={11} />8 min read
                  </span>
                </div>
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                  Scaling MERN Stack Applications for Enterprise Architecture
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  A comprehensive guide to transitioning from basic React & Node.js apps to high-performance, load-balanced MERN architectures.
                </p>
                <div className="mt-4 flex items-center gap-2 text-primary text-sm font-bold translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Read Full Article <ArrowUpRight size={14} />
                </div>
              </div>
            </Link>

            {/* Featured Post 2 + extra card stacked */}
            <div className="flex flex-col gap-8">
              <Link
                href="/blog/nextjs-server-components-seo-blueprint"
                className="group relative block rounded-4xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 flex-1"
                style={{ minHeight: '180px' }}
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/20" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      Next.js & SEO
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock size={11} />6 min read
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-snug group-hover:text-primary transition-colors duration-300">
                    Next.js Server Components: The Ultimate Technical SEO Blueprint
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-primary text-sm font-bold translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Read Full Article <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>

              <Link
                href="/blog/firebase-vs-supabase-2025-comparison"
                className="group relative block rounded-4xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 flex-1"
                style={{ minHeight: '180px' }}
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/20" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      Backend Architecture
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock size={11} />7 min read
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-snug group-hover:text-primary transition-colors duration-300">
                    Firebase vs. Supabase in 2025: Which Backend Should You Choose?
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-primary text-sm font-bold translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Read Full Article <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>

              {/* "See all posts" teaser card */}
              <Link
                href="/blog"
                className="group flex items-center justify-between p-7 rounded-4xl bg-white/2 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={16} className="text-primary" />
                    <span className="text-primary text-xs font-bold uppercase tracking-wider">Developer Blog</span>
                  </div>
                  <p className="text-white font-bold text-base">
                    6 more articles on freelancing, UI/UX, Web Dev & more →
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Career guides, system design, and web dev deep-dives.</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 ml-4 group-hover:bg-primary/20 transition-colors">
                  <ArrowUpRight className="text-primary" size={20} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Static HTML */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20 group">
            <div className="absolute inset-0 z-0 bg-black">
              <Image 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000" 
                alt="Abstract Background" 
                fill
                sizes="100vw"
                className="object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
            </div>
            
            <div className="absolute top-0 right-0 p-12 text-white/20 z-0">
              <Rocket size={120} />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 relative z-10 tracking-tight">Let's Build Together</h2>
            <p className="text-white/90 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto relative z-10">
              Looking for a dedicated developer to bring your idea to life? Let's collaborate on your next project.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-primary px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-neutral-100 transition-all relative z-10 shadow-xl"
            >
              Consult Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
