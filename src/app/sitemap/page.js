import Link from 'next/link';
import { ChevronRight, FileText, BookOpen, Layers, Award, Layout, ShieldAlert } from 'lucide-react';
import { db } from '@/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { STATIC_BLOGS } from '@/data/staticBlogs';
import { STATIC_POEMS } from '@/data/staticPoems';

export const metadata = {
  title: "HTML Sitemap | Suleman Zaheer",
  description: "Complete list of pages on Suleman Zaheer's professional portfolio — including dynamic blogs, poetry, and projects.",
  alternates: {
    canonical: "https://suleman-zaheer.vercel.app/sitemap",
  },
};

async function getBlogs() {
  try {
    const q = query(collection(db, 'blogs'), orderBy('publishedAt', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return STATIC_BLOGS;
    const firestoreBlogs = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        slug: data.slug,
        title: data.title,
      };
    });
    const firestoreSlugs = new Set(firestoreBlogs.map(b => b.slug));
    const staticFallbacks = STATIC_BLOGS.filter(b => !firestoreSlugs.has(b.slug));
    return [...firestoreBlogs, ...staticFallbacks];
  } catch (error) {
    console.error('Sitemap page blogs fetch error:', error.message);
    return STATIC_BLOGS;
  }
}

async function getPoems() {
  try {
    const q = query(
      collection(db, 'poems'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return STATIC_POEMS;
    const firestorePoems = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        slug: data.slug,
        title: data.title,
      };
    });
    const firestoreSlugs = new Set(firestorePoems.map(p => p.slug));
    const staticFallbacks = STATIC_POEMS.filter(p => !firestoreSlugs.has(p.slug));
    return [...firestorePoems, ...staticFallbacks];
  } catch (error) {
    console.error('Sitemap page poems fetch error:', error.message);
    return STATIC_POEMS;
  }
}

export default async function SitemapPage() {
  const [blogs, poems] = await Promise.all([getBlogs(), getPoems()]);

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "About Suleman Zaheer", path: "/about" },
    { name: "Projects Portfolio", path: "/projects" },
    { name: "Professional Blog Index", path: "/blog" },
    { name: "Poetry Collection Index", path: "/poetry" },
    { name: "About the Author & Researcher", path: "/author" },
    { name: "Portfolio Gallery", path: "/gallery-seo" },
    { name: "Curriculum Vitae (CV)", path: "/cv" },
    { name: "Contact & Hire", path: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Website <span className="text-primary italic">Sitemap</span>
        </h1>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Complete and updated navigation map for Suleman Zaheer&apos;s professional portfolio.
          All dynamic pages are fully synchronized and indexed in Google Search Console via{' '}
          <a href="/sitemap.xml" className="text-primary underline underline-offset-4 font-semibold hover:text-primary/80 transition-colors">sitemap.xml</a>.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Pages */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block animate-pulse" />
              Main Sections
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

          {/* Poetry Section */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-rose-400/20 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block animate-pulse" />
              Poetry &amp; Shayari
            </h2>
            <ul className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {poems.map((poem, idx) => (
                <li key={idx}>
                  <Link href={`/poetry/${poem.slug}`} className="flex items-start text-gray-400 hover:text-rose-400 transition-colors group/link">
                    <ChevronRight size={16} className="mr-2 mt-1 opacity-50 flex-shrink-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                    <span className="line-clamp-1">{poem.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Articles */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-400/20 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block animate-pulse" />
              Blog Articles
            </h2>
            <ul className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {blogs.map((blog, idx) => (
                <li key={idx}>
                  <Link href={`/blog/${blog.slug}`} className="flex items-start text-gray-400 hover:text-blue-400 transition-colors group/link">
                    <ChevronRight size={16} className="mr-2 mt-1 opacity-50 flex-shrink-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                    <span className="line-clamp-2">{blog.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-16">
          Dynamic XML sitemap for search engines:{' '}
          <a href="/sitemap.xml" className="text-primary/60 hover:text-primary transition-colors underline underline-offset-4">
            /sitemap.xml
          </a>
        </p>
      </div>
    </div>
  );
}

