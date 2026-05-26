"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '@/firebase';
import {
  collection, query, orderBy, onSnapshot,
  addDoc, deleteDoc, doc, serverTimestamp
} from 'firebase/firestore';
import {
  Upload, Trash2, ExternalLink, ImagePlus,
  X, CheckCircle, AlertCircle, CloudUpload, Eye, Zap, Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold border backdrop-blur-xl
        ${type === 'success'
          ? 'bg-green-500/10 border-green-500/30 text-green-400'
          : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}
    >
      {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
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
            alt={img.title}
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
        <h4
          className="font-bold text-white text-sm truncate"
          title={img.title}
        >
          {img.title}
        </h4>
        <p
          className="text-xs text-gray-400 line-clamp-2 flex-grow"
          title={img.description}
        >
          {img.description}
        </p>
        <div className="pt-3 mt-auto flex items-center justify-between border-t border-white/10">
          <span className="text-[10px] text-primary/70 flex items-center gap-1 font-semibold">
            <Zap size={10} /> Google Indexed URL
          </span>
          <button
            onClick={() => onDelete(img)}
            disabled={deleting}
            className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-40 text-xs flex items-center gap-1"
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

  // Settings: ImgBB Key
  const [imgbbKey, setImgbbKey] = useState('');
  const [keyInput, setKeyInput] = useState('');

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Load ImgBB key from local storage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('IMGBB_API_KEY');
    if (savedKey) {
      setImgbbKey(savedKey);
      setKeyInput(savedKey);
    }
  }, []);

  const saveImgbbKey = (e) => {
    e.preventDefault();
    if (!keyInput.trim()) return showToast('Please enter a valid API key', 'error');
    localStorage.setItem('IMGBB_API_KEY', keyInput.trim());
    setImgbbKey(keyInput.trim());
    showToast('API Key saved successfully! You can now upload images.', 'success');
  };

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
    
    // Create preview
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

  // ── Upload to ImgBB & Save URL to Firestore ──────────────────────────────
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imgbbKey) { showToast('ImgBB API Key is required.', 'error'); return; }
    if (!file) { showToast('Please select a valid image.', 'error'); return; }
    if (!title.trim()) { showToast('Please add a title.', 'error'); return; }
    if (!description.trim()) { showToast('Please add a description.', 'error'); return; }

    setUploading(true);

    try {
      // 1. Upload to ImgBB API
      const formData = new FormData();
      formData.append('image', file);
      
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error?.message || 'ImgBB Upload Failed');
      }

      const imageUrl = data.data.url; // Real URL for Google Images

      // 2. Save metadata + URL directly to Firestore database
      await addDoc(collection(db, 'seo_images'), {
        url: imageUrl,
        title: title.trim(),
        description: description.trim(),
        createdAt: serverTimestamp(),
      });

      setTitle('');
      setDescription('');
      clearFile();
      showToast('Image published to Gallery successfully!', 'success');
    } catch (err) {
      console.error('Upload failed:', err);
      showToast(err.message || 'Failed to save image. Check your API key.', 'error');
    } finally {
      setUploading(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (image) => {
    if (!window.confirm(`Delete "${image.title}"? This cannot be undone.`)) return;
    setDeletingId(image.id);
    try {
      // Deleting from Firestore (ImgBB image stays orphaned but hidden from site)
      await deleteDoc(doc(db, 'seo_images', image.id));
      showToast('Image deleted.', 'success');
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Delete failed. Try again.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
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

      <div className="flex-grow flex flex-col h-full overflow-y-auto custom-scrollbar">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="px-6 pt-6 pb-4 border-b border-white/5 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ImagePlus size={22} className="text-primary" />
                SEO Image Gallery
              </h2>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/20">
                100% Free Hosting
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-1 max-w-xl">
              Upload images that get assigned real URLs for Google Images Indexing, completely bypassing Firebase Storage limits.
            </p>
          </div>
          <a
            href="/gallery-seo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors"
          >
            <ExternalLink size={16} /> View Live Gallery
          </a>
        </div>

        <div className="p-6 space-y-8">
          {/* ── Free Image Hosting Setup (If no API Key) ──────────────── */}
          {!imgbbKey && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/10 border border-primary/20 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Key size={120} className="text-primary" />
              </div>
              
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                <Key size={18} className="text-primary" /> Setup Free Image Hosting
              </h3>
              <p className="text-sm text-gray-300 mb-6 max-w-2xl">
                Since Firebase Storage is paid, we use <strong>ImgBB</strong> to host images for 100% free. This gives you direct Image URLs which are strictly required for Google Images to index your portfolio!
              </p>

              <form onSubmit={saveImgbbKey} className="space-y-4 max-w-md relative z-10">
                <div className="bg-black/30 p-4 rounded-xl border border-white/10">
                  <ol className="text-xs text-gray-400 list-decimal list-inside space-y-2 mb-4">
                    <li>Go to <a href="https://api.imgbb.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">api.imgbb.com</a> and sign up (takes 10s).</li>
                    <li>Click <strong>"Add API Key"</strong>.</li>
                    <li>Copy and paste the key below:</li>
                  </ol>
                  <input
                    type="text"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    placeholder="e.g. 64ce65839ceb10bf..."
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-primary outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-black font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors w-full sm:w-auto"
                >
                  Save API Key & Start Uploading
                </button>
              </form>
            </motion.div>
          )}

          {/* ── Upload Form ──────────────────────────────────────────────── */}
          <form onSubmit={handleUpload} className={!imgbbKey ? 'opacity-50 pointer-events-none grayscale' : ''}>
            <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-6 pt-5 pb-4 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                  <CloudUpload size={18} className="text-primary" />
                  Publish New Image
                </h3>
                {imgbbKey && (
                  <button type="button" onClick={() => setImgbbKey('')} className="text-[10px] text-gray-500 hover:text-white underline">
                    Change API Key
                  </button>
                )}
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left — Fields */}
                <div className="space-y-5 order-2 lg:order-1 flex flex-col">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Image Title <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g., Enterprise Software Dashboard"
                      disabled={uploading}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-primary/60 focus:bg-white/[0.02] transition-colors disabled:opacity-50"
                    />
                    <p className="text-[10px] text-gray-500 mt-1.5 flex items-center gap-1">
                      <Zap size={10} className="text-primary" /> Used as alt-text for Google Images.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      SEO Description <span className="text-primary">*</span>
                    </label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Detailed description of the web design, technologies used, and client goals..."
                      rows={4}
                      disabled={uploading}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-primary/60 focus:bg-white/[0.02] transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={uploading || !file || !title.trim() || !description.trim()}
                    className="mt-auto w-full bg-primary text-black font-bold py-3.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(0,255,204,0.15)]"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/60 border-t-transparent rounded-full animate-spin" />
                        Uploading to ImgBB...
                      </>
                    ) : (
                      <>
                        <Upload size={18} />
                        Publish to Live Gallery
                      </>
                    )}
                  </button>
                </div>

                {/* Right — Drag & Drop */}
                <div className="order-1 lg:order-2 h-full min-h-[280px]">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Select Image <span className="text-primary">*</span>
                  </label>

                  {preview ? (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[calc(100%-24px)] bg-black/30 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={clearFile}
                        disabled={uploading}
                        className="absolute top-3 right-3 p-2 bg-black/80 hover:bg-red-500 text-white rounded-xl transition-all disabled:opacity-50 backdrop-blur-md opacity-0 group-hover:opacity-100"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-12 pb-3 px-4 text-xs text-gray-200 truncate flex justify-between items-center">
                        <span className="truncate pr-4">{file?.name}</span>
                        <span className="text-primary font-bold text-[10px] uppercase tracking-wider shrink-0">Ready</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`h-[calc(100%-24px)] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all select-none
                        ${isDragging
                          ? 'border-primary/70 bg-primary/5'
                          : 'border-white/10 hover:border-primary/40 hover:bg-white/[0.02]'
                        }`}
                    >
                      <div className={`p-4 rounded-2xl transition-colors ${isDragging ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-400'}`}>
                        <Upload size={32} />
                      </div>
                      <div className="text-center px-4">
                        <p className="text-base font-semibold text-gray-300 mb-1">
                          {isDragging ? 'Drop image here' : 'Click or Drag & Drop'}
                        </p>
                        <p className="text-xs text-gray-500">Supported: JPG, PNG, WEBP, GIF</p>
                      </div>
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

          {/* ── Gallery Grid ──────────────────────────────────────────────── */}
          <div className={!imgbbKey ? 'opacity-50 pointer-events-none grayscale' : ''}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white flex items-center gap-2 text-base">
                <ImagePlus size={18} className="text-primary" />
                Live Images
                <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded-full text-gray-300 font-bold ml-1">
                  {images.length}
                </span>
              </h3>
            </div>

            {loadingImages ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-64 rounded-2xl bg-white/5 border border-white/5 animate-pulse" />
                ))}
              </div>
            ) : images.length === 0 ? (
               <div className="py-24 text-center border border-dashed border-white/10 rounded-3xl bg-black/20">
                <ImagePlus size={48} className="mx-auto text-white/10 mb-4" />
                <p className="text-gray-300 text-base font-medium">Your gallery is empty</p>
                <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">Upload images above to automatically publish them to your SEO Gallery page.</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {images.map(img => (
                    <ImageCard
                      key={img.id}
                      img={img}
                      onDelete={handleDelete}
                      deleting={deletingId === img.id}
                    />
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
