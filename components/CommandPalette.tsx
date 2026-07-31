'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, FolderGit2, BookOpen, Mail, FileText, Lock, Sparkles, X, ArrowRight } from 'lucide-react';
import { IProject, IBlog } from '@/types';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ projects: IProject[]; blogs: IBlog[] }>({
    projects: [],
    blogs: [],
  });
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ projects: [], blogs: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults({ projects: data.projects || [], blogs: data.blogs || [] });
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const navigateTo = (path: string) => {
    setOpen(false);
    setQuery('');
    router.push(path);
  };

  const navItems = [
    { label: 'Home Page', icon: Home, path: '/' },
    { label: 'About & Career', icon: User, path: '/about' },
    { label: 'Projects Gallery', icon: FolderGit2, path: '/projects' },
    { label: 'Tech Blog & Articles', icon: BookOpen, path: '/blog' },
    { label: 'Contact Developer', icon: Mail, path: '/contact' },
    { label: 'Interactive Resume', icon: FileText, path: '/resume' },
    { label: 'Admin Portal', icon: Lock, path: '/admin/dashboard' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/90 shadow-2xl shadow-blue-500/10 text-slate-100"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center border-b border-slate-800 px-4 py-3">
              <Search className="h-5 w-5 text-slate-400 mr-3" />
              <input
                type="text"
                placeholder="Type to search pages, projects, tech stacks, or blogs (e.g. Next.js, Rust, JWT)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm md:text-base placeholder-slate-500 text-slate-100 focus:outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
              {/* Query Results */}
              {query.trim() !== '' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-blue-400">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" /> AI Search Results
                    </span>
                    {searching && <span className="animate-pulse">Searching...</span>}
                  </div>

                  {results.projects.length === 0 && results.blogs.length === 0 && !searching && (
                    <p className="text-center py-6 text-sm text-slate-400">
                      No matching projects or blogs found for "{query}".
                    </p>
                  )}

                  {/* Projects matching */}
                  {results.projects.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 mb-2 uppercase">Projects</h4>
                      <div className="space-y-2">
                        {results.projects.map((proj) => (
                          <div
                            key={proj.id || proj._id}
                            onClick={() => navigateTo(`/projects`)}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 hover:border-blue-500/50 border border-transparent cursor-pointer transition"
                          >
                            <div className="flex items-center gap-3">
                              <FolderGit2 className="h-4 w-4 text-blue-400" />
                              <div>
                                <div className="text-sm font-medium text-slate-200">{proj.title}</div>
                                <div className="text-xs text-slate-400 truncate max-w-md">{proj.description}</div>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Blogs matching */}
                  {results.blogs.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 mb-2 uppercase">Articles</h4>
                      <div className="space-y-2">
                        {results.blogs.map((blog) => (
                          <div
                            key={blog.id || blog._id}
                            onClick={() => navigateTo(`/blog/${blog.slug}`)}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 hover:border-purple-500/50 border border-transparent cursor-pointer transition"
                          >
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-4 w-4 text-purple-400" />
                              <div>
                                <div className="text-sm font-medium text-slate-200">{blog.title}</div>
                                <div className="text-xs text-slate-400 truncate max-w-md">{blog.excerpt}</div>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Navigation Links */
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Quick Navigation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => navigateTo(item.path)}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 hover:border-blue-500/50 transition text-left text-sm text-slate-200"
                        >
                          <Icon className="h-4 w-4 text-blue-400" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer status bar */}
            <div className="flex items-center justify-between border-t border-slate-800 px-4 py-2.5 text-xs text-slate-400 bg-slate-900/90">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">ESC</kbd> to exit</span>
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-blue-400" /> Antigravity AI Engine
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
