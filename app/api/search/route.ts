import { NextRequest, NextResponse } from 'next/server';
import { inMemoryStore } from '@/lib/db';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q')?.toLowerCase().trim() || '';

  if (!query) {
    return NextResponse.json({ projects: [], blogs: [], skills: [] });
  }

  const projects = inMemoryStore.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.techStack.some((t) => t.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query)
  );

  const blogs = inMemoryStore.blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(query) ||
      b.excerpt.toLowerCase().includes(query) ||
      b.tags.some((t) => t.toLowerCase().includes(query)) ||
      b.category.toLowerCase().includes(query)
  );

  const skills = inMemoryStore.skills.filter(
    (s) => s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query)
  );

  return NextResponse.json({ projects, blogs, skills });
}
