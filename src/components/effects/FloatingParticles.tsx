"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { createSeededRandom } from "@/lib/seeded-random";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function FloatingParticles({ count = 30, seed = 7 }: { count?: number; seed?: number }) {
  const particles = useMemo<Particle[]>(() => {
    const random = createSeededRandom(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: random() * 100,
      y: random() * 100,
      size: random() * 3 + 1,
      duration: random() * 20 + 15,
      delay: random() * 5,
    }));
  }, [count, seed]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
