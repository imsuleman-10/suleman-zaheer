"use client";
import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '@/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc, arrayUnion, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Clock, CheckCircle, Trash2, LogOut, LayoutDashboard, MessageSquare, Send, User, ShieldCheck, Inbox, Archive, Filter, ChevronRight, Search, CheckSquare, Square, XCircle, Activity, ImagePlus, BookOpen, Feather, Settings, DatabaseZap } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'inbox', 'archived', 'gallery', 'blog', 'poetry', 'settings'
  const [searchTerm, setSearchTerm] = useState('');
  const [firestoreError, setFirestoreError] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  
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
      // If marking as read, we might want to clear selection on mobile
      if (window.innerWidth < 768) setShowMobileDetail(false);
    }
  };

  const deleteRequest = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
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

  const filteredRequests = requests.filter(req => {
    const matchesTab = activeTab === 'inbox' ? !req.read : req.read;
    const matchesSearch = req.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const selectedRequest = requests.find(r => r.id === selectedRequestId);

  if (loading || !user) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="h-screen bg-neutral-950 text-white font-sans flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Auth Warning Overlay */}
      {firestoreError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-red-500/10 border border-red-500/20 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <ShieldCheck size={16} className="text-red-500" />
          <p className="text-[10px] font-black uppercase tracking-widest text-red-500">
            Permission Denied: Ensure you are logged in with valid Admin credentials.
          </p>
        </div>
      )}
      
      {/* 1. Left Sidebar / Bottom Nav on Mobile */}
      <aside className={`w-full md:w-20 bg-black/90 md:bg-black/60 border-t md:border-t-0 md:border-b-0 md:border-r border-white/5 flex flex-row md:flex-col items-center py-2 md:py-8 backdrop-blur-3xl shrink-0 z-50 order-last md:order-first ${showMobileDetail ? 'hidden md:flex' : 'flex'} overflow-x-auto hide-scrollbar`}>
        <div className="px-2 md:px-0 md:mb-12 shrink-0">
          <Link href="/" className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center shadow-lg shadow-black/50 hover:scale-105 transition-all overflow-hidden border border-white/10 p-1 block relative group" title="Back to Main Page">
            <Image src="/assets/suleman-zaheer-logo.png" alt="Home" fill className="object-contain filter group-hover:brightness-125 transition-all cursor-pointer" />
          </Link>
        </div>
        
        <nav className="flex flex-row md:flex-col gap-1 md:gap-4 flex-grow px-2 md:px-0 items-center md:items-stretch justify-around md:justify-start min-w-max md:min-w-0">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all shrink-0 ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            title="Dashboard Analytics"
          >
            <Activity size={20} className="md:w-[22px] md:h-[22px]" />
          </button>
          <button 
            onClick={() => setActiveTab('inbox')}
            className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all shrink-0 ${activeTab === 'inbox' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            title="Inbox"
          >
            <Inbox size={20} className="md:w-[22px] md:h-[22px]" />
          </button>
          <button 
            onClick={() => setActiveTab('archived')}
            className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all shrink-0 ${activeTab === 'archived' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            title="Archives"
          >
            <Archive size={20} className="md:w-[22px] md:h-[22px]" />
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all shrink-0 ${activeTab === 'gallery' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            title="SEO Gallery"
          >
            <ImagePlus size={20} className="md:w-[22px] md:h-[22px]" />
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all shrink-0 ${activeTab === 'blog' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            title="Blog Management"
          >
            <BookOpen size={20} className="md:w-[22px] md:h-[22px]" />
          </button>
          <button 
            onClick={() => setActiveTab('poetry')}
            className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all shrink-0 ${activeTab === 'poetry' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            title="Poetry Management"
          >
            <Feather size={20} className="md:w-[22px] md:h-[22px]" />
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all shrink-0 mt-0 md:mt-auto ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            title="Settings"
          >
            <Settings size={20} className="md:w-[22px] md:h-[22px]" />
          </button>
          <button 
            onClick={() => setActiveTab('sync')}
            className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all shrink-0 ${activeTab === 'sync' ? 'bg-emerald-400/10 text-emerald-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            title="Content Sync"
          >
            <DatabaseZap size={20} className="md:w-[22px] md:h-[22px]" />
          </button>
        </nav>

        <div className="px-2 md:px-0 md:mt-4 shrink-0">
          <button onClick={handleLogout} className="p-2.5 md:p-3 rounded-xl md:rounded-2xl text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold">
            <LogOut size={20} className="md:w-[22px] md:h-[22px]" />
          </button>
        </div>
      </aside>

      {/* 2. Middle Pane: Client List (Hidden on Dashboard Tab, Gallery, Blog, Poetry, Settings, Sync) */}
      {activeTab !== 'dashboard' && activeTab !== 'gallery' && activeTab !== 'blog' && activeTab !== 'poetry' && activeTab !== 'settings' && activeTab !== 'sync' && (
      <section className={`w-full md:w-96 bg-black/20 border-r border-white/5 flex flex-col h-full overflow-hidden shrink-0 relative ${showMobileDetail ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold flex items-center gap-2">
              Messages
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-black text-gray-400">
                {filteredRequests.length}
              </span>
            </h2>
            <button 
              onClick={toggleSelectAll}
              className={`p-2 rounded-xl transition-all ${selectedIds.length === filteredRequests.length && filteredRequests.length > 0 ? 'bg-primary/20 text-primary' : 'text-gray-500 hover:bg-white/5'}`}
              title="Select All"
            >
              {selectedIds.length === filteredRequests.length && filteredRequests.length > 0 ? <CheckSquare size={18} /> : <Square size={18} />}
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              type="text" 
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar p-2 space-y-1 pb-24">
          <AnimatePresence mode="popLayout">
            {filteredRequests.length === 0 ? (
               <div className="py-20 text-center px-4">
                 <MessageSquare className="mx-auto text-white/5 mb-4" size={32} />
                 <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">No messages here</p>
               </div>
            ) : (
              filteredRequests.map((req) => (
                <motion.div
                  key={req.id}
                  layout
                  onClick={() => handleSelectRequest(req.id)}
                  className={`group relative w-full text-left p-4 rounded-2xl transition-all border flex items-center gap-4 cursor-pointer ${selectedRequestId === req.id ? 'bg-primary/10 border-primary/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                >
                  <button 
                    onClick={(e) => toggleSelect(e, req.id)}
                    className={`shrink-0 transition-all ${selectedIds.includes(req.id) ? 'text-primary' : 'text-gray-600 opacity-0 group-hover:opacity-100'}`}
                  >
                    {selectedIds.includes(req.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                  </button>

                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${selectedRequestId === req.id ? 'bg-primary text-black' : 'bg-white/10 text-gray-400'}`}>
                    {req.name ? req.name[0].toUpperCase() : '?'}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <span className="font-bold text-sm truncate">{req.name || 'Anonymous'}</span>
                      <span className="text-[8px] font-black text-gray-600 uppercase">
                        {(() => {
                          try { return new Date(req.createdAt.toDate?.() || req.id).toLocaleDateString([], {month: 'short', day: 'numeric'}); } catch(e) { return '';}
                        })()}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 truncate font-medium">{req.email}</p>
                  </div>
                  {selectedRequestId === req.id && <ChevronRight size={14} className="text-primary hidden md:block" />}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Bulk Action Toolbar */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-4 left-4 right-4 bg-primary text-black p-4 rounded-2xl flex items-center justify-between shadow-2xl z-[100]"
            >
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedIds([])} className="hover:scale-110 transition-all">
                  <XCircle size={20} />
                </button>
                <span className="font-black text-xs uppercase tracking-widest">{selectedIds.length} Selected</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => bulkToggleReadStatus(activeTab === 'inbox')}
                  className="p-2 bg-black/10 rounded-lg hover:bg-black/20 transition-all"
                  title={activeTab === 'inbox' ? 'Mark Read / Archive' : 'Mark Unread / Restore'}
                >
                  {activeTab === 'inbox' ? <CheckCircle size={20} /> : <Inbox size={20} />}
                </button>
                <button 
                  onClick={bulkDelete}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                  title="Delete Selected"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      )}

      {/* 3. Right Pane: Selected Conversation OR Dashboard */}
      <main className={`flex-grow flex flex-col bg-neutral-950 h-full overflow-hidden ${(!showMobileDetail && activeTab !== 'dashboard' && activeTab !== 'gallery' && activeTab !== 'blog' && activeTab !== 'poetry' && activeTab !== 'settings' && activeTab !== 'sync') ? 'hidden md:flex' : 'flex'}`}>
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
            <header className="p-6 border-b border-white/5 flex items-center justify-between backdrop-blur-md bg-black/10 shrink-0">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowMobileDetail(false)}
                  className="md:hidden p-2 bg-white/5 rounded-xl text-gray-400"
                >
                  <Filter className="rotate-90" size={20} />
                </button>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl">
                  {selectedRequest.name ? selectedRequest.name[0].toUpperCase() : '?'}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold truncate max-w-[150px] md:max-w-none">{selectedRequest.name || 'Anonymous client'}</h3>
                  <p className="text-[8px] md:text-[10px] text-primary flex items-center gap-1 font-black uppercase"><Mail size={10} /> {selectedRequest.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleReadStatus(selectedRequest.id, selectedRequest.read)} 
                  title={selectedRequest.read ? 'Move to Inbox' : 'Mark as Read & Archive'}
                  className={`p-2 md:p-3 rounded-xl transition-all ${selectedRequest.read ? 'text-gray-500 hover:text-primary' : 'bg-primary text-black shadow-lg shadow-primary/20'}`}
                >
                  <CheckCircle size={18} />
                </button>
                <button 
                  onClick={() => deleteRequest(selectedRequest.id)}
                  className="p-2 md:p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </header>

            {/* Content View */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6">
              <div className="flex justify-start">
                <div className="w-full md:max-w-[85%] bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">Received Message</span>
                    <span className="text-[10px] font-bold text-gray-500">
                       {(() => {
                          try { return new Date(selectedRequest.createdAt.toDate?.() || selectedRequest.id).toLocaleString(); } catch(e) { return '';}
                        })()}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed whitespace-pre-wrap">{selectedRequest.message}</p>
                </div>
              </div>

              {/* Past Replies Log (Read Only) */}
              {selectedRequest.replies && selectedRequest.replies.length > 0 && (
                <div className="space-y-4 pt-10">
                  <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] text-center">Previous Communications</h4>
                  {selectedRequest.replies.map((reply, idx) => (
                    <div key={idx} className={`flex ${reply.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl text-xs ${reply.sender === 'Admin' ? 'bg-white/5 border border-white/10 text-gray-400' : 'bg-primary/5 border border-primary/10 text-primary'}`}>
                        <p className="font-medium">{reply.text}</p>
                        <span className="text-[8px] mt-2 block opacity-50">{new Date(reply.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center opacity-20 p-10 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
              <Inbox size={48} />
            </div>
            <h3 className="text-lg md:text-xl font-display font-bold">Select a message</h3>
            <p className="text-xs md:text-sm mt-2 max-w-xs">Choose a client from the list to view their detailed inquiry</p>
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.1); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
