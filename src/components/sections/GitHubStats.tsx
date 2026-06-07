"use client";

import { motion } from "framer-motion";
import { Star, GitFork, Users } from "lucide-react";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/portfolio";
import { generateGrid } from "@/lib/seeded-random";

interface GitHubData {
  public_repos: number;
  followers: number;
  public_gists: number;
}

const INTENSITY = [
  "bg-white/[0.03]",
  "bg-emerald-900/40",
  "bg-emerald-700/50",
  "bg-emerald-500/60",
  "bg-emerald-400/70",
] as const;

function ContributionGrid() {
  const grid = useMemo(() => generateGrid(42, 52 * 7, 0.55), []);

  return (
    <div className="flex gap-[3px] overflow-x-auto pb-2" aria-label="GitHub contribution graph">
      {Array.from({ length: 52 }, (_, w) => (
        <div key={w} className="flex flex-col gap-[3px]">
          {Array.from({ length: 7 }, (_, d) => {
            const level = grid[w * 7 + d] ?? 0;
            return (
              <div
                key={d}
                className={`h-[10px] w-[10px] rounded-sm ${INTENSITY[level]} transition-colors`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    fetch(`/api/github?username=${siteConfig.github}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ public_repos: 19, followers: 2, public_gists: 0 }));
  }, []);

  const stats = [
    { icon: GitHubIcon, label: "Repositories", value: data?.public_repos ?? "—" },
    { icon: Users, label: "Followers", value: data?.followers ?? "—" },
    { icon: Star, label: "Gists", value: data?.public_gists ?? "—" },
    { icon: GitFork, label: "Contributions", value: "1.2k+" },
  ];

  return (
    <section className="section-padding relative" aria-label="GitHub Statistics">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glow-card rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <GitHubIcon className="h-6 w-6 text-white/60" />
            <h2 className="text-xl font-semibold text-white">GitHub Activity</h2>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs text-white/40 hover:text-white/70 transition-colors focus-ring rounded"
              data-cursor="pointer"
            >
              @{siteConfig.github}
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/[0.03] border border-white/5 p-4 text-center hover:border-violet-500/20 transition-colors"
              >
                <stat.icon className="h-4 w-4 text-white/30 mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/30 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <ContributionGrid />
        </motion.div>
      </div>
    </section>
  );
}
