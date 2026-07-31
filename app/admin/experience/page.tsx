'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Briefcase } from 'lucide-react';
import { IExperience } from '@/types';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<IExperience | null>(null);

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    location: '',
    period: '',
    description: '',
    achievements: '',
    techStack: '',
  });

  const fetchExp = () => {
    fetch('/api/experience')
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchExp();
  }, []);

  const openCreateModal = () => {
    setEditingExp(null);
    setFormData({
      role: '',
      company: '',
      location: '',
      period: 'Jan 2025 - Present',
      description: '',
      achievements: '',
      techStack: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp: IExperience) => {
    setEditingExp(exp);
    setFormData({
      role: exp.role,
      company: exp.company,
      location: exp.location || '',
      period: exp.period,
      description: exp.description,
      achievements: exp.achievements ? exp.achievements.join('\n') : '',
      techStack: exp.techStack ? exp.techStack.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      achievements: formData.achievements.split('\n').map((a) => a.trim()).filter(Boolean),
      techStack: formData.techStack.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingExp) {
        const id = editingExp.id || editingExp._id;
        await fetch(`/api/experience/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      setIsModalOpen(false);
      fetchExp();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      fetchExp();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Manage Experience (CRUD)</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Work history, company roles, timeline periods, and key achievements.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-md shadow-blue-500/20"
        >
          <Plus className="h-4 w-4" /> Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => {
          const id = exp.id || exp._id || '';
          return (
            <div key={id} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-start justify-between gap-4 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-100">{exp.role}</h3>
                  <span className="text-xs font-semibold text-blue-400">@ {exp.company}</span>
                </div>
                <div className="text-xs font-mono text-slate-400">{exp.period} • {exp.location || 'Remote'}</div>
                <p className="text-xs text-slate-300 max-w-2xl">{exp.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => openEditModal(exp)} className="p-2 rounded-lg bg-slate-800 text-slate-300">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(id)} className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg">{editingExp ? 'Edit Experience' : 'Add Experience'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Period (e.g. 2024 - Present)</label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Role Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Bullet Achievements (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">Tech Stack Used (comma separated)</label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono"
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
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
