export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "web" | "mobile" | "saas" | "design";
  technologies: string[];
  year: string;
  featured: boolean;
  link?: string;
  github?: string;
  gradient: string;
  accent: string;
}

export const projects: Project[] = [
  {
    id: "alohasar",
    title: "AloHasar",
    description: "Avukat, acente ve muhasebe süreçlerine yönelik çoklu rol yönetim platformu.",
    longDescription:
      "Admin, Acente, Muhasebe, Çağrı Merkezi ve Müşteri panelleri ile operasyon yönetim sistemi.",
    category: "saas",
    technologies: ["React", "TypeScript", "Ant Design", "REST API"],
    year: "2025",
    featured: true,
    link: "https://app.aloyonetim.com/",
    gradient: "from-violet-600/30 via-purple-500/15 to-fuchsia-600/20",
    accent: "#8B5CF6",
  },
  {
    id: "gai-psychology",
    title: "GAI Psychology",
    description: "Psikolojik danışmanlık süreçlerine yönelik rol bazlı platform.",
    longDescription:
      "Admin, Psikolog, Danışan ve Uzman panelleri ile dashboard ve yönetim ekranları.",
    category: "saas",
    technologies: ["React", "TypeScript", "State Management", "REST API"],
    year: "2025",
    featured: true,
    link: "https://gaipsychology.com/",
    gradient: "from-blue-600/30 via-indigo-500/15 to-violet-600/20",
    accent: "#3B82F6",
  },
  {
    id: "omega-tree",
    title: "Omega Tree",
    description: "Laboratuvar operasyonları ve süreç yönetimi admin paneli.",
    longDescription:
      "Kit gönderimi, örnek takibi ve laboratuvar süreçleri için çoklu rol panel mimarisi.",
    category: "saas",
    technologies: ["React", "TypeScript", "Mantine", "Dashboard"],
    year: "2024",
    featured: true,
    link: "https://omegatree.com.tr/",
    gradient: "from-emerald-600/30 via-teal-500/15 to-cyan-600/20",
    accent: "#10B981",
  },
  {
    id: "swaplly",
    title: "Swaplly",
    description: "Ürün takas platformu mobil uygulaması.",
    longDescription:
      "Performanslı, ölçeklenebilir ve kullanıcı odaklı mobil arayüzler.",
    category: "mobile",
    technologies: ["React Native", "TypeScript", "REST API"],
    year: "2025",
    featured: false,
    gradient: "from-orange-600/30 via-amber-500/15 to-yellow-600/20",
    accent: "#F59E0B",
  },
  {
    id: "belediye",
    title: "Belediye Web Siteleri",
    description: "Şişli ve Sarıyer Belediyesi kurumsal web siteleri.",
    longDescription:
      "Responsive tasarım, performans optimizasyonu ve kullanıcı deneyimi iyileştirmeleri.",
    category: "web",
    technologies: ["React", "HTML5", "CSS3", "Responsive"],
    year: "2025",
    featured: false,
    gradient: "from-sky-600/30 via-blue-500/15 to-indigo-600/20",
    accent: "#0EA5E9",
  },
  {
    id: "chatbot-ai",
    title: "Chatbot AI",
    description: "Yapay zeka destekli, ölçeklenebilir chatbot arayüzleri.",
    longDescription:
      "React ve React Native ile kullanıcı etkileşimini artıran AI chatbot deneyimleri.",
    category: "saas",
    technologies: ["React", "React Native", "AI", "TypeScript"],
    year: "2025",
    featured: false,
    gradient: "from-rose-600/30 via-pink-500/15 to-fuchsia-600/20",
    accent: "#EC4899",
  },
];

export const projectCategories = [
  { id: "all", label: "Tümü" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobil" },
  { id: "saas", label: "SaaS" },
  { id: "design", label: "Tasarım" },
];
