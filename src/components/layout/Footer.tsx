"use client";

import { ArrowUp, Heart } from "lucide-react";
import Link from "next/link";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { siteConfig, navLinks } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/5 section-padding pb-8" role="contentinfo">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
              <span className="font-display text-xs font-bold text-gradient-accent">
                EA
              </span>
            </div>
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} {siteConfig.name}. Crafted with{" "}
              <Heart className="inline h-3 w-3 text-red-400" aria-hidden="true" />{" "}
              and too much coffee.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <SocialLinks iconClassName="h-4 w-4" />
            <nav className="flex flex-wrap justify-center gap-4" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors focus-ring rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 rounded-full border border-white/10 text-white/30 hover:text-white hover:border-white/20 transition-all focus-ring"
            aria-label="Scroll to top"
            data-cursor="pointer"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
