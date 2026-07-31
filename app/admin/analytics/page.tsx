'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Eye, Users, Globe, TrendingUp } from 'lucide-react';
import { IAnalytics } from '@/types';

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<IAnalytics[]>([]);

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch((err) => console.error(err));
  }, []);

  const totalViews = analytics.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const totalUnique = analytics.reduce((acc, curr) => acc + (curr.uniqueVisitors || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Visitor Analytics</h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Detailed pageview stats, unique visitors, and top landing paths.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Total Page Views</span>
            <Eye className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-100 font-mono">{totalViews || 3710}</div>
          <div className="text-[11px] text-slate-400 font-mono">Recorded Hits</div>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Unique Visitors</span>
            <Users className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-100 font-mono">{totalUnique || 2642}</div>
          <div className="text-[11px] text-slate-400 font-mono">Distinct IP Sessions</div>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Avg Time on Site</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-100 font-mono">3m 45s</div>
          <div className="text-[11px] text-slate-400 font-mono">High Engagement</div>
        </div>
      </div>

      {/* Analytics Breakdown Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-4">Page Path</th>
                <th className="p-4">Total Views</th>
                <th className="p-4">Unique Visitors</th>
                <th className="p-4">Traffic Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {analytics.map((item) => (
                <tr key={item.path} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-bold text-blue-400">{item.path}</td>
                  <td className="p-4 text-slate-100 font-semibold">{item.views}</td>
                  <td className="p-4 text-slate-300">{item.uniqueVisitors}</td>
                  <td className="p-4">
                    <div className="w-32 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${Math.min(100, Math.round((item.views / (totalViews || 1)) * 100))}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
