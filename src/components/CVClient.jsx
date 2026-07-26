"use client";
import React from 'react';
import { Printer, ArrowLeft, Mail, Phone, MapPin, Globe, Linkedin, Github, ChevronRight, Award, Briefcase, GraduationCap, Star } from 'lucide-react';
import Link from 'next/link';

export default function CVClient() {

  const skills = {
    frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'Redux', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'PHP', 'Laravel', 'REST APIs'],
    database: ['MongoDB', 'MySQL', 'Firebase', 'Git', 'Postman'],
    languages: ['JavaScript (ES6+)', 'TypeScript', 'C++', 'Python', 'Dart'],
  };

  const projects = [
    {
      title: 'Enterprise E-Learning Management System',
      label: 'Full Stack',
      desc: 'Architected a scalable, end-to-end e-learning platform for high-volume users. Implemented RBAC, course distribution, progress tracking, and automated certification generation.',
      tech: ['React', 'Node.js', 'MongoDB'],
      color: 'border-l-cyan-500',
    },
    {
      title: 'Airline Reservation & Ticketing Portal',
      label: 'Backend Heavy',
      desc: 'Engineered a robust flight booking engine with PHP and MySQL. Developed real-time seat availability, secure user authentication, and dynamic PDF ticket generation.',
      tech: ['PHP', 'MySQL', 'Bootstrap'],
      color: 'border-l-blue-500',
    },
    {
      title: 'Next.js Interactive Portfolio & Blog',
      label: 'Frontend Design',
      desc: 'Built a highly optimized, SEO-friendly portfolio using Next.js App Router. Integrated markdown rendering for tech blogs, Framer Motion animations, and industrial-grade LLMO optimization.',
      tech: ['Next.js', 'Tailwind', 'Firebase'],
      color: 'border-l-violet-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-primary/20">

      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 py-3 px-6 no-print sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium text-sm">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-700 transition-all text-sm shadow cursor-pointer"
          >
            <Printer size={15} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* CV Paper */}
      <div className="max-w-[900px] mx-auto my-8 bg-white shadow-2xl print:shadow-none print:my-0 print:max-w-none overflow-hidden print:overflow-visible">


        {/* ── HEADER ─────────────────────────────────────── */}
        <div className="bg-slate-900 text-white px-10 py-10 print:px-8 print:py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 print:gap-4">

            <div>
              <h1 className="text-5xl font-black tracking-tight mb-1">SULEMAN ZAHEER</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-[3px] w-10 bg-cyan-400" />
                <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm">Full-Stack Software Engineer</p>
              </div>
              <p className="text-slate-400 text-sm mt-3 max-w-sm">CS Student at UET Lahore · MERN Stack · SAMStack Studio Founder</p>
            </div>
            <div className="grid grid-cols-1 gap-y-2 text-sm text-slate-300">
              <a href="mailto:sulemanzaheer09@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Mail size={13} className="text-cyan-400" /> sulemanzaheer09@gmail.com
              </a>
              <a href="tel:+923285778715" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Phone size={13} className="text-cyan-400" /> +92 328 5778715
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-cyan-400" /> Lahore, Pakistan
              </div>
              <a href="https://suleman-zaheer.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Globe size={13} className="text-cyan-400" /> suleman-zaheer.vercel.app
              </a>
              <a href="https://github.com/imsuleman-10" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Github size={13} className="text-cyan-400" /> github.com/imsuleman-10
              </a>
              <a href="https://linkedin.com/in/suleman-zaheer-mughal" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Linkedin size={13} className="text-cyan-400" /> linkedin.com/in/suleman-zaheer
              </a>
            </div>
          </div>
        </div>

        {/* ── BODY ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12">

          {/* LEFT MAIN */}
          <div className="md:col-span-8 px-10 py-8 space-y-8 border-r border-slate-100 print:px-6 print:py-4 print:space-y-5">

            {/* Professional Summary */}

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase size={16} className="text-cyan-600" />
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Professional Profile</h2>
              </div>
              <div className="h-[2px] w-full bg-slate-100 mb-4" />
              <p className="text-slate-600 text-sm leading-relaxed print:text-[12px] print:leading-snug">
                Highly motivated Computer Science student at UET Lahore with expertise in building scalable full-stack web applications. Specialized in the MERN stack (MongoDB, Express, React, Node.js) and Next.js. Founder of <strong className="text-slate-800">SAMStack Studio</strong>, a software engineering agency delivering enterprise-grade digital solutions. Passionate about clean architecture, performance optimization, and seamless user experiences.
              </p>
            </section>

            {/* Projects */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-cyan-600" />
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Key Engineering Projects</h2>
              </div>
              <div className="h-[2px] w-full bg-slate-100 mb-5 print:mb-3" />
              <div className="space-y-6 print:space-y-3">
                {projects.map((p, i) => (
                  <div key={i} className={`pl-4 border-l-[3px] ${p.color}`}>

                    <div className="flex flex-wrap justify-between items-start gap-1 mb-1 print:mb-0.5">
                      <h3 className="font-bold text-slate-900 text-[15px] print:text-[13px]">{p.title}</h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded print:text-[9px] print:px-1.5">{p.label}</span>
                    </div>
                    <p className="text-slate-500 text-[13px] leading-relaxed mb-2 print:text-[11px] print:leading-snug print:mb-1.5">{p.desc}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map(t => (
                        <span key={t} className="text-[10px] font-semibold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap size={16} className="text-cyan-600" />
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Education</h2>
              </div>
              <div className="h-[2px] w-full bg-slate-100 mb-4 print:mb-3" />
              <div className="space-y-4 print:space-y-2">
                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="font-bold text-slate-900 text-[15px] print:text-[13px]">BS in Computer Science</h3>
                    <p className="text-cyan-600 font-semibold text-[13px] mt-0.5 print:text-[11px] print:mt-0">University of Engineering & Technology (UET), Lahore</p>
                  </div>
                  <span className="text-[11px] text-slate-400 italic whitespace-nowrap mt-1 print:text-[10px] print:mt-0">Expected 2028</span>

                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900 text-[15px] print:text-[13px]">Advanced Web Applications Diploma</h3>
                    <p className="text-cyan-600 font-semibold text-[13px] mt-0.5 print:text-[11px] print:mt-0">Yashfeen College, Shahdara — PHP & Laravel</p>
                  </div>
                  <span className="text-[11px] text-slate-400 italic whitespace-nowrap mt-1 print:text-[10px] print:mt-0">Completed</span>

                </div>
              </div>
            </section>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="md:col-span-4 bg-slate-50 px-8 py-8 space-y-8 print:px-6 print:py-4 print:space-y-6">

            {/* Skills */}

            <section>
              <h2 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-4 pb-1 border-b-2 border-slate-200 print:mb-2">Technical Skills</h2>
              <div className="space-y-4 print:space-y-3">
                <div>

                  <p className="text-[10px] font-bold text-cyan-600 uppercase mb-2">Frontend</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.frontend.map(s => (
                      <span key={s} className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded shadow-sm">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase mb-2">Backend & APIs</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.backend.map(s => (
                      <span key={s} className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded shadow-sm">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-violet-600 uppercase mb-2">Databases & Tools</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.database.map(s => (
                      <span key={s} className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded shadow-sm">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Core Languages</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.languages.map(s => (
                      <span key={s} className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded shadow-sm">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-4 pb-1 border-b-2 border-slate-200 print:mb-2">Certifications</h2>
              <ul className="space-y-3 print:space-y-2">
                <li>
                  <p className="font-bold text-slate-800 text-sm print:text-[12px]">Python Specialization</p>
                  <p className="text-slate-400 text-[11px] italic print:text-[10px]">Scrimba / Coursera</p>
                </li>
                <li>
                  <p className="font-bold text-slate-800 text-sm print:text-[12px]">Cybersecurity Essentials</p>
                  <p className="text-slate-400 text-[11px] italic print:text-[10px]">University of Maryland</p>
                </li>
              </ul>
            </section>

            {/* Available For */}
            <section>
              <h2 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-4 pb-1 border-b-2 border-slate-200 print:mb-2">Available For</h2>
              <ul className="space-y-2 print:space-y-1">

                {['Full-Stack Development', 'MERN Stack Projects', 'Next.js Applications', 'Remote Consulting'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-[12px] text-slate-600">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-4 border-t border-slate-100 bg-slate-50 text-center text-[11px] text-slate-400 print:px-6 print:py-2 print:text-[10px]">
          References available upon request · sulemanzaheer09@gmail.com · suleman-zaheer.vercel.app
        </div>


      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
      `}} />
    </div>
  );
}
