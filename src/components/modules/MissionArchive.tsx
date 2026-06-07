"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FolderOpen, Lock, X } from "lucide-react";
import { useState } from "react";
import { ModuleShell } from "@/components/lab/ModuleShell";
import { TiltPanel } from "@/components/lab/TiltPanel";
import { projects } from "@/data/projects";

export function MissionArchive() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = projects.find((p) => p.id === selected);

  return (
    <ModuleShell id="missions" moduleId="MISSIONS" title="Mission Archive" subtitle="Classified Project Files">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((mission, i) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <TiltPanel
              glow="violet"
              className="p-5 cursor-pointer group h-full"
            >
              <button
                className="w-full text-left"
                onClick={() => setSelected(mission.id)}
                data-cursor="pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Lock className="h-3 w-3 text-violet-400/50 group-hover:text-violet-400 transition-colors" />
                    <span className="font-mono text-[9px] text-violet-400/40 tracking-widest">
                      FILE.{mission.id.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-white/20">{mission.year}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {mission.title}
                </h3>
                <p className="mt-2 text-sm text-white/40 leading-relaxed line-clamp-2">
                  {mission.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {mission.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[9px] px-2 py-0.5 rounded border border-white/10 text-white/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 font-mono text-[10px] text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                  <FolderOpen className="h-3 w-3" />
                  DECRYPT FILE
                </div>
              </button>
            </TiltPanel>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="hud-panel rounded-2xl max-w-lg w-full p-8 relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 text-white/30 hover:text-white transition-colors"
                aria-label="Close"
                data-cursor="pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="font-mono text-[10px] text-cyan-400/50 tracking-[0.3em] mb-2">
                MISSION FILE DECRYPTED
              </p>
              <h3 className="font-display text-3xl font-bold text-white">{active.title}</h3>
              <p className="mt-4 text-white/50 leading-relaxed text-sm">{active.longDescription}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {active.technologies.map((t) => (
                  <span key={t} className="font-mono text-[10px] px-2 py-1 rounded border border-cyan-500/20 text-cyan-400/60">
                    {t}
                  </span>
                ))}
              </div>
              {active.link && (
                <a
                  href={active.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  data-cursor="pointer"
                >
                  <ExternalLink className="h-4 w-4" />
                  ACCESS LIVE SYSTEM
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModuleShell>
  );
}
