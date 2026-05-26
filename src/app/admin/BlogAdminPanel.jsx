"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/firebase';
import {
  collection, query, orderBy, onSnapshot,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp, getDoc
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Pencil, Trash2, Star, StarOff, X, Save, BookOpen, Tag, Clock, Eye, EyeOff, Search, CheckCircle, ImagePlus } from 'lucide-react';

const CATEGORIES = ['Web Development', 'MERN Stack', 'Next.js', 'React', 'Node.js', 'Laravel', 'Career', 'Pakistan Tech', 'Open Source', 'Other'];
const TAGS_SUGGESTIONS = ['Next.js', 'React', 'Node.js', 'MongoDB', 'Express.js', 'Laravel', 'JavaScript', 'TypeScript', 'SEO', 'Performance', 'Firebase', 'Pakistan', 'MERN Stack', 'Full Stack', 'Freelancing'];

function slugify(str) {
  return str.trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\u0600-\u06FF\-]/g, '')
    .toLowerCase()
    .slice(0, 80);
}

const detectProvider = (keyValue = '') => {
  if (keyValue.startsWith('AIzaSy'))        return 'Gemini';
  if (keyValue.startsWith('sk-or-v1'))      return 'OpenRouter';
  if (keyValue.startsWith('gsk_'))          return 'Groq';
  if (keyValue.startsWith('sk-ant-'))       return 'Anthropic';
  if (keyValue.startsWith('sk-'))           return 'OpenAI';
  return 'Unknown';
};

const EMPTY_FORM = {
  title: '', slug: '', excerpt: '', content: '', category: 'Web Development',
  tags: [], tagInput: '', readTime: '5 min read', coverImage: '', featured: false, published: true
};

export default function BlogAdminPanel() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("publishedAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'title' ? { slug: slugify(value) } : {}),
    }));
  };

  const addTag = (tag) => {
    const t = tag.trim();
    if (t && !form.tags.includes(t)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, t], tagInput: '' }));
    }
  };

  const removeTag = (tag) => setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); };

  const openEdit = (blog) => {
    setForm({
      title: blog.title || '', slug: blog.slug || '', excerpt: blog.excerpt || '',
      content: blog.content || '', category: blog.category || 'Web Development',
      tags: blog.tags || [], tagInput: '', readTime: blog.readTime || '5 min read',
      coverImage: blog.coverImage || '', featured: blog.featured || false, published: blog.published !== false,
    });
    setEditId(blog.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) return showToast('Title aur content zaroori hai!', 'error');
    setSaving(true);
    const data = {
      title: form.title.trim(), slug: form.slug || slugify(form.title),
      excerpt: form.excerpt.trim(), content: form.content.trim(),
      category: form.category, tags: form.tags, readTime: form.readTime,
      coverImage: form.coverImage.trim(), featured: form.featured, published: form.published,
      publishedAt: editId ? (blogs.find(b => b.id === editId)?.publishedAt || serverTimestamp()) : serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    try {
      if (editId) { await updateDoc(doc(db, "blogs", editId), data); showToast('Blog update ho gaya!'); }
      else { await addDoc(collection(db, "blogs"), data); showToast('Blog publish ho gaya!'); }
      setShowForm(false);
    } catch (e) { showToast('Error: ' + e.message, 'error'); }
    setSaving(false);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`"${title}" delete karna chahte hain?`)) return;
    await deleteDoc(doc(db, "blogs", id));
    showToast('Blog delete ho gaya!');
  };

  const toggleFeatured = async (blog) => {
    await updateDoc(doc(db, "blogs", blog.id), { featured: !blog.featured });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let imgbbKey = localStorage.getItem('IMGBB_API_KEY');
    if (!imgbbKey) {
      const input = prompt("ImgBB API Key is required for SEO image uploads.\nPlease enter your ImgBB API Key (from api.imgbb.com):");
      if (!input) {
        showToast('Image upload cancelled. API Key is required.', 'error');
        return;
      }
      imgbbKey = input.trim();
      localStorage.setItem('IMGBB_API_KEY', imgbbKey);
    }

    setSaving(true);
    showToast('Uploading image to ImgBB...', 'success');
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message || 'ImgBB Upload Failed');

      setForm(prev => ({ ...prev, coverImage: data.data.url }));
      showToast('Image uploaded successfully!', 'success');
    } catch (err) {
      console.error('Upload failed:', err);
      showToast(err.message || 'Failed to upload image. Check your API key.', 'error');
      if (err.message.includes('Invalid API key')) localStorage.removeItem('IMGBB_API_KEY');
    } finally {
      setSaving(false);
      e.target.value = '';
    }
  };


  const handleAIGenerate = async () => {
    if (!form.content.trim()) return showToast('Please write some content first to get AI suggestions!', 'error');
    setSaving(true);
    showToast('AI is thinking...', 'success');
    try {
      const docRef = doc(db, "settings", "ai_config");
      const snap = await getDoc(docRef);
      const apiKey = snap.exists() ? snap.data().geminiApiKey : null;
      if (!apiKey) throw new Error("API Key not found. Please set an active key in Settings.");

      const provider = detectProvider(apiKey);
      const prompt = `Analyze this blog content and provide SEO-optimized metadata. 
Content: "${form.content.substring(0, 1000)}"
Respond ONLY with a valid JSON object matching this structure:
{
  "title": "A catchy, SEO-friendly title",
  "excerpt": "A short 2-3 line description",
  "category": "One of: Web Development, MERN Stack, Next.js, React, Node.js, Laravel, Career, Pakistan Tech, Open Source, Other",
  "tags": ["tag1", "tag2", "tag3"]
}`;

      let text = '';

      if (provider === 'Gemini') {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });
        if (!res.ok) throw new Error(`Gemini API Error: ${res.statusText}`);
        const data = await res.json();
        text = data.candidates[0].content.parts[0].text;
      } else if (provider === 'OpenRouter' || provider === 'Groq' || provider === 'OpenAI') {
        const endpoint = provider === 'OpenRouter' ? 'https://openrouter.ai/api/v1/chat/completions' :
                         provider === 'Groq' ? 'https://api.groq.com/openai/v1/chat/completions' :
                         'https://api.openai.com/v1/chat/completions';
        
        const fetchModel = provider === 'OpenRouter' ? 'google/gemini-2.0-flash-lite-preview-02-05:free' : 
                           provider === 'Groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini';

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            ...(provider === 'OpenRouter' && { 'HTTP-Referer': 'https://suleman-zaheer.web.app', 'X-Title': 'Portfolio Admin' })
          },
          body: JSON.stringify({
            model: fetchModel,
            messages: [{ role: 'user', content: prompt }]
          })
        });
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        const data = await res.json();
        text = data.choices[0].message.content;
      } else if (provider === 'Anthropic') {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 1000,
            messages: [{ role: 'user', content: prompt }]
          })
        });
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        const data = await res.json();
        text = data.content[0].text;
      } else {
        throw new Error("Unknown API Provider. Please use a valid Gemini, OpenRouter, Groq, OpenAI, or Anthropic key.");
      }

      text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const aiData = JSON.parse(text);

      setForm(prev => ({
        ...prev,
        title: aiData.title || prev.title,
        slug: slugify(aiData.title || prev.title),
        excerpt: aiData.excerpt || prev.excerpt,
        category: CATEGORIES.includes(aiData.category) ? aiData.category : prev.category,
        tags: [...new Set([...prev.tags, ...(aiData.tags || [])])],
      }));
      showToast('AI suggestions applied!', 'success');
    } catch (e) {
      showToast('AI Error: ' + e.message, 'error');
    }
    setSaving(false);
  };

  const filtered = blogs.filter(b => b.title?.toLowerCase().includes(search.toLowerCase()) || b.category?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden relative">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl ${toast.type === 'error' ? 'bg-red-500/20 border border-red-500/30 text-red-300' : 'bg-primary/20 border border-primary/30 text-primary'}`}>
            <CheckCircle size={14} />{toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 pt-8">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-neutral-900 border border-white/10 rounded-3xl w-full max-w-3xl p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-display">{editId ? 'Blog Edit Karo' : 'Naya Blog Likho'}</h3>
                <div className="flex items-center gap-3">
                  <button onClick={handleAIGenerate} disabled={saving} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/20">
                    ✨ Auto Fill with AI
                  </button>
                  <button onClick={() => setShowForm(false)} className="p-2 rounded-xl hover:bg-white/10 text-gray-400"><X size={20} /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 block">Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Blog ka title..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 text-white" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 block">Slug (URL)</label>
                  <input name="slug" value={form.slug} onChange={handleChange} placeholder="blog-ka-url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 font-mono text-primary" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 block">Category</label>
                  <select name="category" value={form.category} onChange={handleChange} className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 text-white">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 block">Excerpt (Short Description)</label>
                  <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} placeholder="2-3 lines ka short description..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 text-white resize-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 block">Content * (Paragraphs mein likhein, blank line se alag karein)</label>
                  <textarea name="content" value={form.content} onChange={handleChange} rows={10} placeholder="Pehla paragraph...&#10;&#10;Doosra paragraph..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 text-white resize-none font-mono leading-relaxed" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 block">Read Time</label>
                  <input name="readTime" value={form.readTime} onChange={handleChange} placeholder="5 min read" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 text-white" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 block">Cover Image URL (Optional)</label>
                  <div className="flex gap-2">
                    <input name="coverImage" value={form.coverImage} onChange={handleChange} placeholder="https://..." className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 text-white" />
                    <label className="px-4 py-3 bg-primary/10 border border-primary/20 text-primary rounded-xl cursor-pointer hover:bg-primary/20 transition-all flex items-center justify-center" title="Upload Image">
                      <ImagePlus size={18} />
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={saving} />
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.tags.map(t => (
                      <span key={t} className="flex items-center gap-1 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs rounded-full">
                        {t}<button type="button" onClick={() => removeTag(t)} className="hover:text-white"><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={form.tagInput} onChange={e => setForm(p => ({ ...p, tagInput: e.target.value }))}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(form.tagInput); } }}
                      placeholder="Tag likho aur Enter dabao..." className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 text-white" />
                    <button type="button" onClick={() => addTag(form.tagInput)} className="px-4 py-2.5 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-xl hover:bg-primary/20 transition-all">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {TAGS_SUGGESTIONS.filter(t => !form.tags.includes(t)).slice(0, 8).map(t => (
                      <button key={t} type="button" onClick={() => addTag(t)} className="px-2.5 py-1 bg-white/5 border border-white/10 text-gray-500 text-[10px] rounded-full hover:border-primary/30 hover:text-primary transition-all">{t}</button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="hidden" />
                    <div onClick={() => setForm(p => ({ ...p, featured: !p.featured }))} className={`w-10 h-5 rounded-full transition-all ${form.featured ? 'bg-primary' : 'bg-white/10'} flex items-center px-0.5`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-sm text-gray-400">Featured Blog</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div onClick={() => setForm(p => ({ ...p, published: !p.published }))} className={`w-10 h-5 rounded-full transition-all ${form.published ? 'bg-green-500' : 'bg-white/10'} flex items-center px-0.5`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-sm text-gray-400">Published</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={saving}
                  className="flex-grow flex items-center justify-center gap-2 bg-primary text-black font-bold py-3 rounded-2xl hover:bg-primary/90 transition-all disabled:opacity-50">
                  {saving ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Save size={18} />}
                  {editId ? 'Update Karo' : 'Publish Karo'}
                </button>
                <button onClick={() => setShowForm(false)} className="px-6 py-3 rounded-2xl border border-white/10 text-gray-400 hover:bg-white/5 transition-all">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-6">
        <header className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold flex items-center gap-3">
              <BookOpen size={24} className="text-primary" /> Blog Manager
            </h2>
            <p className="text-gray-400 text-sm mt-1">{blogs.length} blogs published</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 bg-primary text-black font-bold px-5 py-2.5 rounded-2xl hover:bg-primary/90 transition-all hover:scale-105">
            <PlusCircle size={18} /> New Blog
          </button>
        </header>

        <div className="relative">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Title ya category se dhoondho..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-primary/50 text-white" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <BookOpen size={40} className="mx-auto text-white/10 mb-4" />
            <p className="text-gray-600 text-sm">Koi blog nahi mila. "New Blog" button se pehla blog likhein!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {filtered.map(blog => (
                <motion.div key={blog.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        {blog.featured && <span className="flex items-center gap-1 text-[10px] font-black text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full uppercase tracking-wider"><Star size={9} /> Featured</span>}
                        {blog.published === false && <span className="text-[10px] font-black text-gray-500 bg-white/5 px-2 py-0.5 rounded-full uppercase">Draft</span>}
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{blog.category}</span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1"><Clock size={9} /> {blog.readTime}</span>
                      </div>
                      <h3 className="font-bold text-white text-base mb-1 truncate">{blog.title}</h3>
                      <p className="text-gray-500 text-xs line-clamp-1 mb-3">{blog.excerpt}</p>
                      {blog.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {blog.tags.slice(0, 5).map(t => (
                            <span key={t} className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 text-gray-500 rounded-full">
                              <Tag size={8} />{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button onClick={() => openEdit(blog)} className="p-2 rounded-xl bg-white/5 hover:bg-primary/10 hover:text-primary transition-all" title="Edit"><Pencil size={15} /></button>
                      <button onClick={() => toggleFeatured(blog)} className={`p-2 rounded-xl transition-all ${blog.featured ? 'bg-yellow-400/10 text-yellow-400' : 'bg-white/5 text-gray-500 hover:text-yellow-400'}`} title="Toggle Featured">
                        {blog.featured ? <Star size={15} /> : <StarOff size={15} />}
                      </button>
                      <button onClick={() => handleDelete(blog.id, blog.title)} className="p-2 rounded-xl bg-white/5 text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-all" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
