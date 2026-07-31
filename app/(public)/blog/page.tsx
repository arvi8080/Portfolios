'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Search, Clock, ArrowRight, Tag } from 'lucide-react';
import { IBlog } from '@/types';
import { formatDate } from '@/lib/utils';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/blog' }),
    }).catch(() => {});

    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data.filter((b: IBlog) => b.published !== false)))
      .catch(() => {});
  }, []);

  const allTags = ['All', ...Array.from(new Set(blogs.flatMap((b) => b.tags || [])))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesTag = selectedTag === 'All' || blog.tags?.includes(selectedTag);
    const matchesQuery =
      searchQuery.trim() === '' ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* HEADER */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-400">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Technical Writings</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Engineering Articles & System Notes
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl">
          Explorations on Next.js 15, microservices, database optimizations, Rust event streams, and Software Development Engineer interview topics.
        </p>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* BLOG POSTS LIST */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          No articles match your current filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map((blog) => (
            <motion.div
              key={blog.id || blog._id}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col justify-between shadow-xl transition-all hover:border-purple-500/40"
            >
              <div className="space-y-4">
                {blog.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="text-purple-400 font-semibold">{blog.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {blog.readingTime || 5} min read
                    </span>
                  </div>

                  <Link href={`/blog/${blog.slug}`}>
                    <h2 className="text-xl font-bold text-slate-100 hover:text-purple-400 transition leading-snug">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {blog.tags?.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-purple-300">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 mt-4">
                <span>{blog.publishedAt ? formatDate(blog.publishedAt) : 'Recent'}</span>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="flex items-center gap-1 font-semibold text-purple-400 hover:text-purple-300 transition"
                >
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
