"use client";

import { SocialLinks } from "@/components/shared/SocialLinks";
import { siteConfig } from "@/data/portfolio";

export function LabFooter() {
  return (
    <footer className="relative z-10 border-t border-cyan-500/10 py-8 px-6" role="contentinfo">
      <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[10px] text-white/25 tracking-widest">
          © {new Date().getFullYear()} {siteConfig.name.toUpperCase()} LAB // ALL SYSTEMS NOMINAL
        </p>
        <SocialLinks iconClassName="h-4 w-4" />
        <p className="font-mono text-[10px] text-cyan-400/30">
          BUILD v2.0 // REACT + THREE.JS
        </p>
      </div>
    </footer>
  );
}
