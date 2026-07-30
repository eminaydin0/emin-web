"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { siteConfig } from "@/data/site";

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-background-soft">
      <motion.div
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-foreground/[0.04] blur-3xl"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, -25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-brand relative text-center" data-reveal>
        <SectionReveal>
          <h2 className="text-[40px] font-semibold tracking-[-0.03em] text-foreground md:text-[56px]">
            Let’s talk.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[19px] leading-snug text-muted md:text-[21px]">
            {siteConfig.availability}. For product collaborations and thoughtful
            engineering conversations.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="apple-link focus-ring rounded-sm"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-link focus-ring rounded-sm"
            >
              GitHub ›
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-link focus-ring rounded-sm"
            >
              LinkedIn ›
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
