"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { SectionReveal } from "@/components/brand/SectionReveal";
import { CountUp } from "@/components/brand/CountUp";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

interface GitHubPayload {
  profile: {
    publicRepos: number;
    followers: number;
    following: number;
    publicGists: number;
    url: string;
  };
  repos: Array<{
    name: string;
    description: string | null;
    url: string;
    language: string | null;
    stars: number;
    forks: number;
    updatedAt: string;
  }>;
  recentCommits: Array<{
    message: string;
    sha: string;
    repo: string;
    url: string;
    at: string;
  }>;
  contributions: {
    days: Array<{ date: string; count: number; level: number }>;
    totalLastYear: number;
  };
}

const LEVEL = [
  "bg-[#e8e8ed]",
  "bg-[#b3d7ff]",
  "bg-[#6eb6ff]",
  "bg-[#2997ff]",
  "bg-[#0071e3]",
] as const;

function ContributionGraph({
  days,
}: {
  days: GitHubPayload["contributions"]["days"];
}) {
  if (!days.length) {
    return (
      <p className="text-[15px] text-muted">
        Contribution graph unavailable right now.
      </p>
    );
  }

  const weeks: Array<typeof days> = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div
      className="flex gap-[3px] overflow-x-auto pb-1"
      aria-label="GitHub contribution graph"
    >
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.count} contributions`}
              className={cn(
                "h-[10px] w-[10px] rounded-[2px]",
                LEVEL[Math.min(day.level, 4)] ?? LEVEL[0]
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Weekly activity as a drawing river — real data, not decoration */
function ActivityRiver({
  days,
  reduce,
}: {
  days: GitHubPayload["contributions"]["days"];
  reduce: boolean | null;
}) {
  const weeks = useMemo(() => {
    if (!days.length) return [] as number[];
    const out: number[] = [];
    for (let i = 0; i < days.length; i += 7) {
      const slice = days.slice(i, i + 7);
      out.push(slice.reduce((s, d) => s + d.count, 0));
    }
    return out;
  }, [days]);

  const { line, area, peakWeek, activeWeeks } = useMemo(() => {
    if (!weeks.length) {
      return { line: "", area: "", peakWeek: 0, activeWeeks: 0 };
    }
    const max = Math.max(...weeks, 1);
    const w = 640;
    const h = 120;
    const pad = 8;
    const pts = weeks.map((v, i) => {
      const x = pad + (i / Math.max(1, weeks.length - 1)) * (w - pad * 2);
      const y = h - pad - (v / max) * (h - pad * 2);
      return [x, y] as const;
    });

    const lineD = pts
      .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(" ");
    const areaD = `${lineD} L ${(pts.at(-1)?.[0] ?? w).toFixed(1)} ${h} L ${pad} ${h} Z`;

    return {
      line: lineD,
      area: areaD,
      peakWeek: Math.max(...weeks),
      activeWeeks: weeks.filter((v) => v > 0).length,
    };
  }, [weeks]);

  if (!weeks.length) return null;

  return (
    <div className="tile overflow-hidden bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.1em] text-accent uppercase">
            Year in motion
          </p>
          <h3 className="mt-1 text-[21px] font-semibold tracking-[-0.02em] text-foreground md:text-[24px]">
            The rhythm of shipping.
          </h3>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <p className="text-[11px] text-muted-soft">Active weeks</p>
            <p className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">
              {activeWeeks}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-muted-soft">Peak week</p>
            <p className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">
              {peakWeek}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <svg
          viewBox="0 0 640 120"
          className="h-[120px] w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="gh-river-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0071e3" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#0071e3" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={area}
            fill="url(#gh-river-fill)"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="#0071e3"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="mt-1 flex justify-between text-[11px] text-muted-soft">
          <span>12 months ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}

/** Auto-cycling spotlight on public repos */
function RepoSpotlight({
  repos,
}: {
  repos: GitHubPayload["repos"];
}) {
  const [index, setIndex] = useState(0);
  const list = repos.slice(0, 5);

  useEffect(() => {
    if (list.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [list.length]);

  if (!list.length) return null;
  const repo = list[index];

  return (
    <div className="tile relative flex h-full flex-col overflow-hidden bg-white p-7 md:p-8">
      <p className="text-[12px] font-semibold tracking-[0.1em] text-accent uppercase">
        On the bench
      </p>

      <div className="relative mt-4 min-h-[148px] flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group focus-ring inline-flex items-center gap-2 rounded-sm"
            >
              <h3 className="text-[26px] font-semibold tracking-[-0.03em] text-foreground md:text-[30px]">
                {repo.name}
              </h3>
              <ArrowUpRight className="h-5 w-5 text-muted-soft transition group-hover:text-accent" />
            </a>
            <p className="mt-3 max-w-lg text-[16px] leading-snug text-muted md:text-[17px]">
              {repo.description || "A public repository from the workbench."}
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-[13px] text-muted-soft">
              {repo.language && (
                <span className="font-medium text-foreground/70">
                  {repo.language}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5" /> {repo.stars}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" /> {repo.forks}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-1.5">
        {list.map((r, i) => (
          <button
            key={r.name}
            type="button"
            aria-label={`Show ${r.name}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1 rounded-full transition-all",
              i === index
                ? "w-6 bg-accent"
                : "w-1.5 bg-border hover:bg-muted-soft"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function formatRelative(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function GitHubActivity() {
  const reduce = useReducedMotion();
  const [data, setData] = useState<GitHubPayload | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/github?username=${siteConfig.github}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const stats = [
    { label: "Repositories", value: data?.profile.publicRepos },
    { label: "Followers", value: data?.profile.followers },
    { label: "Contributions", value: data?.contributions.totalLastYear },
  ];

  return (
    <section id="github" className="section-pad bg-background-soft">
      <div className="container-brand">
        <SectionReveal>
          <h2 className="text-center text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            GitHub activity.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[19px] text-muted md:text-[21px]">
            The year as a pulse — public proof of the craft.
          </p>
          <div className="mt-4 text-center">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-link focus-ring rounded-sm"
            >
              @{siteConfig.github} ›
            </a>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="tile bg-white p-6 text-center">
                <p className="text-[14px] text-muted">{stat.label}</p>
                <p className="mt-2 text-[32px] font-semibold tracking-[-0.03em] text-foreground">
                  {typeof stat.value === "number" ? (
                    <CountUp value={stat.value} />
                  ) : (
                    "—"
                  )}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* New: activity river + repo spotlight */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <SectionReveal delay={0.06}>
            {data?.contributions.days ? (
              <ActivityRiver days={data.contributions.days} reduce={reduce} />
            ) : (
              <div className="tile h-[220px] animate-pulse bg-white" />
            )}
          </SectionReveal>
          <SectionReveal delay={0.08}>
            {data?.repos ? (
              <RepoSpotlight repos={data.repos} />
            ) : (
              <div className="tile h-[220px] animate-pulse bg-white" />
            )}
          </SectionReveal>
        </div>

        <SectionReveal delay={0.08}>
          <div className="tile mt-4 bg-white p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-[15px] font-semibold text-foreground">
                Contribution activity
              </p>
              <p className="text-[12px] text-muted-soft">Last 12 months</p>
            </div>
            {error ? (
              <p className="text-[15px] text-muted">Unable to load activity.</p>
            ) : !data ? (
              <div className="h-[82px] animate-pulse rounded-md bg-background-soft" />
            ) : (
              <ContributionGraph days={data.contributions.days} />
            )}
          </div>
        </SectionReveal>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <SectionReveal delay={0.08}>
            <div className="tile h-full bg-white p-6 md:p-8">
              <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-foreground">
                Repositories
              </h3>
              <ul className="mt-5 space-y-4">
                {!data &&
                  [0, 1, 2].map((i) => (
                    <li key={i}>
                      <div className="h-4 w-32 animate-pulse rounded bg-background-soft" />
                    </li>
                  ))}
                {data?.repos.map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group focus-ring block rounded-md"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-foreground group-hover:text-accent">
                          {repo.name}
                        </p>
                        <ArrowUpRight className="h-4 w-4 text-muted-soft" />
                      </div>
                      {repo.description && (
                        <p className="mt-1 line-clamp-2 text-[14px] text-muted">
                          {repo.description}
                        </p>
                      )}
                      <div className="mt-2 flex gap-3 text-[12px] text-muted-soft">
                        {repo.language && <span>{repo.language}</span>}
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stars}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {repo.forks}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="tile h-full bg-white p-6 md:p-8">
              <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-foreground">
                Recent commits
              </h3>
              <ul className="mt-5 space-y-4">
                {!data &&
                  [0, 1, 2, 3].map((i) => (
                    <li key={i}>
                      <div className="h-3.5 w-3/4 animate-pulse rounded bg-background-soft" />
                    </li>
                  ))}
                {data?.recentCommits.map((commit, i) => (
                  <li key={`${commit.sha}-${i}`}>
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring block rounded-md"
                    >
                      <p className="line-clamp-1 text-[15px] font-medium text-foreground hover:text-accent">
                        {commit.message}
                      </p>
                      <p className="mt-1 text-[12px] text-muted-soft">
                        {commit.repo.replace(`${siteConfig.github}/`, "")} ·{" "}
                        {commit.sha} · {formatRelative(commit.at)}
                      </p>
                    </a>
                  </li>
                ))}
                {data && data.recentCommits.length === 0 && (
                  <li>
                    <div className="rounded-2xl bg-background-soft px-4 py-5">
                      <p className="text-[15px] font-medium text-foreground">
                        Quiet on the public feed.
                      </p>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                        No recent public pushes — much of the shipping still
                        happens in private product repos.
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
