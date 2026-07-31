import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Analytics from '@/models/Analytics';

export async function GET() {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      const stats = await Analytics.find({}).sort({ views: -1 });
      return NextResponse.json(stats);
    }
    return NextResponse.json(inMemoryStore.analytics);
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json(inMemoryStore.analytics);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = body?.path || '/';

    const isConnected = await connectDB();
    if (isConnected) {
      const item = await Analytics.findOneAndUpdate(
        { path },
        { $inc: { views: 1, uniqueVisitors: 1 } },
        { new: true, upsert: true }
      );
      return NextResponse.json(item);
    } else {
      const item = inMemoryStore.analytics.find((a) => a.path === path);
      if (item) {
        item.views += 1;
      } else {
        inMemoryStore.analytics.push({ path, views: 1, uniqueVisitors: 1 });
      }
      return NextResponse.json({ path, success: true });
    }
  } catch (error) {
    return NextResponse.json({ success: true });
  }
}
