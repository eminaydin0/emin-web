"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const ScrollJelly = dynamic(
  () => import("@/components/three/ScrollJelly").then((m) => m.ScrollJelly),
  { ssr: false }
);

function Beat({
  eyebrow,
  title,
  body,
  opacity,
  y,
  filter,
  hidden,
}: {
  eyebrow: string;
  title: string;
  body: string;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  filter: MotionValue<string>;
  hidden?: boolean;
}) {
  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="absolute inset-x-0 top-0"
      aria-hidden={hidden}
    >
      <p className="text-[13px] font-semibold tracking-[0.1em] text-[#6b7cff] uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[clamp(1.75rem,4.8vw,2.85rem)] font-semibold tracking-[-0.03em] text-foreground text-balance">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-[520px] text-[16px] leading-snug text-muted md:text-[18px]">
        {body}
      </p>
    </motion.div>
  );
}

/**
 * Narrative bridge: AI as soft assistance inside real workflows.
 * Leads into playground / experiments.
 */
export function JellySection() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 26,
    mass: 0.4,
  });

  const a = useTransform(smooth, [0, 0.14, 0.26], [1, 1, 0]);
  const b = useTransform(smooth, [0.28, 0.4, 0.52], [0, 1, 0]);
  const c = useTransform(smooth, [0.54, 0.66, 0.82, 0.94], [0, 1, 1, 0]);

  const yA = useTransform(smooth, [0, 0.26], [0, -14]);
  const yB = useTransform(smooth, [0.28, 0.4], [18, 0]);
  const yC = useTransform(smooth, [0.54, 0.66], [18, 0]);

  const blurA = useTransform(a, [0, 1], [8, 0]);
  const blurB = useTransform(b, [0, 1], [8, 0]);
  const blurC = useTransform(c, [0, 1], [8, 0]);
  const fA = useMotionTemplate`blur(${blurA}px)`;
  const fB = useMotionTemplate`blur(${blurB}px)`;
  const fC = useMotionTemplate`blur(${blurC}px)`;

  return (
    <section
      id="intelligence"
      ref={ref}
      className="relative h-[250vh] bg-[#f6f7ff]"
      aria-label="How I think about AI in products"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_55%,rgba(120,140,255,0.14),transparent_68%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_50%_70%,rgba(255,120,180,0.08),transparent_70%)]" />

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative mt-8 h-[min(70svh,560px)] w-full max-w-[820px]">
            {!reduce ? (
              <ScrollJelly
                scrollProgress={scrollYProgress}
                lite={!isDesktop}
              />
            ) : (
              <div className="mx-auto mt-[24%] h-36 w-36 rounded-full bg-[radial-gradient(circle_at_40%_30%,#ffb3d9,#8aa0ff)] opacity-65" />
            )}
          </div>
        </div>

        <div className="relative z-20 mx-auto w-full max-w-[720px] px-5 pt-5 text-center md:pt-7">
          <div className="relative mx-auto min-h-[168px] md:min-h-[180px]">
            <Beat
              eyebrow="AI, my way"
              title="Intelligence shouldn’t shout."
              body="Chatbots and copilots are easy to demo. Harder: making them useful inside the work people already do."
              opacity={a}
              y={yA}
              filter={fA}
            />
            <Beat
              eyebrow="In the product"
              title="Woven into the workflow."
              body="I ship AI-assisted surfaces that help operators move faster — without turning the panel into a circus."
              opacity={b}
              y={yB}
              filter={fB}
              hidden
            />
            <Beat
              eyebrow="The long game"
              title="Calm products. Global ambition."
              body="Every experiment is practice for SaaS people depend on. Next: the playground where I try the strange ideas first."
              opacity={c}
              y={yC}
              filter={fC}
              hidden
            />
          </div>
        </div>

        <motion.p
          style={{ opacity: c }}
          className="absolute bottom-8 left-0 right-0 z-20 text-center text-[13px] text-muted-soft"
        >
          Continue to playground ↓
        </motion.p>
      </div>
    </section>
  );
}
