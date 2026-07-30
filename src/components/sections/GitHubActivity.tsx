"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { SectionReveal } from "@/components/brand/SectionReveal";
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
  "bg-[#ebedf0]",
  "bg-[#c6d7f8]",
  "bg-[#8babf0]",
  "bg-[#4c7de0]",
  "bg-[#2f6fed]",
] as const;

function ContributionGraph({
  days,
}: {
  days: GitHubPayload["contributions"]["days"];
}) {
  if (!days.length) {
    return (
      <p className="text-sm text-muted">
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
  const [data, setData] = useState<GitHubPayload | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/github?username=${siteConfig.github}`)
      .then((r) => r.json())
      .then((json) => setData(json))
      .catch(() => setError(true));
  }, []);

  const stats = [
    { label: "Repositories", value: data?.profile.publicRepos ?? "—" },
    { label: "Followers", value: data?.profile.followers ?? "—" },
    {
      label: "Contributions",
      value: data ? data.contributions.totalLastYear || "—" : "—",
    },
  ];

  return (
    <section id="github" className="section-pad bg-background">
      <div className="container-wide">
        <SectionReveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[12px] tracking-[0.14em] text-muted uppercase">
                GitHub
              </p>
              <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] font-semibold tracking-[-0.045em] text-foreground">
                Signal from the workbench.
              </h2>
            </div>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              @{siteConfig.github}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-background-soft px-5 py-5"
              >
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-border bg-white p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-foreground">
                Contribution activity
              </p>
              <p className="text-xs text-muted-soft">Last 12 months</p>
            </div>
            {error ? (
              <p className="text-sm text-muted">Unable to load activity.</p>
            ) : !data ? (
              <div className="h-[82px] animate-pulse rounded-md bg-background-soft" />
            ) : (
              <ContributionGraph days={data.contributions.days} />
            )}
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionReveal delay={0.08}>
            <h3 className="text-sm font-medium tracking-[-0.01em] text-foreground">
              Pinned repositories
            </h3>
            <ul className="mt-5 space-y-0 border-t border-border">
              {!data &&
                [0, 1, 2].map((i) => (
                  <li key={`skeleton-${i}`} className="border-b border-border py-5">
                    <div className="h-4 w-32 animate-pulse rounded bg-background-soft" />
                    <div className="mt-3 h-3 w-full max-w-sm animate-pulse rounded bg-background-soft" />
                  </li>
                ))}
              {data?.repos.map((repo) => (
                <li key={repo.name} className="border-b border-border py-5">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group focus-ring block rounded-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                        {repo.name}
                      </p>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-soft opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    {repo.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                        {repo.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-soft">
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
              {data && data.repos.length === 0 && (
                <li className="py-6 text-sm text-muted">No public repositories yet.</li>
              )}
            </ul>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <h3 className="text-sm font-medium tracking-[-0.01em] text-foreground">
              Recent commits
            </h3>
            <ul className="mt-5 space-y-0 border-t border-border">
              {!data &&
                [0, 1, 2, 3].map((i) => (
                  <li key={`commit-skeleton-${i}`} className="border-b border-border py-4">
                    <div className="h-3.5 w-[75%] animate-pulse rounded bg-background-soft" />
                    <div className="mt-2 h-2.5 w-40 animate-pulse rounded bg-background-soft" />
                  </li>
                ))}
              {data?.recentCommits.map((commit, i) => (
                <li key={`${commit.sha}-${i}`} className="border-b border-border py-4">
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group block rounded-md"
                  >
                    <p className="line-clamp-1 text-sm font-medium tracking-[-0.01em] text-foreground transition-colors group-hover:text-accent">
                      {commit.message}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] text-muted-soft">
                      {commit.repo.replace(`${siteConfig.github}/`, "")}
                      <span className="mx-2">·</span>
                      {commit.sha}
                      <span className="mx-2">·</span>
                      {formatRelative(commit.at)}
                    </p>
                  </a>
                </li>
              ))}
              {data && data.recentCommits.length === 0 && (
                <li className="py-6 text-sm text-muted">
                  No recent public push events.
                </li>
              )}
            </ul>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
