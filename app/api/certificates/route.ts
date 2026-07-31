import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Certificate from '@/models/Certificate';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      const certs = await Certificate.find({}).sort({ createdAt: -1 });
      return NextResponse.json(certs);
    }
    return NextResponse.json(inMemoryStore.certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json(inMemoryStore.certificates);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const isConnected = await connectDB();
    if (isConnected) {
      const cert = await Certificate.create(body);
      return NextResponse.json(cert, { status: 201 });
    } else {
      const cert = { id: 'cert-' + Date.now(), ...body };
      inMemoryStore.certificates.unshift(cert);
      return NextResponse.json(cert, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating certificate:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
