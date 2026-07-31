'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Sparkles, BookOpen } from 'lucide-react';
import { IBlog } from '@/types';
import { formatDate } from '@/lib/utils';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data: IBlog[]) => {
        const found = data.find((b) => b.slug === slug);
        setBlog(found || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-36 pb-20 text-center text-slate-400 font-mono text-sm">
        Loading article...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-36 pb-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-100">Article Not Found</h1>
        <p className="text-sm text-slate-400">The requested blog post could not be located.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-purple-400 font-semibold hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Blog List
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-purple-400 transition"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Articles
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold">
            {blog.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {blog.readingTime || 5} min read
          </span>
          {blog.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {formatDate(blog.publishedAt)}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
          {blog.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-2 border-purple-500 pl-4 py-1">
          {blog.excerpt}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-purple-300 border border-slate-700">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
        </div>
      )}

      {/* Markdown Article Body */}
      <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl space-y-6 prose dark:prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>

      {/* Footer / Author section */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white font-bold">
            SDE
          </div>
          <div>
            <div className="font-bold text-slate-200">Written by Software Engineer</div>
            <div>Full-Stack & Distributed Systems Practitioner</div>
          </div>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Article URL copied to clipboard!');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:border-purple-500 transition"
        >
          <Share2 className="h-4 w-4" /> Share Article
        </button>
      </div>
    </article>
  );
}
