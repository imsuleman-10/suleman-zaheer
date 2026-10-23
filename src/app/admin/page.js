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
  DatabaseZap, Menu, X, ExternalLink, PanelLeftClose, PanelLeftOpen, ArrowLeft,
  Sparkles, Radio, Eye
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
          MOBILE TOP APP BAR
          Clicking the entire logo component opens/closes the mobile drawer!
          ────────────────────────────────────────────────────────── */}
      <header className="md:hidden shrink-0 bg-neutral-950/90 backdrop-blur-2xl border-b border-white/10 px-4 py-3 flex items-center justify-between z-40">
        {/* Clickable Logo Component on Mobile */}
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(prev => !prev)}
          className="flex items-center gap-2.5 p-1.5 -ml-1 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 active:scale-95 transition-all text-left group cursor-pointer"
          aria-label="Toggle Navigation Menu via Logo"
          title="Tap to toggle menu"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent border border-primary/40 p-1 flex items-center justify-center shadow-md shadow-primary/20 group-hover:border-primary transition-all shrink-0">
            <Image 
              src="/assets/suleman-zaheer-logo.png" 
              alt="SAM Logo" 
              width={26} 
              height={26} 
              className="object-contain filter group-hover:brightness-125 transition-all" 
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xs tracking-tight text-white group-hover:text-primary transition-colors">SAM CONSOLE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <span className="text-[9px] text-gray-400 font-medium tracking-wide flex items-center gap-1">
              Tap logo to {mobileDrawerOpen ? 'close' : 'open'}
            </span>
          </div>
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          <div className="text-[11px] font-bold text-primary capitalize px-2.5 py-1 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-1.5">
            {NAV_ITEMS.find(n => n.id === activeTab)?.label}
          </div>
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
          MOBILE SLIDE-OVER DRAWER (Responsive Overlay Menu)
          ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
            />

            {/* Slide-in Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="md:hidden fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-neutral-950/95 border-r border-white/10 backdrop-blur-2xl z-50 flex flex-col p-5 shadow-2xl overflow-y-auto custom-scrollbar"
            >
              {/* Logo Component Header inside Drawer (Clicking toggles/closes drawer) */}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-primary/50 transition-all text-left mb-6 group cursor-pointer"
                title="Click logo to close menu"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/40 p-1 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Image 
                      src="/assets/suleman-zaheer-logo.png" 
                      alt="SAM Logo" 
                      width={28} 
                      height={28} 
                      className="object-contain filter group-hover:brightness-125 transition-all" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-extrabold text-sm tracking-tight text-white group-hover:text-primary transition-colors">SAM CONSOLE</span>
                      <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-primary/20 text-primary uppercase">ADMIN</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Click to close sidebar</span>
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/5 text-gray-400 group-hover:text-white transition-colors">
                  <X size={16} />
                </div>
              </button>

              {/* Navigation Links */}
              <div className="space-y-1.5 flex-grow">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-3 mb-2">Management</p>
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
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-primary/20 via-primary/10 to-transparent text-primary font-bold border border-primary/30 shadow-[0_0_20px_rgba(14,165,233,0.15)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className={isActive ? 'text-primary' : 'text-gray-400'} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer: Live Site Link & User Profile */}
              <div className="pt-4 border-t border-white/10 space-y-3 shrink-0">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-xs text-gray-300 hover:text-white transition-all"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink size={14} className="text-primary" /> View Live Website
                  </span>
                  <span className="text-[9px] text-gray-500 font-bold uppercase">Public</span>
                </Link>

                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-xs shrink-0">
                      {user?.email ? user.email[0].toUpperCase() : 'A'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate text-white">{user?.email || 'Admin'}</p>
                      <p className="text-[9px] text-emerald-400 font-bold uppercase">Super Admin</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
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
          Triggered by clicking the whole Logo Component Header!
          Open: md:w-64 (or md:w-72)
          Closed: md:w-20
          ────────────────────────────────────────────────────────── */}
      <aside 
        className={`hidden md:flex flex-col bg-neutral-950/80 backdrop-blur-2xl border-r border-white/10 py-5 transition-all duration-300 ease-in-out shrink-0 z-30 select-none ${
          sidebarOpen ? 'w-64 px-4' : 'w-20 px-3 items-center'
        }`}
      >
        {/* Clickable Logo Component Header */}
        <button
          type="button"
          onClick={() => setSidebarOpen(prev => !prev)}
          className={`w-full flex items-center rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-primary/40 active:scale-[0.98] transition-all text-left group cursor-pointer ${
            sidebarOpen ? 'p-2.5 justify-between' : 'p-2 justify-center'
          }`}
          title={sidebarOpen ? "Click logo to collapse sidebar" : "Click logo to expand sidebar"}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Glowing Logo Icon */}
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent border border-primary/40 p-1 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:border-primary group-hover:scale-105 transition-all shrink-0">
              <Image 
                src="/assets/suleman-zaheer-logo.png" 
                alt="SAM Logo" 
                width={30} 
                height={30} 
                className="object-contain filter group-hover:brightness-125 transition-all" 
              />
            </div>

            {/* Brand Title (visible when expanded) */}
            {sidebarOpen && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0 }}
                className="text-left overflow-hidden min-w-0"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-sm tracking-tight text-white group-hover:text-primary transition-colors">SAM CONSOLE</span>
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-primary/20 text-primary uppercase">v2.4</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span className="truncate">Click logo to collapse</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Toggle Chevron indicator when expanded */}
          {sidebarOpen && (
            <div className="text-gray-400 group-hover:text-primary transition-colors ml-1 shrink-0">
              <PanelLeftClose size={18} />
            </div>
          )}
        </button>

        {/* Status line / breadcrumb */}
        {sidebarOpen ? (
          <div className="mt-4 mb-2 px-2 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
            <span>Navigation</span>
            <span className="text-emerald-400 flex items-center gap-1 font-bold lowercase tracking-normal text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> live
            </span>
          </div>
        ) : (
          <div className="w-8 h-[1px] bg-white/10 my-4" />
        )}

        {/* Navigation Item List */}
        <nav className="flex-grow space-y-1.5 overflow-y-auto custom-scrollbar w-full py-1">
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
                className={`w-full flex items-center rounded-2xl transition-all cursor-pointer relative group ${
                  sidebarOpen 
                    ? `px-3.5 py-2.5 justify-between ${
                        isActive
                          ? 'bg-gradient-to-r from-primary/20 via-primary/10 to-transparent text-primary font-bold border border-primary/30 shadow-[0_0_20px_rgba(14,165,233,0.12)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent font-medium'
                      }`
                    : `p-3 justify-center ${
                        isActive
                          ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_15px_rgba(14,165,233,0.25)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
                      }`
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon size={20} className={`shrink-0 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white transition-colors'}`} />
                  {sidebarOpen && (
                    <span className="text-xs truncate font-medium">{item.label}</span>
                  )}
                </div>

                {/* Badge Handling */}
                {item.badge && (
                  sidebarOpen ? (
                    <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-red-500/20 text-red-400 border border-red-500/30 shrink-0">
                      {item.badge}
                    </span>
                  ) : (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )
                )}

                {/* Tooltip for collapsed state */}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded-xl border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label} {item.badge ? `(${item.badge})` : ''}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-3 border-t border-white/10 space-y-2 w-full shrink-0">
          {/* Quick link to live site */}
          <Link
            href="/"
            target="_blank"
            className={`w-full flex items-center rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 text-gray-400 hover:text-white transition-all ${
              sidebarOpen ? 'px-3 py-2 justify-between text-xs' : 'p-2.5 justify-center'
            }`}
            title="Open Live Portfolio Site"
          >
            <div className="flex items-center gap-2">
              <ExternalLink size={16} className="text-primary shrink-0" />
              {sidebarOpen && <span>Public Website</span>}
            </div>
            {sidebarOpen && <span className="text-[9px] text-gray-500 font-mono">↗</span>}
          </Link>

          {/* User info & Logout */}
          <div className={`flex items-center rounded-xl bg-white/[0.03] border border-white/5 ${
            sidebarOpen ? 'p-2.5 justify-between' : 'p-2 justify-center'
          }`}>
            {sidebarOpen ? (
              <>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-xs shrink-0">
                    {user?.email ? user.email[0].toUpperCase() : 'S'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-white truncate">{user?.email || 'Admin'}</p>
                    <p className="text-[8px] font-black uppercase text-emerald-400 tracking-wider">Super Admin</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="p-1 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ──────────────────────────────────────────────────────────
          2. MIDDLE PANE: CLIENT INQUIRIES LIST
          Shown when activeTab is 'inbox' or 'archived'
          ────────────────────────────────────────────────────────── */}
      {(activeTab === 'inbox' || activeTab === 'archived') && (
        <section 
          className={`w-full md:w-96 bg-black/40 border-r border-white/10 flex flex-col h-full overflow-hidden shrink-0 relative ${
            showMobileDetail ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* List Header */}
          <div className="p-4 md:p-5 border-b border-white/10 bg-black/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-base md:text-lg font-display font-bold capitalize">
                  {activeTab === 'inbox' ? 'Active Inquiries' : 'Archived Inquiries'}
                </h2>
                <span className="text-[10px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-full font-black">
                  {filteredRequests.length}
                </span>
              </div>
              <button 
                onClick={toggleSelectAll}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  selectedIds.length === filteredRequests.length && filteredRequests.length > 0 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
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

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input 
                type="text" 
                placeholder="Search by client, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-gray-500 outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
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

          {/* List Items */}
          <div className="flex-grow overflow-y-auto custom-scrollbar p-2 space-y-1.5 pb-24 md:pb-6">
            <AnimatePresence mode="popLayout">
              {filteredRequests.length === 0 ? (
                <div className="py-20 text-center px-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-3 text-gray-600">
                    <MessageSquare size={22} />
                  </div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">No Inquiries Found</p>
                  <p className="text-[11px] text-gray-600 mt-1">
                    {searchTerm ? "Try adjusting your search criteria" : `Your ${activeTab} folder is currently empty`}
                  </p>
                </div>
              ) : (
                filteredRequests.map((req) => (
                  <motion.div
                    key={req.id}
                    layout
                    onClick={() => handleSelectRequest(req.id)}
                    className={`group relative w-full text-left p-3.5 rounded-2xl transition-all border flex items-center gap-3.5 cursor-pointer ${
                      selectedRequestId === req.id 
                        ? 'bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(14,165,233,0.1)]' 
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-white/10'
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

                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                      selectedRequestId === req.id ? 'bg-primary text-black shadow-md shadow-primary/30' : 'bg-white/10 text-gray-300'
                    }`}>
                      {req.name ? req.name[0].toUpperCase() : '?'}
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-bold text-xs truncate text-white">{req.name || 'Anonymous Client'}</span>
                        <span className="text-[9px] font-mono text-gray-500 uppercase ml-2 shrink-0">
                          {(() => {
                            try { return new Date(req.createdAt.toDate?.() || req.id).toLocaleDateString([], {month: 'short', day: 'numeric'}); } catch(e) { return '';}
                          })()}
                        </span>
                      </div>
                      <p className="text-[11px] text-primary/90 truncate font-medium">{req.email}</p>
                      <p className="text-[10px] text-gray-400 truncate mt-0.5 line-clamp-1">{req.message}</p>
                    </div>

                    {selectedRequestId === req.id && (
                      <ChevronRight size={14} className="text-primary hidden md:block shrink-0" />
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Bulk Action Floating Toolbar */}
          <AnimatePresence>
            {selectedIds.length > 0 && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="absolute bottom-4 left-4 right-4 bg-primary text-black p-3 rounded-2xl flex items-center justify-between shadow-2xl z-[100] border border-primary/40"
              >
                <div className="flex items-center gap-2.5">
                  <button 
                    onClick={() => setSelectedIds([])} 
                    className="hover:scale-110 transition-all p-1 cursor-pointer"
                    title="Deselect All"
                  >
                    <XCircle size={18} />
                  </button>
                  <span className="font-black text-xs uppercase tracking-wider">{selectedIds.length} Selected</span>
                </div>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => bulkToggleReadStatus(activeTab === 'inbox')}
                    className="p-2 bg-black/10 rounded-xl hover:bg-black/20 transition-all cursor-pointer font-bold"
                    title={activeTab === 'inbox' ? 'Mark Read / Archive' : 'Mark Unread / Restore'}
                  >
                    {activeTab === 'inbox' ? <CheckCircle size={16} /> : <Inbox size={16} />}
                  </button>
                  <button 
                    onClick={bulkDelete}
                    className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all cursor-pointer"
                    title="Delete Selected"
                  >
                    <Trash2 size={16} />
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
      <main className={`flex-grow flex flex-col bg-neutral-950 h-full overflow-hidden ${
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
            {/* Conversation Header */}
            <header className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between backdrop-blur-md bg-black/30 shrink-0">
              <div className="flex items-center gap-3 md:gap-4 min-w-0">
                <button 
                  onClick={() => setShowMobileDetail(false)}
                  className="md:hidden p-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white flex items-center gap-1 text-xs font-bold cursor-pointer"
                  title="Back to list"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-lg shrink-0">
                  {selectedRequest.name ? selectedRequest.name[0].toUpperCase() : '?'}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-lg font-bold truncate text-white">
                    {selectedRequest.name || 'Anonymous Client'}
                  </h3>
                  <p className="text-[10px] md:text-xs text-primary flex items-center gap-1.5 font-mono truncate">
                    <Mail size={12} className="shrink-0" /> {selectedRequest.email}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => toggleReadStatus(selectedRequest.id, selectedRequest.read)} 
                  title={selectedRequest.read ? 'Move back to Inbox' : 'Mark as Read & Archive'}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                    selectedRequest.read 
                      ? 'bg-white/5 border border-white/10 text-gray-300 hover:text-primary hover:border-primary/40' 
                      : 'bg-primary text-black font-bold shadow-lg shadow-primary/20 hover:scale-105'
                  }`}
                >
                  <CheckCircle size={16} />
                  <span className="hidden sm:inline">{selectedRequest.read ? 'Unread' : 'Mark Read'}</span>
                </button>
                <button 
                  onClick={() => deleteRequest(selectedRequest.id)}
                  className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                  title="Delete Inquiry"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </header>

            {/* Conversation Detail View */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-4 md:p-8 space-y-6">
              <div className="max-w-4xl mx-auto w-full">
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 md:p-8 backdrop-blur-xl shadow-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-white/5">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-1.5">
                      <Sparkles size={12} /> Received Inquiry
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
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1">Message Content</label>
                      <p className="text-sm md:text-base text-gray-100 leading-relaxed whitespace-pre-wrap selection:bg-primary selection:text-black">
                        {selectedRequest.message}
                      </p>
                    </div>

                    {/* Direct email reply shortcut */}
                    <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-gray-400">
                        Client Email: <span className="text-white font-mono">{selectedRequest.email}</span>
                      </div>
                      <a
                        href={`mailto:${selectedRequest.email}?subject=${encodeURIComponent('Inquiry follow-up from Suleman Zaheer')}`}
                        className="px-4 py-2 rounded-xl bg-primary text-black font-bold text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                      >
                        <Send size={14} /> Send Email Reply
                      </a>
                    </div>
                  </div>
                </div>

                {/* Previous communications if any */}
                {selectedRequest.replies && selectedRequest.replies.length > 0 && (
                  <div className="space-y-4 pt-8">
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-center">Previous Communications</h4>
                    {selectedRequest.replies.map((reply, idx) => (
                      <div key={idx} className={`flex ${reply.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-xs ${
                          reply.sender === 'Admin' 
                            ? 'bg-white/5 border border-white/10 text-gray-300' 
                            : 'bg-primary/10 border border-primary/20 text-primary'
                        }`}>
                          <p className="font-medium leading-relaxed">{reply.text}</p>
                          <span className="text-[9px] mt-2 block opacity-50 font-mono">{new Date(reply.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Empty placeholder when no message is selected */
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-5 text-gray-600 shadow-xl">
              <Inbox size={42} className="text-primary/40" />
            </div>
            <h3 className="text-lg md:text-xl font-display font-bold text-white">Select an inquiry</h3>
            <p className="text-xs md:text-sm text-gray-400 mt-2 max-w-sm leading-relaxed">
              Choose a message from the list to view its complete content, timeline, and respond to the client.
            </p>
          </div>
        )}
      </main>

      {/* ──────────────────────────────────────────────────────────
          MOBILE BOTTOM QUICK-BAR
          Ultra-accessible thumb navigation on mobile phones
          ────────────────────────────────────────────────────────── */}
      <nav className="md:hidden shrink-0 bg-neutral-950/95 backdrop-blur-2xl border-t border-white/10 px-3 py-2 flex items-center justify-around z-30">
        <button
          onClick={() => { setActiveTab('dashboard'); setShowMobileDetail(false); }}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl cursor-pointer ${
            activeTab === 'dashboard' ? 'text-primary' : 'text-gray-400'
          }`}
        >
          <Activity size={18} />
          <span className="text-[9px] font-bold">Analytics</span>
        </button>

        <button
          onClick={() => { setActiveTab('inbox'); setShowMobileDetail(false); }}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl relative cursor-pointer ${
            activeTab === 'inbox' ? 'text-primary' : 'text-gray-400'
          }`}
        >
          <Inbox size={18} />
          <span className="text-[9px] font-bold">Inbox</span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => { setActiveTab('gallery'); setShowMobileDetail(false); }}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl cursor-pointer ${
            activeTab === 'gallery' ? 'text-primary' : 'text-gray-400'
          }`}
        >
          <ImagePlus size={18} />
          <span className="text-[9px] font-bold">Gallery</span>
        </button>

        <button
          onClick={() => { setActiveTab('blog'); setShowMobileDetail(false); }}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl cursor-pointer ${
            activeTab === 'blog' ? 'text-primary' : 'text-gray-400'
          }`}
        >
          <BookOpen size={18} />
          <span className="text-[9px] font-bold">Blog</span>
        </button>

        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="flex flex-col items-center gap-1 p-1.5 rounded-xl text-gray-400 hover:text-white cursor-pointer"
        >
          <Menu size={18} />
          <span className="text-[9px] font-bold">More</span>
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
