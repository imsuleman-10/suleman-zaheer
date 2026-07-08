/**
 * Firebase Force-Update Script
 * Run with: node scripts/firebase-force-update.mjs
 *
 * Uses firebase-admin (server-side) to FORCE UPDATE all blog documents
 * in the suleman-zaheer Firestore with the full content from staticBlogs.js
 *
 * NOTE: This script uses the firebase CLIENT sdk (same as the app) via
 * environment variables already set in the project.
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { createRequire } from 'module';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Firebase Config ──────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDfouPiTQCV05-uG9fSHvS9M9ZQvWgvdyI",
  authDomain: "suleman-zaheer.firebaseapp.com",
  projectId: "suleman-zaheer",
  storageBucket: "suleman-zaheer.firebasestorage.app",
  messagingSenderId: "485130497299",
  appId: "1:485130497299:web:1d5e92f607ee1430f4bee6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── Read static data via dynamic import ──────────────────────────────────────
const { STATIC_BLOGS } = await import('../src/data/staticBlogs.js');

console.log(`\n🚀 Starting Firebase force-update for ${STATIC_BLOGS.length} blog posts...\n`);

const blogsRef = collection(db, 'blogs');

let updated = 0;
let created = 0;
let errors = 0;

for (const blog of STATIC_BLOGS) {
  try {
    const { id, ...blogData } = blog;

    // Find existing document by slug
    const q = query(blogsRef, where('slug', '==', blog.slug));
    const snap = await getDocs(q);

    if (!snap.empty) {
      // Document exists — force SET it (overwrites all fields including content)
      const docRef = snap.docs[0].ref;
      await setDoc(docRef, {
        ...blogData,
        updatedAt: serverTimestamp(),
        published: true,
      }, { merge: false }); // merge: false = completely replace the document

      console.log(`✅ UPDATED: ${blog.slug} (content: ${blogData.content.length} chars)`);
      updated++;
    } else {
      // Document doesn't exist — create it
      await addDoc(blogsRef, {
        ...blogData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        views: 0,
        published: true,
      });
      console.log(`➕ CREATED: ${blog.slug} (content: ${blogData.content.length} chars)`);
      created++;
    }
  } catch (err) {
    console.error(`❌ ERROR: ${blog.slug} — ${err.message}`);
    errors++;
  }
}

console.log(`\n────────────────────────────────────────`);
console.log(`✅ Updated: ${updated}`);
console.log(`➕ Created: ${created}`);
console.log(`❌ Errors:  ${errors}`);
console.log(`────────────────────────────────────────`);
console.log(`\n🎉 Firebase update complete!\n`);

process.exit(0);
