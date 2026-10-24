import Image from 'next/image';
import { Github, Linkedin, Instagram, Twitter, Globe, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Suleman Zaheer | Links & Bio – Developer, AI Engineer, Lahore Pakistan',
  description:
    'All official links for Suleman Zaheer – Lead Software Engineer & Founder of SAMStack Studio. Portfolio, GitHub, LinkedIn, Instagram, Twitter, WhatsApp. Best developer in Pakistan.',
  keywords: [
    'Suleman Zaheer links', 'Suleman Zaheer bio', 'Suleman Zaheer social media',
    'SAMStack Studio links', 'Developer Pakistan links', 'Contact Suleman Zaheer',
    'Hire developer Pakistan', 'Full stack developer Lahore contact',
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/bio' },
  openGraph: {
    title: 'Suleman Zaheer | Links & Bio',
    description: 'All official links for Suleman Zaheer – Lead Software Engineer, SAMStack Studio, Lahore, Pakistan.',
    url: 'https://suleman-zaheer.vercel.app/bio',
    type: 'profile',
    images: [{ url: '/assets/suleman-zaheer-full-stack-developer.jpg', width: 800, height: 800 }],
  },
  twitter: {
    card: 'summary',
    title: 'Suleman Zaheer | All Links',
    description: 'Portfolio, GitHub, LinkedIn, WhatsApp — all official links for Suleman Zaheer.',
    images: ['/assets/suleman-zaheer-software-engineer.jpg'],
    creator: '@imsuleman_10',
  },
};

export default function BioPage() {
  const links = [
    {
      category: 'Portfolio & Work',
      items: [
        { label: 'Official Portfolio', sublabel: 'suleman-zaheer.vercel.app', href: 'https://suleman-zaheer.vercel.app/', icon: Globe, highlight: true },
        { label: 'Hire Me — Contact Form', sublabel: 'Send project requirements', href: 'https://suleman-zaheer.vercel.app/contact', icon: Mail },
        { label: 'View My CV / Resume', sublabel: 'Download or view online', href: 'https://suleman-zaheer.vercel.app/cv', icon: Globe },
        { label: 'Services (Web, Mobile, AI, Desktop)', sublabel: 'See all service offerings', href: 'https://suleman-zaheer.vercel.app/services', icon: Globe },
        { label: 'Projects Portfolio', sublabel: 'Delivered client work', href: 'https://suleman-zaheer.vercel.app/projects', icon: Globe },
      ],
    },
    {
      category: 'Contact & Chat',
      items: [
        { label: 'WhatsApp (Direct)', sublabel: '+92 328 5778715', href: 'https://wa.me/923285778715', icon: Phone, highlight: true },
        { label: 'Email — sulemanzaheer09@gmail.com', sublabel: 'Primary personal email', href: 'mailto:sulemanzaheer09@gmail.com', icon: Mail },
        { label: 'Email — samstacktechs@gmail.com', sublabel: 'Agency / business email', href: 'mailto:samstacktechs@gmail.com', icon: Mail },
      ],
    },
    {
      category: 'Knowledge Graph & Encyclopedic Profiles',
      items: [
        { label: 'English Wikipedia Profile', sublabel: 'User:Imsuleman', href: 'https://en.wikipedia.org/wiki/User:Imsuleman', icon: Globe, highlight: true },
        { label: 'Wikidata Knowledge Entity', sublabel: 'Item Q141839182', href: 'https://www.wikidata.org/wiki/Q141839182', icon: ExternalLink, highlight: true },
      ],
    },
    {
      category: 'Social Profiles',
      items: [
        { label: 'GitHub', sublabel: '@imsuleman-10', href: 'https://github.com/imsuleman-10', icon: Github },
        { label: 'LinkedIn', sublabel: 'suleman-zaheer-mughal', href: 'https://www.linkedin.com/in/suleman-zaheer-mughal', icon: Linkedin },
        { label: 'Twitter / X', sublabel: '@imsuleman_10', href: 'https://x.com/imsuleman_10', icon: Twitter },
        { label: 'Instagram', sublabel: '@imsuleman.10', href: 'https://www.instagram.com/imsuleman.10/', icon: Instagram },
        { label: 'Facebook', sublabel: 'Iamsuleman.10', href: 'https://web.facebook.com/Iamsuleman.10', icon: Globe },
      ],
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://suleman-zaheer.vercel.app/bio#profilepage',
    name: 'Suleman Zaheer — Official Link-in-Bio & Profile',
    url: 'https://suleman-zaheer.vercel.app/bio',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://suleman-zaheer.vercel.app/#person',
      name: 'Suleman Zaheer',
      alternateName: ['سلیمان ظہیر', 'Suleman Zaheer Mughal', 'imsuleman-10'],
      birthDate: '2007-02-01',
      birthPlace: 'Shahdara Town, Lahore, Punjab, Pakistan',
      jobTitle: 'Lead Software Engineer & Founder, SAMStack Studio',
      description:
        'Suleman Zaheer (born 1 Feb 2007) is a Lead Software Engineer and founder of SAMStack Studio based in Lahore, Pakistan. He specializes in full-stack web (MERN/Next.js/Laravel), Flutter mobile apps, Electron.js desktop apps, Python automation, AI/LLM solutions, and data analytics.',
      nationality: { '@type': 'Country', name: 'Pakistan' },
      url: 'https://suleman-zaheer.vercel.app',
      image: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-software-engineer.jpg',
      email: 'sulemanzaheer09@gmail.com',
      telephone: '+923285778715',
      sameAs: [
        'https://en.wikipedia.org/wiki/User:Imsuleman',
        'https://www.wikidata.org/wiki/Q141839182',
        'https://github.com/imsuleman-10',
        'https://www.linkedin.com/in/suleman-zaheer-mughal',
        'https://x.com/imsuleman_10',
        'https://www.instagram.com/imsuleman.10/',
        'https://web.facebook.com/Iamsuleman.10',
        'https://wa.me/923285778715',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'SAMStack Studio',
        url: 'https://suleman-zaheer.vercel.app',
      },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-24 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Background blobs */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/40">
              <Image
                src="/assets/suleman-zaheer-software-engineer.jpg"
                alt="Suleman Zaheer – Lead Software Engineer, SAMStack Studio, Lahore, Pakistan"
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
          </div>
          <h1 className="text-3xl font-black text-white mb-2 font-display tracking-tight">
            Suleman Zaheer
          </h1>
          <p className="text-primary font-bold text-sm mb-3">سلیمان ظہیر · imsuleman-10</p>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-4">
            Lead Software Engineer & Founder of{' '}
            <span className="text-primary font-bold">SAMStack Studio</span> — Full-Stack Web, 
            Flutter Mobile, Desktop (Electron.js), Python Automation, AI Solutions & Data Analytics
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
            <MapPin size={12} className="text-primary" />
            <span>Lahore, Punjab, Pakistan 🇵🇰</span>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {links.map(({ category, items }) => (
            <div key={category}>
              <p className="text-xs text-gray-500 uppercase tracking-[0.25em] font-bold mb-3 px-1">{category}</p>
              <div className="space-y-3">
                {items.map(({ label, sublabel, href, icon: Icon, highlight }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group ${
                      highlight
                        ? 'bg-primary/10 border-primary/30 hover:bg-primary/20'
                        : 'bg-white/[0.03] border-white/5 hover:border-white/15 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${highlight ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-400 group-hover:text-primary'} transition-colors`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${highlight ? 'text-primary' : 'text-white'}`}>{label}</p>
                      <p className="text-gray-500 text-xs truncate">{sublabel}</p>
                    </div>
                    <ExternalLink size={14} className="text-gray-600 group-hover:text-primary transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer badge */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-xs">
            © 2026 Suleman Zaheer · SAMStack Studio · Lahore, Pakistan
          </p>
          <a href="https://suleman-zaheer.vercel.app" className="text-primary text-xs hover:underline">
            suleman-zaheer.vercel.app
          </a>
        </div>
      </div>
    </div>
  );
}
