"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { TextReveal } from "@/components/brand/TextReveal";
import { featuredProjects, type FeaturedProject } from "@/data/site";
import { cn } from "@/lib/utils";

const toneStyles: Record<
  FeaturedProject["tone"],
  { stage: string; screen: string; accent: string }
> = {
  indigo: {
    stage: "from-[#eef3ff] via-[#f8f9fc] to-[#ffffff]",
    screen: "from-[#1e3a8a] via-[#2f6fed] to-[#60a5fa]",
    accent: "bg-accent",
  },
  slate: {
    stage: "from-[#f1f5f9] via-[#f8fafc] to-[#ffffff]",
    screen: "from-[#0f172a] via-[#334155] to-[#64748b]",
    accent: "bg-slate-700",
  },
  zinc: {
    stage: "from-[#f4f4f5] via-[#fafafa] to-[#ffffff]",
    screen: "from-[#18181b] via-[#3f3f46] to-[#a1a1aa]",
    accent: "bg-zinc-800",
  },
};

function ProjectShowcase({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  const tone = toneStyles[project.tone];
  const reversed = index % 2 === 1;

  return (
    <article className="border-t border-border/80 py-20 md:py-28 first:border-t-0 first:pt-0">
      <div
        className={cn(
          "grid items-center gap-12 lg:grid-cols-2 lg:gap-20",
          reversed && "lg:[&>*:first-child]:order-2"
        )}
      >
        <SectionReveal>
          <div className="max-w-lg">
            <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted">
              <span className="font-mono tracking-[0.14em] uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-1 w-1 rounded-full bg-border-strong" />
              <span className="font-mono tracking-[0.1em] uppercase">
                {project.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-border-strong" />
              <span className="font-mono">{project.year}</span>
            </div>

            <h3 className="mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-foreground">
              {project.name}
            </h3>

            <p className="mt-5 text-[17px] leading-relaxed text-muted md:text-lg">
              {project.summary}
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-foreground/70">
              {project.narrative}
            </p>

            <ul className="mt-9 space-y-3.5">
              {project.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex gap-3 text-sm leading-snug text-muted"
                >
                  <span
                    className={cn(
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                      tone.accent
                    )}
                  />
                  {outcome}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-background-soft px-3.5 py-1.5 text-[12px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="focus-ring group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Explore product
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1} variant="clip">
          <motion.a
            href={project.href}
            target={project.href ? "_blank" : undefined}
            rel={project.href ? "noopener noreferrer" : undefined}
            data-cursor
            className={cn(
              "group relative block overflow-hidden rounded-[32px] bg-gradient-to-br p-5 shadow-[var(--shadow-md)] transition-shadow duration-500 hover:shadow-[var(--shadow-lg)] md:p-8",
              tone.stage
            )}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
          >
            <div className="overflow-hidden rounded-[22px] bg-white shadow-[var(--shadow-sm)]">
              <div className="flex items-center gap-1.5 px-4 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                <span className="ml-3 truncate font-mono text-[11px] text-muted-soft">
                  {project.name.toLowerCase().replace(/\s+/g, "")}.app
                </span>
              </div>

              <div
                className={cn(
                  "relative aspect-[16/10] overflow-hidden bg-gradient-to-br",
                  tone.screen
                )}
              >
                <motion.div
                  className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_45%)]"
                  animate={{ opacity: [0.25, 0.45, 0.25] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-x-5 top-5 bottom-5 grid grid-cols-[0.28fr_1fr] gap-3 md:inset-x-7 md:top-7 md:bottom-7 md:gap-4">
                  <div className="rounded-2xl bg-white/10 backdrop-blur-[2px]">
                    <div className="space-y-2 p-3 md:p-4">
                      <div className="h-2 w-10 rounded-full bg-white/45" />
                      <div className="h-2 w-14 rounded-full bg-white/20" />
                      <div className="h-2 w-12 rounded-full bg-white/20" />
                      <div className="mt-5 h-2 w-16 rounded-full bg-white/25" />
                      <div className="h-2 w-11 rounded-full bg-white/15" />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="rounded-2xl bg-white/12 p-3 backdrop-blur-[2px]"
                          whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                        >
                          <div className="h-2 w-8 rounded-full bg-white/35" />
                          <div className="mt-3 h-5 w-12 rounded-md bg-white/25" />
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex-1 rounded-2xl bg-white/10 p-4 backdrop-blur-[2px]">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="h-2.5 w-20 rounded-full bg-white/35" />
                        <div className="h-2.5 w-10 rounded-full bg-white/20" />
                      </div>
                      <div className="space-y-2.5">
                        {[1, 2, 3, 4].map((row) => (
                          <div key={row} className="flex items-center gap-3">
                            <div className="h-2 flex-1 rounded-full bg-white/15" />
                            <div className="h-2 w-10 rounded-full bg-white/25" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
              </div>
            </div>
          </motion.a>
        </SectionReveal>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" className="section-pad relative bg-transparent">
      <div className="container-wide">
        <SectionReveal variant="clip">
          <p className="font-mono text-[12px] tracking-[0.16em] text-muted uppercase">
            Featured work
          </p>
        </SectionReveal>
        <TextReveal
          as="h2"
          delay={0.05}
          className="mt-6 max-w-2xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-foreground"
        >
          Products shipped for real operations.
        </TextReveal>
        <SectionReveal delay={0.1}>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted md:text-[17px]">
            Selected platforms where interface, roles, and business logic had to
            work as one system — launched like products, not pages.
          </p>
        </SectionReveal>

        <div className="mt-20 md:mt-24">
          {featuredProjects.map((project, index) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
