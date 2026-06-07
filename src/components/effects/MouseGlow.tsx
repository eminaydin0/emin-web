"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function MouseGlow() {
  const { x, y } = useMousePosition();
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      animate={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.06), transparent 40%)`,
      }}
      transition={{ type: "tween", ease: "linear", duration: 0.15 }}
    />
  );
}
