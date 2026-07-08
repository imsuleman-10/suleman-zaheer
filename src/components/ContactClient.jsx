"use client";
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { db } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import Script from 'next/script';

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 1. Send email via EmailJS
      try {
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        const autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID;

        if (serviceId && templateId && publicKey && serviceId !== 'YOUR_EMAILJS_SERVICE_ID') {
          await emailjs.send(serviceId, templateId, {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }, publicKey);

          if (autoReplyTemplateId && autoReplyTemplateId !== 'YOUR_EMAILJS_AUTO_REPLY_TEMPLATE_ID') {
            await emailjs.send(serviceId, autoReplyTemplateId, {
              to_name: formData.name,
              to_email: formData.email,
              subject: formData.subject,
            }, publicKey).catch(e => console.log("Auto-reply failed:", e));
          }
        }
      } catch (emailErr) {
        console.warn("EmailJS dispatch failed:", emailErr);
      }

      // 2. Save to Firebase Firestore
      await addDoc(collection(db, "contactRequests"), {
        ...formData,
        read: false,
        replies: [
          {
            sender: 'Admin',
            text: 'Thanks for reaching out! I have received your message and will get back to you soon.',
            timestamp: new Date().toISOString()
          }
        ],
        createdAt: serverTimestamp()
      });
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error("Critical Submission Error:", err);
      // Fallback to localStorage
      try {
        const newRequest = {
          id: Date.now().toString(),
          ...formData,
          read: false,
          replies: [
            {
              sender: 'Admin',
              text: 'Thanks for reaching out! I have received your message and will get back to you soon.',
              timestamp: new Date().toISOString()
            }
          ],
          createdAt: { toDate: () => new Date() }
        };
        const existingData = JSON.parse(localStorage.getItem('localRequests') || '[]');
        localStorage.setItem('localRequests', JSON.stringify([newRequest, ...existingData]));
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } catch (localErr) {
        setStatus('error');
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div>
        <p className="text-primary font-bold uppercase tracking-widest mb-4">
          Get in Touch
        </p>
        <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight tracking-tighter text-white">
          Let's <span className="text-primary">Collaborate</span><br />
          <span className="text-gray-600">On Your Next Project.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-12 max-w-md">
          Whether you have a question or just want a say hi, I'll try my best to get back to you!
        </p>

        <div className="space-y-8">
          <div className="flex items-start gap-6 group">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Mail size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Email</h4>
              <p className="text-gray-400">samstacktechs@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-6 group">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Phone</h4>
              <p className="text-gray-400">+92 328 5778715</p>
            </div>
          </div>

          <div className="flex items-start gap-6 group">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Location</h4>
              <p className="text-gray-400">Shahdara Town, Lahore, PK</p>
            </div>
          </div>
        </div>

        </div>
      <div 
        className="p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-white/5 border border-white/10 relative overflow-hidden shadow-2xl animate-in slide-in-from-right-8 fade-in duration-700"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        {status === 'success' ? (
          <div 
            className="text-center py-12 animate-in zoom-in fade-in duration-500"
          >
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-500" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Message Sent!</h3>
            <p className="text-gray-400">Thank you for reaching out. I'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-tighter">Your Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-tighter">Your Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-tighter">Subject</label>
              <input 
                required
                type="text" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors text-white"
                placeholder="How can I help you?"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-tighter">Message</label>
              <textarea 
                required
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors text-white resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button 
              disabled={status === 'loading'}
              className="w-full py-5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20 disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={20} />
            </button>
            
            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        )}

        <div className="mt-12 flex items-center gap-4 text-gray-500 text-sm justify-center">
          <MessageSquare size={16} />
          <span>Directly stored in Admin Dashboard</span>
        </div>
      </div>
    </div>
    </>
  );
}
