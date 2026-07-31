import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Skill from '@/models/Skill';
import { getAdminSession } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const isConnected = await connectDB();
    if (isConnected) {
      const updated = await Skill.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json(updated);
    } else {
      const idx = inMemoryStore.skills.findIndex((s) => s.id === id || s._id === id);
      if (idx !== -1) {
        inMemoryStore.skills[idx] = { ...inMemoryStore.skills[idx], ...body };
        return NextResponse.json(inMemoryStore.skills[idx]);
      }
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating skill:', error);
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
      await Skill.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    } else {
      inMemoryStore.skills = inMemoryStore.skills.filter((s) => s.id !== id && s._id !== id);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
