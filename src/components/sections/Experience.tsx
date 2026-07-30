"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { experience } from "@/data/experience";

export function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="bg-[#fbfbfd] py-24 md:py-32">
      <div className="mx-auto max-w-[980px] px-5 md:px-8">
        <SectionReveal>
          <p className="text-center text-[14px] font-semibold tracking-[-0.01em] text-foreground">
            Career
          </p>
          <h2 className="mt-3 text-center text-[40px] font-semibold tracking-[-0.03em] text-foreground md:text-[56px]">
            Experience.
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] text-center text-[19px] leading-snug tracking-[-0.01em] text-muted md:text-[21px]">
            From early product panels to live transit systems — always shipping
            surfaces people depend on.
          </p>
        </SectionReveal>

        <div className="mt-16 md:mt-20">
          {experience.map((item, index) => (
            <motion.article
              key={item.id}
              initial={
                reduce
                  ? false
                  : { opacity: 0, y: 24, filter: "blur(6px)" }
              }
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{
                duration: 0.75,
                delay: Math.min(index * 0.04, 0.12),
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`border-t border-[#d2d2d7]/70 py-10 md:py-14 ${
                index === experience.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-12 lg:gap-16">
                <div>
                  <p className="text-[13px] tracking-[-0.01em] text-muted-soft">
                    {item.period}
                    {item.current ? (
                      <span className="text-accent"> · Current</span>
                    ) : null}
                  </p>
                  <h3 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-foreground md:text-[34px]">
                    {item.company}
                  </h3>
                  <p className="mt-2 text-[17px] tracking-[-0.01em] text-muted">
                    {item.role}
                  </p>
                  <p className="mt-1 text-[14px] text-muted-soft">
                    {item.location}
                  </p>
                </div>

                <div className="md:pt-1">
                  <p className="text-[17px] leading-relaxed tracking-[-0.01em] text-muted md:text-[19px] md:leading-snug">
                    {item.description}
                  </p>

                  {item.achievements.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {item.achievements.slice(0, 3).map((line) => (
                        <li
                          key={line}
                          className="text-[15px] leading-snug tracking-[-0.01em] text-foreground/80 md:text-[16px]"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.technologies.length > 0 && (
                    <p className="mt-6 text-[13px] tracking-[-0.01em] text-muted-soft">
                      {item.technologies.join("  ·  ")}
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
