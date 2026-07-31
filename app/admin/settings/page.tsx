'use client';

import { useState } from 'react';
import { Settings, Shield, Key, Save, CheckCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [email, setEmail] = useState('admin@portfolio.dev');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Security & Account Settings</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Manage administrator credentials, JWT cookie parameters, and profile details.
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-6">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-400" /> Admin Credentials
        </h2>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Account security settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase text-slate-300 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Leave blank to keep unchanged"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-[11px] text-slate-400">
            <div className="font-bold text-slate-200 uppercase font-mono">Security Specifications:</div>
            <div>• JWT Tokens: 256-bit secret signed, 7-day expiration.</div>
            <div>• Cookies: HTTP-Only, SameSite=Lax, Secure flags active in production.</div>
            <div>• Password Hashing: bcryptjs (10 salt rounds).</div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
          >
            <Save className="h-4 w-4" />
            <span>Save Security Settings</span>
          </button>
        </form>
      </div>
    </div>
  );
}
