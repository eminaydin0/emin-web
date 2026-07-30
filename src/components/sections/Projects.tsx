"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { featuredProjects, type FeaturedProject } from "@/data/site";
import { cn } from "@/lib/utils";

const toneStyles: Record<
  FeaturedProject["tone"],
  { stage: string; screen: string; accent: string }
> = {
  indigo: {
    stage: "from-[#eef3ff] via-[#f7f8fc] to-[#ffffff]",
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
    <article className="border-t border-border py-16 md:py-24 first:border-t-0 first:pt-0">
      <div
        className={cn(
          "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
          reversed && "lg:[&>*:first-child]:order-2"
        )}
      >
        <SectionReveal>
          <div className="max-w-lg">
            <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted">
              <span className="font-mono tracking-[0.12em] uppercase">
                {project.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-border-strong" />
              <span className="font-mono">{project.year}</span>
            </div>

            <h3 className="mt-5 text-[clamp(1.85rem,3.5vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-foreground">
              {project.name}
            </h3>

            <p className="mt-4 text-[16px] leading-relaxed text-muted md:text-[17px]">
              {project.summary}
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-foreground/75">
              {project.narrative}
            </p>

            <ul className="mt-8 space-y-3">
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
                  className="rounded-full border border-border bg-white px-3 py-1 text-[12px] text-muted"
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
                className="focus-ring group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Visit product
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <motion.a
            href={project.href}
            target={project.href ? "_blank" : undefined}
            rel={project.href ? "noopener noreferrer" : undefined}
            className={cn(
              "group relative block overflow-hidden rounded-[28px] bg-gradient-to-br p-6 shadow-[var(--shadow-md)] transition-shadow duration-500 hover:shadow-[var(--shadow-lg)] md:p-8",
              tone.stage
            )}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[var(--shadow-sm)]">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
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
                <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_45%)]" />
                <div className="absolute inset-x-6 top-6 bottom-6 grid grid-cols-[0.28fr_1fr] gap-3 md:inset-x-8 md:top-8 md:bottom-8 md:gap-4">
                  <div className="rounded-xl bg-white/10 backdrop-blur-sm">
                    <div className="space-y-2 p-3 md:p-4">
                      <div className="h-2 w-10 rounded-full bg-white/40" />
                      <div className="h-2 w-14 rounded-full bg-white/20" />
                      <div className="h-2 w-12 rounded-full bg-white/20" />
                      <div className="mt-4 h-2 w-16 rounded-full bg-white/25" />
                      <div className="h-2 w-11 rounded-full bg-white/15" />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="rounded-xl bg-white/12 p-3 backdrop-blur-sm"
                        >
                          <div className="h-2 w-8 rounded-full bg-white/35" />
                          <div className="mt-3 h-5 w-12 rounded-md bg-white/25" />
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="h-2.5 w-20 rounded-full bg-white/35" />
                        <div className="h-2.5 w-10 rounded-full bg-white/20" />
                      </div>
                      <div className="space-y-2.5">
                        {[1, 2, 3, 4].map((row) => (
                          <div
                            key={row}
                            className="flex items-center gap-3"
                          >
                            <div className="h-2 flex-1 rounded-full bg-white/15" />
                            <div className="h-2 w-10 rounded-full bg-white/25" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
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
    <section id="work" className="section-pad bg-background">
      <div className="container-wide">
        <SectionReveal>
          <p className="font-mono text-[12px] tracking-[0.14em] text-muted uppercase">
            Featured work
          </p>
          <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] font-semibold tracking-[-0.045em] text-foreground">
            Products shipped for real operations.
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
            Selected platforms where interface, roles, and business logic had to
            work as one system — not just look finished.
          </p>
        </SectionReveal>

        <div className="mt-16 md:mt-20">
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
