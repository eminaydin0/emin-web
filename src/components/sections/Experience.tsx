"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { TextReveal } from "@/components/brand/TextReveal";
import { experience } from "@/data/experience";

export function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="section-pad relative bg-transparent">
      <div className="container-brand">
        <SectionReveal variant="clip">
          <p className="font-mono text-[12px] tracking-[0.16em] text-muted uppercase">
            Experience
          </p>
        </SectionReveal>
        <TextReveal
          as="h2"
          delay={0.05}
          className="mt-6 max-w-2xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-foreground"
        >
          A path through product surfaces that had to work.
        </TextReveal>

        <div className="relative mt-16 md:mt-20">
          <div
            className="absolute top-2 bottom-2 left-[7px] hidden w-px bg-border md:left-[11px] md:block"
            aria-hidden
          />

          <ol className="space-y-0">
            {experience.map((item, index) => (
              <li key={item.id} className="relative md:pl-12">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-t border-border/80 py-10 first:border-t-0 first:pt-0 md:py-12"
                >
                  <span
                    className="absolute top-12 left-0 hidden h-2.5 w-2.5 rounded-full border-2 border-accent bg-white md:top-14 md:left-[7px] md:block"
                    aria-hidden
                  />

                  <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-12">
                    <div>
                      <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">
                        {item.period}
                      </p>
                      <p className="mt-2 text-sm text-muted-soft">
                        {item.location}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground md:text-2xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-[15px] font-medium text-accent">
                        {item.company}
                      </p>
                      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted md:text-[16px]">
                        {item.description}
                      </p>

                      <ul className="mt-6 space-y-2.5">
                        {item.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex gap-3 text-sm leading-snug text-muted"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                            {achievement}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border bg-background-soft px-3 py-1 text-[12px] text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
