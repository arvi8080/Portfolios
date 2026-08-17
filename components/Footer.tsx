'use client';

import Link from 'next/link';
import { Github, Linkedin, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#27272A] bg-[#09090B] text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-100">Arvind Prajapati</h3>
            <p className="text-xs text-slate-400">Software Engineer & Computer Engineering Student</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/about" className="hover:text-blue-400 transition">About</Link>
            <Link href="/projects" className="hover:text-blue-400 transition">Projects</Link>
            <Link href="/blog" className="hover:text-blue-400 transition">Blog</Link>
            <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
            <a
              href="https://drive.google.com/file/d/1tbWFrYGUEPeAtHoJcrhm4OujM2lkUFCh/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            >
              Resume
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/arvi8080"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-100 transition"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/Arvind_prajapati_in/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-blue-400 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://leetcode.com/u/Arvind_8080/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-amber-400 transition"
              aria-label="LeetCode"
            >
              <Code2 className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#27272A] text-center text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} Arvind Prajapati. All rights reserved. Built with Next.js 15 & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
