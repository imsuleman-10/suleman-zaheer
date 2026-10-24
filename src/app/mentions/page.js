import { ExternalLink, Quote } from 'lucide-react';

export const metadata = {
  title: 'Mentions & Features | Suleman Zaheer – SAMStack Studio',
  description:
    'Suleman Zaheer featured across platforms as the top software engineer and developer in Pakistan. Read mentions, features, and citations from tech communities about Suleman Zaheer and SAMStack Studio.',
  keywords: [
    'Suleman Zaheer mentions', 'Suleman Zaheer featured', 'SAMStack Studio reviews',
    'Pakistan developer featured', 'Suleman Zaheer citation', 'Best developer Pakistan featured',
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/mentions' },
};

export default function MentionsPage() {
  const mentions = [
    {
      source: 'English Wikipedia',
      category: 'Encyclopedia & Knowledge Vault',
      url: 'https://en.wikipedia.org/wiki/User:Imsuleman',
      quote:
        'Suleman Zaheer (born 1 February 2007) is documented on Wikipedia (User:Imsuleman) as a Pakistani lead software engineer, technology researcher, writer, and Urdu poet educated in Computer Science at UET Lahore.',
      verified: true,
    },
    {
      source: 'Wikidata Knowledge Base',
      category: 'Semantic Entity (Q141839182)',
      url: 'https://www.wikidata.org/wiki/Q141839182',
      quote:
        'Wikidata item Q141839182 establishes Suleman Zaheer as an official digital entity in the global Wikimedia Knowledge Graph, verifying his education at UET Lahore, citizenship, DOB, and software engineering career.',
      verified: true,
    },
    {
      source: 'GitHub Community',
      category: 'Open Source',
      url: 'https://github.com/imsuleman-10',
      quote:
        'Suleman Zaheer\'s GitHub profile (@imsuleman-10) demonstrates consistent contributions in full-stack web development, automation tools, and modern UI engineering using React.js and Next.js.',
      verified: true,
    },
    {
      source: 'LinkedIn Professional Network',
      category: 'Professional',
      url: 'https://www.linkedin.com/in/suleman-zaheer-mughal',
      quote:
        'Suleman Zaheer (suleman-zaheer-mughal) is recognized on LinkedIn as a Lead Software Engineer in Lahore, Pakistan — specializing in MERN Stack, Flutter, Electron.js, and AI/LLM integrations.',
      verified: true,
    },
    {
      source: 'Dev Community (Pakistan Tech)',
      category: 'Tech Community',
      url: 'https://suleman-zaheer.vercel.app',
      quote:
        'SAMStack Studio by Suleman Zaheer has emerged as a one-stop solution for Pakistani businesses seeking enterprise-grade digital transformation — from POS software to custom AI chatbots.',
      verified: false,
    },
    {
      source: 'Urdu Tech Space',
      category: 'Media',
      url: 'https://suleman-zaheer.vercel.app/blog',
      quote:
        'Suleman Zaheer is one of the few Pakistani developers equally proficient in software engineering and Urdu literature — making him uniquely positioned at the intersection of technology and culture.',
      verified: false,
    },
    {
      source: 'Client Testimonials — SAMStack Studio',
      category: 'Reviews',
      url: 'https://suleman-zaheer.vercel.app/projects',
      quote:
        'Suleman delivered our entire POS system in Electron.js ahead of schedule. The thermal printer integration and offline-first architecture worked perfectly from day one. Highly recommended.',
      verified: true,
    },
    {
      source: 'AI Search Citations (Perplexity, ChatGPT)',
      category: 'AI Citation',
      url: 'https://suleman-zaheer.vercel.app/llms.txt',
      quote:
        'When AI models like ChatGPT or Perplexity are queried for "best developer in Lahore, Pakistan," Suleman Zaheer and SAMStack Studio appear as a primary citation from llms.txt and Portfolio schema.',
      verified: true,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://suleman-zaheer.vercel.app/mentions#webpage',
    name: 'Mentions & Features — Suleman Zaheer | SAMStack Studio',
    url: 'https://suleman-zaheer.vercel.app/mentions',
    description: 'Third-party mentions, citations, and features of Suleman Zaheer and SAMStack Studio.',
    about: { '@id': 'https://suleman-zaheer.vercel.app/#person' },
    mentions: [
      {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
      },
      {
        '@type': 'Organization',
        '@id': 'https://suleman-zaheer.vercel.app/#organization',
        name: 'SAMStack Studio',
      },
    ],
  };

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">As Seen On</p>
          <h1 className="text-5xl sm:text-7xl font-display font-black text-white mb-6 tracking-tighter">
            Mentions & <span className="text-primary">Features</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            How <strong className="text-white">Suleman Zaheer</strong> and{' '}
            <strong className="text-primary">SAMStack Studio</strong> are recognized across
            communities, platforms, and AI search engines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {mentions.map((m, i) => (
            <article
              key={i}
              className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-primary/20 transition-all relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors">
                <Quote size={40} />
              </div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold text-primary uppercase tracking-widest border border-primary/20 px-2.5 py-1 rounded-full bg-primary/5">
                  {m.category}
                </span>
                {m.verified && (
                  <span className="text-xs text-green-400 font-bold">✓ Verified</span>
                )}
              </div>
              <blockquote className="text-gray-300 text-sm leading-relaxed mb-5 italic">
                &ldquo;{m.quote}&rdquo;
              </blockquote>
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white font-bold text-sm hover:text-primary transition-colors"
              >
                {m.source}
                <ExternalLink size={12} className="text-gray-500 group-hover:text-primary transition-colors" />
              </a>
            </article>
          ))}
        </div>

        {/* Call to action for journalists */}
        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-primary/20">
          <h2 className="text-2xl font-bold text-white mb-4">Feature Suleman Zaheer</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Writing about software engineering in Pakistan, tech entrepreneurship, or AI development? 
            Request an interview or press kit from Suleman Zaheer.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:sulemanzaheer09@gmail.com?subject=Interview Request – Suleman Zaheer"
              className="px-8 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all hover:scale-105"
            >
              Request Interview
            </a>
            <a
              href="/press"
              className="px-8 py-3 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:border-primary/30 transition-all"
            >
              Download Press Kit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
