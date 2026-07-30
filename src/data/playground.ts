export interface PlaygroundItem {
  id: string;
  title: string;
  status: "exploring" | "building" | "shipped";
  category: string;
  description: string;
  tags: string[];
}

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "ops-ai",
    title: "Ops Copilot sketches",
    status: "exploring",
    category: "AI",
    description:
      "Prototyping inline AI suggestions inside dashboard tables — summarize, flag anomalies, draft follow-ups without leaving the row.",
    tags: ["AI", "Dashboard", "UX"],
  },
  {
    id: "motion-system",
    title: "Motion grammar for panels",
    status: "building",
    category: "Animation",
    description:
      "A restrained motion language for enterprise UIs — enter, confirm, and reveal patterns that feel premium without slowing operators.",
    tags: ["Motion", "Design system"],
  },
  {
    id: "blueprint-3d",
    title: "Abstract product blueprint",
    status: "shipped",
    category: "3D",
    description:
      "The hero orb on this site — a lightweight R3F object tuned for clarity, not spectacle. Proof that 3D can stay quiet.",
    tags: ["R3F", "Three.js"],
  },
  {
    id: "saas-spine",
    title: "SaaS spine concepts",
    status: "exploring",
    category: "Product",
    description:
      "Early architecture notes for a multi-tenant ops platform — auth boundaries, role matrices, and billing-ready module seams.",
    tags: ["SaaS", "Architecture"],
  },
];
