"use client";

import { SectionReveal } from "@/components/brand/SectionReveal";
import { playgroundItems, type PlaygroundItem } from "@/data/playground";
import { cn } from "@/lib/utils";

const statusLabel: Record<PlaygroundItem["status"], string> = {
  exploring: "Exploring",
  building: "Building",
  shipped: "Shipped",
};

export function Playground() {
  return (
    <section id="playground" className="section-pad bg-background">
      <div className="container-brand">
        <SectionReveal>
          <h2 className="text-center text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            Creative playground.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[19px] text-muted md:text-[21px]">
            Experiments in motion, AI, and product form.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {playgroundItems.map((item, i) => (
            <SectionReveal key={item.id} delay={i * 0.04}>
              <article className="tile h-full bg-background-soft p-7 md:p-8">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[12px] font-medium",
                      item.status === "building"
                        ? "bg-accent-soft text-accent"
                        : "bg-white text-muted"
                    )}
                  >
                    {statusLabel[item.status]}
                  </span>
                  <span className="text-[12px] text-muted-soft">
                    {item.category}
                  </span>
                </div>
                <h3 className="mt-4 text-[21px] font-semibold tracking-[-0.02em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted md:text-[17px]">
                  {item.description}
                </p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
