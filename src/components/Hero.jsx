"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code2, Globe, Database, Download } from 'lucide-react';


const Hero = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scrollSmooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scale and Opacity animations for text
  const opacity = useTransform(scrollSmooth, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollSmooth, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollSmooth, [0, 0.5], [0, -100]);

  useEffect(() => {
    const handleInitialScroll = () => {
      if (window.scrollY > 10 && !hasStarted && videoRef.current) {
        videoRef.current.play().catch(err => console.log("Video play failed:", err));
        setHasStarted(true);
      }
    };

    window.addEventListener('scroll', handleInitialScroll);
    return () => window.removeEventListener('scroll', handleInitialScroll);
  }, [hasStarted]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-black">
      {/* Video Background Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          aria-label="Suleman Zaheer - Full Stack Developer Background Workspace Video"
          title="Suleman Zaheer Developer Workspace"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-70 grayscale-[0.5]"
          muted
          playsInline
          loop
          autoPlay={false}
          preload="auto"
          src="/assets/Developer_Desk_Scene_In_a_cinematic_style_a_young_man_with_dark_hair_WEaPdUzq.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        
        {/* Hero Content */}
        <motion.div 
          style={{ opacity, scale, y }}
          className="relative h-full flex flex-col items-center justify-center text-center px-4"
        >
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new projects
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-extrabold mb-4 md:mb-6 tracking-tight text-white">
              Suleman <span className="text-primary italic">Zaheer</span>
              <span className="block text-lg sm:text-2xl font-normal text-gray-400 mt-2 tracking-normal">Full Stack MERN Developer & Software Engineer</span>
            </h1>

          <motion.p 
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
          >
            I am <span className="text-white font-semibold">Suleman Zaheer</span>. I bridge the gap between Computer Science and Industrial Manufacturing by building scalable, high-performance web applications.
          </motion.p>

          <motion.div 
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/projects" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/20">
              Explore Projects <ArrowRight size={20} />
            </Link>

            <a
              href="/suleman-zaheer-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download CV
            </a>

          </motion.div>

          {/* Stats/Icons */}
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 md:bottom-12 flex gap-8 md:gap-12 text-gray-500 scale-90 md:scale-100"
          >
            <div className="flex flex-col items-center gap-2">
              <Globe size={24} />
              <span className="text-xs uppercase tracking-widest font-bold">Web</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Database size={24} />
              <span className="text-xs uppercase tracking-widest font-bold">MERN</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Code2 size={24} />
              <span className="text-xs uppercase tracking-widest font-bold">Scale</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
