import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Achievement from '@/models/Achievement';
import { getAdminSession } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const isConnected = await connectDB();
    if (isConnected) {
      const updated = await Achievement.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json(updated);
    } else {
      const idx = inMemoryStore.achievements.findIndex((a) => a.id === id || a._id === id);
      if (idx !== -1) {
        inMemoryStore.achievements[idx] = { ...inMemoryStore.achievements[idx], ...body };
        return NextResponse.json(inMemoryStore.achievements[idx]);
      }
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating achievement:', error);
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
      await Achievement.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    } else {
      inMemoryStore.achievements = inMemoryStore.achievements.filter((a) => a.id !== id && a._id !== id);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
