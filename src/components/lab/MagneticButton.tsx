"use client";

import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost";
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = "button",
  variant = "primary",
}: MagneticButtonProps) {
  const { ref, springX, springY, onMove, onLeave } = useMagnetic(0.4);
  const Comp = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
    >
      <Comp
        href={href}
        type={href ? undefined : type}
        onClick={onClick}
        data-cursor="pointer"
        className={cn(
          "relative inline-flex items-center gap-2 px-8 py-4 font-mono text-sm uppercase tracking-widest transition-all focus-ring overflow-hidden group",
          variant === "primary"
            ? "bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
            : "border border-white/10 text-white/60 hover:text-white hover:border-white/25",
          className
        )}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <span className="relative">{children}</span>
      </Comp>
    </motion.div>
  );
}
