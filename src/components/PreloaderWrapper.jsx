"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";

export default function PreloaderWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let fallbackTimer;

    const handleLoad = () => {
      // Add a slight delay to ensure smooth transition
      setTimeout(() => setLoading(false), 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback timer just in case load is hanging
      fallbackTimer = setTimeout(() => setLoading(false), 3000);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>
      {/* NOTE: Do NOT use opacity-0 here. Content must always be in the DOM
          and readable by Google crawlers. The Preloader overlays on top for
          human users visually. Using CSS visibility keeps it accessible to bots. */}
      <main>
        {children}
      </main>
    </>
  );
}
