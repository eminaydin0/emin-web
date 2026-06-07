"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll("[data-exp-item]");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="experience"
      className="section-padding relative"
      aria-label="Experience"
    >
      <div className="container-wide">
        <SectionHeading
          label="Deneyim"
          title="Kariyer yolculuğum"
          description="Yüksek etkili ürünler geliştirdiğim profesyonel deneyimlerim."
        />

        <div ref={sectionRef} className="relative max-w-3xl mx-auto">
          <div className="absolute left-[27px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-indigo-500/20 to-transparent" />

          {experience.map((exp, i) => (
            <div
              key={exp.id}
              data-exp-item
              className={`relative flex gap-8 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden md:block md:w-1/2" />

              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="h-14 w-14 rounded-2xl border border-violet-500/30 bg-[#030308] flex items-center justify-center font-display font-bold text-sm text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                >
                  {exp.company.charAt(0)}
                </motion.div>
              </div>

              <div className="flex-1 md:w-1/2 pl-20 md:pl-0">
                <div className="glass rounded-2xl p-6 hover:border-white/15 transition-all duration-300 group">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-violet-400">
                      {exp.period}
                    </span>
                    <span className="text-xs text-white/30">·</span>
                    <span className="text-xs text-white/40">{exp.location}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-gradient-accent transition-all">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-white/50 mt-1">{exp.company}</p>
                  <p className="mt-4 text-sm text-white/50 leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {exp.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-2 text-sm text-white/40"
                      >
                        <span className="text-violet-400 mt-1 shrink-0">→</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="accent">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
