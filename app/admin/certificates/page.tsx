'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Award } from 'lucide-react';
import { ICertificate } from '@/types';

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<ICertificate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<ICertificate | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    credentialId: '',
  });

  const fetchCerts = () => {
    fetch('/api/certificates')
      .then((res) => res.json())
      .then((data) => setCerts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const openCreateModal = () => {
    setEditingCert(null);
    setFormData({ title: '', issuer: '', issueDate: '2025-01', credentialUrl: '', credentialId: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (cert: ICertificate) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate,
      credentialUrl: cert.credentialUrl || '',
      credentialId: cert.credentialId || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCert) {
        const id = editingCert.id || editingCert._id;
        await fetch(`/api/certificates/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/certificates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      fetchCerts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete certificate?')) return;
    try {
      await fetch(`/api/certificates/${id}`, { method: 'DELETE' });
      fetchCerts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Manage Certificates (CRUD)</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            AWS, Kubernetes CKAD, and technical certification credentials.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-md shadow-blue-500/20"
        >
          <Plus className="h-4 w-4" /> Add Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((cert) => {
          const id = cert.id || cert._id || '';
          return (
            <div key={id} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-start justify-between gap-4">
              <div className="space-y-1 text-xs">
                <div className="font-bold text-slate-100 text-sm">{cert.title}</div>
                <div className="text-slate-400 font-semibold">{cert.issuer}</div>
                <div className="font-mono text-amber-400 text-[11px]">{cert.issueDate}</div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => openEditModal(cert)} className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDelete(id)} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg">{editingCert ? 'Edit Certificate' : 'Add Certificate'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Issuer Organization</label>
                <input
                  type="text"
                  required
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Issue Date</label>
                <input
                  type="text"
                  required
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Verification URL</label>
                <input
                  type="text"
                  value={formData.credentialUrl}
                  onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
