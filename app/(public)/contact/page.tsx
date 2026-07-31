'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, MapPin, Github, Linkedin, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit message.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error occurred. Please try again.');
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* HEADER */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
          <Mail className="h-3.5 w-3.5" />
          <span>Engineering Touchpoint</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Get In Touch
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl">
          Interested in discussing Software Development Engineer roles, system design, or tech collaborations? Send a direct message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl space-y-6">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-400" /> Send a Message
          </h2>

          {status === 'success' && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>Thank you! Your message has been sent directly to the admin dashboard.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-3">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g. SDE Opportunity / Technical Inquiry"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Message Content *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Hi, we loved your distributed streaming project and would like to discuss..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition disabled:opacity-50"
            >
              {status === 'submitting' ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Direct Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-6">
            <h3 className="text-lg font-bold text-slate-100">Engineering Contact Info</h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-400 uppercase text-[10px]">Email</div>
                  <div className="text-sm font-medium text-slate-200">dev.engineer@portfolio.dev</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-400 uppercase text-[10px]">Location</div>
                  <div className="text-sm font-medium text-slate-200">San Francisco, CA / Open to Remote</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase">Profiles</div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/arvi8080"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-blue-400 text-xs font-semibold transition"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-blue-400 text-xs font-semibold transition"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
