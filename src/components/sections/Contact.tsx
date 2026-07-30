"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { MagneticButton } from "@/components/brand/MagneticButton";
import { siteConfig } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="section-pad bg-background">
      <div className="container-brand">
        <SectionReveal>
          <p className="font-mono text-[12px] tracking-[0.14em] text-muted uppercase">
            Contact
          </p>
          <h2 className="mt-5 max-w-2xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-foreground">
            Let’s build something that lasts.
          </h2>
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted">
            {siteConfig.availability}. For product collaborations, platforms,
            or thoughtful engineering conversations — reach out directly.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="mt-12 flex flex-col gap-8 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-muted">Email</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="focus-ring mt-2 inline-flex items-center gap-2 text-xl font-medium tracking-[-0.03em] text-foreground transition-colors hover:text-accent md:text-2xl"
              >
                {siteConfig.email}
                <ArrowUpRight className="h-5 w-5 opacity-50" />
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
