import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Blog from '@/models/Blog';
import { getAdminSession } from '@/lib/auth';
import { calculateReadingTime } from '@/lib/utils';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    if (body.content) {
      body.readingTime = calculateReadingTime(body.content);
    }

    const isConnected = await connectDB();
    if (isConnected) {
      const updated = await Blog.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json(updated);
    } else {
      const idx = inMemoryStore.blogs.findIndex((b) => b.id === id || b._id === id);
      if (idx !== -1) {
        inMemoryStore.blogs[idx] = { ...inMemoryStore.blogs[idx], ...body };
        return NextResponse.json(inMemoryStore.blogs[idx]);
      }
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const isConnected = await connectDB();
    if (isConnected) {
      await Blog.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    } else {
      inMemoryStore.blogs = inMemoryStore.blogs.filter((b) => b.id !== id && b._id !== id);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
