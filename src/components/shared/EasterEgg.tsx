"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const [activated, setActivated] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const next = [...sequence, e.key].slice(-KONAMI.length);
      setSequence(next);
      if (next.join(",") === KONAMI.join(",")) {
        setActivated(true);
        setTimeout(() => setActivated(false), 4000);
        setSequence([]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [sequence]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-[9997] flex items-center justify-center pointer-events-none"
        >
          <div className="glass-strong rounded-2xl px-8 py-6 text-center">
            <p className="text-2xl font-display font-bold text-gradient-accent">
              🎮 Achievement Unlocked
            </p>
            <p className="mt-2 text-sm text-white/50">
              You found the secret code. Nice reflexes, engineer.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
