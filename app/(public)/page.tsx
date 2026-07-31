'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Terminal,
  Code2,
  Cpu,
  ArrowRight,
  Github,
  Linkedin,
  FolderGit2,
  BookOpen,
  Mail,
  FileText,
  Star,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { IProject, ISkill, IBlog } from '@/types';
import CodingProfilesWidget from '@/components/CodingProfilesWidget';
import ProjectCaseStudyModal from '@/components/ProjectCaseStudyModal';
import HeroBackground from '@/components/HeroBackground';
import StatsCounters from '@/components/StatsCounters';

// Dynamic Typewriter Component
function TypewriterRoles() {
  const roles = [
    'Full Stack Developer',
    'Backend Developer',
    'Cloud Enthusiast',
    'AI Builder',
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <span className="font-mono text-[#06B6D4] font-semibold">
      {currentText}
      <span className="animate-pulse text-blue-500">|</span>
    </span>
  );
}

export default function HomePage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [githubStats, setGithubStats] = useState<any>(null);
  const [selectedCaseStudyProject, setSelectedCaseStudyProject] = useState<IProject | null>(null);

  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/' }),
    }).catch(() => {});

    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data.slice(0, 3)))
      .catch(() => {});

    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => setSkills(data.filter((s: ISkill) => s.featured).slice(0, 8)))
      .catch(() => {});

    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data.slice(0, 2)))
      .catch(() => {});

    fetch('/api/github')
      .then((res) => res.json())
      .then((data) => setGithubStats(data))
      .catch(() => {});
  }, []);

  return (
    <div className="pt-24 pb-16 space-y-24">
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <HeroBackground />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
              <span>Computer Engineering Student & Developer</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.15]"
            >
              Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Arvind Prajapati</span> <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-slate-300 font-bold block mt-1">
                Software Engineer
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg sm:text-xl font-medium text-slate-300 flex items-center gap-2"
            >
              <span>Specializing as a</span>
              <TypewriterRoles />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl"
            >
              Final-year Computer Engineering student passionate about building scalable web applications, backend systems, cloud-native solutions, and AI-powered products using Next.js, ASP.NET Core, MongoDB, Azure, and TypeScript.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="/projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/resume"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#27272A] bg-[#18181B] text-slate-200 hover:border-blue-500 font-semibold text-sm transition"
              >
                <FileText className="h-4 w-4 text-blue-400" />
                <span>Download Resume</span>
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 font-semibold text-sm transition"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Me</span>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 pt-4 text-slate-400 text-xs font-mono"
            >
              <span className="text-slate-500">CONNECT:</span>
              <a
                href="https://github.com/arvi8080"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18181B] border border-[#27272A] hover:text-blue-400 hover:border-blue-500/40 transition"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/arvind-prajapati-4b6689296/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18181B] border border-[#27272A] hover:text-blue-500 hover:border-blue-500/40 transition"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <a
                href="https://leetcode.com/arvind8080"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18181B] border border-[#27272A] hover:text-amber-400 hover:border-amber-500/40 transition"
              >
                <Code2 className="h-3.5 w-3.5" /> LeetCode
              </a>
            </motion.div>
          </div>

          {/* Right Column: Professional Circular Photo (400px) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center"
            >
              {/* Outer Ambient Glow */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-purple-600 opacity-50 blur-xl animate-pulse-slow" />

              {/* 400px Circular Frame */}
              <div className="relative w-72 h-72 sm:w-[400px] sm:h-[400px] rounded-full overflow-hidden border-4 border-blue-500/30 bg-[#18181B] shadow-2xl z-10 group">
                <Image
                  src="/arvind-portrait.jpg"
                  alt="Arvind Prajapati - Junior Developer Intern"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ANIMATED STATS COUNTER SECTION */}
      <StatsCounters />

      {/* CODING PROFILES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CodingProfilesWidget />
      </section>

      {/* FEATURED PROJECTS WITH CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-2">
              Engineering Showcase
            </div>
            <h2 className="text-3xl font-bold text-slate-100">
              Featured Software Projects & Case Studies
            </h2>
          </div>
          <Link
            href="/projects"
            className="mt-4 md:mt-0 flex items-center gap-1 text-sm font-semibold text-blue-400 hover:text-blue-300 transition"
          >
            <span>View All Projects Gallery</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id || project._id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedCaseStudyProject(project)}
              className="group cursor-pointer rounded-2xl border border-[#27272A] bg-[#18181B] overflow-hidden flex flex-col justify-between shadow-xl transition-all hover:border-blue-500/40"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold uppercase bg-[#09090B]/90 text-blue-400 border border-[#27272A]">
                    {project.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#09090B] text-slate-300 border border-[#27272A]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-semibold text-blue-400 border-t border-[#27272A] mt-4">
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" /> View Case Study
                </span>
                <Sparkles className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE SKILLS MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl border border-[#27272A] bg-gradient-to-b from-[#18181B] to-[#09090B] shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-2">
                Technical Stack
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
                Core Competencies & Frameworks
              </h2>
            </div>
            <Link
              href="/about"
              className="mt-4 md:mt-0 text-sm font-semibold text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Full Skill Set Matrix</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id || skill._id}
                className="p-4 rounded-xl border border-[#27272A] bg-[#09090B] flex flex-col justify-between space-y-2 hover:border-blue-500/40 transition"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">{skill.name}</span>
                  <span className="font-mono text-blue-400">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#18181B] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT BLOG ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-wider mb-2">
              Technical Insights
            </div>
            <h2 className="text-3xl font-bold text-slate-100">
              Engineering Notes & MDX Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="mt-4 md:mt-0 flex items-center gap-1 text-sm font-semibold text-purple-400 hover:text-purple-300 transition"
          >
            <span>Read All Articles</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id || blog._id}
              href={`/blog/${blog.slug}`}
              className="group p-6 rounded-2xl border border-[#27272A] bg-[#18181B] hover:border-purple-500/50 transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="text-purple-400 font-semibold">{blog.category}</span>
                  <span>{blog.readingTime || 5} min read</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-purple-400 transition">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#27272A] text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-[#09090B] text-slate-300 border border-[#27272A]">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1 font-semibold text-purple-400">
                  Read Article <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CASE STUDY MODAL */}
      <ProjectCaseStudyModal
        project={selectedCaseStudyProject}
        onClose={() => setSelectedCaseStudyProject(null)}
      />
    </div>
  );
}
