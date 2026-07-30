"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { TextReveal } from "@/components/brand/TextReveal";
import { skillGroups } from "@/data/site";

const icons: Record<string, string> = {
  React: "R",
  TypeScript: "TS",
  "Next.js": "N",
  "Tailwind CSS": "Tw",
  Zustand: "Z",
  "TanStack Query": "TQ",
  REST: "API",
  JWT: "JWT",
  Auth0: "A0",
  Swagger: "Sw",
  Supabase: "Sb",
  Vercel: "▲",
  Git: "Git",
};

export function Skills() {
  return (
    <section id="stack" className="section-pad relative bg-transparent">
      <div className="container-brand">
        <SectionReveal variant="clip">
          <p className="font-mono text-[12px] tracking-[0.16em] text-muted uppercase">
            Stack
          </p>
        </SectionReveal>
        <TextReveal
          as="h2"
          delay={0.05}
          className="mt-6 max-w-2xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-foreground"
        >
          A focused ecosystem for shipping product systems.
        </TextReveal>
        <SectionReveal delay={0.1}>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted">
            Tools chosen for clarity, speed, and longevity — not novelty.
          </p>
        </SectionReveal>

        <div className="mt-16 space-y-12 md:mt-20 md:space-y-16">
          {skillGroups.map((group, index) => (
            <SectionReveal key={group.name} delay={index * 0.04}>
              <div className="grid gap-6 md:grid-cols-[180px_1fr] md:items-start md:gap-12">
                <h3 className="pt-2 text-sm font-medium tracking-[-0.01em] text-muted">
                  {group.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <motion.div
                      key={item}
                      data-cursor
                      whileHover={{ y: -3, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 24 }}
                      className="group inline-flex items-center gap-3 rounded-2xl bg-background-soft px-4 py-3 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[11px] font-semibold tracking-tight text-foreground shadow-[var(--shadow-sm)]">
                        {icons[item] ?? item.slice(0, 2)}
                      </span>
                      <span className="pr-1 text-[14px] font-medium tracking-[-0.02em] text-foreground">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
