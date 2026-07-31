'use client';

import { useState, useEffect } from 'react';
import { Mail, CheckCircle, Trash2, Reply, Eye, Sparkles } from 'lucide-react';
import { IMessage } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchMessages = () => {
    fetch('/api/messages')
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (msg: IMessage) => {
    const id = msg.id || msg._id;
    try {
      await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !msg.isRead }),
      });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete message?')) return;
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Manage Contact Submissions</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Review messages sent by recruiters, engineering managers, and visitors.
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => {
          const id = msg.id || msg._id || '';
          return (
            <div
              key={id}
              className={`p-6 rounded-2xl border transition shadow-xl space-y-3 ${
                msg.isRead
                  ? 'border-slate-800 bg-slate-900/40 text-slate-300'
                  : 'border-blue-500/40 bg-slate-900/90 text-slate-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    {msg.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
                      <span>{msg.name}</span>
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-slate-400">{msg.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>{msg.createdAt ? formatDate(msg.createdAt) : 'Recent'}</span>
                  <button
                    onClick={() => toggleReadStatus(msg)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title="Toggle Read Status"
                  >
                    <CheckCircle className={`h-4 w-4 ${msg.isRead ? 'text-emerald-400' : 'text-slate-500'}`} />
                  </button>
                  <a
                    href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                    className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 transition"
                    title="Reply Email"
                  >
                    <Reply className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(id)}
                    className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 transition"
                    title="Delete Message"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div className="text-xs font-bold text-slate-200 border-t border-slate-800/60 pt-2">
                  Subject: {msg.subject}
                </div>
              )}

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {msg.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
