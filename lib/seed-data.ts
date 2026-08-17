import {
  IProject,
  ISkill,
  IExperience,
  IBlog,
  ICertificate,
  IAchievement,
  IMessage,
  IResume,
  ISEO,
  ISocialLink,
  ICodingProfiles,
} from '@/types';

export const INITIAL_PROJECTS: IProject[] = [
  {
    id: 'proj-1',
    title: 'High-Throughput Microservice Ingestion Gateway',
    slug: 'high-throughput-microservice-ingestion-gateway',
    description: 'Distributed event ingestion platform processing 50,000+ msgs/sec with Kafka, Go, Next.js 15, and MongoDB.',
    fullDetails: 'Engineered an ultra-low latency event ingestion pipeline designed to ingest, validate, and store high-velocity event streams. Utilized Go goroutines and Kafka partition keys for concurrent stream handling.',
    techStack: ['Next.js 15', 'Go', 'Kafka', 'MongoDB', 'Redis', 'Docker'],
    githubUrl: 'https://github.com/arvi8080/event-ingestion-engine',
    liveUrl: 'https://event-ingestion.dev',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    category: 'Backend Architecture',
    featured: true,
    order: 1,
    createdAt: '2026-01-10T10:00:00.000Z',
    caseStudy: {
      architectureDiagram: 'Client HTTP/gRPC -> Go API Gateway -> Kafka Topic -> Worker Pool -> MongoDB LSM / Redis Cache',
      databaseDesign: 'Sharded MongoDB collection on event_type and timestamp with composite indices for O(log N) aggregation queries.',
      apiDocs: 'POST /api/v1/events (Payload: { event_id: string, timestamp: uint64, payload: json }) -> 202 Accepted',
      challenges: [
        'Preventing backpressure bottlenecks under sudden traffic spikes of 75k msgs/sec.',
        'Eliminating duplicate message deliveries using Redis distributed lock idempotency keys.'
      ],
      lessonsLearned: [
        'Optimized JSON serialization using gRPC protocol buffers, reducing wire bytes by 62%.',
        'Implemented non-blocking worker pools in Go to achieve p99 response latencies under 5ms.'
      ],
      performanceMetrics: [
        { label: 'Throughput', value: '52,000 msg/sec' },
        { label: 'p99 Latency', value: '4.2 ms' },
        { label: 'Memory RSS', value: '18 MB Base' }
      ]
    }
  },
  {
    id: 'proj-2',
    title: 'AI-Powered Resume Analysis & Career Platform',
    slug: 'ai-powered-resume-analysis-career-platform',
    description: 'Intelligent career matching platform parsing resumes, extracting skill graphs, and generating tailored ATS recommendations using OpenAI API & Next.js.',
    fullDetails: 'Full-stack AI SaaS application that converts PDF/Word resumes into structured JSON embeddings, comparing student profiles against software engineering job descriptions in real time.',
    techStack: ['Next.js 15', 'TypeScript', 'TailwindCSS', 'MongoDB', 'OpenAI API', 'Cloudinary'],
    githubUrl: 'https://github.com/arvi8080/ai-resume-platform',
    liveUrl: 'https://ai-career.dev',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    category: 'Full-Stack & AI',
    featured: true,
    order: 2,
    createdAt: '2026-01-15T12:00:00.000Z',
    caseStudy: {
      architectureDiagram: 'React / Next.js Client -> Server Actions -> PDF Text Extractor -> OpenAI Vector Embeddings -> MongoDB Atlas Vector Search',
      databaseDesign: 'MongoDB Atlas vector search index on 1536-dimensional embeddings with cosine similarity score ranking.',
      apiDocs: 'POST /api/analyze-resume (Multipart PDF) -> 200 OK { matchScore: 92%, missingSkills: ["Docker", "Kubernetes"] }',
      challenges: [
        'Handling multi-page unstructured PDF formatting inconsistencies.',
        'Optimizing vector similarity query speed across thousands of job postings.'
      ],
      lessonsLearned: [
        'Used Next.js 15 Server Actions to handle file uploads directly without API route overhead.',
        'Implemented streaming response chunks to render AI feedback progressive markdown to users.'
      ],
      performanceMetrics: [
        { label: 'Parsing Time', value: '1.4 Sec' },
        { label: 'Accuracy Score', value: '94.8%' },
        { label: 'Uptime', value: '99.9%' }
      ]
    }
  },
  {
    id: 'proj-3',
    title: 'Cloud-Native Distributed Tracing Dashboard',
    slug: 'cloud-native-observability-suite',
    description: 'Real-time distributed tracing, metrics aggregation, and dynamic alerting dashboard for microservices.',
    fullDetails: 'Custom telemetry collector paired with a high-speed TSDB query engine to monitor service mesh latencies, memory pressure, and HTTP error rates across multi-cluster environments.',
    techStack: ['Go', 'Kubernetes', 'Next.js 15', 'TypeScript', 'TailwindCSS', 'InfluxDB'],
    githubUrl: 'https://github.com/arvi8080/k8s-observability-suite',
    liveUrl: 'https://k8s-telemetry.dev',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    category: 'Cloud & DevOps',
    featured: true,
    order: 3,
    createdAt: '2026-01-20T14:15:00.000Z',
  },
];

export const INITIAL_SKILLS: ISkill[] = [
  // Programming Languages
  { id: 'skill-1', name: 'TypeScript / JavaScript', category: 'Programming Languages', proficiency: 95, iconName: 'Code2', featured: true },
  { id: 'skill-2', name: 'C# / .NET', category: 'Programming Languages', proficiency: 90, iconName: 'Cpu', featured: true },
  { id: 'skill-3', name: 'C++ / Python', category: 'Programming Languages', proficiency: 92, iconName: 'Terminal', featured: true },

  // Backend
  { id: 'skill-5', name: 'Node.js / Express', category: 'Backend', proficiency: 94, iconName: 'Server', featured: true },
  { id: 'skill-6', name: 'Next.js 15 App Router & Server Actions', category: 'Backend', proficiency: 96, iconName: 'Zap', featured: true },
  { id: 'skill-7', name: 'ASP.NET Core REST APIs', category: 'Backend', proficiency: 88, iconName: 'Network', featured: true },

  // Frontend
  { id: 'skill-9', name: 'React 19 / Next.js', category: 'Frontend', proficiency: 96, iconName: 'Layout', featured: true },
  { id: 'skill-10', name: 'Tailwind CSS & Framer Motion / GSAP', category: 'Frontend', proficiency: 95, iconName: 'Palette', featured: true },

  // Database
  { id: 'skill-12', name: 'MongoDB / Mongoose', category: 'Database', proficiency: 92, iconName: 'Database', featured: true },
  { id: 'skill-13', name: 'PostgreSQL / SQL Server', category: 'Database', proficiency: 88, iconName: 'TableGrid', featured: true },

  // Cloud & DevOps
  { id: 'skill-15', name: 'Azure / AWS Fundamentals', category: 'Cloud', proficiency: 86, iconName: 'Cloud', featured: true },
  { id: 'skill-16', name: 'Docker & GitHub Actions', category: 'DevOps', proficiency: 88, iconName: 'Box', featured: true },
];

export const INITIAL_EXPERIENCE: IExperience[] = [
  {
    id: 'exp-1',
    role: 'Software Engineer Intern',
    company: 'Tech Scale Labs',
    location: 'Remote',
    period: 'Jan 2025 - Present',
    description: 'Developing full-stack web features using Next.js 15, TypeScript, and MongoDB. Building RESTful microservices and optimizing database query performance.',
    achievements: [
      'Engineered automated REST API endpoints reducing client payload sizes by 35%.',
      'Implemented JWT HTTP-only cookie authentication and protected admin routes.',
      'Contributed to responsive UI component library using Tailwind CSS and Framer Motion.'
    ],
    techStack: ['Next.js 15', 'TypeScript', 'MongoDB', 'Node.js', 'TailwindCSS'],
    isCurrent: true,
  },
  {
    id: 'exp-2',
    role: 'Full-Stack Developer Intern',
    company: 'Digital Innovation Hub',
    location: 'Hybrid',
    period: 'Jun 2024 - Dec 2024',
    description: 'Built interactive web applications, integrated Cloudinary media pipelines, and implemented Zod schema validations for client forms.',
    achievements: [
      'Developed 5+ dynamic web dashboards with real-time analytics graphs.',
      'Optimized MongoDB Atlas queries to achieve sub-50ms API response speeds.'
    ],
    techStack: ['React', 'TypeScript', 'Express.js', 'MongoDB', 'Cloudinary'],
    isCurrent: false,
  },
];

export const INITIAL_BLOGS: IBlog[] = [
  {
    id: 'blog-1',
    title: 'Mastering Next.js 15 App Router: Server Components, Caching & Performance',
    slug: 'mastering-nextjs-15-app-router-performance',
    excerpt: 'Deep dive into Next.js 15 architectural patterns, dynamic server rendering, streaming, and optimizing database queries for modern web applications.',
    content: `# Mastering Next.js 15 App Router

Next.js 15 brings significant advancements to full-stack Web Architecture. In this article, we explore key concepts every Software Engineer should master.

## 1. Server Components vs Client Components

React Server Components (RSC) enable rendering on the server close to the database:

\`\`\`tsx
// Server Component fetching data directly
export default async function ProjectsPage() {
  const projects = await fetchProjectsFromDB();
  return <ProjectsGrid data={projects} />;
}
\`\`\`

### Key Benefits:
- **Zero Client Bundle Size**: Dependencies used inside RSCs are not shipped to the browser.
- **Direct Database Access**: Secure query execution without public API exposure.
`,
    category: 'Next.js & React',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Performance'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    published: true,
    views: 1420,
    readingTime: 6,
    publishedAt: '2026-01-28T10:00:00.000Z',
    createdAt: '2026-01-28T10:00:00.000Z',
  },
];

export const INITIAL_CERTIFICATES: ICertificate[] = [
  {
    id: 'cert-1',
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    issueDate: '2024-10',
    credentialUrl: 'https://learn.microsoft.com/verification',
    credentialId: 'MS-AZ900-998412',
    badgeUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'cert-2',
    title: 'GitHub Foundations Certification',
    issuer: 'GitHub',
    issueDate: '2025-01',
    credentialUrl: 'https://github.com/verification',
    credentialId: 'GH-FOUND-2025-992',
    badgeUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=300&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_ACHIEVEMENTS: IAchievement[] = [
  {
    id: 'achieve-1',
    title: '550+ Data Structures & Algorithms Problems Solved',
    organization: 'LeetCode & GeeksforGeeks',
    date: '2025-12',
    description: 'Solved over 550+ competitive programming challenges in C++, Java, and TypeScript.',
    link: 'https://leetcode.com/u/Arvind_8080/',
  },
  {
    id: 'achieve-2',
    title: 'Finalist - National Student Hackathon 2025',
    organization: 'Computer Engineering Society',
    date: '2025-09',
    description: 'Built a real-time collaborative cloud app within 24 hours, placing in the top 5 finalist teams.',
    link: 'https://hackathon.dev/winner-2025',
  },
];

export const INITIAL_MESSAGES: IMessage[] = [
  {
    id: 'msg-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@techfirm.com',
    subject: 'Software Engineer Role Opportunity',
    message: 'Hi Arvind! Impressed by your full-stack projects and DSA portfolio. We have an exciting Software Engineer opportunity. Would love to connect!',
    isRead: false,
    createdAt: '2026-07-28T14:20:00.000Z',
  },
];

export const INITIAL_RESUME: IResume = {
  fileUrl: 'https://drive.google.com/file/d/1tbWFrYGUEPeAtHoJcrhm4OujM2lkUFCh/view?usp=sharing',
  version: '2026-v1.0 (Arvind Prajapati)',
  downloadCount: 520,
  updatedAt: '2026-07-15T00:00:00.000Z',
};

export const INITIAL_SEO: ISEO = {
  metaTitle: 'Arvind Prajapati | Junior Developer Intern & Computer Engineering Student',
  metaDescription: 'Portfolio of Arvind Prajapati, a final-year Computer Engineering student & Software Engineer specializing in Next.js 15, ASP.NET Core, TypeScript, Cloud Native, and AI systems.',
  keywords: ['Arvind Prajapati', 'Software Engineer', 'Full Stack Developer', 'Computer Engineering', 'Next.js 15', 'ASP.NET Core', 'TypeScript', 'MongoDB'],
  ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
  twitterHandle: '@arvind_dev',
  canonicalUrl: 'https://arvind.dev',
};

export const INITIAL_SOCIAL_LINKS: ISocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/arvi8080', username: 'arvi8080', iconName: 'Github' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/Arvind_prajapati_in/', username: 'Arvind_prajapati_in', iconName: 'Linkedin' },
  { platform: 'LeetCode', url: 'https://leetcode.com/u/Arvind_8080/', username: 'Arvind_8080', iconName: 'Code2' },
  { platform: 'Codeforces', url: 'https://codeforces.com/profile/arvindprajapatijan86', username: 'arvindprajapatijan86', iconName: 'Trophy' },
  { platform: 'GeeksforGeeks', url: 'https://geeksforgeeks.org/user/arvindprajapatijan86', iconName: 'Terminal' },
  { platform: 'HackerRank', url: 'https://hackerrank.com/arvindprajapati6', username: 'arvindprajapatijan86', iconName: 'Award' },
];

export const INITIAL_CODING_PROFILES: ICodingProfiles = {
  leetcode: {
    username: 'Arvind_8080',
    totalSolved: 350,
    easySolved: 140,
    mediumSolved: 170,
    hardSolved: 40,
    contestRating: 1780,
    badgeTitle: '50 Days Badge 2025',
    globalRanking: 35000,
  },
  codeforces: {
    username: 'arvindprajapatijan86',
    rating: 1420,
    maxRating: 1480,
    rankTitle: 'Specialist',
    problemsSolved: 120,
  },
  geeksforgeeks: {
    username: 'arvindprajapatijan86',
    codingScore: 920,
    problemsSolved: 210,
    rank: 'Top 5% Institute',
  },
  hackerrank: {
    username: 'arvindprajapati6',
    badgesCount: 8,
    stars: 5,
  },
};
