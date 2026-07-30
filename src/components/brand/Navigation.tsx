"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig, navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

function resolveHref(href: string, pathname: string) {
  if (href.startsWith("#") && pathname !== "/") {
    return `/${href}`;
  }
  return href;
}

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const homeHref = pathname === "/" ? "#hero" : "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "bg-[rgba(251,251,253,0.8)] backdrop-blur-[20px] backdrop-saturate-180"
          : "bg-[rgba(251,251,253,0.72)] backdrop-blur-[20px] backdrop-saturate-180"
      )}
    >
      <nav className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-5 md:px-6">
        <a
          href={homeHref}
          className="focus-ring text-[14px] font-semibold tracking-[-0.01em] text-foreground"
        >
          {siteConfig.name}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={resolveHref(link.href, pathname)}
              className="focus-ring text-[12px] text-foreground/80 transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
          <a
            href={resolveHref("#contact", pathname)}
            className="focus-ring rounded-full bg-accent px-3 py-1 text-[12px] font-normal text-white transition-colors hover:bg-accent-hover"
          >
            Contact
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="focus-ring relative flex h-9 w-9 items-center justify-center md:hidden"
        >
          <span
            className={cn(
              "absolute h-px w-4 bg-foreground transition-transform duration-300",
              open ? "rotate-45" : "-translate-y-1"
            )}
          />
          <span
            className={cn(
              "absolute h-px w-4 bg-foreground transition-transform duration-300",
              open ? "-rotate-45" : "translate-y-1"
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="border-t border-black/5 bg-[#fbfbfd] px-5 py-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={resolveHref(link.href, pathname)}
                  onClick={() => setOpen(false)}
                  className="text-[28px] font-semibold tracking-[-0.02em] text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
