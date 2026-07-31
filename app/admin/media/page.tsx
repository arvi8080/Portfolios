'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Upload, Copy, Check, Sparkles } from 'lucide-react';

export default function AdminMediaPage() {
  const [uploading, setUploading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [mediaItems, setMediaItems] = useState([
    {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      name: 'Event Streaming Engine Architecture',
    },
    {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      name: 'AI Code Sentinel Security Cover',
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      name: 'K8s Microservices Observability',
    },
    {
      url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80',
      name: 'Collaborative Code Editor',
    },
  ]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setMediaItems([{ url: data.url, name: data.filename }, ...mediaItems]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (url: string, idx: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Media Uploads & Cloud Gallery</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Cloudinary integration / local storage media asset manager for project images & covers.
          </p>
        </div>

        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs cursor-pointer transition shadow-md shadow-blue-500/20">
          <Upload className="h-4 w-4" />
          <span>{uploading ? 'Uploading...' : 'Upload New Media'}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaItems.map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden space-y-3 p-3">
            <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-800">
              <Image src={item.url} alt={item.name} fill className="object-cover" />
            </div>
            <div className="text-xs font-semibold text-slate-200 truncate">{item.name}</div>

            <button
              onClick={() => copyUrl(item.url, idx)}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-blue-400 transition"
            >
              {copiedIndex === idx ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied URL!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Image URL</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
