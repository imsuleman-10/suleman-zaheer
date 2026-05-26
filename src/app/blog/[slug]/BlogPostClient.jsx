"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, Clock, Tag, User, Calendar,
  Share2, Copy, Check, BookOpen, ArrowUpRight, ChevronRight
} from 'lucide-react';

// ─── Reading Progress Bar ─────────────────────────────────────────────────────
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-white/5">
      <div
        className="h-full bg-primary transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ─── Share Button ─────────────────────────────────────────────────────────────
function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all text-xs font-bold"
    >
      {copied ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
      {copied ? 'Link Copied!' : 'Share'}
    </button>
  );
}

// ─── Format date ──────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return 'Recently';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  } catch { return 'Recently'; }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlogPostClient({ initialPost }) {
  const [post, setPost] = useState(initialPost);
  const articleRef = useRef(null);

  useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  // ── Not Found ──────────────────────────────────────────────────────────────
  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white px-4">
        <BookOpen className="w-16 h-16 text-gray-700 mb-6" />
        <h1 className="text-4xl font-black mb-3">Article Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-sm text-center">
          The article you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
        >
          <ArrowLeft size={18} /> Back to Blog
        </Link>
      </div>
    );
  }

  const formattedDate = formatDate(post.publishedAt || post.createdAt);

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-primary/30">
      {/* ── Reading Progress ── */}
      <ReadingProgressBar />

      {/* ── Cover Image Hero ─────────────────────────────────────── */}
      {post.coverImage && (
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Deep gradient so text is always readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/30" />

          {/* Category badge on image bottom */}
          {post.category && (
            <div className="absolute bottom-10 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6">
              <span className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-black uppercase tracking-widest">
                {post.category}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Article ──────────────────────────────────────────────── */}
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${post.coverImage ? 'pt-12' : 'pt-36'} pb-24`}>

        {/* Back nav — always shown here, never inside the hero */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 font-medium text-sm group"
        >
          <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
            <ArrowLeft size={15} />
          </span>
          Back to Articles
        </Link>

        {/* Category (when no cover image) */}
        {post.category && !post.coverImage && (
          <div className="mb-6">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-wider">
              {post.category}
            </span>
          </div>
        )}

        {/* ── Title ── */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-8 mt-4">
          {post.title}
        </h1>

        {/* ── Excerpt ── */}
        {post.excerpt && (
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 border-l-4 border-primary/40 pl-6 italic">
            {post.excerpt}
          </p>
        )}

        {/* ── Author + Meta Bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-5 py-6 border-y border-white/8 mb-12">
          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-primary/20 flex-shrink-0">
              <Image
                src="/assets/author.jpg"
                alt="Suleman Zaheer"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">
                Suleman Zaheer
                <span className="text-primary mx-2 font-light">|</span>
                <span dir="rtl" lang="ur" className="font-normal text-gray-300">سلیمان ظہیر</span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Full Stack Developer · UET Lahore, Pakistan</p>
            </div>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <Calendar size={12} className="text-primary" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <Clock size={12} className="text-primary" />
              {post.readTime || '5 min read'}
            </span>
            <ShareButton title={post.title} />
          </div>
        </div>

        {/* ── Article Content ── */}
        <article
          ref={articleRef}
          className="
            prose prose-invert prose-lg max-w-none
            prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:text-white prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:text-white prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold
            prose-em:text-gray-200
            prose-code:text-primary prose-code:bg-primary/10 prose-code:border prose-code:border-primary/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:text-sm prose-pre:leading-relaxed
            prose-blockquote:border-l-primary/50 prose-blockquote:text-gray-300 prose-blockquote:bg-white/[0.03] prose-blockquote:rounded-r-xl prose-blockquote:px-6 prose-blockquote:py-1 prose-blockquote:not-italic
            prose-img:rounded-2xl prose-img:border prose-img:border-white/10
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:text-gray-300 prose-li:leading-relaxed
            prose-hr:border-white/10
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ── Tags ── */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/8">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">
              Topics Covered
            </h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-xs font-bold text-gray-300 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all cursor-default"
                >
                  <Tag size={11} className="text-primary/70" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Share footer ── */}
        <div className="mt-10 flex items-center justify-between py-6 border-t border-white/8">
          <p className="text-sm text-gray-500">Found this helpful? Share it.</p>
          <ShareButton title={post.title} />
        </div>

        {/* ── Author Card ── */}
        <div className="mt-6 p-8 rounded-[2rem] bg-white/[0.03] border border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-primary/20 flex-shrink-0">
            <Image
              src="/assets/author.jpg"
              alt="Suleman Zaheer"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Written by</p>
            <h2 className="text-white font-black text-xl mb-1">
              Suleman Zaheer <span className="font-normal text-gray-400 text-lg" dir="rtl" lang="ur">| سلیمان ظہیر</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Full Stack Developer from Lahore, Pakistan. CS student at UET Lahore. Building production-grade
              web applications with MERN Stack and Next.js, and writing about real-world software engineering.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-primary text-xs font-bold hover:underline"
              >
                More Articles <ChevronRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-gray-400 text-xs font-bold hover:text-white transition-colors"
              >
                Contact <ArrowUpRight size={14} />
              </Link>
              <a
                href="https://wa.me/923285778715"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-400 text-xs font-bold hover:text-white transition-colors"
              >
                Hire Me <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Read More CTA ── */}
        <div className="mt-8 p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/15 text-center">
          <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-black text-white mb-2">Explore More Articles</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            9 in-depth technical articles on MERN Stack, Next.js, freelancing, UI/UX, and modern backend architecture.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all hover:gap-3 shadow-lg shadow-primary/20"
          >
            View All Articles <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
