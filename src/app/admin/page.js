"use client";
import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '@/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc, arrayUnion, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Clock, CheckCircle, Trash2, LogOut, LayoutDashboard, MessageSquare, Send, 
  User, ShieldCheck, Inbox, Archive, Filter, ChevronRight, ChevronLeft, Search, 
  CheckSquare, Square, XCircle, Activity, ImagePlus, BookOpen, Feather, Settings, 
  DatabaseZap, Menu, X, ExternalLink, ArrowLeft, Sparkles
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import DashboardPanel from './DashboardPanel';
import GalleryAdminPanel from './GalleryAdminPanel';
import BlogAdminPanel from './BlogAdminPanel';
import PoetryAdminPanel from './PoetryAdminPanel';
import SettingsAdminPanel from './SettingsAdminPanel';
import SeedAdminPanel from './SeedAdminPanel';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [firestoreError, setFirestoreError] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  
  // Responsive sidebar states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubAuth();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    try {
      const q = query(collection(db, "contactRequests"), orderBy("createdAt", "desc"));
      const unsubDocs = onSnapshot(q, (snapshot) => {
        const firestoreData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRequests(firestoreData);
        setFirestoreError(false);
      }, (error) => {
        console.error("Firestore Listen Error:", error);
        if (error.code === 'permission-denied') setFirestoreError(true);
      });

      return () => unsubDocs();
    } catch (err) {
      setFirestoreError(true);
    }
  }, [user]);

  const toggleReadStatus = async (id, currentStatus) => {
    const docRef = doc(db, "contactRequests", id);
    await updateDoc(docRef, { read: !currentStatus });
    if (!currentStatus) {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setShowMobileDetail(false);
      }
    }
  };

  const deleteRequest = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      if (selectedRequestId === id) {
        setSelectedRequestId(null);
        setShowMobileDetail(false);
      }
      await deleteDoc(doc(db, "contactRequests", id));
    }
  };

  const bulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} messages?`)) {
      const batch = writeBatch(db);
      selectedIds.forEach(id => {
        batch.delete(doc(db, "contactRequests", id));
      });
      await batch.commit();
      setSelectedIds([]);
      if (selectedIds.includes(selectedRequestId)) {
        setSelectedRequestId(null);
        setShowMobileDetail(false);
      }
    }
  };

  const bulkToggleReadStatus = async (toRead) => {
    if (selectedIds.length === 0) return;
    const batch = writeBatch(db);
    selectedIds.forEach(id => {
      batch.update(doc(db, "contactRequests", id), { read: toRead });
    });
    await batch.commit();
    setSelectedIds([]);
  };

  const toggleSelect = (e, id) => {
    e.stopPropagation();
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRequests.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRequests.map(r => r.id));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleSelectRequest = (id) => {
    setSelectedRequestId(id);
    setShowMobileDetail(true);
  };

  const unreadCount = requests.filter(req => !req.read).length;

  const filteredRequests = requests.filter(req => {
    const matchesTab = activeTab === 'inbox' ? !req.read : req.read;
    const matchesSearch = req.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.message?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const selectedRequest = requests.find(r => r.id === selectedRequestId);

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, badge: null },
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: unreadCount > 0 ? unreadCount : null },
    { id: 'archived', label: 'Archived', icon: Archive, badge: null },
    { id: 'gallery', label: 'SEO Gallery', icon: ImagePlus, badge: null },
    { id: 'blog', label: 'Blog Posts', icon: BookOpen, badge: null },
    { id: 'poetry', label: 'Poetry', icon: Feather, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
    { id: 'sync', label: 'Database Sync', icon: DatabaseZap, badge: null },
  ];

  if (loading || !user) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Authenticating Console...</p>
    </div>
  );

  return (
    <div className="h-[100dvh] md:h-screen bg-neutral-950 text-white font-sans flex flex-col md:flex-row overflow-hidden relative select-none">
      
      {/* Auth Warning Overlay */}
      {firestoreError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-red-500/10 border border-red-500/20 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <ShieldCheck size={16} className="text-red-500" />
          <p className="text-[10px] font-black uppercase tracking-widest text-red-500">
            Permission Denied: Ensure you are logged in with valid Admin credentials.
          </p>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          MOBILE TOP BAR (Clean, Non-glowing, Click logo toggles drawer)
          ────────────────────────────────────────────────────────── */}
      <header className="md:hidden shrink-0 bg-neutral-950/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between z-40">
        {/* Clickable Clean Logo Component */}
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(prev => !prev)}
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 active:scale-95 transition-all text-left cursor-pointer"
          aria-label="Toggle menu via logo"
        >
          <div className="relative w-8 h-8 rounded-lg bg-white/5 border border-white/10 p-1 flex items-center justify-center shrink-0">
            <Image 
              src="/assets/suleman-zaheer-logo.png" 
              alt="SAM Logo" 
              width={24} 
              height={24} 
              className="object-contain" 
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-semibold text-xs tracking-tight text-white">SAM Console</span>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/5 text-gray-400">Admin</span>
            </div>
            <span className="text-[9px] text-gray-400 block -mt-0.5">Tap logo to menu</span>
          </div>
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-gray-300 capitalize px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
            {NAV_ITEMS.find(n => n.id === activeTab)?.label}
          </span>
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(prev => !prev)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle Drawer"
          >
            {mobileDrawerOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────
          MOBILE SLIDE-OVER DRAWER
          ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="md:hidden fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-neutral-950 border-r border-white/10 backdrop-blur-2xl z-50 flex flex-col p-5 shadow-2xl overflow-y-auto custom-scrollbar"
            >
              {/* Clean Logo Header inside Drawer */}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all text-left mb-6 cursor-pointer"
                title="Click logo to close menu"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-lg bg-white/5 border border-white/10 p-1 flex items-center justify-center">
                    <Image 
                      src="/assets/suleman-zaheer-logo.png" 
                      alt="SAM Logo" 
                      width={26} 
                      height={26} 
                      className="object-contain" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-semibold text-sm text-white">SAM Console</span>
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-300">ADMIN</span>
                    </div>
                    <span className="text-[10px] text-gray-400">Click to close sidebar</span>
                  </div>
                </div>
                <div className="p-1 rounded-lg bg-white/5 text-gray-400">
                  <X size={16} />
                </div>
              </button>

              {/* Navigation Links */}
              <div className="space-y-1 flex-grow">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-3 mb-2">Navigation</p>
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileDrawerOpen(false);
                        setShowMobileDetail(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white/10 text-white font-semibold border border-white/15'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? 'text-primary' : 'text-gray-400'} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="pt-4 border-t border-white/10 space-y-2.5 shrink-0">
                <Link
                  href="/photos"
                  target="_blank"
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-gray-300 hover:text-white transition-all"
                >
                  <span className="flex items-center gap-2">
                    <ImagePlus size={14} className="text-primary" /> View Public Photos
                  </span>
                  <ExternalLink size={12} className="text-gray-500" />
                </Link>

                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-gray-300 hover:text-white transition-all"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink size={14} className="text-primary" /> Main Portfolio
                  </span>
                  <span className="text-[9px] text-gray-500 font-mono">Public</span>
                </Link>

                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {user?.email ? user.email[0].toUpperCase() : 'A'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate text-white">{user?.email || 'Admin'}</p>
                      <p className="text-[9px] text-gray-400 font-mono uppercase">Super Admin</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────
          1. DESKTOP COLLAPSIBLE SIDEBAR
          Clean, minimalist, no-glow logo component toggles expand/collapse
          ────────────────────────────────────────────────────────── */}
      <aside 
        className={`hidden md:flex flex-col bg-neutral-950 border-r border-white/10 py-5 transition-all duration-300 ease-in-out shrink-0 z-30 select-none ${
          sidebarOpen ? 'w-64 px-4' : 'w-20 px-3 items-center'
        }`}
      >
        {/* Simple, Non-glowing Logo Component Button */}
        <button
          type="button"
          onClick={() => setSidebarOpen(prev => !prev)}
          className={`w-full flex items-center rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 active:scale-[0.98] transition-all text-left cursor-pointer ${
            sidebarOpen ? 'p-2.5 justify-between' : 'p-2 justify-center'
          }`}
          title={sidebarOpen ? "Click logo to collapse sidebar" : "Click logo to expand sidebar"}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Clean logo box (NO glow, simple, elegant) */}
            <div className="relative w-8 h-8 rounded-lg bg-white/5 border border-white/10 p-1 flex items-center justify-center shrink-0">
              <Image 
                src="/assets/suleman-zaheer-logo.png" 
                alt="SAM Logo" 
                width={26} 
                height={26} 
                className="object-contain" 
              />
            </div>

            {/* Brand Title (visible when expanded) */}
            {sidebarOpen && (
              <motion.div 
                initial={{ opacity: 0, x: -6 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0 }}
                className="text-left overflow-hidden min-w-0"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-semibold text-sm tracking-tight text-white">SAM Console</span>
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/5 text-gray-400 border border-white/10">v2.4</span>
                </div>
                <span className="text-[10px] text-gray-500 block -mt-0.5 truncate">
                  Click logo to collapse
                </span>
              </motion.div>
            )}
          </div>

          {/* Minimal toggle chevron */}
          {sidebarOpen && (
            <div className="text-gray-400 hover:text-white transition-colors ml-1 shrink-0">
              <ChevronLeft size={16} />
            </div>
          )}
        </button>

        {/* Separator / Subtitle */}
        {sidebarOpen ? (
          <div className="mt-4 mb-2 px-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <span>Navigation</span>
            <span className="text-gray-400 text-[10px] font-mono">Live</span>
          </div>
        ) : (
          <div className="w-6 h-[1px] bg-white/10 my-4" />
        )}

        {/* Navigation Items */}
        <nav className="flex-grow space-y-1 overflow-y-auto custom-scrollbar w-full py-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setShowMobileDetail(false);
                }}
                className={`w-full flex items-center rounded-xl transition-all cursor-pointer relative group ${
                  sidebarOpen 
                    ? `px-3 py-2 justify-between ${
                        isActive
                          ? 'bg-white/10 text-white font-semibold border border-white/15'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                      }`
                    : `p-2.5 justify-center ${
                        isActive
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                      }`
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon size={18} className={`shrink-0 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white'}`} />
                  {sidebarOpen && (
                    <span className="text-xs truncate font-medium">{item.label}</span>
                  )}
                </div>

                {/* Unread badge */}
                {item.badge && (
                  sidebarOpen ? (
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30 shrink-0">
                      {item.badge}
                    </span>
                  ) : (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
                  )
                )}

                {/* Collapsed Tooltip */}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-lg border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label} {item.badge ? `(${item.badge})` : ''}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-3 border-t border-white/10 space-y-2 w-full shrink-0">
          <Link
            href="/photos"
            target="_blank"
            className={`w-full flex items-center rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-gray-400 hover:text-white transition-all ${
              sidebarOpen ? 'px-3 py-1.5 justify-between text-xs' : 'p-2 justify-center'
            }`}
            title="View Public Photos Page"
          >
            <div className="flex items-center gap-2">
              <ImagePlus size={15} className="text-primary shrink-0" />
              {sidebarOpen && <span>Public Photos</span>}
            </div>
            {sidebarOpen && <ExternalLink size={12} className="text-gray-500" />}
          </Link>

          <Link
            href="/"
            target="_blank"
            className={`w-full flex items-center rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-gray-400 hover:text-white transition-all ${
              sidebarOpen ? 'px-3 py-1.5 justify-between text-xs' : 'p-2 justify-center'
            }`}
            title="Open Live Portfolio Site"
          >
            <div className="flex items-center gap-2">
              <ExternalLink size={15} className="text-gray-400 shrink-0" />
              {sidebarOpen && <span>Public Site</span>}
            </div>
            {sidebarOpen && <span className="text-[9px] text-gray-500 font-mono">↗</span>}
          </Link>

          <div className={`flex items-center rounded-xl bg-white/[0.02] border border-white/5 ${
            sidebarOpen ? 'p-2 justify-between' : 'p-1.5 justify-center'
          }`}>
            {sidebarOpen ? (
              <>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {user?.email ? user.email[0].toUpperCase() : 'S'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-white truncate">{user?.email || 'Admin'}</p>
                    <p className="text-[8px] font-mono text-gray-400">Super Admin</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={15} />
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="p-1 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ──────────────────────────────────────────────────────────
          2. MIDDLE PANE: INBOX / ARCHIVE LIST
          ────────────────────────────────────────────────────────── */}
      {(activeTab === 'inbox' || activeTab === 'archived') && (
        <section 
          className={`w-full md:w-96 bg-black/40 border-r border-white/10 flex flex-col h-full overflow-hidden shrink-0 relative ${
            showMobileDetail ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="p-4 border-b border-white/10 bg-black/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-display font-semibold capitalize">
                  {activeTab === 'inbox' ? 'Active Inquiries' : 'Archived Inquiries'}
                </h2>
                <span className="text-[10px] bg-white/10 text-gray-300 px-2 py-0.5 rounded-full font-bold">
                  {filteredRequests.length}
                </span>
              </div>
              <button 
                onClick={toggleSelectAll}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedIds.length === filteredRequests.length && filteredRequests.length > 0 
                    ? 'bg-white/10 text-primary border border-white/20' 
                    : 'text-gray-500 hover:bg-white/5 border border-transparent'
                }`}
                title="Select All Messages"
              >
                {selectedIds.length === filteredRequests.length && filteredRequests.length > 0 ? (
                  <CheckSquare size={16} />
                ) : (
                  <Square size={16} />
                )}
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input 
                type="text" 
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-gray-500 outline-none focus:border-white/20 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto custom-scrollbar p-2 space-y-1 pb-24 md:pb-6">
            <AnimatePresence mode="popLayout">
              {filteredRequests.length === 0 ? (
                <div className="py-20 text-center px-4">
                  <MessageSquare className="mx-auto text-gray-600 mb-3" size={24} />
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">No Inquiries Found</p>
                </div>
              ) : (
                filteredRequests.map((req) => (
                  <motion.div
                    key={req.id}
                    layout
                    onClick={() => handleSelectRequest(req.id)}
                    className={`group relative w-full text-left p-3 rounded-xl transition-all border flex items-center gap-3 cursor-pointer ${
                      selectedRequestId === req.id 
                        ? 'bg-white/10 border-white/20' 
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                    }`}
                  >
                    <button 
                      onClick={(e) => toggleSelect(e, req.id)}
                      className={`shrink-0 transition-all p-1 cursor-pointer ${
                        selectedIds.includes(req.id) ? 'text-primary' : 'text-gray-600 md:opacity-0 md:group-hover:opacity-100'
                      }`}
                    >
                      {selectedIds.includes(req.id) ? <CheckSquare size={16} /> : <Square size={16} />}
                    </button>

                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      selectedRequestId === req.id ? 'bg-primary text-black' : 'bg-white/10 text-gray-300'
                    }`}>
                      {req.name ? req.name[0].toUpperCase() : '?'}
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-semibold text-xs truncate text-white">{req.name || 'Anonymous Client'}</span>
                        <span className="text-[9px] font-mono text-gray-500 ml-2 shrink-0">
                          {(() => {
                            try { return new Date(req.createdAt.toDate?.() || req.id).toLocaleDateString([], {month: 'short', day: 'numeric'}); } catch(e) { return '';}
                          })()}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 truncate font-normal">{req.email}</p>
                    </div>

                    {selectedRequestId === req.id && (
                      <ChevronRight size={14} className="text-primary hidden md:block shrink-0" />
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Bulk toolbar */}
          <AnimatePresence>
            {selectedIds.length > 0 && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="absolute bottom-20 md:bottom-4 left-4 right-4 bg-neutral-900 border border-white/15 text-white p-3 rounded-xl flex items-center justify-between shadow-2xl z-[100]"
              >
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelectedIds([])} className="p-1 hover:text-gray-300">
                    <XCircle size={16} />
                  </button>
                  <span className="text-xs font-semibold">{selectedIds.length} Selected</span>
                </div>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => bulkToggleReadStatus(activeTab === 'inbox')}
                    className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-xs"
                    title={activeTab === 'inbox' ? 'Mark Read' : 'Restore'}
                  >
                    {activeTab === 'inbox' ? <CheckCircle size={15} /> : <Inbox size={15} />}
                  </button>
                  <button 
                    onClick={bulkDelete}
                    className="p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-all text-xs"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────
          3. MAIN CONTENT PANE
          ────────────────────────────────────────────────────────── */}
      <main className={`flex-grow flex flex-col bg-neutral-950 h-full overflow-hidden pb-20 md:pb-0 ${
        (!showMobileDetail && (activeTab === 'inbox' || activeTab === 'archived')) ? 'hidden md:flex' : 'flex'
      }`}>
        {activeTab === 'dashboard' ? (
          <DashboardPanel />
        ) : activeTab === 'gallery' ? (
          <GalleryAdminPanel />
        ) : activeTab === 'blog' ? (
          <BlogAdminPanel />
        ) : activeTab === 'poetry' ? (
          <PoetryAdminPanel />
        ) : activeTab === 'settings' ? (
          <SettingsAdminPanel />
        ) : activeTab === 'sync' ? (
          <SeedAdminPanel />
        ) : selectedRequest ? (
          <>
            {/* Header */}
            <header className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-black/20 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <button 
                  onClick={() => setShowMobileDetail(false)}
                  className="md:hidden p-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white flex items-center gap-1 text-xs font-semibold cursor-pointer"
                  title="Back to list"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white font-bold text-base shrink-0">
                  {selectedRequest.name ? selectedRequest.name[0].toUpperCase() : '?'}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-bold truncate text-white">
                    {selectedRequest.name || 'Anonymous Client'}
                  </h3>
                  <p className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1 font-mono truncate">
                    <Mail size={12} className="shrink-0" /> {selectedRequest.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => toggleReadStatus(selectedRequest.id, selectedRequest.read)} 
                  title={selectedRequest.read ? 'Move back to Inbox' : 'Mark as Read'}
                  className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                    selectedRequest.read 
                      ? 'bg-white/5 border border-white/10 text-gray-300 hover:text-white' 
                      : 'bg-primary text-black'
                  }`}
                >
                  <CheckCircle size={15} />
                  <span className="hidden sm:inline">{selectedRequest.read ? 'Unread' : 'Mark Read'}</span>
                </button>
                <button 
                  onClick={() => deleteRequest(selectedRequest.id)}
                  className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                  title="Delete Inquiry"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </header>

            {/* Conversation Detail View */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-4 md:p-8 space-y-6">
              <div className="max-w-4xl mx-auto w-full">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-7 backdrop-blur-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-3 border-b border-white/5">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full">
                      Client Inquiry
                    </span>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                      <Clock size={12} />
                      {(() => {
                        try { return new Date(selectedRequest.createdAt.toDate?.() || selectedRequest.id).toLocaleString(); } catch(e) { return '';}
                      })()}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">Message</label>
                      <p className="text-sm md:text-base text-gray-100 leading-relaxed whitespace-pre-wrap">
                        {selectedRequest.message}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-gray-400">
                        Email: <span className="text-white font-mono">{selectedRequest.email}</span>
                      </div>
                      <a
                        href={`mailto:${selectedRequest.email}?subject=${encodeURIComponent('Inquiry response from Suleman Zaheer')}`}
                        className="px-3.5 py-1.5 rounded-xl bg-primary text-black font-semibold text-xs flex items-center gap-2 hover:bg-primary/90 transition-all"
                      >
                        <Send size={13} /> Email Reply
                      </a>
                    </div>
                  </div>
                </div>

                {selectedRequest.replies && selectedRequest.replies.length > 0 && (
                  <div className="space-y-3 pt-6">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Previous Communications</h4>
                    {selectedRequest.replies.map((reply, idx) => (
                      <div key={idx} className={`flex ${reply.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] md:max-w-[70%] p-3.5 rounded-xl text-xs ${
                          reply.sender === 'Admin' 
                            ? 'bg-white/5 border border-white/10 text-gray-300' 
                            : 'bg-primary/10 border border-primary/20 text-primary'
                        }`}>
                          <p className="font-normal leading-relaxed">{reply.text}</p>
                          <span className="text-[9px] mt-1.5 block opacity-50 font-mono">{new Date(reply.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 text-gray-500">
              <Inbox size={32} />
            </div>
            <h3 className="text-base font-semibold text-white">Select an inquiry</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-sm">
              Choose a message from the list to view its complete content and reply.
            </p>
          </div>
        )}
      </main>

      {/* ──────────────────────────────────────────────────────────
          MOBILE LOWER NAVBAR (FIXED ON EVERY PAGE/VIEW)
          The 6 permanent buttons requested by user:
          1. Analytics
          2. Inbox (with unread badge)
          3. Gallery (SEO Photos)
          4. Blog
          5. Poetry
          6. Menu (More options)
          ────────────────────────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-neutral-950/95 backdrop-blur-2xl border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl">
        {/* 1. Analytics */}
        <button
          onClick={() => { setActiveTab('dashboard'); setShowMobileDetail(false); }}
          className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl cursor-pointer transition-colors ${
            activeTab === 'dashboard' ? 'text-primary' : 'text-gray-400 hover:text-white'
          }`}
          title="Analytics"
        >
          <Activity size={18} />
          <span className="text-[9px] font-medium">Stats</span>
        </button>

        {/* 2. Inbox */}
        <button
          onClick={() => { setActiveTab('inbox'); setShowMobileDetail(false); }}
          className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl relative cursor-pointer transition-colors ${
            activeTab === 'inbox' ? 'text-primary' : 'text-gray-400 hover:text-white'
          }`}
          title="Inbox"
        >
          <Inbox size={18} />
          <span className="text-[9px] font-medium">Inbox</span>
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-2 w-2 h-2 rounded-full bg-red-500" />
          )}
        </button>

        {/* 3. Gallery (Public Photo & SEO management) */}
        <button
          onClick={() => { setActiveTab('gallery'); setShowMobileDetail(false); }}
          className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl cursor-pointer transition-colors ${
            activeTab === 'gallery' ? 'text-primary' : 'text-gray-400 hover:text-white'
          }`}
          title="SEO Gallery"
        >
          <ImagePlus size={18} />
          <span className="text-[9px] font-medium">Gallery</span>
        </button>

        {/* 4. Blog */}
        <button
          onClick={() => { setActiveTab('blog'); setShowMobileDetail(false); }}
          className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl cursor-pointer transition-colors ${
            activeTab === 'blog' ? 'text-primary' : 'text-gray-400 hover:text-white'
          }`}
          title="Blog Posts"
        >
          <BookOpen size={18} />
          <span className="text-[9px] font-medium">Blog</span>
        </button>

        {/* 5. Poetry */}
        <button
          onClick={() => { setActiveTab('poetry'); setShowMobileDetail(false); }}
          className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl cursor-pointer transition-colors ${
            activeTab === 'poetry' ? 'text-primary' : 'text-gray-400 hover:text-white'
          }`}
          title="Poetry"
        >
          <Feather size={18} />
          <span className="text-[9px] font-medium">Poetry</span>
        </button>

        {/* 6. Menu / More */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl text-gray-400 hover:text-white cursor-pointer transition-colors"
          title="More Options"
        >
          <Menu size={18} />
          <span className="text-[9px] font-medium">Menu</span>
        </button>
      </nav>

      {/* Global Admin Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.18); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
