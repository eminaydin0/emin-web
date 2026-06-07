"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ModuleShellProps {
  id: string;
  moduleId: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function ModuleShell({
  id,
  moduleId,
  title,
  subtitle,
  children,
  className,
  fullHeight = false,
}: ModuleShellProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 80, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-module={moduleId}
      className={cn(
        "relative section-padding",
        fullHeight && "min-h-screen flex flex-col justify-center",
        className
      )}
    >
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between border-b border-cyan-500/20 pb-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="hud-bracket text-cyan-400/60 text-xs font-mono tracking-[0.3em]">
                [{moduleId}]
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              {title}
            </h2>
            <p className="mt-2 font-mono text-sm text-cyan-400/50 tracking-widest uppercase">
              {subtitle}
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end font-mono text-[10px] text-white/20 gap-1">
            <span>SYS.MOD.{moduleId}</span>
            <span>STATUS: ACTIVE</span>
          </div>
        </motion.div>

        <div ref={contentRef}>{children}</div>
      </div>
    </section>
  );
}
