"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
    const onScroll = () => setScrolled(window.scrollY > 24);
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
        "fixed inset-x-0 top-0 z-50 transition-[background,border,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-border/80 bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between px-6 md:h-[4.25rem] md:px-10 lg:px-16">
        <a
          href={homeHref}
          className="focus-ring text-[15px] font-medium tracking-[-0.02em] text-foreground"
        >
          {siteConfig.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={resolveHref(link.href, pathname)}
              className="focus-ring text-[13px] text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={resolveHref("#contact", pathname)}
            className="focus-ring rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-foreground/90"
          >
            Get in touch
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="focus-ring relative flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span
            className={cn(
              "absolute h-px w-5 bg-foreground transition-transform duration-300",
              open ? "rotate-45" : "-translate-y-1.5"
            )}
          />
          <span
            className={cn(
              "absolute h-px w-5 bg-foreground transition-transform duration-300",
              open ? "-rotate-45" : "translate-y-1.5"
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-border bg-white px-6 py-8 md:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={resolveHref(link.href, pathname)}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-medium tracking-[-0.03em] text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={resolveHref("#contact", pathname)}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-fit rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
