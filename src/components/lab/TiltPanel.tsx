"use client";

import { cn } from "@/lib/utils";
import { useTilt } from "@/hooks/useTilt";

interface TiltPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: string;
}

export function TiltPanel({ children, className, glow = "cyan" }: TiltPanelProps) {
  const { ref, transform, onMove, onLeave } = useTilt(10);

  const glowClass =
    glow === "violet"
      ? "hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]"
      : "hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]";

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className={cn("hud-panel relative rounded-2xl transition-shadow duration-300", glowClass, className)}
    >
      {children}
    </div>
  );
}
