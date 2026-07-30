"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Soft, page-wide mouse glow — intentionally very quiet */
export function AmbientField() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(40);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 22 });

  const glow = useMotionTemplate`radial-gradient(640px circle at ${smoothX}% ${smoothY}%, rgba(0,113,227,0.035), transparent 55%)`;

  useEffect(() => {
    if (isMobile || reduce) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 100);
      mouseY.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile, reduce, mouseX, mouseY]);

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div className="absolute inset-0" style={{ background: glow }} />
    </div>
  );
}
