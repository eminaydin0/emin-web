"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const spring = { damping: 22, stiffness: 350, mass: 0.4 };
  const x = useSpring(cursorX, spring);
  const y = useSpring(cursorY, spring);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(!!t.closest("a, button, [data-cursor], input, textarea, [role='button']"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  const size = isHovering ? 56 : 24;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ width: size, height: size, scale: isClicking ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 border border-cyan-400/60 rotate-45" />
          <div className="absolute w-full h-px bg-cyan-400/40" />
          <div className="absolute h-full w-px bg-cyan-400/40" />
          <div className="absolute h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
        </motion.div>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ opacity: isHovering ? 0.2 : 0.08, width: isHovering ? 140 : 90, height: isHovering ? 140 : 90 }}
          className="rounded-full bg-cyan-500 blur-3xl"
        />
      </motion.div>
    </>
  );
}
