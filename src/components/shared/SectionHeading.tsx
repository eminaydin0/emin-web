"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-16 relative",
        align === "center" && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      <div className={cn("flex items-center gap-3 mb-5", align === "center" && "justify-center")}>
        <span className="h-px w-8 bg-gradient-to-r from-violet-500/60 to-transparent" />
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-violet-400">
          {label}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-violet-500/60 to-transparent" />
      </div>
      <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl lg:text-[3.25rem] leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base sm:text-lg text-white/45 leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      )}
      <div className="section-divider mt-10 max-w-xs mx-auto" />
    </motion.div>
  );
}
