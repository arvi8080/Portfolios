import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Message from '@/models/Message';
import { getAdminSession } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const isConnected = await connectDB();
    if (isConnected) {
      const updated = await Message.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json(updated);
    } else {
      const idx = inMemoryStore.messages.findIndex((m) => m.id === id || m._id === id);
      if (idx !== -1) {
        inMemoryStore.messages[idx] = { ...inMemoryStore.messages[idx], ...body };
        return NextResponse.json(inMemoryStore.messages[idx]);
      }
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating message:', error);
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
      await Message.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    } else {
      inMemoryStore.messages = inMemoryStore.messages.filter((m) => m.id !== id && m._id !== id);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
