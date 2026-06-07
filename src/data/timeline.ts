export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export const journeyTimeline: TimelineEvent[] = [
  {
    year: "2021",
    title: "Bilgisayar Programcılığı",
    description: "Amasya Merzifon MYO'da eğitime başladım, yazılım yolculuğum başladı.",
    icon: "🎓",
  },
  {
    year: "2023",
    title: "PROCCES.TECH",
    description: "Kayseri'de Front-End Developer olarak profesyonel kariyerime başladım.",
    icon: "💼",
  },
  {
    year: "2024",
    title: "HEXAWORKS — İstanbul",
    description: "Muhaberat ve Controlizer projelerinde React & TypeScript ile çalıştım.",
    icon: "🚀",
  },
  {
    year: "2025",
    title: "DREAXM & Kurumsal Projeler",
    description: "Chatbot AI, AloHasar, belediye siteleri ve mobil uygulamalar.",
    icon: "⚡",
  },
  {
    year: "2026",
    title: "Portfolyo & Hedefler",
    description: "Özgün ürünler geliştirmeyi ve kendi yazılım şirketimi kurmayı hedefliyorum.",
    icon: "✨",
  },
];
