export const siteConfig = {
  name: "Emin Aydın",
  title: "Software Developer",
  tagline:
    "Building the operational systems behind modern products — dashboards, ERP/CRM platforms, and AI-assisted tools designed to scale.",
  location: "Kayseri / Istanbul",
  email: "eminaydinyazilim@gmail.com",
  phone: "+90 553 882 7646",
  phoneRaw: "05538827646",
  github: "eminaydin0",
  githubUrl: "https://github.com/eminaydin0",
  linkedin: "https://www.linkedin.com/in/emin-ayd%C4%B1n-991139224/",
  instagram: "https://www.instagram.com/emnaydn0",
  availability: "Open to product collaborations",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Playground", href: "#playground" },
  { label: "Thoughts", href: "#thoughts" },
  { label: "Contact", href: "#contact" },
];

export const aboutContent = {
  eyebrow: "Who I am",
  headline: "I build the systems that run the business.",
  paragraphs: [
    "I didn’t fall into software for the craft alone — I stayed because of the problems it can absorb. Complex operations. Fragmented workflows. Teams drowning in tools that don’t talk to each other.",
    "My focus sits where product and operations meet: management panels, dashboards, ERP/CRM systems, and AI-assisted platforms that turn chaos into clarity for real organizations.",
    "The long game is clear — build my own software company and ship SaaS products used worldwide. Every project is practice for that ambition: end-to-end thinking, product judgment, and systems that earn trust.",
  ],
  journey: [
    {
      year: "Origin",
      title: "Curiosity became craft",
      text: "Started by breaking interfaces apart — not to copy them, but to understand why some tools feel inevitable and others feel heavy.",
    },
    {
      year: "Focus",
      title: "Operations over ornament",
      text: "Chose the hard surfaces: dashboards, ERP/CRM, multi-role admin systems — where clarity earns trust every day.",
    },
    {
      year: "Mindset",
      title: "Product, end to end",
      text: "Not just screens. Roles, flows, edge cases, and the quiet details that make software feel expensive.",
    },
    {
      year: "Mission",
      title: "Build companies, not demos",
      text: "Every shipment is rehearsal for a software company — global SaaS products that people depend on.",
    },
  ],
  focus: [
    { label: "Dashboards & admin systems", detail: "Clarity for operators at scale" },
    { label: "ERP / CRM platforms", detail: "Multi-role operational depth" },
    { label: "AI-assisted products", detail: "Intelligence woven into workflows" },
    { label: "Enterprise-grade UX", detail: "Calm interfaces for serious work" },
  ],
};

export interface FeaturedProject {
  id: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  narrative: string;
  outcomes: string[];
  stack: string[];
  href?: string;
  tone: "slate" | "indigo" | "zinc" | "rose";
  image?: string;
  imageAlt?: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "yes-tools",
    name: "YES.Tools",
    category: "Online education platform",
    year: "2025",
    summary:
      "An operations hub for modern learning — members, meetings, e-learning, coaching, and daily workflows in one panel.",
    narrative:
      "Built a dark, product-grade education console where coaches and operators run surveys, calendars, tasks, and learning programs without jumping tools.",
    outcomes: [
      "Members, meetings, surveys & e-learning modules",
      "Coach, planning, and task workflows in one surface",
      "AI-assisted operator experience on a live production panel",
    ],
    stack: ["React", "TypeScript", "Dashboard", "REST"],
    href: "https://panel.yes.tools/",
    tone: "rose",
    image: "/images/projects/yes-tools-dashboard.jpg",
    imageAlt: "YES.Tools education platform dashboard with coaching and quick actions",
  },
  {
    id: "alohasar",
    name: "AloHasar",
    category: "Multi-role operations platform",
    year: "2025",
    summary:
      "A unified control surface for claims, agencies, accounting, and call-center workflows.",
    narrative:
      "Designed and shipped role-based panels that keep legal, agency, and finance teams synchronized — without drowning operators in noise.",
    outcomes: [
      "Admin, agency, accounting, call center & client roles",
      "Operational clarity across claims lifecycle",
      "Production-ready React + TypeScript architecture",
    ],
    stack: ["React", "TypeScript", "Ant Design", "REST"],
    href: "https://app.aloyonetim.com/",
    tone: "indigo",
    image: "/images/projects/alohasar-dashboard.jpg",
    imageAlt: "AloHasar admin dashboard with claims, customers, and reports",
  },
  {
    id: "gai-psychology",
    name: "GAI Psychology",
    category: "Healthcare operations platform",
    year: "2025",
    summary:
      "Role-based counseling platform connecting admins, psychologists, and patients.",
    narrative:
      "Built structured dashboards and management flows for clinical operations — privacy-aware, role-precise, and calm under complexity.",
    outcomes: [
      "Admin, psychologist, client & specialist surfaces",
      "Dashboard-driven session & case oversight",
      "Clean multi-role information architecture",
    ],
    stack: ["React", "TypeScript", "REST", "State management"],
    href: "https://gaipsychology.com/",
    tone: "slate",
    image: "/images/projects/gai-dashboard.jpg",
    imageAlt: "GAI Psychology admin dashboard with revenue and play analytics",
  },
  {
    id: "omega-tree",
    name: "Omega Tree",
    category: "Laboratory operations console",
    year: "2024",
    summary:
      "Admin system for kit logistics, sample tracking, and lab process orchestration.",
    narrative:
      "Turned laboratory workflows into a coherent product surface — shipment, sampling, and status visibility in one operational spine.",
    outcomes: [
      "Multi-role laboratory admin architecture",
      "Kit & sample tracking flows",
      "Enterprise panel patterns with Mantine",
    ],
    stack: ["React", "TypeScript", "Mantine", "Dashboard"],
    href: "https://omegatree.com.tr/",
    tone: "zinc",
  },
];

/** Smaller client / marketing sites — kept secondary to featured platforms. */
export const sideSites = [
  {
    id: "kuraline",
    name: "Kuraline",
    href: "https://kuraline.xyz",
    note: "Landing & product site",
  },
  {
    id: "erdo-steel",
    name: "Erdo Steel Door",
    href: "https://erdosteeldoor.com.tr",
    note: "Brand website",
  },
  {
    id: "ema-steel",
    name: "EMA Steel Door",
    href: "https://emasteeldoor.com.tr",
    note: "Brand website",
  },
  {
    id: "las-vegas-spa",
    name: "Las Vegas Spa",
    href: "https://laswegasspa.com.tr",
    note: "Business website",
  },
  {
    id: "vizyon-gsm",
    name: "Vizyon GSM",
    href: "https://vizyongsm.net.tr/",
    note: "E-commerce & brand site",
  },
  {
    id: "kesoglu-kuafor",
    name: "Keşoğlu Kuaför",
    href: "https://www.kesoglukuafor.com.tr/",
    note: "Salon website",
  },
  {
    id: "kare-insaat",
    name: "Kare İnşaat",
    href: "https://kareinsaat.com.tr",
    note: "Construction website",
  },
];

export const skillGroups = [
  {
    name: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    name: "State & data",
    items: ["Zustand", "TanStack Query"],
  },
  {
    name: "Backend integration",
    items: ["REST", "JWT", "Auth0", "Swagger"],
  },
  {
    name: "Database",
    items: ["Supabase"],
  },
  {
    name: "DevOps & delivery",
    items: ["Vercel", "Git"],
  },
];
