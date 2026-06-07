"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { MagneticButton } from "@/components/lab/MagneticButton";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { siteConfig } from "@/data/portfolio";
import { FloatingParticles } from "@/components/effects/FloatingParticles";

const NeuralCore = dynamic(
  () => import("@/components/three/NeuralCore").then((m) => m.NeuralCore),
  { ssr: false }
);

export function CoreEntry() {
  return (
    <section
      id="core"
      data-module="core"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Laboratory Core"
    >
      <NeuralCore />
      <FloatingParticles count={60} seed={99} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020208]" />

      <div className="relative z-10 container-wide section-padding pt-40 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-6 font-mono text-xs tracking-[0.4em] text-cyan-400/60 uppercase"
        >
          Digital Laboratory — System Online
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-[-0.04em] leading-[0.85] text-white uppercase"
        >
          {siteConfig.name.split(" ")[0]}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-violet-400">
            {siteConfig.name.split(" ")[1]}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 font-mono text-sm sm:text-base text-cyan-400/70 tracking-[0.2em] uppercase"
        >
          {siteConfig.title} // Neural Interface Active
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#missions">Access Missions</MagneticButton>
          <MagneticButton href={siteConfig.cvUrl} variant="ghost">
            <Download className="h-4 w-4" /> CV
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex justify-center"
        >
          <SocialLinks />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-20 mx-auto max-w-xs"
        >
          <div className="hud-panel rounded-2xl p-1 inline-block">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden mx-auto">
              <Image
                src={siteConfig.profileImage}
                alt={siteConfig.name}
                fill
                className="object-cover grayscale contrast-125"
                sizes="128px"
                priority
              />
              <div className="absolute inset-0 border border-cyan-400/30 rounded-xl" />
            </div>
          </div>
          <p className="mt-3 font-mono text-[10px] text-white/30 tracking-widest">
            OPERATOR ID: EA-001 // {siteConfig.location.toUpperCase()}
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#identity"
          className="flex flex-col items-center gap-2 font-mono text-[10px] text-cyan-400/40 hover:text-cyan-400/70 tracking-[0.3em] uppercase transition-colors"
          data-cursor="pointer"
        >
          Initialize
          <span className="block w-px h-8 bg-gradient-to-b from-cyan-400/60 to-transparent" />
        </a>
      </motion.div>
    </section>
  );
}
