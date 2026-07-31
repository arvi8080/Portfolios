import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Project from '@/models/Project';
import { getAdminSession } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { z } from 'zod';

const ProjectSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  fullDetails: z.string().optional(),
  techStack: z.array(z.string()),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  imageUrl: z.string(),
  category: z.string().default('Full-Stack'),
  featured: z.boolean().default(false),
});

export async function GET() {
  try {
    const isConnected = await connectDB();
    if (isConnected) {
      const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
      return NextResponse.json(projects);
    }
    return NextResponse.json(inMemoryStore.projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(inMemoryStore.projects);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = ProjectSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: 'Validation failed', details: validated.error.format() }, { status: 400 });
    }

    const data = validated.data;
    const slug = slugify(data.title) + '-' + Date.now().toString().slice(-4);

    const isConnected = await connectDB();
    if (isConnected) {
      const newProject = await Project.create({ ...data, slug });
      return NextResponse.json(newProject, { status: 201 });
    } else {
      const newProject = {
        id: 'proj-' + Date.now(),
        slug,
        ...data,
        createdAt: new Date().toISOString(),
      };
      inMemoryStore.projects.unshift(newProject);
      return NextResponse.json(newProject, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
