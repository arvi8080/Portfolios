import { NextResponse } from 'next/server';
import { inMemoryStore } from '@/lib/db';

export async function GET() {
  try {
    return NextResponse.json(inMemoryStore.codingProfiles);
  } catch (error) {
    return NextResponse.json(inMemoryStore.codingProfiles);
  }
}
