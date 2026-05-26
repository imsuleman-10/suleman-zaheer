"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ArrowLeft, Search, Terminal } from 'lucide-react';

export default function NotFound() {
  const pathname = usePathname();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const pts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 3,
    }));
    setParticles(pts);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 pt-28 relative overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-secondary/6 rounded-full blur-[130px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/10"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [-20, 20, -20], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center"
      >
        {/* Error Code */}
        <motion.div variants={itemVariants} className="relative mb-2">
          <h1 className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/40 to-white/5 select-none">
            404
          </h1>
          {/* Glow behind numbers */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 bg-primary/15 rounded-full blur-[80px]" />
          </div>
        </motion.div>

        {/* Separator Line */}
        <motion.div variants={itemVariants} className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mb-8" />

        {/* Title */}
        <motion.h2 variants={itemVariants} className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight font-display">
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the homepage.
        </motion.p>

        {/* Terminal-style Path Info */}
        <motion.div variants={itemVariants} className="w-full max-w-md mb-10">
          <div className="bg-black/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-[10px] text-gray-600 font-mono ml-2">terminal</span>
            </div>
            <div className="p-4 font-mono text-xs space-y-2">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-primary shrink-0" />
                <span className="text-gray-500">GET</span>
                <span className="text-red-400 break-all">{pathname}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 ml-5">→</span>
                <span className="text-red-400">Error 404</span>
                <span className="text-gray-600">— Resource not found</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Search size={12} className="text-primary shrink-0" />
                <span className="text-gray-500">Suggestion:</span>
                <Link href="/" className="text-primary hover:underline">Navigate to /</Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
          {/* Primary Button */}
          <Link
            href="/"
            className="group flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-black font-bold rounded-2xl transition-all duration-300 active:scale-[0.97] shadow-xl shadow-primary/20 hover:shadow-primary/30"
          >
            <Home size={18} />
            <span className="text-sm tracking-wide">Back to Homepage</span>
          </Link>
          
          {/* Secondary Button */}
          <button
            onClick={() => typeof window !== 'undefined' && window.history.back()}
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 active:scale-[0.97]"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm tracking-wide">Go Back</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
