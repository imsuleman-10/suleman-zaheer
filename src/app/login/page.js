"use client";
import React, { useState } from 'react';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, AlertCircle, ArrowRight, Home, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Access is restricted to authorized administrators only.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 py-20 relative overflow-hidden selection:bg-primary/30">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/2 w-full max-w-3xl h-[600px] -translate-x-1/2 bg-gradient-to-br from-primary/10 via-transparent to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full max-w-lg h-[400px] bg-gradient-to-tl from-rose-500/5 via-transparent to-transparent blur-[100px] rounded-full pointer-events-none" />


      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] bg-neutral-900/50 border border-white/5 backdrop-blur-2xl relative z-10 shadow-2xl overflow-hidden"
      >
        {/* Subtle top border glow */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="text-center mb-10 relative">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity" />
            <ShieldCheck className="text-primary" size={36} strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-display font-black mb-3 text-white tracking-tight">System Access</h1>
          <p className="text-gray-400 font-medium text-sm sm:text-base">Enter your credentials to manage content.</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 text-sm leading-relaxed">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} className="space-y-6 mt-8">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Admin Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-gray-500">
                <Mail size={18} />
              </div>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/50 focus:bg-white/5 transition-all duration-300 text-white placeholder:text-gray-700 font-medium"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Master Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-gray-500">
                <Lock size={18} />
              </div>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/50 focus:bg-white/5 transition-all duration-300 text-white placeholder:text-gray-700 font-medium tracking-widest font-mono"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] mt-8"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Authenticate <ArrowRight size={20} strokeWidth={2.5} /></>
            )}
          </motion.button>
        </form>

        <div className="mt-10 text-center relative z-20">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors font-medium hover:bg-white/5 px-4 py-2 rounded-full">
            <Home size={16} />
            Return to Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
