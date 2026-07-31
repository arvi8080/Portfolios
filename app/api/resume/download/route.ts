import { NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Resume from '@/models/Resume';

export async function POST() {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      const doc = await Resume.findOneAndUpdate({}, { $inc: { downloadCount: 1 } }, { new: true, upsert: true });
      return NextResponse.json({ downloadCount: doc.downloadCount });
    } else {
      inMemoryStore.resume.downloadCount += 1;
      return NextResponse.json({ downloadCount: inMemoryStore.resume.downloadCount });
    }
  } catch (error) {
    console.error('Error incrementing download counter:', error);
    inMemoryStore.resume.downloadCount += 1;
    return NextResponse.json({ downloadCount: inMemoryStore.resume.downloadCount });
  }
}
