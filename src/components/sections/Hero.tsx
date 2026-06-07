"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { heroWords, siteConfig } from "@/data/portfolio";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 mesh-gradient" />
      <HeroScene />
      <FloatingParticles count={50} seed={42} />

      <div className="relative z-10 container-wide section-padding w-full pt-32 pb-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span>{siteConfig.availability}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-sm font-mono uppercase tracking-[0.2em] text-violet-400/80 mb-4"
            >
              {siteConfig.title}
            </motion.p>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold tracking-[-0.03em] leading-[0.92]">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="text-gradient block"
              >
                {siteConfig.name}
              </motion.span>
              <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl font-medium text-white/40">
                dijital{" "}
                <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block text-gradient-accent font-bold"
                    >
                      {heroWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>{" "}
                inşa ediyorum
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 max-w-lg text-base sm:text-lg text-white/45 leading-relaxed"
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button asChild variant="default" size="lg" data-cursor="pointer">
                <Link href="#projects">Projelerimi Gör</Link>
              </Button>
              <Button asChild variant="outline" size="lg" data-cursor="pointer">
                <a href={siteConfig.cvUrl} download>
                  <Download className="h-4 w-4" />
                  CV İndir
                </a>
              </Button>
              <SocialLinks className="ml-1" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/20 via-transparent to-indigo-500/20 blur-2xl" />
              <div className="glow-card rounded-[2rem] overflow-hidden border-gradient relative">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={siteConfig.profileImage}
                    alt={siteConfig.name}
                    fill
                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">
                      {siteConfig.location}
                    </p>
                    <p className="text-lg font-display font-semibold text-white">
                      {siteConfig.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link
              href="#about"
              className="flex flex-col items-center gap-2 text-white/25 hover:text-white/50 transition-colors focus-ring rounded-lg p-2"
              aria-label="Hakkımda bölümüne kaydır"
            >
              <span className="text-[10px] uppercase tracking-[0.25em]">Kaydır</span>
              <ArrowDown className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
