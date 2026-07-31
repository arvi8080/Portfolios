import { NextRequest, NextResponse } from 'next/server';
import { connectDB, inMemoryStore } from '@/lib/db';
import Message from '@/models/Message';
import { getAdminSession } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

const MessageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const isConnected = await connectDB();
    if (isConnected) {
      const messages = await Message.find({}).sort({ createdAt: -1 });
      return NextResponse.json(messages);
    }
    return NextResponse.json(inMemoryStore.messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(inMemoryStore.messages);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = rateLimit(ip, 3, 60000); // 3 messages per minute limit

    if (!rateCheck.success) {
      return NextResponse.json({ error: 'Too many messages sent. Please try again in 1 minute.' }, { status: 429 });
    }

    const body = await req.json();
    const validated = MessageSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: 'Invalid message data', details: validated.error.format() }, { status: 400 });
    }

    const isConnected = await connectDB();
    if (isConnected) {
      const newMsg = await Message.create(validated.data);
      return NextResponse.json({ success: true, message: 'Message sent successfully!', data: newMsg }, { status: 201 });
    } else {
      const newMsg = {
        id: 'msg-' + Date.now(),
        ...validated.data,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      inMemoryStore.messages.unshift(newMsg);
      return NextResponse.json({ success: true, message: 'Message sent successfully!', data: newMsg }, { status: 201 });
    }
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
