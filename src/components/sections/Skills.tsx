"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { skills } from "@/data/skills";
import { cn } from "@/lib/utils";

const SkillsOrb = dynamic(
  () => import("@/components/three/SkillsOrb").then((m) => m.SkillsOrb),
  { ssr: false, loading: () => <div className="h-[400px] animate-pulse bg-white/5 rounded-2xl" /> }
);

export function Skills() {
  const [activeSkill, setActiveSkill] = useState(skills[0]);

  return (
    <section id="skills" className="section-padding relative" aria-label="Skills">
      <div className="container-wide">
        <SectionHeading
          label="Yetenekler"
          title="Hareketle ustalaşma"
          description="Uzmanlık alanlarımın interaktif haritası — sıradan progress bar'lar yok."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <SkillsOrb />

          <div className="space-y-3">
            {skills.map((skill) => {
              const isActive = activeSkill.name === skill.name;
              return (
                <motion.button
                  key={skill.name}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                  className={cn(
                    "w-full text-left glass rounded-2xl p-5 transition-all duration-300 focus-ring",
                    isActive
                      ? "border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                      : "hover:border-white/15"
                  )}
                  data-cursor="pointer"
                  layout
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                      <p className="text-xs text-white/30 mt-0.5">
                        {skill.category}
                      </p>
                    </div>
                    <div className="relative h-12 w-12">
                      <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="3"
                        />
                        <motion.circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke={isActive ? "#8b5cf6" : "rgba(139,92,246,0.3)"}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 20}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                          animate={{
                            strokeDashoffset:
                              2 * Math.PI * 20 * (1 - skill.level / 100),
                          }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white/60">
                        {skill.level}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-white/50 leading-relaxed">
                      {skill.description}
                    </p>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
