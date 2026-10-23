"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '@/firebase';
import {
  collection, query, orderBy, onSnapshot,
  addDoc, deleteDoc, doc, serverTimestamp
} from 'firebase/firestore';
import {
  Upload, Trash2, ExternalLink, ImagePlus,
  X, CheckCircle, AlertCircle, CloudUpload, Eye, Zap, Link as LinkIcon, Cpu, Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Safe resolution for Groq API Key (reads from NEXT_PUBLIC_GROQ_API_KEY or localStorage)
const getInitialGroqKey = () => {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GROQ_API_KEY) {
    return process.env.NEXT_PUBLIC_GROQ_API_KEY;
  }
  if (typeof window !== 'undefined') {
    return localStorage.getItem('GROQ_API_KEY') || '';
  }
  return '';
};

// Exact current active model ID on Groq for Vision & Multimodal analysis
const GROQ_EXACT_MODEL = 'qwen/qwen3.8-27b';

// ─── Toast Notification ──────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold border backdrop-blur-xl
        ${type === 'success'
          ? 'bg-green-500/10 border-green-500/30 text-green-400'
          : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}
    >
      {type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </motion.div>
  );
}

// ─── Image Card ───────────────────────────────────────────────────────────────
function ImageCard({ img, onDelete, deleting }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group flex flex-col hover:border-white/20 transition-all"
    >
      {/* Image Preview */}
      <div className="relative h-48 w-full bg-black/40 shrink-0 overflow-hidden">
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-2">
            <ImagePlus size={32} />
            <span className="text-xs">Preview unavailable</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.url}
            alt={img.title || 'Suleman Zaheer'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
          <a
            href={img.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all"
            title="View full image"
            onClick={e => e.stopPropagation()}
          >
            <Eye size={18} />
          </a>
          <button
            onClick={() => onDelete(img)}
            disabled={deleting}
            className="p-2 bg-red-500/20 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
            title="Delete image"
          >
            {deleting ? (
              <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-grow">
        <h4 className="font-bold text-white text-sm truncate" title={img.title}>
          {img.title}
        </h4>
        <p className="text-xs text-gray-400 line-clamp-2 flex-grow" title={img.description}>
          {img.description}
        </p>
        <div className="pt-3 mt-auto flex items-center justify-between border-t border-white/10">
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
            <Zap size={10} /> Live on /photos
          </span>
          <button
            onClick={() => onDelete(img)}
            disabled={deleting}
            className="p-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-40 text-xs flex items-center gap-1 cursor-pointer"
          >
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Panel ───────────────────────────────────────────────────────────────
export default function GalleryAdminPanel() {
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  // Settings: Groq Key only (Firebase Storage used for uploads — no external key needed)
  const [groqKey, setGroqKey] = useState('');

  // Mode: 'file' or 'url'
  const [uploadMode, setUploadMode] = useState('file');
  const [directUrl, setDirectUrl] = useState('');

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [tags, setTags] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [analyzingWithGroq, setAnalyzingWithGroq] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Load saved Groq key on mount
  useEffect(() => {
    const savedGroq = localStorage.getItem('GROQ_API_KEY');
    if (savedGroq) {
      setGroqKey(savedGroq);
    } else {
      const initialKey = getInitialGroqKey();
      setGroqKey(initialKey);
      if (initialKey) localStorage.setItem('GROQ_API_KEY', initialKey);
    }
  }, []);

  // ── Fetch images from Firestore ──────────────────────────────────────────
  useEffect(() => {
    const q = query(collection(db, 'seo_images'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setImages(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoadingImages(false);
      },
      (err) => {
        console.error('Firestore error:', err);
        showToast('Failed to load images.', 'error');
        setLoadingImages(false);
      }
    );
    return () => unsub();
  }, [showToast]);

  // ── File Selection ─────────────────────────────────────────
  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith('image/')) {
      showToast('Only image files are allowed.', 'error');
      return;
    }
    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Groq AI Vision & SEO Analysis ───────────────────────────
  const handleGenerateWithGroq = async () => {
    const imageSource = uploadMode === 'url' ? directUrl.trim() : preview;
    if (!imageSource) {
      showToast('Please upload an image file or enter an image URL first.', 'error');
      return;
    }

    setAnalyzingWithGroq(true);
    showToast(`Groq AI (${GROQ_EXACT_MODEL}) is analyzing image for SEO...`, 'success');

    try {
      let activeGroqKey = groqKey.trim() || getInitialGroqKey();
      if (!activeGroqKey) {
        const inputKey = window.prompt("Enter your Groq API Key:");
        if (inputKey && inputKey.trim()) {
          activeGroqKey = inputKey.trim();
          setGroqKey(activeGroqKey);
          localStorage.setItem('GROQ_API_KEY', activeGroqKey);
        } else {
          throw new Error('Groq API Key is required for AI Vision SEO analysis.');
        }
      }
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${activeGroqKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_EXACT_MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are a world-class SEO and personal branding specialist for Suleman Zaheer (Business Growth Partner, Full Stack Software Engineer specializing in MERN, Next.js, Laravel, Flutter, and published Urdu Poet based in Lahore, Pakistan). Analyze the provided image and generate pure JSON SEO metadata optimized for Google Image Search and Google Knowledge Graph. Return ONLY a JSON object with keys: "title", "altText", "description", "tags". Make sure "Suleman Zaheer" is prominently included in title, altText, and tags.'
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Analyze this photo and generate high-ranking SEO metadata for Google Image Search and brand recognition for Suleman Zaheer. Return ONLY valid JSON format without markdown code fences.'
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageSource
                  }
                }
              ]
            }
          ],
          temperature: 0.2,
          max_tokens: 350
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || `Groq API Error (${response.status})`);
      }

      let rawContent = data.choices?.[0]?.message?.content || '';
      rawContent = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();

      const parsed = JSON.parse(rawContent);

      if (parsed.title) setTitle(parsed.title);
      if (parsed.altText) setAltText(parsed.altText);
      if (parsed.description) setDescription(parsed.description);
      if (parsed.tags) {
        setTags(Array.isArray(parsed.tags) ? parsed.tags.join(', ') : parsed.tags);
      }

      showToast(`Groq AI (${GROQ_EXACT_MODEL}) generated full SEO metadata!`, 'success');
    } catch (err) {
      console.error('Groq SEO Error:', err);
      // Fallback: If vision call fails, generate high-value default SEO
      handleAutoFillSEO();
      showToast(`Groq Notice: ${err.message}. Applied Suleman Zaheer SEO preset.`, 'error');
    } finally {
      setAnalyzingWithGroq(false);
    }
  };

  // Instant 1-click fallback preset
  const handleAutoFillSEO = () => {
    setTitle('Suleman Zaheer – Full Stack Software Engineer & Writer');
    setAltText('Suleman Zaheer – Software Engineer and Web Developer in Lahore, Pakistan');
    setDescription('Official photograph of Suleman Zaheer, Full Stack Software Engineer, Next.js & Flutter Developer, and Urdu Poet from Shahdara, Lahore, Pakistan.');
    setTags('Suleman Zaheer, Suleman Zaheer Photos, Software Engineer Lahore, Full Stack Developer, SAMStack');
    showToast('SEO fields auto-optimized for Google "Suleman Zaheer" Search!', 'success');
  };

  // ── Upload & Save to Firestore ──────────────────────────────
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title.trim()) { showToast('Please add an image title.', 'error'); return; }
    if (!description.trim()) { showToast('Please add a description.', 'error'); return; }
    if (!altText.trim()) { showToast('SEO Alt Text is required.', 'error'); return; }

    setUploading(true);

    try {
      let finalImageUrl = '';

      if (uploadMode === 'url') {
        if (!directUrl.trim() || !directUrl.startsWith('http')) {
          throw new Error('Please enter a valid HTTP/HTTPS image URL.');
        }
        finalImageUrl = directUrl.trim();
      } else {
        // File upload via GitHub API → stored in public/gallery/ → served by Vercel/GitHub CDN
        if (!file) { throw new Error('Please select an image file to upload.'); }

        showToast('Committing to GitHub repo... ⏳', 'success');

        // Convert file to raw base64 (no data URL prefix)
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            // Strip the "data:image/...;base64," prefix
            const result = reader.result;
            resolve(result.split(',')[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        // Generate SEO-friendly filename: suleman-zaheer-{timestamp}.{ext}
        const ext = file.name.split('.').pop().toLowerCase();
        const seoFilename = `suleman-zaheer-${Date.now()}.${ext}`;

        const res = await fetch('/api/upload-to-github', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64, filename: seoFilename }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'GitHub upload failed.');

        finalImageUrl = data.url; // raw.githubusercontent.com CDN URL
      }

      // Parse tags (comma separated)
      const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);

      // Save metadata + URL directly to Firestore database
      await addDoc(collection(db, 'seo_images'), {
        url: finalImageUrl,
        title: title.trim(),
        description: description.trim(),
        altText: altText.trim(),
        tags: tagsArray,
        createdAt: serverTimestamp(),
      });

      setTitle('');
      setDescription('');
      setAltText('');
      setTags('');
      setDirectUrl('');
      clearFile();
      showToast('Image published to public gallery (/photos) with full SEO!', 'success');
    } catch (err) {
      console.error('Upload failed:', err);
      showToast(err.message || 'Failed to save image.', 'error');
    } finally {
      setUploading(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (image) => {
    if (!window.confirm(`Delete "${image.title}"? This cannot be undone.`)) return;
    setDeletingId(image.id);
    try {
      await deleteDoc(doc(db, 'seo_images', image.id));
      showToast('Image deleted from gallery.', 'success');
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Delete failed. Try again.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <AnimatePresence>
        {toast && (
          <Toast
            key="toast"
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      <div className="flex-grow flex flex-col h-full overflow-y-auto custom-scrollbar pb-24 md:pb-8">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/10 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-black/20">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ImagePlus size={22} className="text-primary" />
                SEO Photo Gallery Manager
              </h2>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1 font-mono">
                <Cpu size={11} /> Groq Powered ({GROQ_EXACT_MODEL})
              </span>
              <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/20 flex items-center gap-1 font-mono">
                <Github size={11} /> GitHub CDN
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-1 max-w-xl">
              Upload photos → <strong>Groq AI ({GROQ_EXACT_MODEL})</strong> generates SEO → committed to <strong>GitHub repo</strong> → served by <strong>Vercel CDN</strong> → indexed by Google for <strong>&quot;Suleman Zaheer&quot;</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/photos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-xl text-xs font-bold transition-all hover:bg-primary/90 shadow-md shadow-primary/20"
            >
              <ExternalLink size={14} /> View Public /photos
            </a>
            <a
              href="/gallery-seo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium text-gray-300 transition-colors"
            >
              SEO Index ↗
            </a>
          </div>
        </div>

        <div className="p-6 space-y-8 max-w-6xl">
          {/* Upload Form Box */}
          <form onSubmit={handleUpload}>
            <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-6 pt-4 pb-3 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 bg-black/30">
                <div className="flex items-center gap-2">
                  <CloudUpload size={18} className="text-primary" />
                  <span className="font-bold text-white text-sm">Publish Image to Public Gallery</span>
                </div>

                {/* Upload Mode Switcher */}
                <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5 text-xs">
                  <button
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      uploadMode === 'file' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    File Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      uploadMode === 'url' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Paste Image URL
                  </button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Input Fields */}
                <div className="space-y-4 order-2 lg:order-1 flex flex-col">
                  {uploadMode === 'url' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Direct Image URL <span className="text-primary">*</span>
                      </label>
                      <input
                        type="url"
                        value={directUrl}
                        onChange={e => setDirectUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/... or any hosted image link"
                        disabled={uploading}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Image Title <span className="text-primary">*</span>
                      </label>
                      
                      {/* Groq AI Trigger Button */}
                      <button
                        type="button"
                        onClick={handleGenerateWithGroq}
                        disabled={analyzingWithGroq || (!preview && !directUrl.trim())}
                        className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        title="Analyze image with Groq Vision and generate SEO metadata"
                      >
                        <Zap size={13} className={analyzingWithGroq ? 'animate-spin' : ''} />
                        {analyzingWithGroq ? 'Analyzing with Groq...' : 'Auto-SEO with Groq AI'}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g., Suleman Zaheer – Full Stack Software Engineer in Lahore"
                      disabled={uploading}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      SEO Alt Text <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={altText}
                      onChange={e => setAltText(e.target.value)}
                      placeholder="e.g., Suleman Zaheer – Software Engineer and Web Developer in Lahore"
                      disabled={uploading}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Description <span className="text-primary">*</span>
                    </label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Detailed context for search engine crawler attribution..."
                      rows={2}
                      disabled={uploading}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none focus:border-primary/60 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Tags / Keywords
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={e => setTags(e.target.value)}
                      placeholder="Suleman Zaheer, Photos, Software Engineer, Lahore"
                      disabled={uploading}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={uploading || (!file && !directUrl.trim()) || !title.trim()}
                    className="mt-2 w-full bg-primary text-black font-bold py-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    {uploading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black/60 border-t-transparent rounded-full animate-spin" />
                        Publishing to Google & /photos...
                      </>
                    ) : (
                      <>
                        <Upload size={15} /> Publish to Live Gallery (/photos)
                      </>
                    )}
                  </button>
                </div>

                {/* Right: Media Preview / File Drop */}
                <div className="order-1 lg:order-2 h-full min-h-[260px]">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {uploadMode === 'file' ? 'Upload Image File' : 'Image Preview'}
                    </label>
                    <span className="text-[10px] text-gray-500 font-mono">
                      Groq Model: {GROQ_EXACT_MODEL}
                    </span>
                  </div>

                  {uploadMode === 'file' ? (
                    preview ? (
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[calc(100%-24px)] min-h-[220px] bg-black/40 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        
                        {/* Quick Groq Button on hover */}
                        <button
                          type="button"
                          onClick={handleGenerateWithGroq}
                          disabled={analyzingWithGroq}
                          className="absolute top-3 left-3 px-3 py-1.5 bg-black/80 hover:bg-emerald-500 text-white hover:text-black rounded-xl transition-all text-xs font-bold flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
                          title="Generate SEO metadata with Groq AI"
                        >
                          <Zap size={14} className="text-emerald-400" /> Auto-SEO (Groq)
                        </button>

                        <button
                          type="button"
                          onClick={clearFile}
                          className="absolute top-3 right-3 p-2 bg-black/80 hover:bg-red-500 text-white rounded-xl transition-all cursor-pointer"
                          title="Clear image"
                        >
                          <X size={16} />
                        </button>

                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2.5 text-xs text-gray-200 truncate flex justify-between">
                          <span className="truncate">{file?.name}</span>
                          <span className="text-emerald-400 font-bold text-[10px]">READY FOR GROQ</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className={`h-[calc(100%-24px)] min-h-[220px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all select-none
                          ${isDragging
                            ? 'border-primary bg-primary/5'
                            : 'border-white/10 hover:border-primary/40 hover:bg-white/[0.02]'
                          }`}
                      >
                        <div className="p-3.5 rounded-xl bg-white/5 text-gray-400">
                          <Upload size={24} />
                        </div>
                        <div className="text-center px-4">
                          <p className="text-xs font-semibold text-gray-300">
                            {isDragging ? 'Drop image file here' : 'Click to select or drag & drop'}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">Supports JPG, PNG, WEBP</p>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[calc(100%-24px)] min-h-[220px] bg-black/40 flex items-center justify-center">
                      {directUrl ? (
                        <div className="w-full h-full relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={directUrl}
                            alt="Direct URL Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <button
                            type="button"
                            onClick={handleGenerateWithGroq}
                            disabled={analyzingWithGroq}
                            className="absolute top-3 left-3 px-3 py-1.5 bg-black/80 hover:bg-emerald-500 text-white hover:text-black rounded-xl transition-all text-xs font-bold flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
                            title="Generate SEO with Groq"
                          >
                            <Zap size={14} className="text-emerald-400" /> Auto-SEO (Groq)
                          </button>
                        </div>
                      ) : (
                        <div className="text-center p-6 text-gray-500">
                          <LinkIcon size={28} className="mx-auto mb-2 text-gray-600" />
                          <p className="text-xs">Paste an image URL on the left to see preview</p>
                        </div>
                      )}
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handleFileSelect(e.target.files?.[0])}
                    disabled={uploading}
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Existing Images Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                Published Photos
                <span className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded-full font-mono">
                  {images.length}
                </span>
              </h3>
              <span className="text-xs text-gray-500 font-mono">Showing latest first</span>
            </div>

            {loadingImages ? (
              <div className="py-16 text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs text-gray-500">Loading gallery photos...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                <ImagePlus size={36} className="mx-auto text-gray-600 mb-3" />
                <p className="text-sm font-semibold text-gray-300">No images published yet</p>
                <p className="text-xs text-gray-500 mt-1">Upload your first photo above to display it on the public /photos page.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {images.map(img => (
                  <ImageCard
                    key={img.id}
                    img={img}
                    onDelete={handleDelete}
                    deleting={deletingId === img.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
