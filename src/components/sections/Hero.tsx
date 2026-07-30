"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/data/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const HeroOrb = dynamic(
  () => import("@/components/three/HeroOrb").then((m) => m.HeroOrb),
  { ssr: false, loading: () => <GlobeFallback /> }
);

function GlobeFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-[92%] w-[92%] rounded-full bg-[radial-gradient(circle_at_32%_28%,#d0e8fa_0%,#7eb6e0_45%,#4a8fc8_100%)]" />
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const enable3D = isDesktop && !reduce;
  const intro = reduce ? 0 : 0.2;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Soft scroll progress for premium text handoff
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.45,
    restDelta: 0.001,
  });

  const phaseA = useTransform(smooth, [0, 0.2, 0.32], [1, 1, 0]);
  const phaseB = useTransform(smooth, [0.34, 0.44, 0.58, 0.7], [0, 1, 1, 0]);

  const phaseAY = useTransform(smooth, [0, 0.32], [0, -18]);
  const phaseBY = useTransform(smooth, [0.34, 0.44], [22, 0]);

  const blurA = useTransform(phaseA, [0, 1], [10, 0]);
  const blurB = useTransform(phaseB, [0, 1], [10, 0]);
  const filterA = useMotionTemplate`blur(${blurA}px)`;
  const filterB = useMotionTemplate`blur(${blurB}px)`;

  const phaseAVis = useTransform(phaseA, (v) =>
    v < 0.02 ? "hidden" : "visible"
  );
  const phaseBVis = useTransform(phaseB, (v) =>
    v < 0.02 ? "hidden" : "visible"
  );

  // Grow the whole circle uniformly — never crop the sphere in the canvas
  const globeScaleRaw = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85, 1],
    [1, 1.12, 1.26, 1.34]
  );
  const globeScale = useSpring(globeScaleRaw, {
    stiffness: 70,
    damping: 26,
    mass: 0.45,
  });

  return (
    <section id="hero" ref={ref} className="relative h-[240vh] bg-[#fbfbfd]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-visible pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[#fbfbfd]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_72%,rgba(190,215,245,0.26),transparent_70%)]" />

        <div className="relative z-20 mx-auto w-full max-w-[880px] shrink-0 px-5 pt-8 text-center md:pt-12">
          <div className="relative mx-auto min-h-[210px] w-full md:min-h-[230px]">
            <motion.div
              style={{
                opacity: phaseA,
                y: phaseAY,
                filter: filterA,
                visibility: phaseAVis,
              }}
              className="absolute inset-x-0 top-0 will-change-[opacity,transform,filter]"
            >
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: intro }}
                className="text-[18px] font-semibold tracking-[-0.01em] text-foreground md:text-[21px]"
              >
                {siteConfig.title}
              </motion.p>
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: intro + 0.06 }}
                className="mt-3 text-[clamp(2.75rem,7.2vw,5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-foreground"
              >
                {siteConfig.name}
              </motion.h1>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: intro + 0.14 }}
                className="mx-auto mt-4 max-w-[580px] text-[17px] leading-snug tracking-[-0.01em] text-muted md:text-[21px]"
              >
                {siteConfig.tagline}
              </motion.p>
            </motion.div>

            <motion.div
              style={{
                opacity: phaseB,
                y: phaseBY,
                filter: filterB,
                visibility: phaseBVis,
              }}
              className="absolute inset-x-0 top-0 will-change-[opacity,transform,filter]"
              aria-hidden
            >
              <p className="text-[18px] font-semibold tracking-[-0.01em] text-foreground md:text-[21px]">
                Systems that scale
              </p>
              <h2 className="mt-3 text-[clamp(2.2rem,5.8vw,3.75rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-foreground text-balance">
                I build the systems that run the business.
              </h2>
              <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-snug tracking-[-0.01em] text-muted md:text-[20px]">
                Dashboards, ERP/CRM, and AI-assisted tools for real operations.
              </p>
            </motion.div>
          </div>
        </div>

        <div
          className="relative z-10 mx-auto mt-8 flex min-h-0 w-full flex-1 items-center justify-center overflow-visible md:mt-10"
          aria-hidden
        >
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: intro + 0.16 }}
            style={{ scale: globeScale }}
            className="relative aspect-square h-auto w-[min(72vw,42svh,460px)] max-h-full shrink-0 will-change-transform"
          >
            {enable3D ? (
              <HeroOrb scrollProgress={scrollYProgress} />
            ) : (
              <GlobeFallback />
            )}
          </motion.div>
        </div>

        <div className="relative z-20 mb-7 flex h-5 shrink-0 items-center justify-center">
          <motion.p
            style={{ opacity: phaseA, visibility: phaseAVis }}
            className="absolute text-[13px] text-muted-soft"
          >
            {siteConfig.location}
          </motion.p>
          <motion.p
            style={{ opacity: phaseB, visibility: phaseBVis }}
            className="absolute text-[13px] text-muted-soft"
            aria-hidden
          >
            {siteConfig.availability}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
