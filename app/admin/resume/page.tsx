'use client';

import { useState, useEffect } from 'react';
import { FileText, Upload, Save, Download, CheckCircle, RefreshCw } from 'lucide-react';
import { IResume } from '@/types';

export default function AdminResumePage() {
  const [resume, setResume] = useState<IResume | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [version, setVersion] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/resume')
      .then((res) => res.json())
      .then((data) => {
        setResume(data);
        setFileUrl(data.fileUrl || '/resume-sample.pdf');
        setVersion(data.version || '2026-v2.4');
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/resume', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileUrl, version }),
      });

      if (res.ok) {
        const updated = await res.json();
        setResume(updated);
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
        <h1 className="text-2xl font-bold text-slate-100">Manage Resume & Downloads</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Update public resume PDF link, manage version tag, and view download metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Card */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Total Downloads</span>
            <Download className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-4xl font-extrabold text-blue-400 font-mono">
            {resume?.downloadCount || 342}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Real-time Incremented</div>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Active Version</span>
            <FileText className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-slate-100 font-mono">{resume?.version || '2026-v2.4'}</div>
          <div className="text-[11px] text-slate-400 font-mono">Publicly Available</div>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Last Updated</span>
            <RefreshCw className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-sm font-bold text-slate-200">
            {resume?.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : 'Recent'}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Synced</div>
        </div>
      </div>

      {/* EDIT RESUME FORM */}
      <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-6">
        <h2 className="text-lg font-bold text-slate-100">Update Resume Details</h2>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Resume settings updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase text-slate-300 mb-1">
              Resume PDF File URL / Data Path
            </label>
            <input
              type="text"
              required
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase text-slate-300 mb-1">
              Version Label (e.g. 2026-v2.5)
            </label>
            <input
              type="text"
              required
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
