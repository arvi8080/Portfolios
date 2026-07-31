'use client';

import { useState, useEffect } from 'react';
import { Globe, Save, CheckCircle, Search, Shield } from 'lucide-react';
import { ISEO } from '@/types';

export default function AdminSEOPage() {
  const [seo, setSEO] = useState<ISEO | null>(null);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/seo')
      .then((res) => res.json())
      .then((data) => {
        setSEO(data);
        setMetaTitle(data.metaTitle || '');
        setMetaDescription(data.metaDescription || '');
        setKeywords(data.keywords ? data.keywords.join(', ') : '');
        setOgImage(data.ogImage || '');
        setTwitterHandle(data.twitterHandle || '');
        setCanonicalUrl(data.canonicalUrl || '');
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    const payload = {
      metaTitle,
      metaDescription,
      keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
      ogImage,
      twitterHandle,
      canonicalUrl,
    };

    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Manage SEO & Meta Tags</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Dynamic OpenGraph tags, Google search meta titles, Twitter Cards, and canonical URLs.
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-[#27272A] bg-[#18181B] space-y-6">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-400" /> Search Engine Optimization Suite
        </h2>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>SEO Metadata updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase text-slate-300 mb-1">
              Meta Title (Page Title Tag)
            </label>
            <input
              type="text"
              required
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#09090B] border border-[#27272A] rounded-xl text-slate-100 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase text-slate-300 mb-1">
              Meta Description (Search Snippet)
            </label>
            <textarea
              required
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-4 py-3 bg-[#09090B] border border-[#27272A] rounded-xl text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase text-slate-300 mb-1">
              Keywords (comma separated)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-4 py-3 bg-[#09090B] border border-[#27272A] rounded-xl text-slate-100 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">
                OpenGraph Cover Image URL
              </label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full px-4 py-3 bg-[#09090B] border border-[#27272A] rounded-xl text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full px-4 py-3 bg-[#09090B] border border-[#27272A] rounded-xl text-slate-100 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save SEO Configuration'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
