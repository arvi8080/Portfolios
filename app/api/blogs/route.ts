import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Blog from '@/models/Blog';
import { getAdminSession } from '@/lib/auth';
import { slugify, calculateReadingTime } from '@/lib/utils';

export async function GET() {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      const blogs = await Blog.find({}).sort({ publishedAt: -1 });
      return NextResponse.json(blogs);
    }
    return NextResponse.json(inMemoryStore.blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(inMemoryStore.blogs);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const slug = body.slug || slugify(body.title) + '-' + Date.now().toString().slice(-4);
    const readingTime = calculateReadingTime(body.content || '');

    const blogData = {
      ...body,
      slug,
      readingTime,
      publishedAt: body.publishedAt || new Date().toISOString(),
    };

    const isConnected = await connectDB();
    if (isConnected) {
      const blog = await Blog.create(blogData);
      return NextResponse.json(blog, { status: 201 });
    } else {
      const blog = { id: 'blog-' + Date.now(), ...blogData, views: 0 };
      inMemoryStore.blogs.unshift(blog);
      return NextResponse.json(blog, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
