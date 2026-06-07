export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Emin, AloHasar projesinde çoklu rol panellerini hızlı ve kaliteli şekilde teslim etti. React bilgisi ve UI hassasiyeti çok güçlü.",
    author: "Proje Yöneticisi",
    role: "Teknik Lider",
    company: "DREAXM",
    avatar: "DY",
  },
  {
    id: "2",
    quote:
      "Component tabanlı mimari ve performans odaklı yaklaşımı sayesinde projelerimiz zamanında ve sürdürülebilir şekilde tamamlandı.",
    author: "Ekip Lideri",
    role: "Front-End Lead",
    company: "HEXAWORKS",
    avatar: "HL",
  },
  {
    id: "3",
    quote:
      "Takım çalışmasına yatkın, çözüm odaklı ve öğrenmeye açık. React Native mobil arayüzlerde de aynı kaliteyi koruyor.",
    author: "Kıdemli Geliştirici",
    role: "Full-Stack Developer",
    company: "PROCCES.TECH",
    avatar: "PT",
  },
];
