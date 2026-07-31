import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Experience from '@/models/Experience';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      const exp = await Experience.find({}).sort({ createdAt: -1 });
      return NextResponse.json(exp);
    }
    return NextResponse.json(inMemoryStore.experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(inMemoryStore.experiences);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const isConnected = await connectDB();
    if (isConnected) {
      const exp = await Experience.create(body);
      return NextResponse.json(exp, { status: 201 });
    } else {
      const exp = { id: 'exp-' + Date.now(), ...body };
      inMemoryStore.experiences.unshift(exp);
      return NextResponse.json(exp, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
