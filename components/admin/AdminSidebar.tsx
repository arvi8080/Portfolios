'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  BookOpen,
  Briefcase,
  Award,
  GraduationCap,
  FileText,
  Mail,
  Image as ImageIcon,
  BarChart3,
  Settings,
  Globe,
  Share2,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
    { href: '/admin/skills', label: 'Skills', icon: Cpu },
    { href: '/admin/blogs', label: 'Blogs (MDX)', icon: BookOpen },
    { href: '/admin/experience', label: 'Experience', icon: Briefcase },
    { href: '/admin/certificates', label: 'Certificates', icon: Award },
    { href: '/admin/achievements', label: 'Achievements', icon: GraduationCap },
    { href: '/admin/resume', label: 'Resume', icon: FileText },
    { href: '/admin/messages', label: 'Messages', icon: Mail },
    { href: '/admin/media', label: 'Media Uploads', icon: ImageIcon },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/seo', label: 'Manage SEO', icon: Globe },
    { href: '/admin/socials', label: 'Social Links', icon: Share2 },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Mobile Top Navbar Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#18181B] border-b border-[#27272A] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-mono font-bold text-xs">
            AP
          </div>
          <div>
            <div className="font-bold text-xs text-slate-100">Arvind.dev</div>
            <div className="text-[9px] font-mono text-blue-400">ADMIN CMS</div>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-[#09090B] border border-[#27272A] text-slate-300"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`${
          mobileOpen ? 'block' : 'hidden'
        } md:flex w-full md:w-64 bg-[#18181B] border-r border-[#27272A] flex-col justify-between shrink-0 min-h-screen text-slate-300 z-30`}
      >
        <div className="p-4 space-y-6">
          {/* Brand Header */}
          <div className="hidden md:flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-mono font-bold text-xs">
                AP
              </div>
              <div>
                <div className="font-bold text-sm text-slate-100">Arvind.dev</div>
                <div className="text-[10px] font-mono text-blue-400">ADMIN CONTROL CMS</div>
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#09090B]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Controls */}
        <div className="p-4 border-t border-[#27272A] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-[#09090B] text-xs font-medium text-slate-300 hover:text-white transition"
          >
            <span>View Public Site</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
