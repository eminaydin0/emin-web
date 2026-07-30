"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { featuredProjects } from "@/data/site";
import { cn } from "@/lib/utils";

const tileTone: Record<string, string> = {
  indigo: "from-[#d9e9ff] via-[#eaf2ff] to-[#f5f5f7]",
  slate: "from-[#e2e5ea] via-[#eceef2] to-[#f5f5f7]",
  zinc: "from-[#e4e4e4] via-[#eeeeee] to-[#f5f5f7]",
};

export function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 4200, stopOnInteraction: true })]
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="work" className="overflow-hidden bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <SectionReveal>
          <h2 className="text-center text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            Explore the work.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[19px] leading-snug text-muted md:text-[21px]">
            Selected platforms built for real operations — dashboards, ERP/CRM,
            and multi-role systems.
          </p>
        </SectionReveal>

        <div className="relative mt-10 md:mt-14">
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="min-w-0 shrink-0 grow-0 basis-[88%] px-2 md:basis-[70%] md:px-3 lg:basis-[58%]"
                >
                  <motion.article
                    animate={{
                      scale: selected === index ? 1 : 0.94,
                      opacity: selected === index ? 1 : 0.55,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    data-scale-in
                    className={cn(
                      "tile group relative flex min-h-[480px] flex-col overflow-hidden bg-gradient-to-b p-8 text-center shadow-[var(--shadow-md)] md:min-h-[560px] md:p-10",
                      tileTone[project.tone]
                    )}
                  >
                    <div className="relative z-10">
                      <p className="text-[12px] tracking-wide text-muted">
                        {project.category}
                      </p>
                      <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.02em] text-foreground md:text-[36px]">
                        {project.name}
                      </h3>
                      <p className="mx-auto mt-3 max-w-md text-[17px] leading-snug text-muted md:text-[19px]">
                        {project.summary}
                      </p>
                      <div className="mt-5 flex items-center justify-center gap-5">
                        {project.href && (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="apple-link focus-ring inline-flex items-center gap-1 rounded-sm !text-[14px]"
                          >
                            Learn more
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <span className="text-[14px] text-muted-soft">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <div className="relative mt-10 flex flex-1 items-end justify-center">
                      <motion.div
                        className="w-full max-w-[380px] overflow-hidden rounded-[20px] bg-white shadow-[var(--shadow-lg)]"
                        whileHover={{ y: -8 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2.5">
                          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
                          <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
                          <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
                        </div>
                        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#1d1d1f] via-[#2c2c2e] to-[#5a5a5e] p-4">
                          <motion.div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,113,227,0.35),transparent_50%)]"
                            animate={{ opacity: [0.4, 0.75, 0.4] }}
                            transition={{ duration: 5, repeat: Infinity }}
                          />
                          <div className="relative grid h-full grid-cols-[0.3fr_1fr] gap-2">
                            <div className="rounded-lg bg-white/10" />
                            <div className="grid gap-2">
                              <div className="grid grid-cols-3 gap-2">
                                <div className="rounded-lg bg-white/12" />
                                <div className="rounded-lg bg-white/12" />
                                <div className="rounded-lg bg-white/12" />
                              </div>
                              <div className="rounded-lg bg-white/10" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.article>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => emblaApi?.scrollPrev()}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground transition-colors hover:bg-foreground/[0.1]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {featuredProjects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Go to ${p.name}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    selected === i
                      ? "w-6 bg-foreground"
                      : "w-2 bg-foreground/20 hover:bg-foreground/35"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => emblaApi?.scrollNext()}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground transition-colors hover:bg-foreground/[0.1]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
