"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const clipUp: Variants = {
  hidden: { opacity: 0, y: 48, clipPath: "inset(12% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "clip";
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  variant = "fade",
}: SectionRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      variants={variant === "clip" ? clipUp : fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
