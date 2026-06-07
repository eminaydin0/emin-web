export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  metric: string;
  metricLabel: string;
  description: string;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "AloHasar Yönetim Sistemi",
    client: "DREAXM",
    metric: "6+",
    metricLabel: "Rol bazlı panel",
    description:
      "Admin, Acente, Muhasebe, Çağrı Merkezi ve Müşteri panelleri ile operasyon yönetim platformu.",
    tags: ["React", "TypeScript", "Dashboard"],
  },
  {
    id: "2",
    title: "GAI Psychology Platform",
    client: "GAI Psychology",
    metric: "4",
    metricLabel: "Kullanıcı paneli",
    description:
      "Psikolog, Danışan ve Uzman panelleri ile psikolojik danışmanlık süreç yönetimi.",
    tags: ["React", "API", "UX"],
  },
  {
    id: "3",
    title: "Omega Tree Admin Panel",
    client: "Omega Tree",
    metric: "5",
    metricLabel: "Operasyon modülü",
    description:
      "Laboratuvar kit gönderimi, örnek takibi ve süreç yönetimi için admin panel geliştirme.",
    tags: ["React", "Mantine", "SaaS"],
  },
];
