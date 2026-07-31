import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Certificate from '@/models/Certificate';
import { getAdminSession } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const isConnected = await connectDB();
    if (isConnected) {
      const updated = await Certificate.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json(updated);
    } else {
      const idx = inMemoryStore.certificates.findIndex((c) => c.id === id || c._id === id);
      if (idx !== -1) {
        inMemoryStore.certificates[idx] = { ...inMemoryStore.certificates[idx], ...body };
        return NextResponse.json(inMemoryStore.certificates[idx]);
      }
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating certificate:', error);
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
      await Certificate.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    } else {
      inMemoryStore.certificates = inMemoryStore.certificates.filter((c) => c.id !== id && c._id !== id);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
