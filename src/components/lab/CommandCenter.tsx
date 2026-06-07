"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Command, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { systemModules } from "@/data/modules";
import { siteConfig } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

interface CommandCenterProps {
  onOpenPalette: () => void;
}

export function CommandCenter({ onOpenPalette }: CommandCenterProps) {
  const [expanded, setExpanded] = useState(false);
  const [time, setTime] = useState("");
  const ids = systemModules.map((m) => m.id);
  const active = useActiveSection(ids);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="hud-panel rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-cyan-500/15">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Radio className="h-4 w-4 text-cyan-400" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="font-mono text-xs text-cyan-400/80 tracking-wider">
              CMD.CENTER // {siteConfig.name.split(" ")[0].toUpperCase()}_LAB
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-white/30 tabular-nums hidden sm:block">
              {time}
            </span>
            <button
              onClick={onOpenPalette}
              className="flex items-center gap-1.5 font-mono text-[10px] text-white/30 hover:text-cyan-400 transition-colors focus-ring rounded px-2 py-1"
              aria-label="Command palette"
              data-cursor="pointer"
            >
              <Command className="h-3 w-3" />
              ⌘K
            </button>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
              aria-label="System modules"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 p-2">
                {systemModules.map((mod) => (
                  <a
                    key={mod.id}
                    href={mod.href}
                    className={cn(
                      "group rounded-xl px-3 py-3 transition-all focus-ring",
                      active === mod.id
                        ? "bg-cyan-500/15 border border-cyan-500/30"
                        : "hover:bg-white/5 border border-transparent"
                    )}
                    data-cursor="pointer"
                  >
                    <span className="block font-mono text-[10px] text-cyan-400/60 group-hover:text-cyan-400">
                      {mod.label}
                    </span>
                    <span className="block text-xs text-white/50 mt-0.5 group-hover:text-white/80">
                      {mod.sublabel}
                    </span>
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
