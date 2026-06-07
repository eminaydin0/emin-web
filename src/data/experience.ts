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
    role: "Front-End Developer",
    period: "2025 — 2026",
    location: "Kayseri",
    description:
      "Chatbot AI projelerinde yapay zeka destekli, ölçeklenebilir chatbot arayüzleri geliştirdim.",
    achievements: [
      "React ve React Native ile kullanıcı etkileşimini artıran chatbot arayüzleri",
      "AloHasar mobil yönetim sistemi — avukat, acente ve muhasebe süreçleri",
      "Swaplly ürün takas platformu mobil uygulama geliştirme",
      "Şişli ve Sarıyer Belediyesi kurumsal web siteleri frontend geliştirme",
    ],
    technologies: ["React", "React Native", "TypeScript", "Ant Design"],
  },
  {
    id: "2",
    company: "HEXAWORKS",
    role: "Front-End Developer",
    period: "2024 — 2025",
    location: "İstanbul",
    description:
      "Muhaberat ve Controlizer projelerinde modern ve ölçeklenebilir kullanıcı arayüzleri geliştirdim.",
    achievements: [
      "React ve TypeScript ile modüler frontend mimarisi",
      "Performans optimizasyonu ve UI iyileştirmeleri",
      "Ant Design ve Mantine UI kütüphanelerinin etkin kullanımı",
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
      "TakipKira, Erciyes Üniversitesi Omega Tree ve Chatbot AI projelerinde aktif rol aldım.",
    achievements: [
      "React ve TypeScript ile sürdürülebilir kullanıcı arayüzleri",
      "Takım içi iş birliği ile zamanında proje teslimi",
      "Ölçeklenebilir ve yeniden kullanılabilir component yapıları",
    ],
    technologies: ["React", "TypeScript", "JavaScript", "Mantine"],
  },
];
