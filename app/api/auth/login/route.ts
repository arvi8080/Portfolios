import { NextRequest, NextResponse } from 'next/server';
import { signToken, setAdminAuthCookie, comparePassword, hashPassword } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { connectDB, inMemoryStore } from '@/lib/db';
import User from '@/models/User';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = rateLimit(ip, 5, 60000); // 5 attempts per minute

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please wait 1 minute.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validated = LoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: 'Invalid input format' }, { status: 400 });
    }

    const { email, password } = validated.data;

    const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.dev';
    const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';

    const isConnected = await connectDB();

    if (isConnected) {
      let user = await User.findOne({ email });

      // Seed default admin if user table empty
      if (!user && email.toLowerCase() === defaultAdminEmail.toLowerCase()) {
        const hashedPassword = await hashPassword(defaultAdminPassword);
        user = await User.create({
          email: defaultAdminEmail,
          passwordHash: hashedPassword,
          name: 'Portfolio Admin',
          role: 'admin',
        });
      }

      if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const isValidPassword = await comparePassword(password, user.passwordHash);
      if (!isValidPassword) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const token = signToken({ email: user.email, role: user.role });
      await setAdminAuthCookie(token);

      return NextResponse.json({
        success: true,
        user: { email: user.email, name: user.name, role: user.role },
      });
    } else {
      // In-Memory fallback authentication
      if (
        email.toLowerCase() === defaultAdminEmail.toLowerCase() &&
        password === defaultAdminPassword
      ) {
        const token = signToken({ email: defaultAdminEmail, role: 'admin' });
        await setAdminAuthCookie(token);
        return NextResponse.json({
          success: true,
          user: { email: defaultAdminEmail, name: 'Portfolio Admin', role: 'admin' },
        });
      } else {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
