import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Achievement from '@/models/Achievement';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      const items = await Achievement.find({}).sort({ createdAt: -1 });
      return NextResponse.json(items);
    }
    return NextResponse.json(inMemoryStore.achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json(inMemoryStore.achievements);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const isConnected = await connectDB();
    if (isConnected) {
      const item = await Achievement.create(body);
      return NextResponse.json(item, { status: 201 });
    } else {
      const item = { id: 'achieve-' + Date.now(), ...body };
      inMemoryStore.achievements.unshift(item);
      return NextResponse.json(item, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating achievement:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
