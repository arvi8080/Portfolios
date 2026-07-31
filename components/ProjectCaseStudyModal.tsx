'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, Database, Network, Activity, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { IProject } from '@/types';

interface Props {
  project: IProject | null;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({ project, onClose }: Props) {
  if (!project) return null;

  const caseStudy = project.caseStudy;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#09090B]/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#27272A] bg-[#18181B] p-6 md:p-10 space-y-8 text-slate-100 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-semibold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {project.category}
              </span>
              <h2 className="text-3xl font-extrabold text-white">{project.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-[#27272A] text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Hero Banner */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-[#27272A]">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          {/* Performance Metrics Cards */}
          {caseStudy?.performanceMetrics && caseStudy.performanceMetrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudy.performanceMetrics.map((metric, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] space-y-1">
                  <div className="text-[11px] font-mono uppercase text-slate-400">{metric.label}</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono">{metric.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Full Details & Architecture */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 font-mono flex items-center gap-2">
              <Cpu className="h-4 w-4" /> System Architecture & Overview
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.fullDetails || project.description}
            </p>

            {caseStudy?.architectureDiagram && (
              <div className="p-4 rounded-2xl bg-[#09090B] border border-[#27272A] space-y-2">
                <div className="text-xs font-mono font-semibold text-purple-400 uppercase">Architecture Pipeline</div>
                <div className="text-xs font-mono text-slate-300 leading-relaxed bg-[#18181B] p-3 rounded-xl border border-[#27272A]">
                  {caseStudy.architectureDiagram}
                </div>
              </div>
            )}
          </div>

          {/* Database & API Specs */}
          {(caseStudy?.databaseDesign || caseStudy?.apiDocs) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {caseStudy.databaseDesign && (
                <div className="p-4 rounded-2xl bg-[#09090B] border border-[#27272A] space-y-2">
                  <h4 className="text-xs font-mono font-semibold text-emerald-400 uppercase flex items-center gap-1.5">
                    <Database className="h-3.5 w-3.5" /> Database Design & Storage Schema
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {caseStudy.databaseDesign}
                  </p>
                </div>
              )}

              {caseStudy.apiDocs && (
                <div className="p-4 rounded-2xl bg-[#09090B] border border-[#27272A] space-y-2">
                  <h4 className="text-xs font-mono font-semibold text-cyan-400 uppercase flex items-center gap-1.5">
                    <Network className="h-3.5 w-3.5" /> API Specifications
                  </h4>
                  <pre className="text-[11px] font-mono text-slate-300 bg-[#18181B] p-2.5 rounded-xl border border-[#27272A] whitespace-pre-wrap">
                    {caseStudy.apiDocs}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Challenges & Lessons Learned */}
          {(caseStudy?.challenges || caseStudy?.lessonsLearned) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {caseStudy?.challenges && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-semibold text-rose-400 uppercase flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5" /> Key Engineering Challenges
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {caseStudy.challenges.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#09090B] p-3 rounded-xl border border-[#27272A]">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {caseStudy?.lessonsLearned && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-semibold text-emerald-400 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Takeaways & Optimizations
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {caseStudy.lessonsLearned.map((l, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#09090B] p-3 rounded-xl border border-[#27272A]">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-2 pt-2 border-t border-[#27272A]">
            <div className="text-xs font-mono font-semibold text-slate-400 uppercase">Technologies Used</div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono bg-[#09090B] text-blue-300 border border-[#27272A]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#27272A]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-xs text-slate-100 transition"
              >
                <Github className="h-4 w-4" /> GitHub Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs text-white transition shadow-lg shadow-blue-500/20"
              >
                <span>Launch Live Application</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
