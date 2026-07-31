import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Experience from '@/models/Experience';
import { getAdminSession } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const isConnected = await connectDB();
    if (isConnected) {
      const updated = await Experience.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json(updated);
    } else {
      const idx = inMemoryStore.experiences.findIndex((e) => e.id === id || e._id === id);
      if (idx !== -1) {
        inMemoryStore.experiences[idx] = { ...inMemoryStore.experiences[idx], ...body };
        return NextResponse.json(inMemoryStore.experiences[idx]);
      }
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating experience:', error);
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
      await Experience.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    } else {
      inMemoryStore.experiences = inMemoryStore.experiences.filter((e) => e.id !== id && e._id !== id);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
