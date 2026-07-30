"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "@/components/brand/MagneticButton";
import { siteConfig } from "@/data/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const HeroOrb = dynamic(
  () => import("@/components/three/HeroOrb").then((m) => m.HeroOrb),
  {
    ssr: false,
    loading: () => <OrbFallback />,
  }
);

function OrbFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[55%] w-[55%]">
        <div className="absolute inset-0 animate-pulse rounded-full bg-accent-soft blur-2xl" />
        <div className="absolute inset-[18%] rounded-full border border-accent/20 bg-gradient-to-br from-white via-accent-soft to-white shadow-[var(--shadow-md)]" />
        <div className="absolute inset-[38%] rounded-full bg-accent/80" />
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const enableOrb = isDesktop && !reduce;
  const intro = reduce ? 0 : 1.55;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-transparent"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_75%_35%,rgba(47,111,237,0.08),transparent_60%)]" />

      <div className="container-wide relative z-10 grid min-h-[100svh] items-center gap-10 px-6 pb-24 pt-28 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-16 lg:pt-24">
        <motion.div className="max-w-xl" style={{ y: textY, opacity: fade }}>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: intro, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 font-mono text-[12px] tracking-[0.16em] text-muted uppercase"
          >
            {siteConfig.location}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1,
                delay: intro + 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[clamp(3.25rem,9vw,6.25rem)] leading-[0.92] font-semibold tracking-[-0.06em] text-foreground text-balance"
            >
              {siteConfig.name}
            </motion.h1>
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: intro + 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-xl font-medium tracking-[-0.03em] text-foreground/80 md:text-2xl"
          >
            {siteConfig.title}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: intro + 0.43, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-muted md:text-base"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: intro + 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-11 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#work" variant="primary">
              View selected work
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Start a conversation
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: intro + 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: orbY, scale: orbScale, opacity: fade }}
          className="relative mx-auto aspect-square w-full max-w-[440px] lg:max-w-none lg:justify-self-end"
          aria-hidden
        >
          <div className="absolute inset-[8%] rounded-full bg-accent-soft/40 blur-3xl" />
          <div className="relative h-full w-full">
            {enableOrb ? <HeroOrb /> : <OrbFallback />}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: intro + 0.75, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.18em] text-muted-soft uppercase">
            Scroll
          </span>
          <motion.span
            className="h-8 w-px bg-border-strong"
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
