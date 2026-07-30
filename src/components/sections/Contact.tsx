"use client";

import { SectionReveal } from "@/components/brand/SectionReveal";
import { TextReveal } from "@/components/brand/TextReveal";
import { MagneticButton } from "@/components/brand/MagneticButton";
import { siteConfig } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(47,111,237,0.06),transparent_70%)]" />

      <div className="container-brand relative">
        <SectionReveal variant="clip">
          <p className="font-mono text-[12px] tracking-[0.16em] text-muted uppercase">
            Contact
          </p>
        </SectionReveal>

        <TextReveal
          as="h2"
          delay={0.05}
          className="mt-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.055em] text-foreground"
        >
          Let’s build something that lasts.
        </TextReveal>

        <SectionReveal delay={0.1}>
          <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-muted md:text-[17px]">
            {siteConfig.availability}. For product collaborations, platforms,
            or thoughtful engineering conversations — reach out directly.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <div className="mt-14 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-muted">Email</p>
              <a
                href={`mailto:${siteConfig.email}`}
                data-cursor
                className="focus-ring group mt-3 inline-flex items-center gap-3 text-[clamp(1.25rem,3vw,2rem)] font-medium tracking-[-0.035em] text-foreground transition-colors hover:text-accent"
              >
                {siteConfig.email}
                <ArrowUpRight className="h-5 w-5 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton href={siteConfig.githubUrl} variant="ghost">
                GitHub
              </MagneticButton>
              <MagneticButton href={siteConfig.linkedin} variant="ghost">
                LinkedIn
              </MagneticButton>
              <MagneticButton
                href={`mailto:${siteConfig.email}`}
                variant="secondary"
              >
                Write an email
              </MagneticButton>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
