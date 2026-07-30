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
    title: "What makes an admin panel feel expensive",
    excerpt:
      "Spacing, hierarchy, and restraint — the quiet details that separate enterprise tools people tolerate from products they trust.",
    date: "May 2026",
    readTime: "7 min",
    category: "Product",
    slug: "expensive-admin-panels",
  },
  {
    id: "2",
    title: "Role-based systems without drowning operators",
    excerpt:
      "Lessons from multi-role ERP/CRM surfaces — how to model permissions, navigation, and defaults for real operational teams.",
    date: "April 2026",
    readTime: "9 min",
    category: "Systems",
    slug: "role-based-systems",
  },
  {
    id: "3",
    title: "AI belongs inside the workflow, not beside it",
    excerpt:
      "Why bolt-on chat widgets fail — and how to weave assistance into the screens where decisions actually happen.",
    date: "March 2026",
    readTime: "6 min",
    category: "AI",
    slug: "ai-inside-workflows",
  },
  {
    id: "4",
    title: "From freelance screens to product companies",
    excerpt:
      "Notes on shifting from shipping interfaces to owning outcomes — judgment, scope, and the SaaS long game.",
    date: "February 2026",
    readTime: "8 min",
    category: "Career",
    slug: "screens-to-product-companies",
  },
];
