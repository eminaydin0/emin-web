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
  variant?: "primary" | "secondary" | "ghost";
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = "button",
  variant = "primary",
}: MagneticButtonProps) {
  const { ref, springX, springY, onMove, onLeave } = useMagnetic(0.28);
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
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        type={href ? undefined : type}
        onClick={onClick}
        className={cn(
          "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors",
          variant === "primary" &&
            "bg-foreground text-white hover:bg-foreground/90",
          variant === "secondary" &&
            "bg-accent text-white hover:bg-accent-hover",
          variant === "ghost" &&
            "border border-border bg-white text-foreground hover:border-border-strong hover:bg-background-soft",
          className
        )}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
