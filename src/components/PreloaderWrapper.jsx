"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";

export default function PreloaderWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In Next.js, we don't need to wait for window.onload (which waits for all heavy images to download).
    // The page is mostly server-side rendered. We just need to wait a tiny fraction of a second 
    // for React to hydrate and Framer Motion to be ready, then we can hide the preloader.
    // This makes the site feel "instant" like an industrial-level application.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 150); // 150ms is just enough for a smooth hydration transition

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>
      <main>
        {children}
      </main>
    </>
  );
}
