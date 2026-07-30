"use client";

import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { skillGroups } from "@/data/site";

const ScrollSnake = dynamic(
  () => import("@/components/three/ScrollSnake").then((m) => m.ScrollSnake),
  { ssr: false }
);

const story = [
  {
    id: "intro",
    eyebrow: "The spine",
    title: "A stack that follows the work.",
    body: "Not a pile of logos — a continuous path from interface to delivery.",
    group: null as (typeof skillGroups)[number] | null,
  },
  ...skillGroups.map((group, i) => ({
    id: group.name,
    eyebrow: `0${i + 1}  ·  Layer`,
    title: group.name,
    body: group.items.join("  ·  "),
    group,
  })),
  {
    id: "outro",
    eyebrow: "Why these",
    title: "Clarity, speed, longevity.",
    body: "Chosen to ship calm operational products — then prove it in the work below.",
    group: null as (typeof skillGroups)[number] | null,
  },
];

const TOTAL = story.length;

/** Soft dissolve windows — exit of A overlaps enter of B */
function beatKeys(index: number) {
  const slot = 1 / TOTAL;
  const inStart = Math.max(0, index * slot - slot * 0.08);
  const inEnd = index * slot + slot * 0.22;
  const outStart = index * slot + slot * 0.62;
  const outEnd = Math.min(1, index * slot + slot * 1.08);
  return { inStart, inEnd, outStart, outEnd };
}

function useLayerMotion(smooth: MotionValue<number>, index: number) {
  const { inStart, inEnd, outStart, outEnd } = beatKeys(index);

  const rawOpacity = useTransform(
    smooth,
    [inStart, inEnd, outStart, outEnd],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );
  const opacity = useSpring(rawOpacity, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });

  const rawY = useTransform(
    smooth,
    [inStart, inEnd, outStart, outEnd],
    [36, 0, 0, -28]
  );
  const y = useSpring(rawY, { stiffness: 100, damping: 26, mass: 0.4 });

  const rawScale = useTransform(
    smooth,
    [inStart, inEnd, outStart, outEnd],
    [0.94, 1, 1, 0.97]
  );
  const scale = useSpring(rawScale, { stiffness: 110, damping: 24, mass: 0.35 });

  const blur = useTransform(opacity, [0, 0.5, 1], [14, 4, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return { opacity, y, scale, filter };
}

function LayerCard({
  group,
  visible,
}: {
  group: (typeof skillGroups)[number];
  visible: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={group.name}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.98 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 w-full max-w-[400px] overflow-hidden rounded-[28px] border border-white/60 bg-white/85 p-6 text-left shadow-[0_20px_60px_rgba(16,80,50,0.1)] backdrop-blur-xl md:p-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.4 }}
            className="text-[11px] font-semibold tracking-[0.14em] text-emerald-700/80 uppercase"
          >
            In this layer
          </motion.p>
          <ul className="mt-5 space-y-0">
            {group.items.map((tech, i) => (
              <motion.li
                key={tech}
                initial={{ opacity: 0, x: -12, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.1 + i * 0.07,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-3 border-b border-emerald-900/[0.04] py-3 last:border-0"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]" />
                <span className="text-[17px] tracking-[-0.015em] text-foreground md:text-[18px]">
                  {tech}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StackBeat({
  item,
  opacity,
  y,
  scale,
  filter,
  isActive,
}: {
  item: (typeof story)[number];
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  filter: MotionValue<string>;
  isActive: boolean;
}) {
  return (
    <motion.div
      style={{ opacity, y, scale, filter }}
      className="absolute inset-x-0 top-0 flex flex-col items-center will-change-transform"
    >
      <p className="text-[11px] font-semibold tracking-[0.16em] text-emerald-700 uppercase md:text-[12px]">
        {item.eyebrow}
      </p>
      <h2 className="mt-2.5 max-w-[640px] text-[clamp(1.9rem,5.2vw,3.15rem)] font-semibold tracking-[-0.035em] text-foreground text-balance">
        {item.title}
      </h2>

      {item.group ? (
        <LayerCard group={item.group} visible={isActive} />
      ) : (
        <p className="mx-auto mt-4 max-w-[480px] text-[16px] leading-snug tracking-[-0.01em] text-muted md:text-[18px]">
          {item.body}
        </p>
      )}
    </motion.div>
  );
}

export function SnakeSection() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Heavier spring = more premium scroll inertia
  const smooth = useSpring(scrollYProgress, {
    stiffness: 48,
    damping: 22,
    mass: 0.55,
    restDelta: 0.0008,
  });

  useMotionValueEvent(smooth, "change", (v) => {
    const next = Math.min(TOTAL - 1, Math.max(0, Math.floor(v * TOTAL + 0.02)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const b0 = useLayerMotion(smooth, 0);
  const b1 = useLayerMotion(smooth, 1);
  const b2 = useLayerMotion(smooth, 2);
  const b3 = useLayerMotion(smooth, 3);
  const b4 = useLayerMotion(smooth, 4);
  const b5 = useLayerMotion(smooth, 5);
  const b6 = useLayerMotion(smooth, 6);
  const beats = [b0, b1, b2, b3, b4, b5, b6];

  const progressPct = useTransform(smooth, [0, 1], [0, 100]);
  const progressSpring = useSpring(progressPct, { stiffness: 60, damping: 24 });
  const progressStyle = useMotionTemplate`${progressSpring}%`;

  const snakeOpacity = useTransform(
    smooth,
    [0, 0.08, 0.92, 1],
    [0.55, 1, 1, 0.7]
  );
  const snakeScale = useTransform(smooth, [0, 0.5, 1], [0.96, 1, 1.04]);
  const veilOpacity = useTransform(smooth, [0, 0.5, 1], [0.3, 0.55, 0.35]);

  return (
    <section
      id="stack"
      ref={ref}
      className="relative h-[380vh] bg-[#f3faf6]"
      aria-label="Tech stack along the operational path"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_62%,rgba(30,201,122,0.12),transparent_70%)]" />
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(255,255,255,0.5), transparent 70%)",
            opacity: veilOpacity,
          }}
        />

        <motion.div
          style={{ opacity: snakeOpacity, scale: snakeScale }}
          className="absolute inset-0 z-10 flex items-center justify-center will-change-transform"
        >
          <div className="relative mt-6 h-[min(68svh,540px)] w-full max-w-[900px]">
            {!reduce ? (
              <ScrollSnake
                scrollProgress={scrollYProgress}
                lite={!isDesktop}
              />
            ) : (
              <div className="mx-auto mt-[22%] h-1.5 w-2/3 rounded-full bg-emerald-500/35" />
            )}
          </div>
        </motion.div>

        <div className="relative z-20 mx-auto flex h-full w-full max-w-[720px] flex-col px-5 pt-3 text-center md:pt-5">
          <div className="relative mx-auto min-h-[320px] w-full md:min-h-[340px]">
            {story.map((item, i) => (
              <StackBeat
                key={item.id}
                item={item}
                opacity={beats[i].opacity}
                y={beats[i].y}
                scale={beats[i].scale}
                filter={beats[i].filter}
                isActive={active === i}
              />
            ))}
          </div>

          <div className="mt-auto mb-9 flex flex-col items-center gap-3.5">
            <div className="flex items-center gap-2">
              {story.map((item, i) => (
                <motion.span
                  key={item.id}
                  layout
                  animate={{
                    width: active === i ? 22 : item.group ? 6 : 10,
                    opacity: active === i ? 1 : 0.28,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="h-1.5 rounded-full bg-emerald-600"
                />
              ))}
            </div>
            <div className="h-px w-48 overflow-hidden rounded-full bg-emerald-900/10">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-700"
                style={{ width: progressStyle }}
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={story[active]?.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-[12px] tracking-[-0.01em] text-muted-soft"
              >
                {story[active]?.group
                  ? story[active].title
                  : "Follow the path through the stack"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
