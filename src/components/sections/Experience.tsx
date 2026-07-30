"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { experience } from "@/data/experience";

export function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="section-pad bg-background-soft">
      <div className="container-brand">
        <SectionReveal>
          <h2 className="text-center text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            Experience.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[19px] text-muted md:text-[21px]">
            A path through product surfaces that had to work.
          </p>
        </SectionReveal>

        <div className="mx-auto mt-12 max-w-[720px] space-y-4" data-stagger>
          {experience.map((item, index) => (
            <motion.div
              key={item.id}
              data-stagger-item
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="tile bg-white p-7 md:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-foreground">
                  {item.role}
                </h3>
                <p className="text-[14px] text-muted-soft">{item.period}</p>
              </div>
              <p className="mt-1 text-[17px] text-accent">{item.company}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-[17px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
