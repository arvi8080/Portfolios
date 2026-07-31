import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Skill from '@/models/Skill';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      const skills = await Skill.find({}).sort({ category: 1, proficiency: -1 });
      return NextResponse.json(skills);
    }
    return NextResponse.json(inMemoryStore.skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(inMemoryStore.skills);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const isConnected = await connectDB();
    if (isConnected) {
      const skill = await Skill.create(body);
      return NextResponse.json(skill, { status: 201 });
    } else {
      const skill = { id: 'skill-' + Date.now(), ...body };
      inMemoryStore.skills.push(skill);
      return NextResponse.json(skill, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
