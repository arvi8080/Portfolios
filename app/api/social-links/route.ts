import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import SocialLink from '@/models/SocialLink';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      const links = await SocialLink.find({});
      if (links.length === 0) {
        return NextResponse.json(inMemoryStore.socialLinks);
      }
      return NextResponse.json(links);
    }
    return NextResponse.json(inMemoryStore.socialLinks);
  } catch (error) {
    return NextResponse.json(inMemoryStore.socialLinks);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json(); // array of social links
    const isConnected = await connectDB();
    if (isConnected) {
      await SocialLink.deleteMany({});
      const updated = await SocialLink.insertMany(body);
      return NextResponse.json(updated);
    } else {
      inMemoryStore.socialLinks = body;
      return NextResponse.json(inMemoryStore.socialLinks);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
