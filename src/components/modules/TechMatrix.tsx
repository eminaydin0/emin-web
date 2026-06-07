"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";
import { ModuleShell } from "@/components/lab/ModuleShell";
import { TiltPanel } from "@/components/lab/TiltPanel";
import { techStack } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

const SkillsOrb = dynamic(
  () => import("@/components/three/SkillsOrb").then((m) => m.SkillsOrb),
  { ssr: false, loading: () => <div className="h-[400px] hud-panel animate-pulse" /> }
);

export function TechMatrix() {
  const [active, setActive] = useState(0);
  const category = techStack[active];

  return (
    <ModuleShell id="matrix" moduleId="MATRIX" title="Technology Matrix" subtitle="Orbital Stack Analysis" fullHeight>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <SkillsOrb />
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="font-mono text-[10px] text-cyan-400/30 tracking-[0.3em] animate-pulse">
              ORBITAL SCAN ACTIVE
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-8">
            {techStack.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActive(i)}
                className={cn(
                  "font-mono text-xs px-4 py-2 rounded-lg border transition-all focus-ring uppercase tracking-wider",
                  active === i
                    ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                    : "border-white/10 text-white/40 hover:border-white/25"
                )}
                data-cursor="pointer"
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {category.items.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <TiltPanel className="p-4 text-center group">
                  <div
                    className="mx-auto mb-3 h-12 w-12 rounded-xl flex items-center justify-center font-mono text-sm font-bold transition-all group-hover:scale-110"
                    style={{
                      backgroundColor: `${tech.color}15`,
                      color: tech.color,
                      border: `1px solid ${tech.color}35`,
                      boxShadow: `0 0 20px ${tech.color}15`,
                    }}
                  >
                    {tech.abbr}
                  </div>
                  <span className="font-mono text-[11px] text-white/60">{tech.name}</span>
                </TiltPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}
