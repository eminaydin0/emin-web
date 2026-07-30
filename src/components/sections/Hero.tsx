"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
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
        <div className="absolute inset-0 rounded-full bg-accent-soft blur-2xl" />
        <div className="absolute inset-[18%] rounded-full border border-accent/25 bg-gradient-to-br from-white via-accent-soft to-white shadow-[var(--shadow-md)]" />
        <div className="absolute inset-[38%] rounded-full bg-accent/80" />
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const enableOrb = isDesktop && !reduce;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_70%_40%,rgba(47,111,237,0.07),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_70%,#ffffff_100%)]" />

      <div className="container-wide relative z-10 grid min-h-[100svh] items-center gap-10 px-6 pb-20 pt-28 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-16 lg:pt-24">
        <div className="max-w-xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-mono text-[12px] tracking-[0.14em] text-muted uppercase"
          >
            {siteConfig.location}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,8vw,5.75rem)] leading-[0.95] font-semibold tracking-[-0.055em] text-foreground"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-lg font-medium tracking-[-0.02em] text-foreground/80 md:text-xl"
          >
            {siteConfig.title}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-muted md:text-base"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#work" variant="primary">
              View selected work
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Start a conversation
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-none lg:justify-self-end"
          aria-hidden
        >
          <div className="absolute inset-[12%] rounded-full bg-accent-soft/50 blur-3xl" />
          <div className="relative h-full w-full">
            {enableOrb ? <HeroOrb /> : <OrbFallback />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
