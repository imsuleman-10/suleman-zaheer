"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight, Clock, Tag, BookOpen, Search,
  User, ChevronRight, Rss, Layers, Code2, Briefcase,
  Palette, Server, Shield, TrendingUp, Zap
} from 'lucide-react';

// ─── Icon map for dynamic categories ─────────────────────────────────────────
const CATEGORY_ICONS = {
  'System Design':        <TrendingUp size={13} />,
  'Next.js & SEO':        <Zap size={13} />,
  'React':                <Code2 size={13} />,
  'Backend':              <Server size={13} />,
  'Backend Architecture': <Server size={13} />,
  'Frontend':             <Palette size={13} />,
  'Design':               <Palette size={13} />,
  'Freelancing':          <Briefcase size={13} />,
  'Career':               <Briefcase size={13} />,
};

// ─── Format date nicely ───────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return 'Recently';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  } catch {
    return 'Recently';
  }
}

// ─── Hero Post Component ──────────────────────────────────────────────────────
function HeroPost({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block w-full rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-500"
      style={{ minHeight: '520px' }}
    >
      {/* Cover Image */}
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Featured badge */}
      <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-lg">
        <Rss size={12} />
        Featured Article
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {post.category && (
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-gray-300 text-xs font-medium">
            <Clock size={12} className="text-primary" />
            {post.readTime || '5 min read'}
          </span>
          <span className="text-gray-400 text-xs">{formatDate(post.publishedAt)}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4 max-w-3xl group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mb-6 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Tags + CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags?.slice(0, 4).map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[10px] font-bold text-gray-300 uppercase tracking-wider border border-white/10">
                {tag}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm group-hover:bg-primary/90 transition-all group-hover:gap-3">
            Read Full Article <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Blog Card Component ──────────────────────────────────────────────────────
function BlogCard({ post, featured = false }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-400 ${featured ? 'md:col-span-2 md:flex-row' : ''}`}
    >
      {/* Cover Image */}
      {post.coverImage && (
        <div className={`relative overflow-hidden flex-shrink-0 ${featured ? 'md:w-2/5 h-56 md:h-auto' : 'h-48'}`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
          {/* Category chip on image */}
          {post.category && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-bold text-primary uppercase tracking-wider">
              {post.category}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 p-7 gap-4">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Clock size={11} className="text-primary" />
            {post.readTime || '5 min read'}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={11} className="text-primary" />
            Suleman Zaheer
          </span>
          <span className="ml-auto">{formatDate(post.publishedAt)}</span>
        </div>

        {/* Title */}
        <h2 className={`font-bold text-white group-hover:text-primary transition-colors duration-300 leading-snug ${featured ? 'text-xl md:text-2xl' : 'text-lg sm:text-xl'}`}>
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {post.tags?.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-[9px] font-bold text-gray-500 uppercase tracking-wider hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Tag size={8} />
                {tag}
              </span>
            ))}
            {post.tags?.length > 3 && (
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-[9px] font-bold text-gray-600 uppercase">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold group-hover:translate-x-1 transition-transform">
            Read <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Blog List Client ────────────────────────────────────────────────────
export default function BlogListClient({ initialBlogs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Derive unique categories present in the actual posts
  const presentCategories = useMemo(() => {
    const cats = new Set(initialBlogs.map(b => b.category).filter(Boolean));
    const dynamicCats = Array.from(cats).map(cat => ({
      label: cat,
      value: cat,
      icon: CATEGORY_ICONS[cat] || <Layers size={13} />
    }));
    return [
      { label: 'All Articles', value: 'all', icon: <Layers size={13} /> },
      ...dynamicCats
    ];
  }, [initialBlogs]);

  // Filter logic
  const filteredPosts = useMemo(() => {
    return initialBlogs.filter(post => {
      const matchesSearch =
        !searchTerm ||
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory =
        activeCategory === 'all' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialBlogs, searchTerm, activeCategory]);

  const heroPost = !searchTerm && activeCategory === 'all' ? filteredPosts[0] : null;
  const gridPosts = heroPost ? filteredPosts.slice(1) : filteredPosts;

  // Stats
  const totalReadTime = initialBlogs.reduce((acc, p) => {
    const mins = parseInt(p.readTime) || 5;
    return acc + mins;
  }, 0);

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-primary/30">

      {/* ── Hero Header ───────────────────────────────────────────── */}
      <div className="pt-32 pb-10 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 w-[800px] h-[500px] -translate-x-1/2 bg-primary/5 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-blue-500/3 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 uppercase tracking-widest">
            <Rss size={13} />
            Developer Insights & Research
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-none tracking-tighter text-white mb-5">
                Web Dev<br />
                <span className="text-gray-700">Blog</span>{' '}
                <span className="text-primary italic font-medium text-3xl sm:text-4xl md:text-5xl">
                  — by Suleman Zaheer
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                In-depth articles on MERN Stack, Next.js, React, Node.js, UI/UX, freelancing,
                and modern software engineering — written from real-world project experience.
              </p>
            </div>

            {/* Stats block */}
            <div className="flex gap-6 shrink-0">
              {[
                { value: initialBlogs.length, label: 'Articles' },
                { value: `${totalReadTime}m`, label: 'Total Reading' },
                { value: presentCategories.length - 1, label: 'Topics' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-black text-primary">{stat.value}</div>
                  <div className="text-gray-500 text-xs font-medium mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Search ──────────────────────────────────────────── */}
          <div className="relative max-w-2xl mb-6">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="search"
              className="w-full bg-white/5 border border-white/10 text-white rounded-2xl pl-14 pr-5 py-4 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all placeholder-gray-600 text-sm"
              placeholder="Search articles by title, topic, or technology..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-5 flex items-center text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
              >
                Clear
              </button>
            )}
          </div>

          {/* ── Category Filters ──────────────────────────────── */}
          <div className="flex flex-wrap gap-2 mb-2">
            {presentCategories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${
                  activeCategory === cat.value
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">

        {/* Results info */}
        {(searchTerm || activeCategory !== 'all') && (
          <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">
            <span>
              Showing <span className="text-white font-bold">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
              {searchTerm && <> matching &quot;<span className="text-primary">{searchTerm}</span>&quot;</>}
              {activeCategory !== 'all' && <> in <span className="text-primary">{activeCategory}</span></>}
            </span>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              className="text-primary hover:underline text-xs font-bold"
            >
              Clear filters
            </button>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          /* ── Empty State ── */
          <div className="text-center py-28 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
            <BookOpen className="w-14 h-14 text-gray-700 mx-auto mb-5" />
            <h2 className="text-2xl font-bold text-gray-300 mb-3">No articles found</h2>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              Try a different search term or browse all categories.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              className="px-8 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all"
            >
              Show All Articles
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* ── Hero Post ── */}
            {heroPost && <HeroPost post={heroPost} />}

            {/* ── Grid ── */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {gridPosts.map((post, i) => (
                  <BlogCard key={post.id || post.slug} post={post} featured={false} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Author CTA ──────────────────────────────────────── */}
        <div className="mt-24 relative rounded-[3rem] overflow-hidden border border-white/5">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />

          <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
            {/* Author avatar */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border border-primary/20 flex-shrink-0">
              <Image
                src="/assets/author.jpg"
                alt="Suleman Zaheer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 128px"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">About the Author</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                Suleman Zaheer
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-xl mb-6 text-sm">
                Full Stack Developer from Lahore, Pakistan. Currently pursuing a BS in Computer Science at UET Lahore.
                I write technical articles from real project experience — covering MERN Stack, Next.js, system design,
                freelancing, and UI/UX psychology.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a
                  href="https://wa.me/923285778715"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                >
                  Hire Me on WhatsApp <ArrowUpRight size={16} />
                </a>
                <Link
                  href="/author"
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all"
                >
                  About the Author <ChevronRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all"
                >
                  Get In Touch <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
