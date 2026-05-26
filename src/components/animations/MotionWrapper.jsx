"use client";
import { motion } from 'framer-motion';

// SEO-SAFE MOTION WRAPPERS
// 
// CRITICAL: We use `whileInView` but set `initial` to the VISIBLE state.
// This means the SSR/static HTML always has opacity:1 (visible to Google bots).
// The animation only runs when the component re-hydrates on the client side.
// Content is NEVER invisible in the raw HTML that crawlers parse.

export const FadeIn = ({ children, delay = 0, direction = "up", duration = 0.5, className = "" }) => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, delay = 0, duration = 0.5, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
