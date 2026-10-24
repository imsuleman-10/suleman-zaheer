import { ExternalLink, Download, Mail, FileText, Image as ImageIcon, User, Building2, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Press & Media Kit | Suleman Zaheer – SAMStack Studio',
  description:
    'Official press room for Suleman Zaheer and SAMStack Studio. Download media kit, official bio, high-resolution photos, and press release for Suleman Zaheer – Lead Software Engineer, Founder of SAMStack Studio, Lahore, Pakistan.',
  keywords: [
    'Suleman Zaheer Press', 'SAMStack Studio Media Kit', 'Suleman Zaheer Bio',
    'Suleman Zaheer Press Release', 'Software Engineer Pakistan Press',
    'Pakistan Tech Entrepreneur', 'SAMStack Studio News',
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/press' },
  openGraph: {
    title: 'Press & Media Kit | Suleman Zaheer – SAMStack Studio',
    description: 'Official press room for Suleman Zaheer. Download media assets and official bio.',
    url: 'https://suleman-zaheer.vercel.app/press',
    type: 'website',
  },
};

export default function PressPage() {
  const pressReleases = [
    {
      date: 'October 2026',
      headline: 'SAMStack Studio Launches Enterprise AI Solutions Division in Lahore',
      summary:
        'Suleman Zaheer\'s software agency SAMStack Studio officially launches a dedicated AI Solutions & LLM Integration division, offering custom RAG systems, OpenAI/Gemini/Claude integrations, and autonomous AI agents to businesses across Pakistan and internationally.',
      category: 'Company News',
    },
    {
      date: 'September 2026',
      headline: 'Suleman Zaheer Ranked Among Top Developers in Pakistan for 2026',
      summary:
        'Suleman Zaheer, founder of SAMStack Studio and Lead Software Engineer based in Lahore, is recognized for full-stack excellence across Web, Mobile (Flutter), Desktop (Electron.js), and AI/Automation domains serving clients in all major Pakistani cities.',
      category: 'Recognition',
    },
    {
      date: 'August 2026',
      headline: 'SAMStack Studio Expands Services to Desktop Application Development',
      summary:
        'SAMStack Studio now offers Electron.js desktop application development including Point of Sale (POS) software, inventory management systems, and factory ERPs for businesses across Pakistan.',
      category: 'Service Launch',
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: 'SAMStack Studio Launches Enterprise AI Solutions Division in Lahore',
      datePublished: '2026-10-01T00:00:00Z',
      dateModified: '2026-10-01T00:00:00Z',
      author: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
      publisher: {
        '@type': 'Organization',
        name: 'SAMStack Studio',
        url: 'https://suleman-zaheer.vercel.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://suleman-zaheer.vercel.app/sfavicon.png',
        },
      },
      description:
        'SAMStack Studio officially launches a dedicated AI Solutions & LLM Integration division, serving clients across Pakistan.',
      image: 'https://suleman-zaheer.vercel.app/assets/suleman-zaheer-full-stack-developer.jpg',
      url: 'https://suleman-zaheer.vercel.app/press',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://suleman-zaheer.vercel.app/press#webpage',
      name: 'Press & Media Kit – Suleman Zaheer | SAMStack Studio',
      url: 'https://suleman-zaheer.vercel.app/press',
      about: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
          { '@type': 'ListItem', position: 2, name: 'Press', item: 'https://suleman-zaheer.vercel.app/press' },
        ],
      },
    },
  ];

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">Newsroom</p>
          <h1 className="text-5xl sm:text-7xl font-display font-black text-white mb-6 tracking-tighter">
            Press & <span className="text-primary">Media Kit</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Official press resources for{' '}
            <strong className="text-white">Suleman Zaheer</strong> and{' '}
            <strong className="text-primary">SAMStack Studio</strong>. For journalist inquiries,
            contact{' '}
            <a href="mailto:sulemanzaheer09@gmail.com" className="text-primary underline underline-offset-4">
              sulemanzaheer09@gmail.com
            </a>
          </p>
        </div>

        {/* Quick Download Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {[
            { icon: User, label: 'Official Bio', desc: 'Short & long versions', href: '/press-kit/suleman-zaheer-bio.txt' },
            { icon: ImageIcon, label: 'Press Photo', desc: 'High-res portrait', href: '/assets/suleman-zaheer-full-stack-developer.jpg' },
            { icon: Building2, label: 'Logo / Brand', desc: 'SAMStack Studio assets', href: '/sfavicon.png' },
            { icon: FileText, label: 'Press Release', desc: 'Latest announcement', href: '#releases' },
          ].map(({ icon: Icon, label, desc, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.06] transition-all flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1">{label}</p>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
              <Download size={14} className="text-gray-600 group-hover:text-primary transition-colors mt-auto" />
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Press Releases */}
          <div className="lg:col-span-2" id="releases">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-mono">01</span>
              Press Releases
            </h2>
            <div className="space-y-6">
              {pressReleases.map((pr, i) => (
                <article key={i} className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-primary/20 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1 rounded-full bg-primary/5">
                      {pr.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar size={12} />
                      {pr.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-primary transition-colors">
                    {pr.headline}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{pr.summary}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Official Bio */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-primary/20">
              <h2 className="text-xl font-bold text-white mb-4">Official Bio</h2>
              <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">Suleman Zaheer</strong> (born 1 February 2007, Lahore, Pakistan)
                  is a Lead Software Engineer, entrepreneur, and Urdu poet.
                </p>
                <p>
                  As founder of <strong className="text-primary">SAMStack Studio</strong>, he delivers enterprise digital 
                  solutions across Pakistan and internationally — including full-stack web (MERN, Next.js, Laravel), 
                  mobile apps (Flutter), desktop software (Electron.js), Python automation, AI/LLM integrations, and data analytics.
                </p>
                <p>
                  Currently pursuing <strong className="text-white">BS Computer Science at UET Lahore</strong>.
                </p>
              </div>
              <a
                href="/press-kit/suleman-zaheer-bio.txt"
                className="mt-6 flex items-center gap-2 text-primary text-sm font-bold hover:underline"
                download
              >
                <Download size={14} /> Download Full Bio
              </a>
            </div>

            {/* Media Contact */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6">Media Contact</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">For Journalists</p>
                  <a href="mailto:sulemanzaheer09@gmail.com" className="text-primary text-sm font-bold hover:underline flex items-center gap-2">
                    <Mail size={14} /> sulemanzaheer09@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">WhatsApp</p>
                  <a href="https://wa.me/923285778715" className="text-white text-sm font-semibold">+92 328 5778715</a>
                </div>
                <div className="pt-4 border-t border-white/5 space-y-3">
                  {[
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/suleman-zaheer-mughal' },
                    { label: 'GitHub', href: 'https://github.com/imsuleman-10' },
                    { label: 'Twitter / X', href: 'https://x.com/imsuleman_10' },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between text-gray-400 hover:text-primary text-sm transition-colors group">
                      {label} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
