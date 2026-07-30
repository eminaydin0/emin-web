"use client";

import { SectionReveal } from "@/components/brand/SectionReveal";
import { TextReveal } from "@/components/brand/TextReveal";
import { aboutContent } from "@/data/site";

export function About() {
  return (
    <section id="about" className="section-pad relative bg-transparent">
      <div className="container-brand">
        <SectionReveal variant="clip">
          <p className="font-mono text-[12px] tracking-[0.16em] text-muted uppercase">
            {aboutContent.eyebrow}
          </p>
        </SectionReveal>

        <TextReveal
          as="h2"
          delay={0.05}
          className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-foreground"
        >
          {aboutContent.headline}
        </TextReveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <SectionReveal delay={0.08}>
            <div className="space-y-6 text-[16px] leading-[1.8] text-muted md:text-[17px]">
              {aboutContent.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <ol className="relative space-y-0 border-l border-border pl-6 md:pl-8">
              {aboutContent.journey.map((step, i) => (
                <li key={step.title} className="relative pb-10 last:pb-0">
                  <span className="absolute top-1.5 -left-[31px] h-2.5 w-2.5 rounded-full border-2 border-accent bg-white md:-left-[39px]" />
                  <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                    {step.year}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {step.text}
                  </p>
                  {i < aboutContent.journey.length - 1 && (
                    <span className="sr-only">Next</span>
                  )}
                </li>
              ))}
            </ol>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.1}>
          <ul className="mt-20 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
            {aboutContent.focus.map((item) => (
              <li
                key={item.label}
                className="bg-background px-6 py-7 transition-colors hover:bg-background-soft md:px-8 md:py-8"
              >
                <p className="text-[15px] font-medium tracking-[-0.02em] text-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
