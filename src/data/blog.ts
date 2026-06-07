export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Butter-Smooth Scroll Experiences with Lenis & GSAP",
    excerpt:
      "A deep dive into creating cinematic scroll narratives without sacrificing performance or accessibility.",
    date: "May 2025",
    readTime: "8 min",
    category: "Animation",
    slug: "smooth-scroll-lenis-gsap",
  },
  {
    id: "2",
    title: "React Server Components in Production: Lessons Learned",
    excerpt:
      "What we discovered migrating a 200K LOC dashboard to RSC — the wins, pitfalls, and patterns that worked.",
    date: "April 2025",
    readTime: "12 min",
    category: "React",
    slug: "rsc-production-lessons",
  },
  {
    id: "3",
    title: "Design Tokens at Scale: A Practical Architecture",
    excerpt:
      "How to structure tokens for multi-brand design systems that developers actually want to use.",
    date: "March 2025",
    readTime: "10 min",
    category: "Design Systems",
    slug: "design-tokens-at-scale",
  },
  {
    id: "4",
    title: "WebGL for Frontend Engineers: A Gentle Introduction",
    excerpt:
      "You don't need a graphics degree. Start creating immersive 3D experiences with React Three Fiber today.",
    date: "February 2025",
    readTime: "15 min",
    category: "WebGL",
    slug: "webgl-for-frontend-engineers",
  },
];
