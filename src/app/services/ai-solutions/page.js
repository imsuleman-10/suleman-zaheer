import Link from 'next/link';

export const metadata = {
  title: 'AI Solutions & LLM Integration Services | Suleman Zaheer – Lahore, Pakistan',
  description: 'Hire Suleman Zaheer for custom AI Solutions, LLM Integrations, AI Agents, and Intelligent Chatbots in Lahore, Pakistan. OpenAI, Google Gemini, Claude, LangChain, RAG systems, vector databases, and enterprise AI automations. Contact: sulemanzaheer09@gmail.com.',
  keywords: [
    'AI Developer Lahore', 'AI Developer Pakistan', 'Hire AI Developer Pakistan',
    'AI Solutions Engineer Lahore', 'AI Agent Developer Pakistan', 'Custom AI Chatbot Developer',
    'LLM Integration Specialist Lahore', 'LangChain Developer Pakistan', 'RAG System Developer Lahore',
    'Generative AI Consultant Pakistan', 'OpenAI API Integration Lahore', 'Gemini AI Developer Pakistan',
    'Enterprise AI Solutions Lahore', 'Suleman Zaheer AI Engineer', 'AI Chatbot for Website Pakistan'
  ],
  alternates: { canonical: 'https://suleman-zaheer.vercel.app/services/ai-solutions' },
  openGraph: {
    title: 'AI Solutions & LLM Integration Services | Suleman Zaheer – Lahore',
    description: 'Empower your company with custom AI solutions, intelligent agentic workflows, conversational chatbots, and RAG knowledge-base systems built by Suleman Zaheer.',
    url: 'https://suleman-zaheer.vercel.app/services/ai-solutions',
    siteName: 'Suleman Zaheer Official Portfolio',
    type: 'website',
    locale: 'en_PK',
    images: [{ url: '/assets/suleman-zaheer-full-stack-developer.jpg', width: 1200, height: 630, alt: 'AI Solutions by Suleman Zaheer – Lahore, Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solutions & LLM Integration | Suleman Zaheer | Lahore',
    description: 'Transform your business with production-grade AI agents, RAG systems, and custom LLM chatbots designed by Suleman Zaheer in Lahore, Pakistan.',
    images: ['/assets/suleman-zaheer-full-stack-developer.jpg'],
    creator: '@imsuleman_10',
  },
};

export default function AISolutionsPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://suleman-zaheer.vercel.app/services/ai-solutions#service',
      name: 'AI Solutions & LLM Integration Services',
      description: 'Production AI engineering, custom LLM applications, RAG (Retrieval-Augmented Generation) knowledge-base assistants, autonomous AI agents, and conversational intelligence systems by Suleman Zaheer in Lahore, Pakistan.',
      url: 'https://suleman-zaheer.vercel.app/services/ai-solutions',
      provider: {
        '@type': 'Person',
        '@id': 'https://suleman-zaheer.vercel.app/#person',
        name: 'Suleman Zaheer',
        url: 'https://suleman-zaheer.vercel.app',
        telephone: '+923285778715',
        email: 'sulemanzaheer09@gmail.com',
        address: { '@type': 'PostalAddress', streetAddress: 'Shahdara Town', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' }
      },
      serviceType: 'Artificial Intelligence & Machine Learning Engineering',
      areaServed: [
        { '@type': 'Country', name: 'Pakistan' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Place', name: 'Worldwide' }
      ],
      offers: {
        '@type': 'Offer',
        priceRange: 'PKR 60,000 - PKR 400,000+',
        priceCurrency: 'PKR',
        availability: 'https://schema.org/InStock'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Solutions Features',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom RAG (Retrieval-Augmented Generation) Knowledge Assistants' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'OpenAI, Google Gemini & Anthropic Claude API Integrations' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Autonomous Multi-Step AI Agents & Workflows' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Intelligent Customer Support Chatbots for Web & Mobile' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vector Database Architecture (Pinecone, ChromaDB, PGVector)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Generative AI Content Pipelines & Automated SEO Generation' } }
        ]
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://suleman-zaheer.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://suleman-zaheer.vercel.app/services' },
        { '@type': 'ListItem', position: 3, name: 'AI Solutions', item: 'https://suleman-zaheer.vercel.app/services/ai-solutions' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a RAG (Retrieval-Augmented Generation) system?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RAG connects a large language model (like GPT-4o, Gemini 1.5, or Claude 3.5) directly to your proprietary company documents, product catalogs, customer service histories, or databases. The AI answers queries strictly using your verified company facts with zero hallucinations.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can the AI chatbot be deployed to WhatsApp and websites?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Suleman Zaheer connects custom AI engines seamlessly to official WhatsApp Business numbers, website chat widgets, Telegram channels, and internal Slack/Discord channels.'
          }
        },
        {
          '@type': 'Question',
          name: 'How much does custom AI and chatbot development cost in Lahore, Pakistan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AI integration and chatbot projects start from PKR 60,000 for website knowledge bots, and range up to PKR 350,000+ for enterprise RAG architectures with vector databases and automated multi-agent workflows. Reach out to sulemanzaheer09@gmail.com for a free proposal.'
          }
        },
        {
          '@type': 'Question',
          name: 'What LLM frameworks and AI tools does Suleman Zaheer use for production projects?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suleman Zaheer uses LangChain, LlamaIndex, and OpenAI/Gemini/Claude APIs to build production RAG (Retrieval-Augmented Generation) systems, autonomous AI agents, and conversational chatbots. For vector storage he uses Pinecone, Chroma, and pgvector. Projects are deployed with FastAPI or Next.js API routes. Based in Lahore, Pakistan via SAMStack Studio. Contact: sulemanzaheer09@gmail.com.'
          }
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs sm:text-sm text-gray-400 mb-8 gap-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
          <span>/</span>
          <span className="text-white font-medium">AI Solutions & LLM Integration</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            Generative AI & Agentic Engineering
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight mb-6">
            Custom AI Solutions & LLM Integrations in <span className="text-cyan-400">Lahore, Pakistan</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Harness the transformative power of modern Artificial Intelligence. Suleman Zaheer designs and deploys custom RAG systems, autonomous multi-step AI agents, conversational WhatsApp bots, and intelligent document processors that give your company a decisive unfair competitive advantage.
          </p>
        </header>

        {/* Core Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-2">RAG Knowledge Assistants</h3>
            <p className="text-gray-400 text-sm">Transform internal PDFs, manuals, and customer FAQs into an instant, hallucination-free AI assistant for your team and clients.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-2">Omnichannel AI Chatbots</h3>
            <p className="text-gray-400 text-sm">Human-like conversational intelligence on your website, WhatsApp, and Telegram that closes sales and resolves 80%+ of support queries automatically.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-2">Autonomous AI Agents</h3>
            <p className="text-gray-400 text-sm">Multi-agent systems that research, draft documents, analyze data, and trigger external webhooks without human intervention.</p>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16 p-8 rounded-3xl bg-neutral-900 border border-neutral-800">
          <h2 className="text-2xl font-bold text-white mb-6">AI Engineering Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white/5">
              <span className="block font-bold text-cyan-400 text-lg">OpenAI & Gemini</span>
              <span className="text-xs text-gray-400">Foundation Models</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <span className="block font-bold text-purple-400 text-lg">LangChain & LlamaIndex</span>
              <span className="text-xs text-gray-400">Agent Frameworks</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <span className="block font-bold text-emerald-400 text-lg">Pinecone & PGVector</span>
              <span className="text-xs text-gray-400">Vector Embeddings</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <span className="block font-bold text-blue-400 text-lg">FastAPI & Python</span>
              <span className="text-xs text-gray-400">Microservice APIs</span>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold text-base mb-2">Are company data and trade secrets kept private?</h3>
              <p className="text-gray-400 text-sm">Yes. We use enterprise zero-data-retention APIs and self-hosted vector databases, ensuring your proprietary information is never used to train public foundation models.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold text-base mb-2">Can the AI integrate with my existing SQL database?</h3>
              <p className="text-gray-400 text-sm">Yes, we build Text-to-SQL and natural language query interfaces that allow business managers to ask questions in plain English or Urdu and receive instant charts and data tables.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold text-base mb-2">What is the delivery timeline for an AI project?</h3>
              <p className="text-gray-400 text-sm">Production-ready AI bots and workflow integrations typically deploy within 3 to 6 weeks, complete with fine-tuning and evaluation metrics.</p>
            </div>
          </div>
        </section>

        {/* CTA Bar */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-neutral-900 border border-cyan-500/30 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Integrate AI Into Your Business Today</h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Consult directly with Suleman Zaheer to identify high-ROI AI opportunities for your organization.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20"
            >
              Get Free AI Strategy Call
            </Link>
            <a
              href="https://wa.me/923285778715?text=Hi%20Suleman,%20I%20am%20interested%20in%20custom%20AI%20Solutions%20and%20LLM%20Integrations."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-all border border-neutral-700"
            >
              WhatsApp: +92 328 5778715
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
