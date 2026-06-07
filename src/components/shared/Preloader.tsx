"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const bootLines = [
  "INITIALIZING NEURAL CORE...",
  "LOADING TECH MATRIX...",
  "SYNCING MISSION ARCHIVE...",
  "ESTABLISHING SECURE CHANNEL...",
  "LABORATORY ONLINE",
];

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 12 + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return next;
      });
    }, 90);

    const lineInterval = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, bootLines.length - 1));
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(lineInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#020208]"
          role="status"
          aria-label="System boot"
        >
          <div className="absolute inset-0 hud-vignette" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative text-center"
          >
            <p className="font-mono text-[10px] text-cyan-400/40 tracking-[0.5em] mb-8">
              DIGITAL LABORATORY
            </p>
            <div className="relative mx-auto mb-8 h-20 w-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-cyan-400/20 border-t-cyan-400/60"
              />
              <div className="absolute inset-3 rounded-full border border-violet-500/20 flex items-center justify-center">
                <span className="font-display text-xl font-bold text-cyan-300">EA</span>
              </div>
            </div>

            <div className="w-64 h-px bg-white/5 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <p className="font-mono text-xs text-cyan-400/60 tabular-nums mb-6">
              {Math.min(Math.round(progress), 100)}%
            </p>

            <div className="font-mono text-[10px] text-white/25 space-y-1 h-16">
              {bootLines.slice(0, lineIndex + 1).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === lineIndex ? "text-cyan-400/50" : ""}
                >
                  {">"} {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
