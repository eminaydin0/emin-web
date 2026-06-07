"use client";

import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/brand-icons";
import Link from "next/link";
import { useCallback, useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { projects, projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";

function MacBookMockup({ gradient, accent, title }: { gradient: string; accent: string; title: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md group/mockup">
      <div className="rounded-t-2xl bg-zinc-900/80 border border-white/10 p-2.5 pb-0 shadow-2xl">
        <div className="flex items-center gap-1.5 px-2 py-1.5 mb-1">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
          <span className="h-2 w-2 rounded-full bg-green-500/70" />
        </div>
        <div className={cn("aspect-[16/10] rounded-t-xl overflow-hidden relative", `bg-gradient-to-br ${gradient}`)}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center text-lg font-bold font-display"
              style={{ backgroundColor: `${accent}25`, color: accent, border: `1px solid ${accent}40` }}
            >
              {title.charAt(0)}
            </div>
            <p className="text-xs text-white/40 font-mono truncate max-w-full">{title}</p>
          </div>
          <div className="absolute inset-0 shimmer opacity-50" />
          <div
            className="absolute inset-0 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(circle at 50% 50%, ${accent}15, transparent 70%)` }}
          />
        </div>
      </div>
      <div className="h-3.5 bg-zinc-800 rounded-b-2xl mx-auto w-[104%] -ml-[2%] border-x border-b border-white/5" />
      <div className="h-1.5 bg-zinc-700/80 rounded-b-xl mx-auto w-[55%]" />
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="projects" className="section-padding relative" aria-label="Projects">
      <div className="container-wide">
        <SectionHeading
          label="Projeler"
          title="Seçilmiş çalışmalar"
          description="Tasarladığım ve geliştirdiğim açık kaynak projeler ile üretim deneyimlerim."
        />

        <div className="flex flex-wrap gap-2 mb-12">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all duration-300 focus-ring",
                filter === cat.id
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "text-white/40 hover:text-white/70 border border-transparent"
              )}
              data-cursor="pointer"
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="glow-card border-gradient rounded-3xl overflow-hidden group h-full flex flex-col transition-all duration-500">
                      <div className="p-6 pb-0">
                        <MacBookMockup
                          gradient={project.gradient}
                          accent={project.accent}
                          title={project.title}
                        />
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-xs font-mono text-white/30">
                              {project.year}
                            </span>
                            <h3 className="mt-1 text-xl font-semibold text-white group-hover:text-gradient-accent transition-all">
                              {project.title}
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: hoveredId === project.id ? 45 : 0 }}
                            className="shrink-0"
                          >
                            <ArrowUpRight className="h-5 w-5 text-white/30" />
                          </motion.div>
                        </div>

                        <p className="mt-3 text-sm text-white/50 leading-relaxed flex-1">
                          {project.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech}>{tech}</Badge>
                          ))}
                        </div>

                        <div className="mt-5 flex gap-3">
                          {project.link && (
                            <Link
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors focus-ring rounded"
                              data-cursor="pointer"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Live
                            </Link>
                          )}
                          {project.github && (
                            <Link
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors focus-ring rounded"
                              data-cursor="pointer"
                            >
                              <GitHubIcon className="h-3 w-3" />
                              Code
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={scrollPrev}
              className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all focus-ring"
              aria-label="Previous project"
              data-cursor="pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all focus-ring"
              aria-label="Next project"
              data-cursor="pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
