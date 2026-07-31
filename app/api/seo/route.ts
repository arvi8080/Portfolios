import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import SEO from '@/models/SEO';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      let doc = await SEO.findOne({});
      if (!doc) {
        doc = await SEO.create(inMemoryStore.seo);
      }
      return NextResponse.json(doc);
    }
    return NextResponse.json(inMemoryStore.seo);
  } catch (error) {
    return NextResponse.json(inMemoryStore.seo);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const isConnected = await connectDB();
    if (isConnected) {
      const updated = await SEO.findOneAndUpdate({}, body, { new: true, upsert: true });
      return NextResponse.json(updated);
    } else {
      inMemoryStore.seo = { ...inMemoryStore.seo, ...body };
      return NextResponse.json(inMemoryStore.seo);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
