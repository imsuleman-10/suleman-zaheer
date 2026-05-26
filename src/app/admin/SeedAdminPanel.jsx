"use client";
import React, { useState } from 'react';
import { db } from '@/firebase';
import {
  collection, addDoc, getDocs, query, where, serverTimestamp
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { DatabaseZap, CheckCircle, AlertCircle, Loader, BookOpen, Feather, RefreshCw } from 'lucide-react';
import { STATIC_BLOGS } from '@/data/staticBlogs';
import { STATIC_POEMS } from '@/data/staticPoems';

export default function SeedAdminPanel() {
  const [status, setStatus] = useState(null); // null | 'running' | 'done' | 'error'
  const [log, setLog] = useState([]);
  const [summary, setSummary] = useState(null);

  const addLog = (msg, type = 'info') => {
    setLog(prev => [...prev, { msg, type, ts: Date.now() }]);
  };

  const handleSeed = async () => {
    setStatus('running');
    setLog([]);
    setSummary(null);

    let blogsAdded = 0;
    let blogsSkipped = 0;
    let poemsAdded = 0;
    let poemsSkipped = 0;

    try {
      // ── Seed Blogs ────────────────────────────────────────────────────────
      addLog(`Starting blog sync — ${STATIC_BLOGS.length} articles found...`, 'info');
      const blogsRef = collection(db, 'blogs');

      for (const blog of STATIC_BLOGS) {
        const q = query(blogsRef, where('slug', '==', blog.slug));
        const snap = await getDocs(q);

        if (!snap.empty) {
          addLog(`⏭  Blog already exists: "${blog.title}"`, 'skip');
          blogsSkipped++;
          continue;
        }

        const { id, readTime, ...blogData } = blog; // strip local-only fields
        await addDoc(blogsRef, {
          ...blogData,
          published: true,
          featured: blog.featured ?? false,
          views: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        addLog(`✅ Blog seeded: "${blog.title}"`, 'success');
        blogsAdded++;
      }

      // ── Seed Poems ────────────────────────────────────────────────────────
      addLog(`Starting poetry sync — ${STATIC_POEMS.length} poems found...`, 'info');
      const poemsRef = collection(db, 'poems');

      for (const poem of STATIC_POEMS) {
        const q = query(poemsRef, where('slug', '==', poem.slug));
        const snap = await getDocs(q);

        if (!snap.empty) {
          addLog(`⏭  Poem already exists: "${poem.title}"`, 'skip');
          poemsSkipped++;
          continue;
        }

        const { id, ...poemData } = poem;
        await addDoc(poemsRef, {
          ...poemData,
          views: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        addLog(`✅ Poem seeded: "${poem.title}"`, 'success');
        poemsAdded++;
      }

      setSummary({ blogsAdded, blogsSkipped, poemsAdded, poemsSkipped });
      setStatus('done');
    } catch (err) {
      console.error(err);
      addLog(`❌ Error: ${err.message}`, 'error');
      setStatus('error');
    }
  };

  return (
    <div className="flex-grow flex flex-col h-full overflow-y-auto custom-scrollbar p-6 space-y-6">
      <header>
        <div className="flex items-center gap-3 mb-1">
          <DatabaseZap size={22} className="text-primary" />
          <h2 className="text-2xl font-display font-bold">Content Sync</h2>
        </div>
        <p className="text-gray-400 text-sm">
          Migrate all static blogs &amp; poetry into Firestore so the Admin Dashboard can manage them.
          Existing entries are skipped automatically — no duplicates.
        </p>
      </header>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Blogs</p>
            <p className="text-gray-400 text-xs mt-0.5">{STATIC_BLOGS.length} articles ready to sync</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-400/10 flex items-center justify-center shrink-0">
            <Feather size={18} className="text-rose-400" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Poetry</p>
            <p className="text-gray-400 text-xs mt-0.5">{STATIC_POEMS.length} poems ready to sync</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleSeed}
        disabled={status === 'running'}
        className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-primary/20 to-cyan-500/20 border border-primary/30 text-primary hover:from-primary/30 hover:to-cyan-500/30 hover:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'running' ? (
          <><Loader size={18} className="animate-spin" /> Syncing — please wait...</>
        ) : status === 'done' ? (
          <><RefreshCw size={18} /> Run Sync Again</>
        ) : (
          <><DatabaseZap size={18} /> Sync All Content to Firestore</>
        )}
      </button>

      {/* Summary */}
      <AnimatePresence>
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {[
              { label: 'Blogs Added', value: summary.blogsAdded, color: '#00ffcc' },
              { label: 'Blogs Skipped', value: summary.blogsSkipped, color: '#6b7280' },
              { label: 'Poems Added', value: summary.poemsAdded, color: '#fb7185' },
              { label: 'Poems Skipped', value: summary.poemsSkipped, color: '#6b7280' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-black" style={{ color }}>{value}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Log */}
      {log.length > 0 && (
        <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-1.5 font-mono text-xs max-h-72 overflow-y-auto custom-scrollbar">
          {log.map((entry, i) => (
            <p
              key={i}
              className={
                entry.type === 'success' ? 'text-emerald-400' :
                entry.type === 'error'   ? 'text-red-400' :
                entry.type === 'skip'    ? 'text-gray-500' :
                'text-gray-300'
              }
            >
              {entry.msg}
            </p>
          ))}
          {status === 'done' && (
            <p className="text-primary font-bold mt-2 pt-2 border-t border-white/10">
              ✅ Sync complete. Check the Blogs &amp; Poetry panels to confirm.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-400 font-bold mt-2 pt-2 border-t border-white/10">
              ❌ Sync failed. Make sure you are logged in as Admin.
            </p>
          )}
        </div>
      )}

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-xs text-amber-300">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <p>
          <strong>How it works:</strong> This tool checks each slug before writing — existing entries are never duplicated.
          After sync, all content will appear in the Blog and Poetry admin panels and can be edited, deleted, and updated from there.
          The static fallback data in the code remains as a safety net.
        </p>
      </div>
    </div>
  );
}
