"use client";
import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import VisitorTracker from './VisitorTracker';
import FirebaseConsoleFilter from './FirebaseConsoleFilter';

// NOTE: No opacity animation here — content must be immediately visible
// for Google Search bots (SSR). Framer Motion fade-in on mount was
// briefly hiding content and could interfere with crawling.
export default function Providers({ children }) {
  return (
    <>
      {/* Suppresses non-actionable Firebase ISP/network connectivity warnings */}
      <FirebaseConsoleFilter />
      <VisitorTracker />
      <ProgressBar
        height="3px"
        color="#00ffcc"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
}

