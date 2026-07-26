import React from 'react';
import Link from 'next/link';
import { Globe, Smartphone, Zap, Layout, ArrowUpRight, CheckCircle, MapPin, Mail, Phone } from 'lucide-react';

export const metadata = {
  title: "Services by Suleman Zaheer | Web App, Mobile App, Serverless & Custom Website – Lahore, Pakistan",
  description: "Hire Suleman Zaheer for professional Web App Development, Mobile App Development, Serverless Mobile App, and Custom Website without backend in Lahore, Pakistan. Expert Software Engineer based in Shahdara, Lahore. CS student at UET Lahore.",
  keywords: [
    "Web App Development Lahore", "Mobile App Developer Pakistan", "Serverless App Developer Lahore",
    "Custom Website Without Backend Pakistan", "Hire Software Engineer Lahore",
    "React Native Developer Pakistan", "Firebase App Developer Lahore",
    "Next.js Developer Pakistan", "MERN Stack Developer Lahore",
    "Custom Website Developer Shahdara Lahore", "Web Developer Near Me Lahore",
    "Suleman Zaheer Services", "SAMStack Studio Services",
    "Full Stack Developer for Hire Lahore", "Professional Web Developer Pakistan"
  ],
  alternates: { canonical: "https://suleman-zaheer.vercel.app/services" },
  openGraph: {
    title: "Services | Suleman Zaheer – Web App, Mobile App, Serverless & Custom Website | Lahore",
    description: "Professional Software Development services by Suleman Zaheer in Lahore, Pakistan. Web Apps, Mobile Apps, Serverless Apps, and Custom Websites. Expert from Shahdara, Lahore.",
    url: "https://suleman-zaheer.vercel.app/services",
    siteName: "Suleman Zaheer Official Portfolio",
    type: "website",
    locale: "en_PK",
    images: [{ url: "/assets/suleman-zaheer-full-stack-developer.jpg", width: 1200, height: 630, alt: "Suleman Zaheer Services – Software Engineer & Web Developer in Lahore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Suleman Zaheer – Web App, Mobile App, Serverless & Custom Website",
    description: "Hire Suleman Zaheer for Web App, Mobile App, Serverless App, and Custom Website development in Lahore, Pakistan.",
    images: ["/assets/suleman-zaheer-full-stack-developer.jpg"],
    creator: "@imsuleman_10",
  },
};

const services = [
  {
    id: "web-app",
    icon: Globe,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
    title: "Web App Development",
    subtitle: "Full Stack MERN & Next.js Applications",
    description: "Build powerful, scalable, and enterprise-grade web applications using the MERN Stack (MongoDB, Express.js, React, Node.js) and Next.js. Suleman Zaheer delivers high-performance, SEO-optimized web apps for businesses and startups in Lahore and across Pakistan.",
    features: [
      "Full Stack MERN (MongoDB, Express, React, Node.js)",
      "Next.js App Router with Server Components",
      "REST API & Database Architecture",
      "User Authentication & Authorization",
      "Admin Dashboards & CMS",
      "SEO Optimization & Core Web Vitals",
      "Responsive & Mobile-First Design",
      "Firebase & Cloud Integration"
    ],
    technologies: ["React.js", "Next.js", "Node.js", "MongoDB", "Express.js", "Firebase", "TypeScript", "Tailwind CSS"],
    useCases: ["E-Commerce Platforms", "Business Management Systems", "SaaS Applications", "Educational Portals", "Booking Systems"],
    price: "Starting from PKR 75,000",
    deliveryTime: "2–8 weeks",
  },
  {
    id: "mobile-app",
    icon: Smartphone,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/20",
    title: "Mobile App Development",
    subtitle: "Cross-Platform iOS & Android Apps",
    description: "Develop cross-platform mobile applications for iOS and Android using React Native. Suleman Zaheer builds beautiful, performant, and user-friendly mobile apps for businesses in Lahore, Pakistan, and internationally. One codebase, two platforms – maximum efficiency.",
    features: [
      "React Native Cross-Platform Development",
      "iOS & Android from One Codebase",
      "Firebase Backend Integration",
      "Push Notifications & Real-time Data",
      "Offline-First Architecture",
      "App Store & Play Store Submission",
      "UI/UX Design & Animations",
      "Performance Optimization"
    ],
    technologies: ["React Native", "Firebase", "Expo", "JavaScript", "TypeScript", "Redux", "Zustand"],
    useCases: ["Delivery & Logistics Apps", "Healthcare Apps", "E-Commerce Mobile Apps", "Social Platforms", "Business Tools"],
    price: "Starting from PKR 85,000",
    deliveryTime: "4–12 weeks",
  },
  {
    id: "serverless-app",
    icon: Zap,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20",
    title: "Serverless Mobile App",
    subtitle: "Firebase-Powered Apps – No Backend Server Required",
    description: "Build modern, scalable mobile apps without a dedicated backend server using Firebase's serverless architecture. Suleman Zaheer specializes in Firebase Firestore, Firebase Auth, Cloud Functions, and Firebase Storage – giving you a full-stack app experience at a fraction of the cost.",
    features: [
      "Firebase Firestore (NoSQL Database)",
      "Firebase Authentication (Email, Google, Phone)",
      "Firebase Cloud Functions (Serverless Logic)",
      "Firebase Storage for Media Files",
      "Firebase Cloud Messaging (Push Notifications)",
      "Real-time Data Sync",
      "Auto-Scaling – No Server Management",
      "Cost-Effective & Rapid Deployment"
    ],
    technologies: ["Firebase", "React Native", "Firestore", "Cloud Functions", "Firebase Auth", "Firebase Storage"],
    useCases: ["Startup MVPs", "Social Apps", "Chat Applications", "Real-time Dashboards", "Community Platforms"],
    price: "Starting from PKR 65,000",
    deliveryTime: "3–8 weeks",
  },
  {
    id: "custom-website",
    icon: Layout,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20",
    title: "Custom Website (No Backend)",
    subtitle: "Beautiful Static Sites, Landing Pages & Portfolios",
    description: "Get a stunning, fast, and fully custom website without any backend server. Suleman Zaheer designs and develops beautiful static websites, landing pages, portfolios, and business brochure sites using Next.js static export, HTML, CSS, and JavaScript. Perfect for businesses and professionals in Lahore.",
    features: [
      "Next.js Static Export (Maximum Performance)",
      "Custom HTML/CSS/JavaScript",
      "Pixel-Perfect Responsive Design",
      "Animations with Framer Motion",
      "SEO Optimized Out of the Box",
      "Ultra-Fast Loading (No Server Required)",
      "Contact Forms (EmailJS or Formspree)",
      "Free Hosting on Vercel / Netlify"
    ],
    technologies: ["Next.js", "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    useCases: ["Business Landing Pages", "Personal Portfolios", "Event Pages", "Restaurant Menus", "Agency Brochures"],
    price: "Starting from PKR 45,000",
    deliveryTime: "1–3 weeks",
  }
];

export default function ServicesPage() {
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://suleman-zaheer.vercel.app/services',
        url: 'https://suleman-zaheer.vercel.app/services',
        name: 'Services by Suleman Zaheer – Web App, Mobile App, Serverless & Custom Website | Lahore',
        description: 'Professional Software Development services by Suleman Zaheer in Lahore, Pakistan.',
        inLanguage: 'en-PK',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' }
          ]
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '.speakable']
        }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#web-app',
        name: 'Web App Development',
        description: 'Full Stack MERN/Next.js Web Application Development by Suleman Zaheer. Scalable, enterprise-grade web apps for businesses in Lahore and Pakistan.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }],
        serviceType: 'Web App Development',
        url: 'https://suleman-zaheer.vercel.app/services#web-app',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '75000' }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#mobile-app',
        name: 'Mobile App Development',
        description: 'Cross-platform Mobile App Development for iOS and Android using React Native by Suleman Zaheer in Lahore, Pakistan.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }],
        serviceType: 'Mobile App Development',
        url: 'https://suleman-zaheer.vercel.app/services#mobile-app',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '85000' }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#serverless-app',
        name: 'Serverless Mobile App Development',
        description: 'Serverless Mobile App Development using Firebase (Firestore, Auth, Cloud Functions) by Suleman Zaheer – no dedicated backend server required.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }],
        serviceType: 'Serverless App Development',
        url: 'https://suleman-zaheer.vercel.app/services#serverless-app',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '65000' }
      },
      {
        '@type': 'Service',
        '@id': 'https://suleman-zaheer.vercel.app/services#custom-website',
        name: 'Custom Website Without Backend',
        description: 'Custom static website, landing page, and portfolio development without any backend server. Next.js static export, HTML/CSS/JS by Suleman Zaheer in Lahore, Pakistan.',
        provider: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
        areaServed: [{ '@type': 'City', name: 'Lahore' }, { '@type': 'Country', name: 'Pakistan' }],
        serviceType: 'Custom Website Development',
        url: 'https://suleman-zaheer.vercel.app/services#custom-website',
        offers: { '@type': 'Offer', priceCurrency: 'PKR', price: '45000' }
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What web development services does Suleman Zaheer offer in Lahore?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Suleman Zaheer offers 4 services in Lahore: 1) Web App Development (MERN/Next.js), 2) Mobile App Development (React Native), 3) Serverless Mobile App (Firebase), 4) Custom Website without backend (Next.js/HTML/CSS/JS).'
            }
          },
          {
            '@type': 'Question',
            name: 'How much does it cost to hire Suleman Zaheer for a web app in Pakistan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Suleman Zaheer pricing starts at PKR 45,000 for custom website without backend, PKR 65,000 for serverless mobile app, PKR 75,000 for full web app, and PKR 85,000 for mobile app development.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I get a website without a backend from Suleman Zaheer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Suleman Zaheer specializes in custom websites without any backend server, built using Next.js static export or HTML/CSS/JavaScript and hosted for free on Vercel or Netlify.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Suleman Zaheer build mobile apps in Lahore?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Suleman Zaheer builds cross-platform mobile apps for iOS and Android using React Native. He also builds serverless mobile apps using Firebase with no dedicated backend needed.'
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      {/* AI/LLM Semantic Context */}
      <div className="sr-only" aria-hidden="false" data-nosnippet="false">
        <h2>Services by Suleman Zaheer – Software Engineer and Web Developer in Lahore, Shahdara, Pakistan</h2>
        <p>
          Suleman Zaheer offers professional software development services in Lahore, Shahdara Town, Punjab, Pakistan.
          Services: 1) Web App Development using MERN Stack and Next.js.
          2) Mobile App Development using React Native for iOS and Android.
          3) Serverless Mobile App Development using Firebase with no backend server needed.
          4) Custom Website without backend using Next.js static export or HTML/CSS/JS.
          If searching for a web developer, software engineer, or mobile app developer in Lahore or Shahdara Pakistan, contact Suleman Zaheer at samstacktechs@gmail.com or call +923285778715.
        </p>
      </div>

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <MapPin size={12} /> Shahdara, Lahore, Pakistan – Available Worldwide
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight speakable" data-speakable="true">
            Professional <span className="text-primary italic">Development</span>
            <br className="hidden sm:block" />
            <span className="text-gray-500">Services in Lahore</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed speakable">
            I am <span className="text-white font-bold">Suleman Zaheer</span>, a Software Engineer &amp; Web Developer based in{' '}
            <span className="text-primary font-semibold">Shahdara, Lahore</span>. I build{' '}
            <strong className="text-white">Web Apps, Mobile Apps, Serverless Apps &amp; Custom Websites</strong>{' '}
            for businesses and professionals across Pakistan and worldwide.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="space-y-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`group relative rounded-[2.5rem] border ${service.borderColor} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden`}
              >
                <div className="p-8 sm:p-12 lg:p-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    <div>
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${service.bgColor} border ${service.borderColor} mb-6`}>
                        <Icon size={32} className={service.color} />
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-gray-500 text-sm font-mono">0{idx + 1}</span>
                        <span className={`text-xs font-bold uppercase tracking-widest ${service.color} px-3 py-1 rounded-full ${service.bgColor}`}>
                          {service.subtitle}
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight speakable">
                        {service.title}
                      </h2>
                      <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className={`font-bold text-sm ${service.color}`}>{service.price}</span>
                        <span className="text-gray-600 text-sm">|</span>
                        <span className="text-sm text-gray-400">Delivery: <span className="text-white font-semibold">{service.deliveryTime}</span></span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        href="/contact"
                        className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${service.bgColor} ${service.color} border ${service.borderColor} hover:scale-105`}
                      >
                        Hire Me for This <ArrowUpRight size={16} />
                      </Link>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-white font-bold text-lg mb-4">What&apos;s Included:</h3>
                        <ul className="space-y-3">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-gray-400 text-sm">
                              <CheckCircle size={16} className={`${service.color} flex-shrink-0 mt-0.5`} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-4">Use Cases:</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.useCases.map((useCase) => (
                            <span key={useCase} className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-400">
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Hire Suleman Zaheer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 speakable" data-speakable="true">
            Why Hire <span className="text-primary">Suleman Zaheer</span>?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-2xl">
            A professional <strong className="text-white">Software Engineer &amp; Web Developer in Lahore, Pakistan</strong>{' '}
            with real-world experience and a CS degree from UET Lahore.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "UET Lahore – CS Student", desc: "Studying Computer Science at Pakistan's top engineering university, ensuring a deep theoretical foundation." },
              { title: "Real-World Projects", desc: "Built enterprise platforms, AI clinics, e-learning systems, and airline reservation systems." },
              { title: "Lahore & Shahdara Based", desc: "Local developer in Lahore (Shahdara Town) – available for in-person meetings and local projects." },
              { title: "Full Transparency", desc: "Regular progress updates, clean code, detailed documentation, and post-delivery support." },
              { title: "Modern Tech Stack", desc: "Latest technologies: Next.js 14, React Native, Firebase, TypeScript, and Tailwind CSS." },
              { title: "Competitive PKR Pricing", desc: "Professional-quality development at Pakistan-friendly pricing with flexible milestone-based payments." }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors">
                <h3 className="text-primary font-bold text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[2.5rem] p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 relative z-10 speakable">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-2 relative z-10">
            <strong>Suleman Zaheer</strong> – Software Engineer &amp; Web Developer, Lahore, Pakistan
          </p>
          <p className="text-white/70 text-sm mb-10 relative z-10">
            Shahdara Town, Lahore | samstacktechs@gmail.com | +923285778715
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-neutral-100 transition-all shadow-xl"
            >
              <Mail size={16} /> Contact Me Now
            </Link>
            <a
              href="tel:+923285778715"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-all"
            >
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

