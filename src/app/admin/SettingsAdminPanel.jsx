"use client";
import React, { useState, useEffect } from 'react';
import { db, auth } from '@/firebase';
import { collection, doc, getDoc, setDoc, addDoc, deleteDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Save, Key, Shield, Zap, Plus, Trash2,
  Eye, EyeOff, Copy, AlertTriangle, RefreshCw,
  Check, X, Activity, Star
} from 'lucide-react';

// ── Provider Detection ──────────────────────────────────────────
function detectProvider(keyValue = '') {
  if (keyValue.startsWith('AIzaSy'))        return { name: 'Gemini',      color: 'blue',    badge: '✦ Gemini' };
  if (keyValue.startsWith('sk-or-v1'))      return { name: 'OpenRouter',  color: 'purple',  badge: '⬡ OpenRouter' };
  if (keyValue.startsWith('gsk_'))          return { name: 'Groq',        color: 'orange',  badge: '⚡ Groq' };
  if (keyValue.startsWith('sk-ant-'))       return { name: 'Anthropic',   color: 'yellow',  badge: '◆ Anthropic' };
  if (keyValue.startsWith('sk-'))           return { name: 'OpenAI',      color: 'green',   badge: '◉ OpenAI' };
  return { name: 'Unknown', color: 'gray', badge: '? Unknown' };
}

const providerColorMap = {
  blue:   { bg: 'bg-blue-500/15',   border: 'border-blue-500/30',   text: 'text-blue-300' },
  purple: { bg: 'bg-purple-500/15', border: 'border-purple-500/30', text: 'text-purple-300' },
  orange: { bg: 'bg-orange-500/15', border: 'border-orange-500/30', text: 'text-orange-300' },
  yellow: { bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', text: 'text-yellow-300' },
  green:  { bg: 'bg-emerald-500/15',border: 'border-emerald-500/30',text: 'text-emerald-300' },
  gray:   { bg: 'bg-white/5',       border: 'border-white/10',      text: 'text-gray-400' },
};

// ── Provider-aware test ─────────────────────────────────────────
async function testApiKey(keyValue) {
  const provider = detectProvider(keyValue);

  if (provider.name === 'Gemini') {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${keyValue}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: 'Hi' }] }] }) }
    );
    return res.ok;
  }

  if (provider.name === 'OpenRouter') {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { 'Authorization': `Bearer ${keyValue}` }
    });
    return res.ok;
  }

  if (provider.name === 'Groq') {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { 'Authorization': `Bearer ${keyValue}` }
    });
    return res.ok;
  }

  if (provider.name === 'OpenAI') {
    const res = await fetch('https://api.openai.com/v1/models', {
      headers: { 'Authorization': `Bearer ${keyValue}` }
    });
    return res.ok;
  }

  if (provider.name === 'Anthropic') {
    const res = await fetch('https://api.anthropic.com/v1/models', {
      headers: { 'x-api-key': keyValue, 'anthropic-version': '2023-06-01' }
    });
    return res.ok;
  }

  // Unknown — just check if it looks like a real key (non-empty, long enough)
  return keyValue.length > 20;
}

// ── Toast Notification ─────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -32, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -32, scale: 0.95 }}
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-2xl border backdrop-blur-xl
            ${toast.type === 'error'
              ? 'bg-red-500/20 border-red-500/40 text-red-300'
              : toast.type === 'warn'
              ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300'
              : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'}`}
        >
          {toast.type === 'error' ? <X size={16} /> : toast.type === 'warn' ? <AlertTriangle size={16} /> : <Check size={16} />}
          {toast.msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── API Key Card ────────────────────────────────────────────────
function ApiKeyCard({ apiKey, onDelete, onSetActive, onTest, isActive, testResult }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const maskedKey = apiKey.value
    ? apiKey.value.slice(0, 8) + '•'.repeat(Math.max(0, apiKey.value.length - 12)) + apiKey.value.slice(-4)
    : '••••••••••••••••';

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className={`relative rounded-2xl border p-5 transition-all duration-300 group ${
        isActive
          ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/10'
          : 'bg-white/[0.03] border-white/10 hover:border-white/20'
      }`}
    >
      {/* Active badge */}
      {isActive && (
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
          <Activity size={9} /> Active
        </div>
      )}

      <div className="flex items-start gap-3 mb-4 pr-16">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-primary/10 text-primary'}`}>
          <Key size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white font-bold text-sm truncate">{apiKey.name || 'Unnamed Key'}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {(() => {
              const p = detectProvider(apiKey.value || '');
              const c = providerColorMap[p.color];
              return (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${c.bg} ${c.border} ${c.text}`}>
                  {p.badge}
                </span>
              );
            })()}
            <p className="text-gray-600 text-[10px]">
              Added {apiKey.createdAt?.toDate ? new Date(apiKey.createdAt.toDate()).toLocaleDateString() : 'recently'}
            </p>
          </div>
        </div>
      </div>

      {/* Key display */}
      <div className="flex items-center gap-2 bg-black/40 rounded-xl px-3 py-2.5 mb-4 border border-white/5 font-mono text-xs">
        <span className="flex-1 text-gray-400 truncate">
          {revealed ? apiKey.value : maskedKey}
        </span>
        <button onClick={() => setRevealed(v => !v)} className="text-gray-600 hover:text-gray-300 transition-colors flex-shrink-0">
          {revealed ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>
        <button onClick={handleCopy} className="text-gray-600 hover:text-emerald-400 transition-colors flex-shrink-0">
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
        </button>
      </div>

      {/* Test result */}
      {testResult && (
        <div className={`text-xs px-3 py-2 rounded-lg mb-3 font-medium flex items-center gap-2 ${
          testResult === 'ok' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
          testResult === 'testing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
          'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {testResult === 'testing' ? <RefreshCw size={12} className="animate-spin" /> :
           testResult === 'ok' ? <Check size={12} /> : <X size={12} />}
          {testResult === 'testing' ? 'Testing connection…' :
           testResult === 'ok' ? 'API key is valid & working' : 'Invalid key or quota exceeded'}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onTest(apiKey)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 text-gray-400 transition-all"
        >
          <Activity size={12} /> Test
        </button>

        {!isActive && (
          <button
            onClick={() => onSetActive(apiKey)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 text-gray-400 transition-all"
          >
            <Star size={12} /> Set Active
          </button>
        )}

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 hover:bg-red-500/20 hover:text-red-300 text-gray-400 transition-all ml-auto"
          >
            <Trash2 size={12} />
          </button>
        ) : (
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-xs text-red-400 font-medium">Delete?</span>
            <button onClick={() => onDelete(apiKey.id)} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-500/20 text-red-300 hover:bg-red-500/40 transition-all">Yes</button>
            <button onClick={() => setConfirming(false)} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/5 text-gray-400 hover:bg-white/10 transition-all">No</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Add Key Form ────────────────────────────────────────────────
function AddKeyForm({ onAdd, onCancel }) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [setActive, setSetActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !value.trim()) return;
    setSaving(true);
    await onAdd({ name: name.trim(), value: value.trim(), setActive });
    setSaving(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-4"
    >
      <h4 className="text-sm font-bold text-white flex items-center gap-2">
        <Plus size={14} className="text-primary" /> Add New API Key
      </h4>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Shield size={11} /> Key Name / Label
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g., Primary Gemini Key, Backup Key"
            required
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 text-white placeholder-gray-600"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Key size={11} /> Gemini API Key
          </label>
          <input
            type="password"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="AIzaSy…"
            required
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 text-white font-mono placeholder-gray-600"
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer select-none">
          <input type="checkbox" checked={setActive} onChange={e => setSetActive(e.target.checked)} className="accent-primary" />
          Set as active key immediately
        </label>
      </div>
      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={saving || !name.trim() || !value.trim()}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/80 transition-all disabled:opacity-50 text-sm"
        >
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          Save Key
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 bg-white/5 text-gray-400 font-bold rounded-xl hover:bg-white/10 transition-all text-sm">
          Cancel
        </button>
      </div>
    </motion.form>
  );
}

// ── Main Panel ─────────────────────────────────────────────────
export default function SettingsAdminPanel() {
  const [apiKeys, setApiKeys] = useState([]);
  const [activeKeyId, setActiveKeyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [authed, setAuthed] = useState(false);
  let toastId = 0;

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type, id: ++toastId });
    setTimeout(() => setToast(null), 3500);
  };

  // Confirm auth before doing any Firestore ops
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthed(!!user);
    });
    return () => unsub();
  }, []);

  // Load active key ID from settings doc
  useEffect(() => {
    if (!authed) return;
    const loadMeta = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'ai_config'));
        if (snap.exists()) setActiveKeyId(snap.data().activeKeyId || null);
      } catch (e) {
        console.error('settings fetch:', e);
      }
    };
    loadMeta();
  }, [authed]);

  // Live listener for api_keys sub-collection
  useEffect(() => {
    if (!authed) return;
    const unsub = onSnapshot(
      collection(db, 'settings', 'ai_config', 'api_keys'),
      (snap) => {
        const keys = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        keys.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setApiKeys(keys);
        setLoading(false);
      },
      (err) => {
        console.error('api_keys listener:', err);
        showToast('Permission error: ' + err.message, 'error');
        setLoading(false);
      }
    );
    return () => unsub();
  }, [authed]);

  const handleAddKey = async ({ name, value, setActive }) => {
    try {
      // Ensure parent settings doc exists
      await setDoc(doc(db, 'settings', 'ai_config'), {
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Add key to sub-collection
      const newRef = await addDoc(
        collection(db, 'settings', 'ai_config', 'api_keys'),
        { name, value, createdAt: serverTimestamp() }
      );

      if (setActive) {
        await setDoc(doc(db, 'settings', 'ai_config'), {
          activeKeyId: newRef.id,
          geminiApiKey: value,
          geminiApiName: name,
          updatedAt: serverTimestamp()
        }, { merge: true });
        setActiveKeyId(newRef.id);
      }

      setShowAddForm(false);
      showToast(`Key "${name}" added${setActive ? ' and set as active' : ''}!`);
    } catch (err) {
      showToast('Error adding key: ' + err.message, 'error');
    }
  };

  const handleDeleteKey = async (keyId) => {
    try {
      await deleteDoc(doc(db, 'settings', 'ai_config', 'api_keys', keyId));
      if (activeKeyId === keyId) {
        await setDoc(doc(db, 'settings', 'ai_config'), {
          activeKeyId: null, geminiApiKey: '', geminiApiName: '',
          updatedAt: serverTimestamp()
        }, { merge: true });
        setActiveKeyId(null);
      }
      showToast('Key deleted.');
    } catch (err) {
      showToast('Error deleting key: ' + err.message, 'error');
    }
  };

  const handleSetActive = async (apiKey) => {
    try {
      await setDoc(doc(db, 'settings', 'ai_config'), {
        activeKeyId: apiKey.id,
        geminiApiKey: apiKey.value,
        geminiApiName: apiKey.name,
        updatedAt: serverTimestamp()
      }, { merge: true });
      setActiveKeyId(apiKey.id);
      showToast(`"${apiKey.name}" is now the active key!`);
    } catch (err) {
      showToast('Error setting active key: ' + err.message, 'error');
    }
  };

  const handleTestKey = async (apiKey) => {
    const provider = detectProvider(apiKey.value || '');
    setTestResults(r => ({ ...r, [apiKey.id]: 'testing' }));
    try {
      const ok = await testApiKey(apiKey.value);
      if (ok) {
        setTestResults(r => ({ ...r, [apiKey.id]: 'ok' }));
        showToast(`"${apiKey.name}" (${provider.name}) is valid ✓`);
      } else {
        setTestResults(r => ({ ...r, [apiKey.id]: 'fail' }));
        showToast(`"${apiKey.name}" failed — wrong key or quota exceeded`, 'error');
      }
    } catch (e) {
      setTestResults(r => ({ ...r, [apiKey.id]: 'fail' }));
      showToast('Network error — check your internet connection', 'error');
    }
    setTimeout(() => setTestResults(r => { const n = { ...r }; delete n[apiKey.id]; return n; }), 6000);
  };

  const activeKey = apiKeys.find(k => k.id === activeKeyId);

  return (
    <div className="flex-grow flex flex-col h-full overflow-y-auto relative p-4 sm:p-6 space-y-6">
      <Toast toast={toast} />

      {/* Header */}
      <header className="flex items-center gap-4 border-b border-white/5 pb-6">
        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
          <Settings size={24} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">System Settings</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">Manage global config and AI API keys</p>
        </div>
      </header>

      {/* Active Key Banner */}
      {activeKey && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium">
          <Zap size={16} className="flex-shrink-0" />
          <span>Active AI Key: <strong className="text-emerald-200">{activeKey.name}</strong></span>
          <span className="ml-auto text-emerald-500 text-xs font-mono">{activeKey.value?.slice(0, 8)}…</span>
        </div>
      )}

      {!authed && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm">
          <AlertTriangle size={16} /> Not authenticated — please log in again.
        </div>
      )}

      {/* API Keys Section */}
      <div className="max-w-2xl w-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Key size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">API Keys</h3>
              <p className="text-xs text-gray-500">{apiKeys.length} key{apiKeys.length !== 1 ? 's' : ''} stored</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(v => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary/80 transition-all"
          >
            {showAddForm ? <X size={14} /> : <Plus size={14} />}
            {showAddForm ? 'Cancel' : 'Add Key'}
          </button>
        </div>

        <AnimatePresence>
          {showAddForm && (
            <AddKeyForm
              key="addform"
              onAdd={handleAddKey}
              onCancel={() => setShowAddForm(false)}
            />
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : apiKeys.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <Key size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No API keys yet</p>
            <p className="text-xs mt-1">Click "Add Key" to add your first Gemini API key</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {apiKeys.map(k => (
                <ApiKeyCard
                  key={k.id}
                  apiKey={k}
                  isActive={k.id === activeKeyId}
                  testResult={testResults[k.id]}
                  onDelete={handleDeleteKey}
                  onSetActive={handleSetActive}
                  onTest={handleTestKey}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        <p className="text-[11px] text-gray-600 flex items-center gap-1.5">
          <Shield size={11} /> Keys are encrypted in Firestore and used exclusively in the Admin Panel.
        </p>
      </div>
    </div>
  );
}
