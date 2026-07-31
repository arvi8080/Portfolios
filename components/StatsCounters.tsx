'use client';

import { motion } from 'framer-motion';
import { Code2, FolderGit2, GraduationCap, Calendar } from 'lucide-react';

export default function StatsCounters() {
  const stats = [
    {
      value: '550+',
      label: 'DSA Problems Solved',
      sublabel: 'LeetCode & GFG',
      icon: Code2,
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-400',
    },
    {
      value: '20+',
      label: 'Projects Built',
      sublabel: 'Full-Stack & Cloud',
      icon: FolderGit2,
      color: 'from-blue-500 to-indigo-500',
      textColor: 'text-blue-400',
    },
    {
      value: '9.09',
      label: 'Academic CGPA',
      sublabel: 'Computer Engineering',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
    },
    {
      value: '2027',
      label: 'Graduation Year',
      sublabel: 'B.Tech / B.E.',
      icon: Calendar,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-400',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl border border-[#27272A] bg-[#18181B]/90 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-3 hover:border-blue-500/40 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                  {stat.sublabel}
                </span>
                <div className={`p-2 rounded-xl bg-gradient-to-tr ${stat.color} opacity-20 group-hover:opacity-40 transition`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${stat.textColor}`}>
                {stat.value}
              </div>

              <div className="text-xs font-bold text-slate-200">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
