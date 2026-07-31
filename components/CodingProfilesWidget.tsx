'use client';

import { useState, useEffect } from 'react';
import { Code2, Trophy, Terminal, Award, ExternalLink, Zap } from 'lucide-react';
import { ICodingProfiles } from '@/types';

export default function CodingProfilesWidget() {
  const [profiles, setProfiles] = useState<ICodingProfiles | null>(null);

  useEffect(() => {
    fetch('/api/coding-profiles')
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch(() => {});
  }, []);

  if (!profiles) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            Competitive Programming & Problem Solving
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Coding Platform Profiles
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* LeetCode */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#18181B] space-y-3 hover:border-amber-500/40 transition group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
              <Code2 className="h-4 w-4 text-amber-400" /> LeetCode
            </div>
            <a
              href={`https://leetcode.com/${profiles.leetcode.username}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 group-hover:text-amber-400 transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="text-2xl font-extrabold text-slate-100 font-mono">
            {profiles.leetcode.totalSolved} <span className="text-xs text-slate-400 font-normal">Solved</span>
          </div>

          <div className="space-y-1 text-xs text-slate-400 font-mono">
            <div className="flex justify-between">
              <span>Rating:</span>
              <span className="text-amber-400 font-bold">{profiles.leetcode.contestRating}+</span>
            </div>
            <div className="flex justify-between">
              <span>Badge:</span>
              <span className="text-slate-200">{profiles.leetcode.badgeTitle}</span>
            </div>
          </div>
        </div>

        {/* Codeforces */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#18181B] space-y-3 hover:border-purple-500/40 transition group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
              <Trophy className="h-4 w-4 text-purple-400" /> Codeforces
            </div>
            <a
              href={`https://codeforces.com/profile/${profiles.codeforces.username}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 group-hover:text-purple-400 transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="text-2xl font-extrabold text-slate-100 font-mono">
            {profiles.codeforces.rating} <span className="text-xs text-slate-400 font-normal">Rating</span>
          </div>

          <div className="space-y-1 text-xs text-slate-400 font-mono">
            <div className="flex justify-between">
              <span>Max Rating:</span>
              <span className="text-purple-400 font-bold">{profiles.codeforces.maxRating}</span>
            </div>
            <div className="flex justify-between">
              <span>Rank:</span>
              <span className="text-slate-200">{profiles.codeforces.rankTitle}</span>
            </div>
          </div>
        </div>

        {/* GeeksforGeeks */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#18181B] space-y-3 hover:border-emerald-500/40 transition group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
              <Terminal className="h-4 w-4 text-emerald-400" /> GeeksforGeeks
            </div>
            <a
              href={`https://geeksforgeeks.org/user/${profiles.geeksforgeeks.username}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 group-hover:text-emerald-400 transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="text-2xl font-extrabold text-slate-100 font-mono">
            {profiles.geeksforgeeks.problemsSolved} <span className="text-xs text-slate-400 font-normal">Solved</span>
          </div>

          <div className="space-y-1 text-xs text-slate-400 font-mono">
            <div className="flex justify-between">
              <span>Score:</span>
              <span className="text-emerald-400 font-bold">{profiles.geeksforgeeks.codingScore}</span>
            </div>
            <div className="flex justify-between">
              <span>Rank:</span>
              <span className="text-slate-200">{profiles.geeksforgeeks.rank}</span>
            </div>
          </div>
        </div>

        {/* HackerRank */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#18181B] space-y-3 hover:border-blue-500/40 transition group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
              <Award className="h-4 w-4 text-blue-400" /> HackerRank
            </div>
            <a
              href={`https://hackerrank.com/${profiles.hackerrank.username}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 group-hover:text-blue-400 transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="text-2xl font-extrabold text-slate-100 font-mono">
            {profiles.hackerrank.stars} ★ <span className="text-xs text-slate-400 font-normal">Problem Solving</span>
          </div>

          <div className="space-y-1 text-xs text-slate-400 font-mono">
            <div className="flex justify-between">
              <span>Badges:</span>
              <span className="text-blue-400 font-bold">{profiles.hackerrank.badgesCount} Badges</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-slate-200">Gold Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
