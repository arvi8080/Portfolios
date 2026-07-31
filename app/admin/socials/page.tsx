'use client';

import { useState, useEffect } from 'react';
import { Share2, Save, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { ISocialLink } from '@/types';

export default function AdminSocialsPage() {
  const [socials, setSocials] = useState<ISocialLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/social-links')
      .then((res) => res.json())
      .then((data) => setSocials(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (index: number, field: keyof ISocialLink, value: string) => {
    const updated = [...socials];
    updated[index] = { ...updated[index], [field]: value };
    setSocials(updated);
  };

  const handleAdd = () => {
    setSocials([...socials, { platform: 'GitHub', url: '', username: '' }]);
  };

  const handleDelete = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/social-links', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socials),
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Manage Social & Coding Links</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            GitHub, LinkedIn, LeetCode, Codeforces, GeeksforGeeks, and HackerRank profile URLs.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition"
        >
          <Plus className="h-4 w-4" /> Add Social Link
        </button>
      </div>

      <div className="p-8 rounded-3xl border border-[#27272A] bg-[#18181B] space-y-6">
        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Social links updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {socials.map((link, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-[#09090B] border border-[#27272A]">
              <input
                type="text"
                placeholder="Platform (e.g. LeetCode)"
                value={link.platform}
                onChange={(e) => handleChange(idx, 'platform', e.target.value as any)}
                className="w-1/4 px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-slate-100 font-bold"
              />
              <input
                type="text"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleChange(idx, 'url', e.target.value)}
                className="w-1/2 px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-slate-100 font-mono"
              />
              <input
                type="text"
                placeholder="Username"
                value={link.username || ''}
                onChange={(e) => handleChange(idx, 'username', e.target.value)}
                className="w-1/4 px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-slate-100 font-mono"
              />
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save All Links'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
