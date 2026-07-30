"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function AmbientField() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const blobOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [0.55, 0.35, 0.2]
  );

  const glow = useMotionTemplate`radial-gradient(520px circle at ${smoothX}% ${smoothY}%, rgba(47,111,237,0.08), transparent 55%)`;

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
      <motion.div
        className="absolute -left-[10%] top-[15%] h-[42vw] w-[42vw] rounded-full bg-accent/[0.045] blur-[90px]"
        style={{ y: blobY, opacity: blobOpacity }}
      />
      <motion.div
        className="absolute -right-[8%] top-[45%] h-[36vw] w-[36vw] rounded-full bg-[#0a0a0a]/[0.03] blur-[100px]"
        style={{ y: blobY2 }}
      />
    </div>
  );
}
