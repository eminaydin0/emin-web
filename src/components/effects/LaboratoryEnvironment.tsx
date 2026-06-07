"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

function LightBeams() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-[200%] origin-left"
          style={{
            top: `${15 + i * 18}%`,
            left: "-50%",
            background: `linear-gradient(90deg, transparent, rgba(0,255,200,0.08), rgba(139,92,246,0.12), transparent)`,
          }}
          animate={{ x: ["-10%", "10%", "-10%"], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent z-[2]"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />
  );
}

function DepthGrid() {
  const { x, y } = useMousePosition();
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-40"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,255,200,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,200,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        transform: `perspective(500px) rotateX(60deg) translateY(-20%) translate(${x * 0.01}px, ${y * 0.01}px)`,
        transformOrigin: "center top",
        maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)",
      }}
      aria-hidden="true"
    />
  );
}

export function LaboratoryEnvironment() {
  return (
    <>
      <div className="hud-vignette fixed inset-0 z-[1] pointer-events-none" aria-hidden="true" />
      <DepthGrid />
      <LightBeams />
      <ScanLine />
      <div className="noise fixed inset-0 z-[1]" aria-hidden="true" />
    </>
  );
}
