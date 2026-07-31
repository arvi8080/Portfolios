'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle, Sparkles, Eye, Award, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { IResume, IExperience, ISkill } from '@/types';

export default function ResumePage() {
  const [resumeInfo, setResumeInfo] = useState<IResume | null>(null);
  const [downloadCount, setDownloadCount] = useState<number>(342);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/resume' }),
    }).catch(() => {});

    fetch('/api/resume')
      .then((res) => res.json())
      .then((data) => {
        setResumeInfo(data);
        if (data.downloadCount) setDownloadCount(data.downloadCount);
      })
      .catch(() => {});
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch('/api/resume/download', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.downloadCount) setDownloadCount(data.downloadCount);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
      // Trigger browser file download or open PDF link
      const link = document.createElement('a');
      link.href = resumeInfo?.fileUrl || '/resume-sample.pdf';
      link.download = 'Senior_SDE_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
            <FileText className="h-3.5 w-3.5" />
            <span>Interactive Resume & Metrics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Software Engineer Resume
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Version {resumeInfo?.version || '2026-v2.4'} • Last Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </div>

        {/* Download Action Card */}
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/80 flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Download Counter</div>
            <div className="text-xl font-bold text-blue-400 font-mono">{downloadCount} downloads</div>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition hover:scale-105"
          >
            <Download className="h-4 w-4" />
            <span>{downloading ? 'Preparing...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* STRUCTURED RESUME CONTENT DOCUMENT */}
      <div className="p-8 md:p-12 rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl space-y-10 text-slate-200">
        {/* Contact Info Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Senior Software Development Engineer</h2>
            <p className="text-sm text-blue-400 font-mono">San Francisco, CA • dev.engineer@portfolio.dev</p>
          </div>
          <div className="flex gap-4 text-xs font-semibold text-slate-400">
            <span>github.com/octocat</span>
            <span>leetcode.com/octocat</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            Summary
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Software Engineer with 4+ years of experience building high-throughput backend services, Next.js 15 web applications, and distributed streaming engines. Expert in TypeScript, Go, Node.js, MongoDB, and AWS cloud infrastructure. Solved 750+ LeetCode problems (Knight rank, rating 2,150+).
          </p>
        </div>

        {/* Technical Core Skills */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-semibold text-slate-300">Languages:</span> TypeScript, JavaScript, Go, Python, C++, SQL
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-semibold text-slate-300">Backend & Cloud:</span> Node.js, Express, Next.js 15, gRPC, Docker, Kubernetes, AWS
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-semibold text-slate-300">Frontend:</span> React 19, Tailwind CSS, Framer Motion, Next.js App Router
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-semibold text-slate-300">Databases & Caching:</span> MongoDB, PostgreSQL, Redis, InfluxDB
            </div>
          </div>
        </div>

        {/* Experience Highlights */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            Professional Experience
          </h3>

          <div className="space-y-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-slate-100">
                <span>Software Development Engineer II — Nexus Scale Labs</span>
                <span className="font-mono text-xs text-blue-400">Mar 2025 - Present</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                <li>Architected distributed message processing microservices serving 2M+ daily requests with 99.99% uptime.</li>
                <li>Reduced p99 database query latencies from 320ms to 45ms using Redis caching and MongoDB aggregation tuning.</li>
                <li>Led migration of legacy monolithic core into Next.js 15 App Router & Go microservices.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-bold text-slate-100">
                <span>Software Engineer (Full-Stack) — Apex Digital Solutions</span>
                <span className="font-mono text-xs text-slate-400">Jul 2023 - Feb 2025</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                <li>Engineered customer analytics dashboards with Next.js, Framer Motion, and Tailwind CSS.</li>
                <li>Implemented JWT authentication in HTTP-only cookies alongside Redis rate limiting.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education & Achievements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-2">
              Education
            </h3>
            <div className="text-xs font-bold text-slate-200">B.S. in Computer Science</div>
            <div className="text-xs text-slate-400">GPA: 3.8 / 4.0 • Coursework: Distributed Systems, OS, Data Structures</div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-2">
              Certifications & Titles
            </h3>
            <div className="text-xs text-slate-300 space-y-1">
              <div>• LeetCode Knight Title (Rating 2,150+)</div>
              <div>• AWS Certified Solutions Architect</div>
              <div>• Certified Kubernetes Application Developer (CKAD)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
