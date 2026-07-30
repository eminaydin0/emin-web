"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { skillGroups } from "@/data/site";

const allSkills = skillGroups.flatMap((g) => g.items);

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-28" />
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: reverse ? 28 : 34, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            data-cursor
            className="inline-flex shrink-0 items-center rounded-full bg-background-soft px-5 py-3 text-[15px] font-medium tracking-[-0.01em] text-foreground shadow-[var(--shadow-sm)]"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="stack" className="section-pad bg-background">
      <div className="container-brand">
        <SectionReveal>
          <h2 className="text-center text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            Built with a focused stack.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[19px] text-muted md:text-[21px]">
            Tools chosen for clarity, speed, and longevity.
          </p>
        </SectionReveal>
      </div>

      <div className="mt-12 space-y-3" data-reveal>
        <MarqueeRow items={allSkills} />
        <MarqueeRow items={[...allSkills].reverse()} reverse />
      </div>

      <div className="container-brand mt-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {skillGroups.map((group) => (
            <div
              key={group.name}
              data-stagger-item
              className="tile h-full bg-background-soft p-7 md:p-8"
            >
              <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-foreground">
                {group.name}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[17px] tracking-[-0.01em] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
