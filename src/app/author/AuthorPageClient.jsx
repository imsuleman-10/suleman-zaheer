"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight, Feather, BookOpen, Code2, GraduationCap,
  MapPin, Mail, Github, Linkedin, ExternalLink,
  PenLine, FlaskConical, Cpu, Quote, Star, ChevronRight, ChevronDown
} from 'lucide-react';

// ─── FAQ Component ─────────────────────────────────────────────────────────────
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-white/5 last:border-0 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left font-bold text-white text-base md:text-lg py-2 hover:text-rose-300 transition-colors focus:outline-none"
      >
        <span className="pr-4">{question}</span>
        <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-rose-500/10 text-rose-400' : 'text-gray-400'}`}>
          <ChevronDown size={16} />
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-400 text-sm md:text-base leading-relaxed pb-2 pl-1">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Timeline item ─────────────────────────────────────────────────────────────
function TimelineItem({ year, title, org, desc, icon, active }) {
  return (
    <div className="flex gap-5 group">
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300
          ${active ? 'bg-primary/20 border-primary/40 text-primary' : 'bg-white/5 border-white/10 text-gray-500 group-hover:border-white/20 group-hover:text-gray-300'}`}>
          {icon}
        </div>
        <div className="w-px flex-1 bg-white/5 mt-3 mb-1" />
      </div>
      <div className="pb-8">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1 block">{year}</span>
        <h4 className="font-bold text-white text-base mb-0.5">{title}</h4>
        <p className="text-primary text-xs font-semibold mb-2">{org}</p>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── Skill badge ──────────────────────────────────────────────────────────────
function Skill({ label, level }) {
  const barW = level === 'Expert' ? 'w-full' : level === 'Advanced' ? 'w-4/5' : level === 'Intermediate' ? 'w-3/5' : 'w-2/5';
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-sm text-gray-300">{label}</span>
      <div className="flex items-center gap-3">
        <div className="w-24 h-1 rounded-full bg-white/5 overflow-hidden">
          <div className={`${barW} h-full rounded-full bg-gradient-to-r from-rose-400 to-violet-400`} />
        </div>
        <span className="text-[10px] text-gray-500 uppercase tracking-wider w-20 text-right">{level}</span>
      </div>
    </div>
  );
}

// ─── Poem thumbnail ───────────────────────────────────────────────────────────
function PoemThumb({ poem }) {
  const isUrdu = poem.language === 'Urdu' || poem.language?.includes('Mixed');
  return (
    <Link
      href={`/poetry/${poem.slug}`}
      className="group flex items-center gap-4 p-4 rounded-2xl border border-white/5 hover:border-rose-400/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
    >
      {poem.coverImage ? (
        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={poem.coverImage}
            alt={poem.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="56px"
          />
        </div>
      ) : (
        <div className="w-14 h-14 rounded-xl bg-rose-400/10 border border-rose-400/20 flex items-center justify-center flex-shrink-0">
          <Feather size={18} className="text-rose-400" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className={`font-bold text-white text-sm truncate group-hover:text-rose-300 transition-colors ${isUrdu ? 'text-right font-urdu' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
          {poem.title}
        </h4>
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{poem.type} · {poem.language}</span>
      </div>
      <ChevronRight size={14} className="text-gray-600 group-hover:text-rose-400 transition-colors flex-shrink-0" />
    </Link>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AuthorPageClient({ poems, blogCount }) {
  const featuredPoems = poems.slice(0, 6);
  const hasCoverPoem = poems.find(p => p.coverImage);

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-rose-400/30 relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-rose-900/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-900/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Profile */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-400/5 border border-rose-400/20 text-rose-300 text-xs font-bold mb-8 uppercase tracking-widest">
              <Feather size={12} />
              Author · Poet · Researcher
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tighter mb-4">
              <span className="text-white">Suleman</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-violet-400 to-primary">Zaheer</span>
            </h1>
            <p className="text-2xl font-urdu text-rose-300/70 mb-6" dir="rtl" lang="ur">سلیمان ظہیر</p>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              A writer who codes, and a coder who writes. Suleman Zaheer is an Urdu and English poet,
              independent researcher, blogger, and full-stack developer from Lahore, Pakistan —
              where technology meets the timeless art of storytelling.
            </p>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: <MapPin size={12} />, text: 'Lahore, Pakistan' },
                { icon: <GraduationCap size={12} />, text: 'BS CS · UET Lahore' },
                { icon: <Feather size={12} />, text: `${poems.length} Published Poems` },
                { icon: <BookOpen size={12} />, text: `${blogCount} Blog Articles` },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium">
                  <span className="text-rose-400">{icon}</span>
                  {text}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/poetry"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-violet-600 text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-rose-500/20"
              >
                <Feather size={16} />
                Read My Poetry
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all"
              >
                <BookOpen size={16} />
                Read My Blog
              </Link>
              <a
                href="https://wa.me/923285778715"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-primary/20 transition-all"
              >
                Collaborate
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Right: Visual card */}
          <div className="relative hidden lg:block">
            {/* Main card */}
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900 via-rose-950/10 to-violet-950/20 p-10">
              {/* Cover image from most recent poem or atmospheric */}
              {hasCoverPoem?.coverImage ? (
                <div className="absolute inset-0 opacity-10">
                  <Image
                    src={hasCoverPoem.coverImage}
                    alt="Author backdrop"
                    fill
                    className="object-cover"
                    sizes="600px"
                  />
                </div>
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/20" />

              <div className="relative z-10">
                {/* Avatar - Author Image */}
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-rose-500/30 to-violet-500/20 border-2 border-rose-400/40 flex items-center justify-center mb-8 shadow-2xl shadow-rose-500/20 overflow-hidden">
                  <Image
                    src="/assets/author.jpg"
                    alt="Suleman Zaheer - Author, Poet & Researcher from Lahore"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                {/* Quote */}
                <div className="mb-8">
                  <Quote size={24} className="text-rose-400/40 mb-3" />
                  <p className="text-xl font-serif italic text-gray-300 leading-relaxed">
                    &quot;Every line of code tells a story. Every verse of poetry reveals a truth.
                    I live at the intersection of both.&quot;
                  </p>
                  <p className="text-rose-400 text-sm font-bold mt-3">— Suleman Zaheer</p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {[
                    { val: poems.length, label: 'Poems' },
                    { val: blogCount, label: 'Articles' },
                    { val: '2+', label: 'Languages' },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <div className="text-2xl font-black text-rose-300">{s.val}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-wider mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-5 -right-5 px-4 py-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm">
              <span className="text-violet-300 text-xs font-bold flex items-center gap-1.5">
                <FlaskConical size={12} /> Independent Researcher
              </span>
            </div>
            <div className="absolute -bottom-5 -left-5 px-4 py-3 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <span className="text-primary text-xs font-bold flex items-center gap-1.5">
                <Cpu size={12} /> Full-Stack Developer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── DUAL IDENTITY ─────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary text-xs font-black uppercase tracking-widest mb-3">Two Worlds, One Voice</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">The Author &amp; The Developer</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Writer Identity */}
          <div className="relative p-10 rounded-[2.5rem] border border-rose-400/15 bg-gradient-to-br from-rose-950/20 to-neutral-900/50 overflow-hidden group hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-all duration-700" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-rose-400/10 border border-rose-400/20 flex items-center justify-center mb-7">
                <PenLine size={26} className="text-rose-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">The Writer &amp; Poet</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Suleman writes with a depth that transcends language. His Urdu ghazals draw from the classical
                traditions of Mir and Ghalib, while his English poetry bridges modern anxiety with timeless human
                emotion. As a blogger, he translates complex technical realities into narratives that inspire developers
                across Pakistan and beyond.
              </p>
              <div className="space-y-2 mb-8">
                {['Urdu Ghazals & Nazms', 'English Poetry', 'Technical Blogging', 'Research Writing', 'Literary Analysis'].map(s => (
                  <div key={s} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
              <Link href="/poetry" className="inline-flex items-center gap-2 text-rose-300 text-sm font-bold hover:text-rose-200 transition-colors">
                Explore Poetry Collection <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Researcher Identity */}
          <div className="relative p-10 rounded-[2.5rem] border border-violet-400/15 bg-gradient-to-br from-violet-950/20 to-neutral-900/50 overflow-hidden group hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-all duration-700" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-violet-400/10 border border-violet-400/20 flex items-center justify-center mb-7">
                <FlaskConical size={26} className="text-violet-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">The Researcher</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                As an academic researcher, Suleman approaches problems with the same rigour he applies to code.
                His research interests span human-computer interaction, the intersection of technology and literature
                in the Global South, and the socio-economic impact of digital transformation in Pakistan's emerging
                tech ecosystem. His blog posts double as research-grade explorations.
              </p>
              <div className="space-y-2 mb-8">
                {['Human-Computer Interaction', 'Technology & Society', 'Pakistan Tech Ecosystem', 'Digital Transformation', 'Software Engineering Research'].map(s => (
                  <div key={s} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-violet-300 text-sm font-bold hover:text-violet-200 transition-colors">
                Read Research Articles <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECENT POETRY ─────────────────────────────────────────────────── */}
      {featuredPoems.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-rose-400 text-xs font-black uppercase tracking-widest mb-2">From the Collection</p>
              <h2 className="text-3xl font-black text-white">Selected Verses</h2>
            </div>
            <Link href="/poetry" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-white/10 text-gray-400 text-sm font-bold hover:border-white/20 hover:text-white transition-all">
              All Poems <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPoems.map(poem => (
              <PoemThumb key={poem.id} poem={poem} />
            ))}
          </div>
        </section>
      )}

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Journey */}
          <div>
            <p className="text-primary text-xs font-black uppercase tracking-widest mb-3">The Journey</p>
            <h2 className="text-3xl font-black text-white mb-10">Milestones</h2>
            <div className="space-y-0">
              <TimelineItem active year="2024 – Present" title="BS Computer Science" org="UET Lahore" icon={<GraduationCap size={16} />}
                desc="Pursuing a Bachelor's in CS at one of Pakistan's most prestigious engineering universities, blending academic rigour with real-world development." />
              <TimelineItem active year="2024 – Present" title="Full-Stack Developer" org="Freelance & Projects" icon={<Code2 size={16} />}
                desc="Building production-grade web applications using the MERN Stack, Next.js, Firebase, and Laravel for clients across Pakistan and internationally." />
              <TimelineItem year="2023 – Present" title="Poetry & Research Writing" org="Self-Published" icon={<Feather size={16} />}
                desc="Began writing Urdu poetry and technical research blogs, publishing across personal portfolio and literary platforms to document both creative and academic growth." />
              <TimelineItem year="2023" title="First Freelance Project" org="Independent" icon={<Star size={16} />}
                desc="Delivered the first international freelance project, establishing a reputation for clean code, on-time delivery, and professional communication." />
            </div>
          </div>

          {/* Skills */}
          <div>
            <p className="text-primary text-xs font-black uppercase tracking-widest mb-3">Core Capabilities</p>
            <h2 className="text-3xl font-black text-white mb-10">Technical Expertise</h2>
            <div className="space-y-0 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
              <Skill label="Next.js / React (SSR & SEO)" level="Expert" />
              <Skill label="Node.js / Express / APIs" level="Advanced" />
              <Skill label="Firebase / Firestore" level="Advanced" />
              <Skill label="SQL & Relational Databases" level="Advanced" />
              <Skill label="PHP / Laravel Framework" level="Intermediate" />
              <Skill label="TypeScript / Modern JS" level="Advanced" />
              <Skill label="System Design & Optimization" level="Intermediate" />
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE WORKSPACE ────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="text-center mb-14">
          <p className="text-rose-400 text-xs font-black uppercase tracking-widest mb-3">Behind the Scenes</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">The Creative Workspace</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-4">
            A peek into the two environments where ideas are written — whether compiled by a machine or interpreted by the human heart.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: VS Code Mockup */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/50 flex flex-col min-h-[380px] shadow-2xl shadow-violet-500/5 group hover:border-violet-500/30 transition-all duration-300">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-950/80 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-3 w-3 rounded-full bg-rose-500/80 block" />
                <span className="w-3 w-3 rounded-full bg-yellow-500/80 block" />
                <span className="w-3 w-3 rounded-full bg-green-500/80 block" />
              </div>
              <span className="text-xs text-gray-500 font-mono">suleman-zaheer.js</span>
              <div className="w-12" />
            </div>
            {/* Editor Tabs */}
            <div className="flex bg-neutral-950/40 text-xs text-gray-500 border-b border-white/5 font-mono">
              <div className="px-4 py-2 border-r border-white/5 bg-neutral-900/80 text-violet-400 flex items-center gap-1.5 font-semibold">
                <Code2 size={12} className="text-violet-400" />
                suleman-zaheer.js
              </div>
              <div className="px-4 py-2 border-r border-white/5 flex items-center gap-1.5 opacity-60">
                <Cpu size={12} />
                next.config.js
              </div>
            </div>
            {/* Code lines */}
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto flex-1 select-none text-left">
              <pre className="text-gray-400">
                <code>
{`1  const developer = {
2    name: 'Suleman Zaheer',
3    role: 'Full Stack Engineer',
4    coreTech: ['Next.js', 'React', 'Node.js', 'Firebase'],
5    philosophy: "Code with passion, write with purpose.",
6    compile: function() {
7      return \`\${this.name} builds elegant digital solutions\`;
8    }
9  };
10 
11 // Executing the digital narrative
12 console.log(developer.compile());`}
                </code>
              </pre>
            </div>
          </div>

          {/* Right: Poetry Manuscript / Notebook Mockup */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900/50 to-rose-950/10 flex flex-col min-h-[380px] shadow-2xl shadow-rose-500/5 group hover:border-rose-400/30 transition-all duration-300">
            {/* Notebook Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-neutral-950/40 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Feather size={14} className="text-rose-400" />
                <span className="text-xs text-rose-300 font-bold uppercase tracking-wider">Notebook · Selected Verse</span>
              </div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Page 14</span>
            </div>
            {/* Poetry Content */}
            <div className="p-8 flex flex-col justify-center flex-1 relative bg-neutral-900/30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '100% 2.2rem' }}>
              <div className="relative z-10 text-center space-y-6 my-auto">
                <div className="space-y-4">
                  <p className="text-2xl font-serif italic text-gray-200 leading-relaxed font-urdu" dir="rtl">
                    مثالِ موج ہوا کو سکوں نہیں ملتا<br />
                    میں ڈھونڈتا ہوں جسے وہ کہیں نہیں ملتا
                  </p>
                  <p className="text-sm font-serif italic text-gray-400 leading-relaxed max-w-sm mx-auto">
                    &quot;Like the wandering wind, there is no rest,<br />
                    The one I seek cannot be found.&quot;
                  </p>
                </div>
                <div className="w-12 h-px bg-rose-400/30 mx-auto" />
                <div className="space-y-3">
                  <p className="text-base font-serif italic text-gray-300 leading-relaxed">
                    Lines of logic guide the cursor's dynamic trail,<br />
                    But lines of verse speak of the storms behind the veil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="text-center mb-14">
          <p className="text-primary text-xs font-black uppercase tracking-widest mb-3">Questions & Answers</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm mt-3">Learn more about Suleman's technical background, creative philosophy, and services</p>
        </div>
        <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-8 space-y-2">
          <FAQItem 
            question="Who is Suleman Zaheer?" 
            answer="Suleman Zaheer is a full-stack developer, Urdu/English poet, blogger, and independent researcher based in Lahore, Pakistan. Currently pursuing a Bachelor of Science in Computer Science at UET Lahore, he works at the intersection of technological logic and artistic expression." 
          />
          <FAQItem 
            question="What technical services and expertise does he offer?" 
            answer="Suleman specializes in building high-performance, responsive web applications using the MERN Stack (MongoDB, Express, React, Node.js), Next.js (with SSR, static export, and advanced SEO architectures), and Firebase. He also handles REST API development, backend database optimizations, and scalable serverless configurations." 
          />
          <FAQItem 
            question="How does his background in Computer Science influence his creative writing?" 
            answer="Suleman views coding and poetry as complementary disciplines: both require extreme precision, structure, and the translation of complex concepts into elegant forms. Technical writing allows him to explain software design cleanly, while his creative intuition translates into user interfaces that are beautifully organized and engaging." 
          />
          <FAQItem 
            question="Can I collaborate with him on technical or research projects?" 
            answer="Yes! Suleman is always open to collaborating on digital solutions, software development, academic/independent research in technology, and creative projects. You can contact him directly using the contact form, LinkedIn, or via WhatsApp." 
          />
        </div>
      </section>

      {/* ── CONTACT / SOCIAL ──────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3">Connect with Suleman</h2>
          <p className="text-gray-500 text-sm">For collaborations, literary discussions, or project inquiries</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { href: 'https://github.com/imsuleman-10', icon: <Github size={18} />, label: 'GitHub', sub: '@imsuleman-10' },
            { href: 'https://www.linkedin.com/in/suleman-zaheer-mughal', icon: <Linkedin size={18} />, label: 'LinkedIn', sub: 'Connect professionally' },
            { href: 'https://wa.me/923285778715', icon: <Mail size={18} />, label: 'WhatsApp', sub: 'Quick response' },
            { href: '/contact', icon: <ExternalLink size={18} />, label: 'Contact Form', sub: 'Leave a message' },
          ].map(({ href, icon, label, sub }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all group"
            >
              <span className="text-gray-400 group-hover:text-primary transition-colors">{icon}</span>
              <div>
                <div className="text-sm font-bold text-white">{label}</div>
                <div className="text-xs text-gray-500">{sub}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
