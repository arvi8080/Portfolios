'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, CheckCircle2, Calendar, MapPin, ExternalLink, Code2, Cpu, Server, Database, Box } from 'lucide-react';
import { IExperience, ISkill, ICertificate, IAchievement } from '@/types';

export default function AboutPage() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);

  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/about' }),
    }).catch(() => {});

    fetch('/api/experience')
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch(() => {});

    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch(() => {});

    fetch('/api/certificates')
      .then((res) => res.json())
      .then((data) => setCertificates(data))
      .catch(() => {});

    fetch('/api/achievements')
      .then((res) => res.json())
      .then((data) => setAchievements(data))
      .catch(() => {});
  }, []);

  const categories = ['Languages', 'Backend', 'Frontend', 'Database', 'DevOps & Tools'];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* HEADER BIO */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
          <Briefcase className="h-3.5 w-3.5" />
          <span>Background & Technical Career</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          About Me & Engineering Focus
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 text-slate-600 dark:text-slate-300 space-y-4 text-base leading-relaxed">
            <p>
              I am a Software Development Engineer with a focus on building resilient backend services, high-throughput data streams, and modern full-stack web applications using Next.js 15, TypeScript, Go, and MongoDB.
            </p>
            <p>
              My engineering philosophy revolves around simplicity, type-safety, robust automated testing, and performance optimization. Whether designing REST/gRPC endpoints, crafting intuitive UI flows, or analyzing latency bottlenecks, I bring structured problem-solving and clean code discipline.
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-3 font-mono text-xs">
            <div className="text-slate-400 font-semibold uppercase tracking-wider mb-2 text-[11px]">Quick Highlights</div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Education:</span>
              <span className="text-slate-200 font-medium">B.Tech Computer Science</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Target Roles:</span>
              <span className="text-blue-400 font-medium">SDE I</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">LeetCode Rating:</span>
              <span className="text-amber-400 font-medium">2,150+ (Knight)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Location:</span>
              <span className="text-slate-200 font-medium">Open to Relocation / Remote</span>
            </div>
          </div>
        </div>
      </section>

      {/* CAREER EXPERIENCE TIMELINE */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-500" /> Work Experience
          </h2>
          <p className="text-sm text-slate-400 mt-1">Professional software engineering positions and impact.</p>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 space-y-10 pl-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id || exp._id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-blue-600 border-4 border-slate-950" />

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                    <div className="text-sm font-semibold text-blue-400 flex items-center gap-2 mt-0.5">
                      <span>{exp.company}</span>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-slate-400 font-normal text-xs">
                          <MapPin className="h-3 w-3" /> {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs font-medium w-fit">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{exp.description}</p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2 pt-2 border-t border-slate-800/60 text-xs text-slate-300">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-blue-300 border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMPREHENSIVE SKILLS BREAKDOWN */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="h-6 w-6 text-indigo-500" /> Technical Skills Matrix
          </h2>
          <p className="text-sm text-slate-400 mt-1">Categorized breakdown of proficiency and daily tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat);
            if (catSkills.length === 0) return null;

            return (
              <div key={cat} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
                <h3 className="text-base font-bold text-indigo-400 uppercase tracking-wider font-mono">
                  {cat}
                </h3>
                <div className="space-y-3">
                  {catSkills.map((sk) => (
                    <div key={sk.id || sk._id} className="space-y-1 text-xs">
                      <div className="flex justify-between font-semibold text-slate-200">
                        <span>{sk.name}</span>
                        <span className="font-mono text-slate-400">{sk.proficiency}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                          style={{ width: `${sk.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CERTIFICATES & ACHIEVEMENTS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Certificates */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-400" /> Certifications
          </h2>
          <div className="space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id || cert._id} className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-sm text-slate-200">{cert.title}</h3>
                  <span className="text-xs font-mono text-amber-400">{cert.issueDate}</span>
                </div>
                <div className="text-xs text-slate-400">{cert.issuer}</div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:underline pt-1"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-emerald-400" /> Honors & Achievements
          </h2>
          <div className="space-y-4">
            {achievements.map((ach) => (
              <div key={ach.id || ach._id} className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-sm text-slate-200">{ach.title}</h3>
                  <span className="text-xs font-mono text-emerald-400">{ach.date}</span>
                </div>
                <div className="text-xs text-slate-400 font-semibold">{ach.organization}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
