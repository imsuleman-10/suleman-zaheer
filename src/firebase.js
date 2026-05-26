import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ─────────────────────────────────────────────────────────────────────────────
// Firebase Configuration — Priority: Environment Variables > Hardcoded Fallbacks
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDfouPiTQCV05-uG9fSHvS9M9ZQvWgvdyI",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "suleman-zaheer.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "suleman-zaheer",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "suleman-zaheer.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "485130497299",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:485130497299:web:1d5e92f607ee1430f4bee6",
};

export const isFirebaseConfigured = true;

// ─────────────────────────────────────────────────────────────────────────────
// Initialize Firebase App safely (guards against hot-reload double-init)
// ─────────────────────────────────────────────────────────────────────────────
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const storage = getStorage(app);

// ─────────────────────────────────────────────────────────────────────────────
// Firestore — Network-Resilient Initialization
//
// Pakistani ISPs and many corporate networks block gRPC/WebSocket connections
// that Firebase uses by default. This causes the "Backend didn't respond within
// 10 seconds / ECONNRESET" console error even though the app functions correctly
// via the static fallback data.
//
// Fix strategy:
//   1. experimentalForceLongPolling — forces HTTP long-poll instead of WebSocket
//   2. useFetchStreams: false        — disables streaming fetch (BYOB reader),
//                                     required for long-polling in some browsers
//   3. try/catch guard               — if Firestore was already initialized
//                                     (hot-reload), safely retrieve the existing
//                                     instance instead of throwing
// ─────────────────────────────────────────────────────────────────────────────
let db;
try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false,
  });
} catch {
  // Already initialized during hot-reload — just grab the existing instance
  db = getFirestore(app);
}

export { db };
