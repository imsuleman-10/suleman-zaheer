"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, Calendar, Tag, Share2, Copy, Check,
  CheckCircle, Feather, BookOpen, ArrowUpRight, Heart,
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
        className="h-full bg-gradient-to-r from-rose-400 to-violet-400 transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ─── Format date ──────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return 'Recently';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    });
  } catch { return 'Recently'; }
}

// ─── Main Client Component ────────────────────────────────────────────────────
export default function PoemPostClient({ initialPoem }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  if (!initialPoem) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white px-4">
        <Feather className="w-16 h-16 text-rose-400/40 mb-6" />
        <h1 className="text-4xl font-display font-black mb-4">Kalam Not Found</h1>
        <p className="text-gray-400 mb-8 text-center max-w-md">
          The poem you are looking for does not exist or has been removed from the collection.
        </p>
        <Link
          href="/poetry"
          className="flex items-center gap-2 px-7 py-3.5 bg-rose-400/10 border border-rose-400/20 text-rose-300 font-bold rounded-2xl hover:bg-rose-400/20 transition-all"
        >
          <ArrowLeft size={16} /> Back to Collection
        </Link>
      </div>
    );
  }

  const poem = initialPoem;
  const isUrdu = poem.language === 'Urdu' || poem.language?.includes('Mixed');
  const formattedDate = formatDate(poem.publishedAt);

  const handleCopy = () => {
    const text = `${poem.title}\n\n${poem.content}\n\n— Suleman Zaheer | سلیمان ظہیر`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: poem.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-rose-400/30 pb-28 relative overflow-hidden">
      <ReadingProgressBar />

      {/* Ambient background glows */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-rose-500/5 blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[130px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-rose-900/5 blur-[100px] pointer-events-none" />

      {/* Toast — poem copied */}
      {copied && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl bg-rose-400/20 border border-rose-400/30 text-rose-300 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
          <CheckCircle size={14} /> Kalam copied to clipboard!
        </div>
      )}

      {/* Toast — link shared */}
      {shared && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl bg-violet-400/20 border border-violet-400/30 text-violet-300 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
          <Check size={14} /> Link copied to clipboard!
        </div>
      )}

      <article className="pt-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Back Navigation ─────────────────────────────────────────────── */}
        <Link
          href="/poetry"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-rose-300 transition-all duration-300 mb-14 font-medium text-sm group"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-rose-400/15 transition-colors">
            <ArrowLeft size={15} className="group-hover:text-rose-300 transition-colors" />
          </div>
          Back to Poetry Collection
        </Link>

        {/* ── Poem Header ─────────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          {/* Genre & Language badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="px-5 py-2 rounded-full bg-rose-400/10 border border-rose-400/20 text-rose-300 text-xs font-black uppercase tracking-wider">
              {poem.type || 'Poetry'}
            </span>
            <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold">
              {poem.language === 'Urdu' ? 'اردو — Urdu' : poem.language || 'English'}
            </span>
            {poem.theme && (
              <span className="px-5 py-2 rounded-full bg-violet-400/5 border border-violet-400/15 text-violet-400 text-xs italic">
                {poem.theme}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className={`font-black text-white leading-tight mb-8
              ${isUrdu
                ? 'font-urdu text-4xl sm:text-5xl md:text-6xl leading-relaxed text-right'
                : 'font-display text-4xl sm:text-5xl md:text-6xl tracking-tight'
              }`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          >
            {poem.title}
          </h1>

          {/* Author & Date */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 text-sm">
              <Feather size={14} className="text-rose-400" />
              <span className="text-gray-500">by</span>
              <span className="text-rose-300 font-bold">Suleman Zaheer</span>
              <span className="text-gray-700">·</span>
              <span className="text-rose-200 font-semibold font-urdu" dir="rtl" lang="ur">سلیمان ظہیر</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Calendar size={12} className="text-rose-400/60" />
              {formattedDate}
            </div>
          </div>
        </div>

        {/* ── Decorative Divider ──────────────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-400/30 to-transparent" />
          <div className="flex items-center gap-1.5 text-rose-400/50">
            <span className="text-lg">✦</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-400/30 to-transparent" />
        </div>

        {/* ── Poem Content ────────────────────────────────────────────────── */}
        <div className="relative mb-14">
          {/* Atmospheric card */}
          <div className="relative bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/8 rounded-[2rem] p-8 sm:p-14 backdrop-blur-sm overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-rose-400/30 to-transparent" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-400/5 rounded-full blur-2xl pointer-events-none" />

            {/* Decorative feather */}
            <Feather
              className="absolute top-8 right-8 w-10 h-10 text-white/[0.04] -rotate-12"
            />

            {/* The actual poem */}
            <div
              className={`relative z-10 whitespace-pre-wrap leading-loose
                ${isUrdu
                  ? 'font-urdu text-right text-2xl sm:text-3xl leading-[2.8] text-gray-100'
                  : 'font-serif text-center text-xl sm:text-2xl text-gray-100 leading-loose tracking-wide'
                }`}
              dir={isUrdu ? 'rtl' : 'ltr'}
              lang={isUrdu ? 'ur' : 'en'}
            >
              {poem.content}
            </div>
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 py-8 border-t border-white/5">
          {/* Tags */}
          {poem.tags && poem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {poem.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-500 hover:text-gray-300 hover:border-rose-400/20 transition-colors"
                >
                  <Tag size={9} className="text-rose-400" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-gray-400 hover:bg-rose-400/10 hover:text-rose-300 hover:border-rose-400/20 transition-all"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Poem'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-gray-400 hover:bg-violet-400/10 hover:text-violet-300 hover:border-violet-400/20 transition-all"
            >
              {shared ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
              {shared ? 'Link Copied' : 'Share'}
            </button>
          </div>
        </div>

        {/* ── Author Card ──────────────────────────────────────────────────── */}
        <div className="mt-10 p-8 sm:p-10 rounded-[2rem] border border-white/5 bg-gradient-to-br from-rose-950/20 via-neutral-900/20 to-violet-950/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-rose-400/30 to-transparent" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-7">
            {/* Avatar with Author Image */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400/20 to-violet-400/20 border border-rose-400/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <Image
                src="/assets/author.jpg"
                alt="Suleman Zaheer - Poet & Author"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bio */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <p className="text-white font-black text-lg">Suleman Zaheer</p>
                <span className="text-gray-600 hidden sm:block">·</span>
                <p className="text-rose-300 font-semibold font-urdu text-lg" dir="rtl" lang="ur">سلیمان ظہیر</p>
              </div>
              <p className="text-rose-400/70 text-xs font-bold uppercase tracking-wider mb-3">
                Full-Stack Developer · Poet · Researcher
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Building software by day, writing poetry by night. Exploring the intersection of
                technology, emotion, and the human experience through both code and verse.
              </p>
            </div>
          </div>

          {/* CTA links */}
          <div className="flex flex-wrap gap-3 mt-7 pt-6 border-t border-white/5 justify-center sm:justify-start">
            <Link
              href="/poetry"
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-400/10 border border-rose-400/20 text-rose-300 text-xs font-bold hover:bg-rose-400/20 transition-all"
            >
              <BookOpen size={13} /> More Poetry
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-xs font-bold hover:bg-white/10 hover:text-white transition-all"
            >
              <ArrowUpRight size={13} /> Read Articles
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-xs font-bold hover:bg-white/10 hover:text-white transition-all"
            >
              <Heart size={13} className="text-rose-400" /> Get in Touch
            </Link>
          </div>
        </div>

      </article>
    </main>
  );
}
