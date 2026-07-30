"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const spring = { damping: 28, stiffness: 420, mass: 0.35 };
  const x = useSpring(cursorX, spring);
  const y = useSpring(cursorY, spring);

  useEffect(() => {
    if (isMobile || reduce) return;

    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(
        !!t.closest(
          "a, button, [data-cursor], input, textarea, [role='button']"
        )
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
    };
  }, [isMobile, reduce, cursorX, cursorY]);

  if (isMobile || reduce) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          animate={{
            width: isHovering ? 44 : 10,
            height: isHovering ? 44 : 10,
            scale: isClicking ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="rounded-full bg-white"
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && isHovering ? 0.12 : 0 }}
      >
        <div className="h-24 w-24 rounded-full bg-accent blur-2xl" />
      </motion.div>
    </>
  );
}
