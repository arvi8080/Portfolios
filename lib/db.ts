import mongoose from 'mongoose';
import {
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
  INITIAL_EXPERIENCE,
  INITIAL_BLOGS,
  INITIAL_CERTIFICATES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_MESSAGES,
  INITIAL_RESUME,
  INITIAL_SEO,
  INITIAL_SOCIAL_LINKS,
  INITIAL_CODING_PROFILES,
} from './seed-data';

// In-Memory Data Store Fallback for local demo preview when DB is disconnected
const inMemoryStore = {
  projects: [...INITIAL_PROJECTS],
  skills: [...INITIAL_SKILLS],
  experiences: [...INITIAL_EXPERIENCE],
  blogs: [...INITIAL_BLOGS],
  certificates: [...INITIAL_CERTIFICATES],
  achievements: [...INITIAL_ACHIEVEMENTS],
  messages: [...INITIAL_MESSAGES],
  resume: { ...INITIAL_RESUME },
  seo: { ...INITIAL_SEO },
  socialLinks: [...INITIAL_SOCIAL_LINKS],
  codingProfiles: { ...INITIAL_CODING_PROFILES },
  analytics: [
    { path: '/', views: 1850, uniqueVisitors: 1240 },
    { path: '/projects', views: 1190, uniqueVisitors: 820 },
    { path: '/blog', views: 840, uniqueVisitors: 650 },
    { path: '/about', views: 720, uniqueVisitors: 510 },
    { path: '/resume', views: 610, uniqueVisitors: 412 },
  ],
};

export { inMemoryStore };

const MONGODB_URI = process.env.MONGODB_URI || '';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB(): Promise<boolean> {
  if (!MONGODB_URI || MONGODB_URI.includes('cluster0.mongodb.net/portfolio')) {
    return false;
  }

  if (cached?.conn) {
    return true;
  }

  if (!cached?.promise) {
    const opts = { bufferCommands: false };
    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached!.conn = await cached!.promise;
    return true;
  } catch (e) {
    cached!.promise = null;
    console.warn('MongoDB connection failed, operating with in-memory storage fallback.', e);
    return false;
  }
}
