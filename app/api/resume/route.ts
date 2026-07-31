import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Resume from '@/models/Resume';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      let doc = await Resume.findOne({});
      if (!doc) {
        doc = await Resume.create(inMemoryStore.resume);
      }
      return NextResponse.json(doc);
    }
    return NextResponse.json(inMemoryStore.resume);
  } catch (error) {
    console.error('Error fetching resume info:', error);
    return NextResponse.json(inMemoryStore.resume);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const isConnected = await connectDB();
    if (isConnected) {
      const updated = await Resume.findOneAndUpdate({}, body, { new: true, upsert: true });
      return NextResponse.json(updated);
    } else {
      inMemoryStore.resume = { ...inMemoryStore.resume, ...body, updatedAt: new Date().toISOString() };
      return NextResponse.json(inMemoryStore.resume);
    }
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
