"use client";
import React from 'react';
import { Printer, ArrowLeft, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

export default function CVClient() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0f172a] font-sans selection:bg-primary/20">
      {/* Top Bar - Hidden on Print */}
      <div className="bg-white border-b border-slate-200 py-3 px-6 no-print sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium text-sm">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all text-sm"
          >
            <Printer size={16} /> Print Single Page PDF
          </button>
        </div>
      </div>

      {/* CV Sheet - Tightened for Single Page Print */}
      <div className="max-w-[850px] mx-auto my-6 md:my-8 bg-white shadow-xl overflow-hidden print:m-0 print:shadow-none print:w-full print:h-[11in]">

        {/* Header Section - Compact */}
        <div className="bg-slate-900 text-white p-6 md:p-10 border-b-4 border-primary">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-1 text-white">SULEMAN ZAHEER</h1>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-6 bg-primary"></span>
                <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs md:text-sm">MERN Stack Developer</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[11px] md:text-xs text-slate-300">
              <div className="flex items-center gap-2"><Mail size={12} className="text-primary" /> sulemanzaheer09@gmail.com</div>
              <div className="flex items-center gap-2"><Phone size={12} className="text-primary" /> +92 328 5778715</div>
              <div className="flex items-center gap-2"><Linkedin size={12} className="text-primary" /> suleman-zaheer-mughal</div>
              <div className="flex items-center gap-2"><Github size={12} className="text-primary" /> imsuleman-10</div>
              <div className="flex items-center gap-2"><MapPin size={12} className="text-primary" /> Lahore, Pakistan</div>
              <div className="flex items-center gap-2"><Globe size={12} className="text-primary" /> suleman-zaheer.web.app</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[8in]">

          {/* Main Column */}
          <div className="md:col-span-8 p-6 md:p-10 space-y-8">

            <section>
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Professional Summary
              </h2>
              <p className="text-slate-600 leading-relaxed text-[13px]">
                Computer Science student at UET Lahore with a drive for building high-performance web applications. Specialized in the MERN stack with experience in PHP/Laravel and C++. Dedicated to clean code and scalable digital solutions.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Education
              </h2>
              <div className="space-y-4">
                <div className="relative pl-4 border-l-2 border-slate-100">
                  <h3 className="font-bold text-slate-900 text-[15px]">BS in Computer Science</h3>
                  <p className="text-primary font-bold text-[11px]">UET Lahore</p>
                  <p className="text-slate-500 text-[12px] mt-1 italic">Currently Enrolled (Expected 2028)</p>
                </div>
                <div className="relative pl-4 border-l-2 border-slate-100">
                  <h3 className="font-bold text-slate-900 text-[15px]">Advanced Web Applications</h3>
                  <p className="text-primary font-bold text-[11px]">Yashfeen College, Shahdara</p>
                  <p className="text-slate-500 text-[12px] mt-1 italic">Specialization Diploma in PHP & Laravel</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Highlighted Projects
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-[15px] mb-1">E-Learning Management System</h3>
                  <p className="text-slate-600 text-[13px] leading-relaxed">
                    A comprehensive MERN-based platform for course distribution, video streaming, student tracking, and automated certification.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-[15px] mb-1">Airline Reservation Portal</h3>
                  <p className="text-slate-600 text-[13px] leading-relaxed">
                    Robust PHP flight booking portal with real-time seat availability, user authentication, and ticket generation workflows.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-[15px] mb-1">Neon Portfolio Design</h3>
                  <p className="text-slate-600 text-[13px] leading-relaxed">
                    Interactive professional hub using modern aesthetic principles and advanced CSS animations to showcase technical work.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 bg-slate-50 p-6 md:p-10 md:border-l border-slate-100 space-y-8">

            <section>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-5 border-b border-slate-200 pb-1">Skills</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Core Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'MERN', 'NodeJS', 'Express', 'MongoDB'].map(s => <span key={s} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] shadow-sm">{s}</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Languages</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['C++', 'JavaScript', 'PHP', 'Python', 'Dart'].map(s => <span key={s} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] shadow-sm">{s}</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Frameworks</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Laravel', 'Tailwind', 'Vite', 'Framer Motion'].map(s => <span key={s} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] shadow-sm">{s}</span>)}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-5 border-b border-slate-200 pb-1">Certifications</h2>
              <ul className="space-y-3">
                <li className="text-[11px]">
                  <p className="font-bold text-slate-800">Python Specialization</p>
                  <p className="text-slate-500 italic">Scrimba / Coursera</p>
                </li>
                <li className="text-[11px]">
                  <p className="font-bold text-slate-800">Cybersecurity Essentials</p>
                  <p className="text-slate-500 italic">University of Maryland</p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-5 border-b border-slate-200 pb-1">Contact</h2>
              <div className="text-[11px] text-slate-600 space-y-2">
                <p className="font-medium text-slate-900">Available for:</p>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Full-Stack Development</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> MERN Projects</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full" /> Remote Consulting</li>
                </ul>
              </div>
            </section>

          </div>

        </div>

        {/* Minimal Footer */}
        <div className="p-6 pt-0 text-center text-[10px] text-slate-400 border-t border-slate-50 bg-slate-50/30">
          References available upon request.
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page { size: auto; margin: 0; }
          body { background: white; }
          .no-print { display: none !important; }
        }
      `}} />
    </div>
  );
}
