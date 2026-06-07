"use client";

import { motion } from "framer-motion";
import { ModuleShell } from "@/components/lab/ModuleShell";
import { TiltPanel } from "@/components/lab/TiltPanel";
import { experience } from "@/data/experience";

export function EvolutionLog() {
  return (
    <ModuleShell id="evolution" moduleId="EVOLUTION" title="System Evolution" subtitle="Experience Timeline Log">
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/30 to-transparent" />

        {experience.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="relative pl-14 mb-8 last:mb-0"
          >
            <div className="absolute left-2 top-5 h-9 w-9 rounded-lg border border-cyan-500/30 bg-[#020208] flex items-center justify-center font-mono text-[10px] text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
              {String(i + 1).padStart(2, "0")}
            </div>

            <TiltPanel className="p-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-mono text-[10px] text-cyan-400/60 tracking-widest">
                  LOG.{entry.period}
                </span>
                <span className="font-mono text-[10px] text-white/20">//</span>
                <span className="font-mono text-[10px] text-white/30">{entry.location}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">{entry.role}</h3>
              <p className="text-sm text-violet-400/60 mt-0.5">{entry.company}</p>
              <p className="mt-3 text-sm text-white/45 leading-relaxed">{entry.description}</p>
              <ul className="mt-4 space-y-1.5">
                {entry.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-xs text-white/35">
                    <span className="text-cyan-400 mt-0.5 shrink-0">▸</span>
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {entry.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] px-2 py-0.5 rounded border border-white/8 text-white/25"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </TiltPanel>
          </motion.div>
        ))}
      </div>
    </ModuleShell>
  );
}
