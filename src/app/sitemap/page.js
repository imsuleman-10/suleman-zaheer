import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: "HTML Sitemap | Suleman Zaheer",
  description: "Complete list of pages on Suleman Zaheer's professional portfolio — including blogs, poetry, and projects.",
  alternates: {
    canonical: "https://suleman-zaheer.vercel.app/sitemap",
  },
};

export default function SitemapPage() {
  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "About Suleman Zaheer", path: "/about" },
    { name: "Projects Portfolio", path: "/projects" },
    { name: "Professional Blog", path: "/blog" },
    { name: "Poetry Collection (Urdu & English)", path: "/poetry" },
    { name: "Portfolio Gallery", path: "/gallery-seo" },
    { name: "Curriculum Vitae (CV)", path: "/cv" },
    { name: "Contact & Hire", path: "/contact" },
  ];

  const blogPosts = [
    { name: "Why Next.js is Best for SEO", path: "/blog/why-nextjs-is-best-for-seo" },
    { name: "MERN Stack Complete Guide 2025", path: "/blog/mern-stack-complete-guide-2025" },
    { name: "React Performance Optimization Tips", path: "/blog/react-performance-optimization-tips" },
    { name: "Node.js REST API Best Practices", path: "/blog/node-js-rest-api-best-practices" },
    { name: "Enterprise Software Consulting in Pakistan", path: "/blog/enterprise-software-consulting-pakistan" },
  ];

  const poetryLinks = [
    { name: "All Poetry – Ghazals, Nazms & More", path: "/poetry" },
    { name: "Urdu Ghazal Collection", path: "/poetry?type=Ghazal" },
    { name: "Nazm (Urdu Free Verse)", path: "/poetry?type=Nazm" },
    { name: "English Poetry – Free Verse", path: "/poetry?type=Free+Verse" },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Website <span className="text-primary italic">Sitemap</span>
        </h1>
        <p className="text-gray-400 mb-12">
          Complete navigation map for Suleman Zaheer&apos;s professional portfolio.
          All pages are indexed in Google Search Console via{' '}
          <a href="/sitemap.xml" className="text-primary underline underline-offset-4">sitemap.xml</a>.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Pages */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              Main Pages
            </h2>
            <ul className="space-y-3">
              {mainLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.path} className="flex items-center text-gray-400 hover:text-primary transition-colors group/link">
                    <ChevronRight size={16} className="mr-2 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all flex-shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Poetry */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
              Poetry (Nazm &amp; Ghazal)
            </h2>
            <ul className="space-y-3">
              {poetryLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.path} className="flex items-start text-gray-400 hover:text-rose-400 transition-colors group/link">
                    <ChevronRight size={16} className="mr-2 mt-1 opacity-50 flex-shrink-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Articles */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 md:col-span-2">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
              Blog Articles
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {blogPosts.map((post, idx) => (
                <li key={idx}>
                  <Link href={post.path} className="flex items-start text-gray-400 hover:text-primary transition-colors group/link">
                    <ChevronRight size={16} className="mr-2 mt-1 opacity-50 flex-shrink-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                    <span>{post.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-12">
          Dynamic XML sitemap for search engines:{' '}
          <a href="/sitemap.xml" className="text-primary/60 hover:text-primary transition-colors underline underline-offset-4">
            /sitemap.xml
          </a>
        </p>
      </div>
    </div>
  );
}
