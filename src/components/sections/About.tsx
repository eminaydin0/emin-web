"use client";

import { SectionReveal } from "@/components/brand/SectionReveal";
import { aboutContent } from "@/data/site";

export function About() {
  return (
    <section id="about" className="section-pad bg-background-soft">
      <div className="container-brand">
        <SectionReveal>
          <p className="font-mono text-[12px] tracking-[0.14em] text-muted uppercase">
            {aboutContent.eyebrow}
          </p>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] font-semibold tracking-[-0.045em] text-foreground">
            {aboutContent.headline}
          </h2>
        </SectionReveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <SectionReveal delay={0.08}>
            <div className="space-y-6 text-[16px] leading-[1.75] text-muted md:text-[17px]">
              {aboutContent.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.14}>
            <ul className="space-y-0 border-t border-border">
              {aboutContent.focus.map((item) => (
                <li
                  key={item.label}
                  className="border-b border-border py-5"
                >
                  <p className="text-[15px] font-medium tracking-[-0.02em] text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
