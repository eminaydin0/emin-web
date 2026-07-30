"use client";

import { SectionReveal } from "@/components/brand/SectionReveal";
import { skillGroups } from "@/data/site";

export function Skills() {
  return (
    <section id="stack" className="section-pad bg-background-soft">
      <div className="container-brand">
        <SectionReveal>
          <p className="font-mono text-[12px] tracking-[0.14em] text-muted uppercase">
            Stack
          </p>
          <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] font-semibold tracking-[-0.045em] text-foreground">
            A focused ecosystem for shipping product systems.
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
            Tools chosen for clarity, speed, and longevity — not novelty.
          </p>
        </SectionReveal>

        <div className="mt-16 space-y-0 border-t border-border md:mt-20">
          {skillGroups.map((group, index) => (
            <SectionReveal key={group.name} delay={index * 0.04}>
              <div className="grid gap-4 border-b border-border py-8 md:grid-cols-[200px_1fr] md:items-baseline md:gap-10 md:py-10">
                <h3 className="text-sm font-medium tracking-[-0.01em] text-foreground">
                  {group.name}
                </h3>
                <div className="flex flex-wrap gap-x-3 gap-y-3">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-transparent bg-white px-4 py-2 text-[14px] tracking-[-0.01em] text-foreground shadow-[var(--shadow-sm)] transition-colors hover:border-border"
                    >
                      {item}
                    </span>
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
