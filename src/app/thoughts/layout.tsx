import { Navigation } from "@/components/brand/Navigation";
import { SiteFooter } from "@/components/brand/SiteFooter";

export default function ThoughtsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
      <SiteFooter />
    </>
  );
}
