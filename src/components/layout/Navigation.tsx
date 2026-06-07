"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { Clock } from "@/components/shared/Clock";

interface NavigationProps {
  onOpenCommand: () => void;
}

export function Navigation({ onOpenCommand }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "glass-strong border-b border-white/5 py-3"
            : "bg-transparent py-5"
        )}
      >
        <nav
          className="container-wide flex items-center justify-between px-6 md:px-12"
          aria-label="Main navigation"
        >
          <Link
            href="#hero"
            className="group flex items-center gap-3 focus-ring rounded-lg"
            data-cursor="pointer"
          >
            <div className="relative h-9 w-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center transition-all group-hover:border-violet-500/30 group-hover:bg-violet-500/10">
              <span className="font-display text-sm font-bold text-gradient-accent">
                EA
              </span>
            </div>
            <span className="hidden sm:block text-sm font-medium text-white/80">
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm transition-colors rounded-full focus-ring",
                    isActive ? "text-white" : "text-white/50 hover:text-white/80"
                  )}
                  data-cursor="pointer"
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-white/5 border border-white/10"
                      transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Clock />
            <button
              onClick={onOpenCommand}
              className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/40 hover:text-white/60 hover:border-white/20 transition-all focus-ring"
              aria-label="Open command palette"
              data-cursor="pointer"
            >
              <Command className="h-3 w-3" />
              <kbd className="font-mono">⌘K</kbd>
            </button>
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/90 transition-colors focus-ring"
              data-cursor="pointer"
            >
              İletişim
            </Link>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors focus-ring"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] z-40 glass-strong border-b border-white/5 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-4 py-3 text-lg text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
