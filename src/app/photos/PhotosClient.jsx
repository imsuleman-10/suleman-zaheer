"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, ExternalLink, Share2, Eye, X, ZoomIn, 
  Check, Sparkles, Tag, ShieldCheck, Camera, Layers
} from 'lucide-react';

export default function PhotosClient({ initialPhotos = [] }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'portraits', label: 'Portraits & Profile' },
    { id: 'engineering', label: 'Tech & Architecture' },
    { id: 'creative', label: 'Creative & Literature' },
  ];

  const filteredPhotos = initialPhotos.filter(photo => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'portraits') {
      const text = `${photo.title} ${photo.description} ${photo.tags?.join(' ')}`.toLowerCase();
      return text.includes('portrait') || text.includes('avatar') || text.includes('profile') || text.includes('photo');
    }
    if (activeCategory === 'engineering') {
      const text = `${photo.title} ${photo.description} ${photo.tags?.join(' ')}`.toLowerCase();
      return text.includes('engineer') || text.includes('software') || text.includes('developer') || text.includes('tech') || text.includes('code');
    }
    if (activeCategory === 'creative') {
      const text = `${photo.title} ${photo.description} ${photo.tags?.join(' ')}`.toLowerCase();
      return text.includes('poet') || text.includes('writer') || text.includes('author') || text.includes('literature');
    }
    return true;
  });

  const handleCopyLink = (photo, e) => {
    e?.stopPropagation();
    const url = photo.src || photo.url;
    navigator.clipboard.writeText(url);
    setCopiedId(photo.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownload = async (photo, e) => {
    e?.stopPropagation();
    try {
      const url = photo.src || photo.url;
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const cleanTitle = (photo.title || 'suleman-zaheer').toLowerCase().replace(/[^a-z0-9]/g, '-');
      link.download = `suleman-zaheer-${cleanTitle}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(photo.src || photo.url, '_blank');
    }
  };

  return (
    <>
      {/* Category Tabs & Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-primary text-black font-bold shadow-lg shadow-primary/20'
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck size={14} /> Verified Public Assets
          </span>
          <span>•</span>
          <span>{filteredPhotos.length} {filteredPhotos.length === 1 ? 'Image' : 'Images'}</span>
        </div>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPhotos.map((photo, index) => {
          const imgSrc = photo.src || photo.url;
          return (
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group bg-neutral-900/60 border border-white/10 hover:border-primary/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/3] bg-neutral-950 overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={photo.alt || `${photo.title} – Suleman Zaheer, Software Engineer & Writer in Lahore`}
                  title={photo.title || 'Suleman Zaheer'}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  priority={index < 2}
                  loading={index < 2 ? 'eager' : 'lazy'}
                />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 flex items-center gap-1">
                    <Camera size={11} className="text-primary" />
                    <span>Suleman Zaheer</span>
                  </span>
                  {photo.isOriginal && (
                    <span className="px-2 py-0.5 rounded-md bg-primary text-black text-[9px] font-black uppercase tracking-wider">
                      Official
                    </span>
                  )}
                </div>

                {/* Hover Action Strip */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedPhoto(photo); }}
                    className="p-3 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all transform hover:scale-110"
                    title="Zoom & View Details"
                  >
                    <ZoomIn size={18} />
                  </button>
                  <button
                    onClick={(e) => handleDownload(photo, e)}
                    className="p-3 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-primary hover:text-black transition-all transform hover:scale-110"
                    title="Download High-Res"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={(e) => handleCopyLink(photo, e)}
                    className="p-3 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all transform hover:scale-110"
                    title="Copy Direct URL"
                  >
                    {copiedId === photo.id ? <Check size={18} className="text-emerald-400" /> : <Share2 size={18} />}
                  </button>
                </div>
              </div>

              {/* Caption & SEO Details */}
              <figcaption className="p-5 flex flex-col flex-grow justify-between bg-neutral-900/40">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1 mb-1">
                    {photo.title}
                  </h2>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {photo.description || 'Verified photograph of Suleman Zaheer, Software Engineer and Poet from Lahore.'}
                  </p>
                </div>

                {/* Footer Tags & Attribution */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="font-mono text-[10px] text-gray-400">
                    Lahore, PK
                  </span>
                  <span className="flex items-center gap-1 text-primary text-[10px] font-semibold group-hover:underline">
                    View full size →
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>

      {/* ──────────────────────────────────────────────────────────
          FULLSCREEN LIGHTBOX MODAL
          ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[92vh] bg-neutral-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-neutral-900/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Official Photo Asset
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="Close viewer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Image Box */}
              <div className="relative w-full flex-grow min-h-[350px] sm:min-h-[480px] bg-black flex items-center justify-center p-4">
                <div className="relative w-full h-full min-h-[320px] sm:min-h-[460px]">
                  <Image
                    src={selectedPhoto.src || selectedPhoto.url}
                    alt={selectedPhoto.alt || selectedPhoto.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </div>
              </div>

              {/* Modal Details & Action Footer */}
              <div className="p-6 border-t border-white/10 bg-neutral-900/90 shrink-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                      {selectedPhoto.description}
                    </p>
                    <p className="text-[11px] font-mono text-gray-500 pt-1">
                      Attribution: <span className="text-white">Suleman Zaheer</span> · Software Engineer & Urdu Poet · Lahore, Pakistan
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={(e) => handleCopyLink(selectedPhoto, e)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                    >
                      {copiedId === selectedPhoto.id ? (
                        <>
                          <Check size={14} className="text-emerald-400" /> Link Copied
                        </>
                      ) : (
                        <>
                          <Share2 size={14} /> Copy Direct URL
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => handleDownload(selectedPhoto, e)}
                      className="px-5 py-2.5 rounded-xl bg-primary text-black text-xs font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                    >
                      <Download size={14} /> Download Original
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
