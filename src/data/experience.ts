export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "1",
    company: "DREAXM",
    role: "Software Developer",
    period: "2025 — 2026",
    location: "Kayseri",
    description:
      "Shipped AI-assisted chat interfaces and multi-role operational products across web and mobile.",
    achievements: [
      "Built scalable chatbot surfaces with React & React Native",
      "Delivered AloHasar mobile operations for legal, agency, and accounting flows",
      "Contributed to Swaplly product exchange mobile experience",
      "Frontend delivery for Şişli & Sarıyer municipality sites",
    ],
    technologies: ["React", "React Native", "TypeScript", "Ant Design"],
  },
  {
    id: "2",
    company: "HEXAWORKS",
    role: "Front-End Developer",
    period: "2024 — 2025",
    location: "Istanbul",
    description:
      "Developed modern, scalable interfaces for Muhaberat and Controlizer product lines.",
    achievements: [
      "Modular React + TypeScript frontend architecture",
      "Performance and UI refinement across operational screens",
      "Effective Ant Design & Mantine system usage",
    ],
    technologies: ["React", "TypeScript", "Ant Design", "Mantine"],
  },
  {
    id: "3",
    company: "PROCCES.TECH",
    role: "Front-End Developer",
    period: "2023 — 2024",
    location: "Kayseri",
    description:
      "Active delivery on TakipKira, Erciyes University Omega Tree, and Chatbot AI initiatives.",
    achievements: [
      "Sustainable React + TypeScript interface systems",
      "Reliable delivery through close team collaboration",
      "Reusable component patterns for growing product surfaces",
    ],
    technologies: ["React", "TypeScript", "JavaScript", "Mantine"],
  },
];
