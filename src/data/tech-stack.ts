export interface TechCategory {
  name: string;
  items: { name: string; abbr: string; color: string }[];
}

export const techStack: TechCategory[] = [
  {
    name: "Frontend",
    items: [
      { name: "React", abbr: "Rc", color: "#61DAFB" },
      { name: "Next.js", abbr: "Nx", color: "#ffffff" },
      { name: "TypeScript", abbr: "TS", color: "#3178C6" },
      { name: "Tailwind", abbr: "Tw", color: "#38BDF8" },
      { name: "Framer Motion", abbr: "Fm", color: "#BB4BE4" },
      { name: "Three.js", abbr: "3D", color: "#049EF4" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", abbr: "Nd", color: "#68A063" },
      { name: "GraphQL", abbr: "Gq", color: "#E535AB" },
      { name: "tRPC", abbr: "Tr", color: "#2596BE" },
      { name: "Prisma", abbr: "Pr", color: "#2D3748" },
    ],
  },
  {
    name: "Database",
    items: [
      { name: "PostgreSQL", abbr: "Pg", color: "#336791" },
      { name: "Redis", abbr: "Rd", color: "#DC382D" },
      { name: "Supabase", abbr: "Sb", color: "#3ECF8E" },
      { name: "MongoDB", abbr: "Mg", color: "#47A248" },
    ],
  },
  {
    name: "Cloud",
    items: [
      { name: "Vercel", abbr: "Vc", color: "#ffffff" },
      { name: "AWS", abbr: "Aw", color: "#FF9900" },
      { name: "Docker", abbr: "Dk", color: "#2496ED" },
      { name: "Cloudflare", abbr: "Cf", color: "#F38020" },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Figma", abbr: "Fg", color: "#F24E1E" },
      { name: "Git", abbr: "Gt", color: "#F05032" },
      { name: "Storybook", abbr: "St", color: "#FF4785" },
      { name: "Playwright", abbr: "Pw", color: "#2EAD33" },
    ],
  },
];
