export interface IProjectCaseStudy {
  architectureDiagram?: string;
  databaseDesign?: string;
  apiDocs?: string;
  challenges?: string[];
  lessonsLearned?: string[];
  performanceMetrics?: { label: string; value: string }[];
  screenshots?: string[];
  videoDemoUrl?: string;
}

export interface IProject {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  fullDetails?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  order?: number;
  createdAt?: string;
  caseStudy?: IProjectCaseStudy;
}

export interface ISkill {
  _id?: string;
  id?: string;
  name: string;
  category: string; // Programming Languages, Frontend, Backend, Database, Cloud, DevOps, Tools
  proficiency: number; // 0 to 100
  iconName?: string;
  featured: boolean;
}

export interface IExperience {
  _id?: string;
  id?: string;
  role: string;
  company: string;
  location?: string;
  period: string; // e.g., "Jan 2024 - Present"
  description: string;
  achievements?: string[];
  techStack?: string[];
  isCurrent?: boolean;
}

export interface IBlog {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown/MDX text
  category: string;
  tags: string[];
  coverImage: string;
  published: boolean;
  views?: number;
  readingTime?: number;
  publishedAt?: string;
  createdAt?: string;
}

export interface ICertificate {
  _id?: string;
  id?: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
  badgeUrl?: string;
}

export interface IAchievement {
  _id?: string;
  id?: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  link?: string;
}

export interface IMessage {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface IResume {
  fileUrl: string;
  version: string;
  downloadCount: number;
  updatedAt: string;
}

export interface IAnalytics {
  path: string;
  views: number;
  uniqueVisitors: number;
}

export interface ISEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
  canonicalUrl: string;
}

export interface ISocialLink {
  platform: 'GitHub' | 'LinkedIn' | 'LeetCode' | 'Codeforces' | 'GeeksforGeeks' | 'HackerRank' | 'Twitter' | 'Email';
  url: string;
  username?: string;
  iconName?: string;
}

export interface ICodingProfiles {
  leetcode: {
    username: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    contestRating: number;
    badgeTitle: string;
    globalRanking: number;
  };
  codeforces: {
    username: string;
    rating: number;
    maxRating: number;
    rankTitle: string;
    problemsSolved: number;
  };
  geeksforgeeks: {
    username: string;
    codingScore: number;
    problemsSolved: number;
    rank: string;
  };
  hackerrank: {
    username: string;
    badgesCount: number;
    stars: number;
  };
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
}
