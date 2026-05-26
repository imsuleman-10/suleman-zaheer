"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight, Feather, Search, Sparkles, BookOpen,
  Globe, Heart, Layers, Moon, Sun, Star, Wind,
} from 'lucide-react';

// ─── Mood / Genre filter config ───────────────────────────────────────────────
const FILTERS = [
  { label: 'All Verses',  value: 'all',    icon: <Layers size={13} /> },
  { label: 'Ghazal',      value: 'Ghazal', icon: <Star size={13} /> },
  { label: 'Nazm',        value: 'Nazm',   icon: <Moon size={13} /> },
  { label: 'Poem',        value: 'Poem',   icon: <Feather size={13} /> },
  { label: 'Urdu',        value: '__urdu', icon: <Wind size={13} /> },
  { label: 'English',     value: '__en',   icon: <Globe size={13} /> },
];

// ─── Format date ──────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  } catch { return ''; }
}

// ─── Featured Hero Poem ───────────────────────────────────────────────────────
function HeroPoem({ poem }) {
  const isUrdu = poem.language === 'Urdu' || poem.language?.includes('Mixed');
  const snippet = poem.content ? poem.content.split('\n').slice(0, 3).join('\n') : '';

  return (
    <Link
      href={`/poetry/${poem.slug}`}
      className="group relative block w-full rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-rose-400/30 transition-all duration-500"
      style={{ minHeight: '480px' }}
    >
      {/* Cover Image from admin (SEO-indexed via ImgBB public URL) */}
      {poem.coverImage ? (
        <>
          <Image
            src={poem.coverImage}
            alt={`${poem.title} — ${poem.type || 'Poetry'} by Suleman Zaheer`}
            fill
            className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </>
      ) : (
        <>
          {/* Fallback atmospheric background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-rose-950/20 to-violet-950/30" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </>
      )}

      {/* Floating particles effect */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl group-hover:bg-rose-500/20 transition-all duration-700" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-violet-500/10 blur-3xl group-hover:bg-violet-500/15 transition-all duration-700" />

      {/* Featured badge */}
      <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-rose-400/20 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
        <Heart size={11} fill="currentColor" />
        Featured Verse
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
            {poem.type || 'Poetry'}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium">
            {poem.language === 'Urdu' ? 'اردو' : poem.language}
          </span>
          {poem.theme && (
            <span className="text-gray-400 text-xs italic">{poem.theme}</span>
          )}
        </div>

        {/* Title */}
        <h2
          className={`font-black text-white mb-6 leading-tight group-hover:text-rose-100 transition-colors duration-300
            ${isUrdu ? 'font-urdu text-4xl md:text-5xl text-right leading-relaxed' : 'text-3xl md:text-5xl font-display'}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          {poem.title}
        </h2>

        {/* Snippet */}
        {snippet && (
          <p
            className={`text-gray-300 text-lg mb-8 leading-loose opacity-80 group-hover:opacity-100 transition-opacity line-clamp-2
              ${isUrdu ? 'font-urdu text-right text-xl leading-[2.5]' : 'font-serif italic'}`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          >
            {snippet}
          </p>
        )}

        {/* CTA */}
        <div className="flex items-center gap-3">
          <span className="px-6 py-3 rounded-2xl bg-rose-400/10 border border-rose-400/20 text-rose-300 text-sm font-bold flex items-center gap-2 group-hover:bg-rose-400/20 transition-all">
            <BookOpen size={16} />
            Read Full Poem
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
          <span className="text-gray-500 text-xs">{formatDate(poem.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Poem Card ────────────────────────────────────────────────────────────────
function PoemCard({ poem, index }) {
  const isUrdu = poem.language === 'Urdu' || poem.language?.includes('Mixed');
  const snippet = poem.content
    ? poem.content.split('\n').slice(0, isUrdu ? 2 : 3).join('\n')
    : '';

  // Alternate accent colors for variety
  const accents = [
    { border: 'hover:border-rose-400/30', glow: 'hover:shadow-[0_10px_40px_-10px_rgba(251,113,133,0.2)]', badge: 'bg-rose-400/10 border-rose-400/20 text-rose-300', line: 'via-rose-400/50' },
    { border: 'hover:border-violet-400/30', glow: 'hover:shadow-[0_10px_40px_-10px_rgba(167,139,250,0.2)]', badge: 'bg-violet-400/10 border-violet-400/20 text-violet-300', line: 'via-violet-400/50' },
    { border: 'hover:border-primary/30', glow: 'hover:shadow-[0_10px_40px_-10px_rgba(var(--primary-rgb),0.15)]', badge: 'bg-primary/10 border-primary/20 text-primary', line: 'via-primary/50' },
    { border: 'hover:border-amber-400/30', glow: 'hover:shadow-[0_10px_40px_-10px_rgba(251,191,36,0.15)]', badge: 'bg-amber-400/10 border-amber-400/20 text-amber-300', line: 'via-amber-400/50' },
  ];
  const accent = accents[index % accents.length];

  return (
    <Link
      href={`/poetry/${poem.slug}`}
      className={`group relative rounded-[2.5rem] bg-neutral-900/30 border border-white/5 ${accent.border} 
        transition-all duration-500 flex flex-col h-full overflow-hidden backdrop-blur-md ${accent.glow} hover:-translate-y-2`}
    >
      {/* Cover Image (SEO: public ImgBB URL, indexed by Google) */}
      {poem.coverImage && (
        <div className="relative w-full h-52 overflow-hidden rounded-t-[2.5rem] flex-shrink-0">
          <Image
            src={poem.coverImage}
            alt={`${poem.title} — ${poem.type || 'Poem'} by Suleman Zaheer`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 500px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900/80" />
          {/* Type badge on image */}
          <span className={`absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border backdrop-blur-sm ${accent.badge}`}>
            {poem.type || 'Poetry'}
          </span>
          <span className="absolute top-4 right-4 text-xs text-gray-300 font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
            {poem.language === 'Urdu' ? 'اردو' : poem.language || 'English'}
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-8 sm:p-10 relative">
        {/* Internal gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Top shimmer line */}
        <div className={`absolute top-0 inset-x-10 h-[1px] bg-gradient-to-r from-transparent ${accent.line} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

        {/* Decorative quote mark */}
        <div className="absolute top-6 right-7 text-[5rem] leading-none text-white/[0.03] font-serif select-none group-hover:text-white/[0.05] transition-colors duration-500">
          {isUrdu ? '،،' : '"'}
        </div>

        {/* Header — only show if no cover image (otherwise type is in image) */}
        {!poem.coverImage && (
          <div className="flex items-center justify-between mb-7 relative z-10">
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${accent.badge}`}>
              {poem.type || 'Poetry'}
            </span>
            <span className="text-xs text-gray-500 font-medium font-serif italic">
              {poem.language === 'Urdu' ? 'اردو' : poem.language || 'English'}
            </span>
          </div>
        )}

        {/* Title */}
        <h2
          className={`font-bold text-white mb-6 group-hover:text-rose-100 transition-colors duration-300 leading-tight relative z-10 
            ${isUrdu ? 'font-urdu text-2xl text-right leading-relaxed' : 'text-xl font-display'} ${poem.coverImage ? 'mt-2' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          {poem.title}
        </h2>

        {/* Poem snippet */}
        <div className="relative flex-grow mb-8 z-10">
          <Feather
            className="absolute -left-2 -top-2 w-5 h-5 text-white/5 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500"
          />
          <p
            className={`text-gray-400 leading-relaxed line-clamp-3 
              ${isUrdu ? 'font-urdu text-right text-lg leading-[2.5]' : 'italic font-serif text-sm'}`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          >
            {snippet}
          </p>
        </div>

        {/* Theme tag */}
        {poem.theme && (
          <div className="mb-6 relative z-10">
            <span className="text-xs text-gray-500 italic px-3 py-1 bg-white/[0.03] rounded-full border border-white/5">
              {poem.theme}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between relative z-10">
          <span className="text-[11px] text-gray-600 uppercase tracking-wider font-semibold">
            {formatDate(poem.publishedAt)}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-rose-300 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 mr-1">
              Read
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-rose-400/15 transition-colors">
              <ArrowUpRight size={15} className="text-gray-500 group-hover:text-rose-300 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({ poems }) {
  const urduCount = poems.filter(p => p.language === 'Urdu' || p.language?.includes('Mixed')).length;
  const enCount = poems.filter(p => p.language === 'English').length;
  const ghazalCount = poems.filter(p => p.type === 'Ghazal').length;
  const nazmCount = poems.filter(p => p.type === 'Nazm').length;

  const stats = [
    { label: 'Total Verses', value: poems.length, icon: <Feather size={14} /> },
    { label: 'Urdu / اردو', value: urduCount, icon: <Moon size={14} /> },
    { label: 'English', value: enCount, icon: <Sun size={14} /> },
    { label: 'Ghazals', value: ghazalCount, icon: <Star size={14} /> },
    { label: 'Nazms', value: nazmCount, icon: <Wind size={14} /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      {stats.map(stat => (
        <div key={stat.label} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
          <span className="text-rose-400">{stat.icon}</span>
          <span className="text-white font-black text-lg">{stat.value}</span>
          <span className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PoetryClient({ initialPoems }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Compute unique types for dynamic filter pills
  const dynamicFilters = useMemo(() => {
    const types = [...new Set(initialPoems.map(p => p.type).filter(Boolean))];
    const base = [
      { label: 'All Verses', value: 'all', icon: <Layers size={13} /> },
      ...types.map(t => ({
        label: t,
        value: t,
        icon: t === 'Ghazal' ? <Star size={13} /> : t === 'Nazm' ? <Moon size={13} /> : <Feather size={13} />,
      })),
    ];
    const hasUrdu = initialPoems.some(p => p.language === 'Urdu');
    const hasEn = initialPoems.some(p => p.language === 'English');
    if (hasUrdu) base.push({ label: 'Urdu / اردو', value: '__urdu', icon: <Wind size={13} /> });
    if (hasEn) base.push({ label: 'English', value: '__en', icon: <Globe size={13} /> });
    return base;
  }, [initialPoems]);

  const filtered = useMemo(() => {
    return initialPoems.filter(poem => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = !q ||
        poem.title?.toLowerCase().includes(q) ||
        poem.content?.toLowerCase().includes(q) ||
        poem.theme?.toLowerCase().includes(q) ||
        poem.romanKeywords?.toLowerCase().includes(q) ||
        poem.tags?.some(t => t.toLowerCase().includes(q));

      let matchesFilter = true;
      if (activeFilter === '__urdu') matchesFilter = poem.language === 'Urdu' || poem.language?.includes('Mixed');
      else if (activeFilter === '__en') matchesFilter = poem.language === 'English';
      else if (activeFilter !== 'all') matchesFilter = poem.type === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [initialPoems, searchTerm, activeFilter]);

  const featuredPoem = initialPoems.find(p => p.featured);
  const gridPoems = filtered.filter(p => p.id !== featuredPoem?.id || activeFilter !== 'all' || searchTerm);

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-rose-400/30 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-rose-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="pt-32 pb-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header Section ─────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-400/5 border border-rose-400/20 text-rose-300 text-sm font-medium mb-8 backdrop-blur-md">
            <Sparkles size={15} className="text-rose-400" />
            <span className="tracking-wide">Words of the Soul</span>
            <span className="text-rose-400/60">·</span>
            <span className="font-urdu text-base" dir="rtl">دل کی آواز</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-rose-100 to-rose-400/60 mb-6">
            Poetic <span className="italic font-medium">Symphony</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-serif italic mb-4">
            &quot;Where silence meets expression, and emotions find their voice.&quot;
          </p>
          <p className="text-gray-500 text-sm max-w-xl mx-auto" dir="rtl" lang="ur">
            &quot;جہاں خاموشی اور اظہار ملتے ہیں، وہاں شاعری جنم لیتی ہے&quot;
          </p>
        </div>

        {/* ── Stats Bar ──────────────────────────────────────────────────── */}
        <StatsBar poems={initialPoems} />

        {/* ── Search & Filters ───────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500 group-focus-within:text-rose-400 transition-colors" />
            </div>
            <input
              type="text"
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 text-white rounded-3xl pl-14 pr-6 py-5 focus:outline-none focus:border-rose-400/40 focus:bg-white/[0.04] transition-all duration-300 placeholder:text-gray-600 placeholder:italic backdrop-blur-xl shadow-2xl"
              placeholder="Search verses, titles, themes, or romanised keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-0 rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none border border-rose-400/20 shadow-[0_0_30px_rgba(251,113,133,0.08)]" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {dynamicFilters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'bg-rose-400 text-black font-black shadow-[0_0_25px_rgba(251,113,133,0.4)] scale-105'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Featured Hero (only on 'all' unfiltered view) ─────────────── */}
        {featuredPoem && activeFilter === 'all' && !searchTerm && (
          <div className="mb-14">
            <HeroPoem poem={featuredPoem} />
          </div>
        )}

        {/* ── Grid ──────────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 border border-white/5 rounded-[3rem] bg-white/[0.01] backdrop-blur-sm">
            <Feather className="w-12 h-12 text-rose-400/30 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-300 mb-3 tracking-tight">No verses found</h2>
            <p className="text-gray-500 italic">Perhaps the words you seek are yet to be written.</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
              className="mt-8 px-6 py-3 rounded-2xl bg-rose-400/10 border border-rose-400/20 text-rose-300 text-sm font-bold hover:bg-rose-400/20 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {filtered.length > 0 && (
              <p className="text-gray-600 text-sm mb-8 text-center">
                Showing <span className="text-gray-400 font-semibold">{filtered.length}</span> verse{filtered.length !== 1 ? 's' : ''}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {(activeFilter === 'all' && !searchTerm ? gridPoems : filtered).map((poem, idx) => (
                <PoemCard key={poem.id} poem={poem} index={idx} />
              ))}
            </div>
          </>
        )}

        {/* ── Author CTA ─────────────────────────────────────────────────── */}
        <div className="mt-24 text-center p-12 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-rose-950/20 via-neutral-900/30 to-violet-950/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-transparent to-violet-500/5 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-rose-400/10 border border-rose-400/20 flex items-center justify-center mx-auto mb-6 overflow-hidden shadow-lg shadow-rose-500/10">
              <Image
                src="/assets/author.jpg"
                alt="Suleman Zaheer - Author, Poet & Full-Stack Developer from Lahore"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-display font-black text-white mb-3">Suleman Zaheer</h2>
            <p className="text-rose-300 font-urdu text-xl mb-4" dir="rtl" lang="ur">سلیمان ظہیر</p>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed mb-8">
              Full-Stack Developer by day, poet and researcher by soul. Writing in Urdu and English — exploring
              love, loneliness, faith, and the human condition through verse and research.
            </p>
            <Link
              href="/author"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-rose-400/10 border border-rose-400/20 text-rose-300 font-bold text-sm hover:bg-rose-400/20 hover:border-rose-400/40 transition-all"
            >
              About the Author &amp; Researcher <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
