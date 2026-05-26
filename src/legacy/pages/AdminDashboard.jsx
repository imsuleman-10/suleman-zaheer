import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc, arrayUnion, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/suleman-zaheer-logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Clock, CheckCircle, Trash2, LogOut, LayoutDashboard, MessageSquare, Send, User, ShieldCheck, Inbox, Archive, Filter, ChevronRight, Search, CheckSquare, Square, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' or 'archived'
  const [replyTexts, setReplyTexts] = useState({});
  const [isSending, setIsSending] = useState({});
  const [sendError, setSendError] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [firestoreError, setFirestoreError] = useState(false);
  
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      const isLoginPage = window.location.pathname === '/login';
      const isAdminPage = window.location.pathname === '/admin';

      if (!currentUser) {
        if (isAdminPage) navigate('/login');
      } else {
        setUser(currentUser);
        if (isLoginPage) navigate('/admin');
      }
      setLoading(false);
    });
    return () => unsubAuth();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    // Subscribe to Firestore for real-time cloud data
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

  // Scroll to bottom on new reply
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedRequestId, requests]);

  const toggleReadStatus = async (id, currentStatus) => {
    const docRef = doc(db, "contactRequests", id);
    await updateDoc(docRef, { read: !currentStatus });
  };

  const deleteRequest = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      if (selectedRequestId === id) setSelectedRequestId(null);
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
      if (selectedIds.includes(selectedRequestId)) setSelectedRequestId(null);
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

  const handleSendReply = async (requestId) => {
    const text = replyTexts[requestId];
    if (!text || !text.trim()) return;

    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    setIsSending({ ...isSending, [requestId]: true });
    setSendError({ ...sendError, [requestId]: null });

    const newReply = {
      sender: 'Admin',
      text: text,
      timestamp: new Date().toISOString()
    };

    // Send email via EmailJS (browser-based, no backend needed)
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && serviceId !== 'YOUR_EMAILJS_SERVICE_ID') {
        await emailjs.send(serviceId, templateId, {
          from_name: 'Suleman Zaheer',
          from_email: 'samstacktechs@gmail.com',
          to_name: req.name,
          to_email: req.email,
          subject: `Re: Your inquiry, ${req.name}`,
          message: text,
        }, publicKey);
      } else {
        console.warn("EmailJS not configured. Skipping email dispatch.");
      }
    } catch (err) {
      setSendError({ ...sendError, [requestId]: "Email failed to dispatch." });
    }

    // Save reply to Firestore
    try {
      await updateDoc(doc(db, "contactRequests", requestId), { replies: arrayUnion(newReply) });
    } catch (err) {
      setSendError({ ...sendError, [requestId]: "Failed to save message." });
    }

    setIsSending({ ...isSending, [requestId]: false });
    if (!sendError[requestId]) {
      setReplyTexts({ ...replyTexts, [requestId]: '' });
      setSendError({ ...sendError, [requestId]: "Message sent successfully!" });
      setTimeout(() => setSendError(prev => ({ ...prev, [requestId]: null })), 3000);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('isAdminLoggedIn');
    navigate('/login');
  };

  const filteredRequests = requests.filter(req => {
    const matchesTab = activeTab === 'inbox' ? !req.read : req.read;
    const matchesSearch = req.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const selectedRequest = requests.find(r => r.id === selectedRequestId);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="h-screen bg-neutral-950 text-white font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* Auth Warning Overlay */}
      {firestoreError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-red-500/10 border border-red-500/20 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <ShieldCheck size={16} className="text-red-500" />
          <p className="text-[10px] font-black uppercase tracking-widest text-red-500">
            Permission Denied: Ensure you are logged in with a valid Admin account in Firebase.
          </p>
        </div>
      )}
      
      {/* 1. Left Sidebar: Navigation & Controls */}
      <aside className="w-full md:w-20 bg-black/60 border-b md:border-b-0 md:border-r border-white/5 flex flex-row md:flex-col items-center py-4 md:py-8 backdrop-blur-3xl shrink-0 z-50">
        <div className="px-4 md:px-0 md:mb-12">
          <Link to="/" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shadow-lg shadow-black/50 hover:scale-105 transition-all overflow-hidden border border-white/10 p-1 block relative group" title="Back to Main Page">
            <img src={logo} alt="Home" className="w-full h-full object-contain filter group-hover:brightness-125 transition-all cursor-pointer" />
          </Link>
        </div>
        
        <nav className="flex flex-row md:flex-col gap-4 flex-grow px-4 md:px-0">
          <button 
            onClick={() => setActiveTab('inbox')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'inbox' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            title="Inbox"
          >
            <Inbox size={22} />
          </button>
          <button 
            onClick={() => setActiveTab('archived')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'archived' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            title="Archives"
          >
            <Archive size={22} />
          </button>
        </nav>

        <div className="ml-auto md:ml-0 md:mt-auto px-4 md:px-0">
          <button onClick={handleLogout} className="p-3 rounded-2xl text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold">
            <LogOut size={22} />
          </button>
        </div>
      </aside>

      {/* 2. Middle Pane: Client List (Scrollable) */}
      <section className="w-full md:w-96 bg-black/20 border-r border-white/5 flex flex-col h-1/2 md:h-full overflow-hidden shrink-0 relative">
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
                  onClick={() => setSelectedRequestId(req.id)}
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
                  title={activeTab === 'inbox' ? 'Archive Selected' : 'Restore Selected'}
                >
                  <Inbox size={20} />
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

      {/* 3. Right Pane: Selected Conversation (Scrollable) */}
      <main className="flex-grow flex flex-col bg-neutral-950 h-1/2 md:h-full overflow-hidden">
        {selectedRequest ? (
          <>
            {/* Header */}
            <header className="p-6 border-b border-white/5 flex items-center justify-between backdrop-blur-md bg-black/10 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl">
                  {selectedRequest.name ? selectedRequest.name[0].toUpperCase() : '?'}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{selectedRequest.name || 'Anonymous client'}</h3>
                  <p className="text-[10px] text-primary flex items-center gap-1 font-black uppercase"><Mail size={10} /> {selectedRequest.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleReadStatus(selectedRequest.id, selectedRequest.read)} 
                  title={selectedRequest.read ? 'Move to Inbox' : 'Archive'}
                  className={`p-3 rounded-xl transition-all ${selectedRequest.read ? 'text-gray-500 hover:text-primary' : 'bg-primary text-black shadow-lg shadow-primary/20'}`}
                >
                  <CheckCircle size={18} />
                </button>
                <button 
                  onClick={() => deleteRequest(selectedRequest.id)}
                  className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </header>

            {/* Scrollable Conversation Thread */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-8 space-y-6">
              {/* Original Message */}
              <div className="flex justify-start">
                <div className="max-w-[80%] bg-white/5 border border-white/10 rounded-3xl p-6">
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-widest block mb-2">Original Inquiry</span>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedRequest.message}</p>
                </div>
              </div>

              {/* Replies */}
              {(selectedRequest.replies || []).map((reply, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex ${reply.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-5 rounded-3xl text-sm ${reply.sender === 'Admin' ? 'bg-primary text-black ml-12' : 'bg-white/5 border border-white/10 text-gray-300 mr-12'}`}>
                    <div className={`flex items-center gap-2 mb-1 text-[9px] font-black uppercase tracking-widest ${reply.sender === 'Admin' ? 'text-black/60' : 'text-gray-500'}`}>
                      {reply.sender === 'Admin' ? <ShieldCheck size={10} /> : <User size={10} />}
                      {reply.sender} • {(() => {
                        try { return new Date(reply.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); } catch (e) { return 'Now'; }
                      })()}
                    </div>
                    <p className="font-medium">{reply.text}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Fixed Reply Bar */}
            <div className="p-6 bg-black/20 border-t border-white/5 shrink-0">
               <div className="max-w-4xl mx-auto flex flex-col gap-2">
                  <div className="flex gap-3">
                    <input 
                      type="text"
                      autoFocus
                      disabled={isSending[selectedRequest.id]}
                      value={replyTexts[selectedRequest.id] || ''}
                      onChange={(e) => setReplyTexts({...replyTexts, [selectedRequest.id]: e.target.value})}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendReply(selectedRequest.id)}
                      placeholder={`Reply to ${selectedRequest.name}...`}
                      className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all text-sm disabled:opacity-50"
                    />
                    <button 
                      onClick={() => handleSendReply(selectedRequest.id)}
                      disabled={isSending[selectedRequest.id] || !replyTexts[selectedRequest.id]?.trim()}
                      className="px-8 bg-primary text-black rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-30"
                    >
                      {isSending[selectedRequest.id] ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Send size={20} />}
                    </button>
                  </div>
                  {sendError[selectedRequest.id] && (
                    <p className={`text-[10px] ml-4 font-black uppercase tracking-widest ${sendError[selectedRequest.id].includes('success') ? 'text-green-500' : 'text-amber-500'}`}>
                      {sendError[selectedRequest.id]}
                    </p>
                  )}
               </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center opacity-30">
            <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
              <Mail size={48} />
            </div>
            <h3 className="text-xl font-display font-bold">Select a conversation</h3>
            <p className="text-sm mt-2">Click on a client to start chatting</p>
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(14, 165, 233, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(14, 165, 233, 0.3); }
      `}</style>
    </div>
  );
};

export default AdminDashboard;


