"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { techStack } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const active = techStack[activeCategory];

  return (
    <section id="stack" className="section-padding relative" aria-label="Tech Stack">
      <div className="container-wide">
        <SectionHeading
          label="Tech Stack"
          title="Kullandığım teknolojiler"
          description="Modern frontend ekosisteminde üretim kalitesinde projeler geliştirmek için kullandığım araçlar."
          align="center"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {techStack.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm transition-all duration-300 focus-ring",
                activeCategory === i
                  ? "bg-white text-black font-semibold shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  : "text-white/45 hover:text-white/80 border border-white/10 hover:border-white/20 bg-white/[0.02]"
              )}
              data-cursor="pointer"
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="relative mx-auto max-w-2xl aspect-square">
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-white/[0.06]"
              style={{ inset: `${ring * 32}px` }}
              animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 40 + ring * 15, repeat: Infinity, ease: "linear" }}
            />
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              key={activeCategory}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="glow-card rounded-3xl px-8 py-6 text-center"
            >
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">
                {active.name}
              </p>
              <p className="text-4xl font-display font-bold text-gradient-accent">
                {active.items.length}
              </p>
              <p className="text-xs text-white/40 mt-1">teknoloji</p>
            </motion.div>
          </div>

          {active.items.map((tech, i) => {
            const angle = (i / active.items.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 44;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            const isHovered = hoveredTech === tech.name;

            return (
              <motion.div
                key={tech.name}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.12 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <button
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className={cn(
                    "glow-card rounded-2xl p-4 flex flex-col items-center gap-2.5 min-w-[90px] transition-all duration-300 focus-ring",
                    isHovered && "border-violet-500/40"
                  )}
                  data-cursor="pointer"
                  aria-label={tech.name}
                >
                  <div
                    className="tech-badge"
                    style={{
                      backgroundColor: `${tech.color}18`,
                      color: tech.color,
                      border: `1px solid ${tech.color}30`,
                    }}
                  >
                    {tech.abbr}
                  </div>
                  <span className="text-[11px] text-white/50 whitespace-nowrap font-medium">
                    {tech.name}
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
