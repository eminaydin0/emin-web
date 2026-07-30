"use client";

import { SectionReveal } from "@/components/brand/SectionReveal";
import { CountUp } from "@/components/brand/CountUp";
import { aboutContent } from "@/data/site";

export function About() {
  return (
    <section id="about" className="section-pad bg-background-soft">
      <div className="container-brand text-center">
        <SectionReveal>
          <h2 className="text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            {aboutContent.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[19px] leading-snug text-muted md:text-[21px]">
            {aboutContent.paragraphs[0]}
          </p>
        </SectionReveal>

        <div
          className="tile mt-12 grid grid-cols-3 gap-4 bg-white p-6 md:p-8"
          data-reveal
        >
          <div>
            <p className="text-[28px] font-semibold tracking-[-0.03em] text-foreground md:text-[40px]">
              <CountUp value={4} suffix="+" />
            </p>
            <p className="mt-1 text-[12px] text-muted md:text-[14px]">Years</p>
          </div>
          <div>
            <p className="text-[28px] font-semibold tracking-[-0.03em] text-foreground md:text-[40px]">
              <CountUp value={12} suffix="+" />
            </p>
            <p className="mt-1 text-[12px] text-muted md:text-[14px]">Products</p>
          </div>
          <div>
            <p className="text-[28px] font-semibold tracking-[-0.03em] text-foreground md:text-[40px]">
              <CountUp value={6} />
            </p>
            <p className="mt-1 text-[12px] text-muted md:text-[14px]">Roles shipped</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 text-left sm:grid-cols-2" data-stagger>
          {aboutContent.journey.map((step) => (
            <div
              key={step.title}
              data-stagger-item
              className="tile h-full bg-white p-7 md:p-8"
            >
              <p className="text-[12px] font-semibold tracking-wide text-accent uppercase">
                {step.year}
              </p>
              <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.02em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted md:text-[17px]">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-4 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4"
          data-stagger
        >
          {aboutContent.focus.map((item) => (
            <div
              key={item.label}
              data-stagger-item
              className="tile bg-white p-6"
            >
              <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                {item.label}
              </p>
              <p className="mt-2 text-[14px] text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
