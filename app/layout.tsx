import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';

declare module '*.css';

import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import LoadingScreen from '@/components/LoadingScreen';
import CursorGlow from '@/components/CursorGlow';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Arvind Prajapati | Software Engineer & Computer Engineering Student',
  description: 'Portfolio of Arvind Prajapati, a final-year Computer Engineering student & Software Engineer specializing in Next.js 15, ASP.NET Core, TypeScript, Cloud Native, and AI systems.',
  keywords: ['Arvind Prajapati', 'Software Engineer', 'Full Stack Developer', 'Computer Engineering', 'Next.js 15', 'ASP.NET Core', 'TypeScript', 'MongoDB', 'Azure'],
  authors: [{ name: 'Arvind Prajapati' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${firaCode.variable}`}>
      <body className="min-h-screen bg-[#09090B] text-slate-100 font-sans flex flex-col antialiased selection:bg-blue-500/30 selection:text-blue-200">
        <ThemeProvider>
          <CursorGlow />
          <LoadingScreen />
          <CommandPalette />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
