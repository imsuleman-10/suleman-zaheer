"use client";
import { useEffect } from 'react';
import { db } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Completely non-blocking — fires and forgets. Page loads instantly.
export default function VisitorTracker() {
  useEffect(() => {
    // Don't block the page — run entirely in background
    if (sessionStorage.getItem('visitTracked')) return;

    const track = () => {
      const writeVisitor = (locationData = {}) => {
        addDoc(collection(db, 'visitors'), {
          visitedAt: serverTimestamp(),
          date: new Date().toISOString(),
          ip: locationData.ip || 'Unknown',
          city: locationData.city || 'Unknown',
          region: locationData.region || 'Unknown',
          country: locationData.country || 'Unknown',
          userAgent: navigator.userAgent,
          path: window.location.pathname,
        })
          .then(() => sessionStorage.setItem('visitTracked', 'true'))
          .catch(() => {}); // silently fail
      };

      // API 1: ipapi.co
      fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) })
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(d => writeVisitor({ ip: d.ip, city: d.city, region: d.region, country: d.country_name }))
        .catch(() => {
          // API 2: freeipapi.com
          fetch('https://freeipapi.com/api/json', { signal: AbortSignal.timeout(4000) })
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(d => writeVisitor({ ip: d.ipAddress, city: d.cityName, region: d.regionName, country: d.countryName }))
            .catch(() => {
              // API 3: ipinfo.io
              fetch('https://ipinfo.io/json', { signal: AbortSignal.timeout(4000) })
                .then(r => r.ok ? r.json() : Promise.reject())
                .then(d => writeVisitor({ ip: d.ip, city: d.city, region: d.region, country: d.country }))
                .catch(() => writeVisitor({})); // write with Unknown if all APIs fail
            });
        });
    };

    // Defer until browser is idle so it never competes with paint
    if ('requestIdleCallback' in window) {
      requestIdleCallback(track, { timeout: 3000 });
    } else {
      setTimeout(track, 1000);
    }
  }, []);

  return null;
}
