'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sun, Moon, Search, Menu, X, Shield } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/resume', label: 'Resume' },
  ];

  const isAdminPath = pathname.startsWith('/admin');

  if (isAdminPath) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090B]/85 backdrop-blur-xl border-b border-[#27272A] shadow-xl shadow-black/20 py-4 h-20'
          : 'bg-transparent py-6 h-24'
      } flex items-center`}
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: Arvind.dev */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 text-white font-mono font-bold text-sm shadow-lg shadow-blue-500/25 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
            AP
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-slate-100 group-hover:text-blue-400 transition-colors">
              Arvind<span className="text-blue-500">.dev</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">COMPUTER ENGINEERING</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#18181B]/80 p-2 rounded-full border border-[#27272A] backdrop-blur-xl shadow-inner">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const isHovered = hoveredLink === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {/* Active Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span className="relative z-10">{link.label}</span>

                {/* Hover Underline Animation */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="hoverUnderline"
                    className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Controls: Search, Theme Toggle, Admin Button */}
        <div className="hidden md:flex items-center gap-3">
          {/* Ctrl + K Command Palette Trigger */}
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
              window.dispatchEvent(event);
            }}
            className="flex items-center gap-2.5 text-xs px-3.5 py-2 rounded-xl border border-[#27272A] bg-[#18181B] text-slate-300 hover:border-blue-500/50 hover:text-blue-400 transition shadow-sm"
          >
            <Search className="h-3.5 w-3.5 text-blue-400" />
            <span className="font-medium">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#09090B] border border-[#27272A] font-mono text-[10px] text-slate-400">
              Ctrl K
            </kbd>
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl border border-[#27272A] bg-[#18181B] text-slate-300 hover:text-blue-400 hover:border-blue-500/40 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-300" />}
            </button>
          )}

          {/* Admin Portal Button */}
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-[#18181B] text-slate-200 border border-[#27272A] hover:border-blue-500/60 transition shadow-md"
          >
            <Shield className="h-3.5 w-3.5 text-blue-400" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile menu hamburger button */}
        <div className="flex md:hidden items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl border border-[#27272A] bg-[#18181B] text-slate-300"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-[#27272A] bg-[#18181B] text-slate-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 border-b border-[#27272A] bg-[#09090B]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3"
          >
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                    pathname === link.href
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-[#18181B] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-[#18181B] text-blue-400 border border-[#27272A] mt-2"
              >
                <Shield className="h-4 w-4" /> Admin Dashboard
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
