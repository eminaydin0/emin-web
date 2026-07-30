"use client";

import { SectionReveal } from "@/components/brand/SectionReveal";
import { TextReveal } from "@/components/brand/TextReveal";
import { playgroundItems, type PlaygroundItem } from "@/data/playground";
import { cn } from "@/lib/utils";

const statusLabel: Record<PlaygroundItem["status"], string> = {
  exploring: "Exploring",
  building: "Building",
  shipped: "Shipped",
};

const statusTone: Record<PlaygroundItem["status"], string> = {
  exploring: "text-muted bg-background-soft border-border",
  building: "text-accent bg-accent-soft border-transparent",
  shipped: "text-foreground bg-white border-border",
};

export function Playground() {
  return (
    <section id="playground" className="section-pad relative bg-background-soft/70">
      <div className="container-brand">
        <SectionReveal variant="clip">
          <p className="font-mono text-[12px] tracking-[0.16em] text-muted uppercase">
            Creative playground
          </p>
        </SectionReveal>
        <TextReveal
          as="h2"
          delay={0.05}
          className="mt-6 max-w-2xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-foreground"
        >
          Experiments in motion, AI, and product form.
        </TextReveal>
        <SectionReveal delay={0.1}>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted">
            Side studies that sharpen judgment — not demos for demos’ sake.
          </p>
        </SectionReveal>

        <div className="mt-14 border-t border-border md:mt-16">
          {playgroundItems.map((item, index) => (
            <SectionReveal key={item.id} delay={index * 0.04}>
              <article className="grid gap-4 border-b border-border py-8 md:grid-cols-[140px_1fr] md:gap-10 md:py-10 lg:grid-cols-[140px_1fr_180px]">
                <div className="flex items-start gap-3 md:block">
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide",
                      statusTone[item.status]
                    )}
                  >
                    {statusLabel[item.status]}
                  </span>
                  <p className="font-mono text-[12px] text-muted-soft md:mt-3">
                    {item.category}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:justify-end md:self-start">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12px] text-muted-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
