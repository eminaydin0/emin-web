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
  variant?: "primary" | "secondary" | "ghost" | "link";
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = "button",
  variant = "primary",
}: MagneticButtonProps) {
  const { ref, springX, springY, onMove, onLeave } = useMagnetic(0.2);
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
          "focus-ring inline-flex items-center justify-center gap-2 text-[17px] transition-colors",
          variant === "primary" &&
            "rounded-full bg-accent px-5 py-2.5 text-[14px] font-normal text-white hover:bg-accent-hover",
          variant === "secondary" &&
            "rounded-full bg-accent px-5 py-2.5 text-[14px] font-normal text-white hover:bg-accent-hover",
          variant === "ghost" &&
            "rounded-full bg-foreground/[0.08] px-5 py-2.5 text-[14px] font-normal text-foreground hover:bg-foreground/[0.12]",
          variant === "link" && "apple-link",
          className
        )}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
