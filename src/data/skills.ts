export interface Skill {
  name: string;
  level: number;
  category: string;
  description: string;
}

export const skills: Skill[] = [
  {
    name: "React.js",
    level: 92,
    category: "Frontend",
    description: "Component tabanlı mimari, state management, dashboard ve panel geliştirme",
  },
  {
    name: "React Native",
    level: 85,
    category: "Mobile",
    description: "iOS & Android uyumlu, performanslı mobil arayüzler",
  },
  {
    name: "TypeScript",
    level: 88,
    category: "Language",
    description: "Tip güvenli, modüler ve sürdürülebilir kod yapıları",
  },
  {
    name: "JavaScript (ES6+)",
    level: 90,
    category: "Language",
    description: "Modern JavaScript, async/await, modüler yapılar",
  },
  {
    name: "UI Kütüphaneleri",
    level: 87,
    category: "UI/UX",
    description: "Ant Design ve Mantine ile enterprise arayüzler",
  },
  {
    name: "Responsive Tasarım",
    level: 90,
    category: "UI/UX",
    description: "HTML5, CSS3 ile mobil-öncelikli responsive arayüzler",
  },
  {
    name: "Performans",
    level: 82,
    category: "Engineering",
    description: "Optimizasyon, yeniden kullanılabilir ve modüler yapılar",
  },
  {
    name: "API Entegrasyonu",
    level: 86,
    category: "Engineering",
    description: "REST API entegrasyonları ve veri yönetimi",
  },
];
