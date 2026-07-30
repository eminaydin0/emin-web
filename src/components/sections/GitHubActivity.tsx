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
      .then(setData)
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
    <section id="github" className="section-pad bg-background-soft">
      <div className="container-brand">
        <SectionReveal>
          <h2 className="text-center text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[40px]">
            GitHub activity.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[19px] text-muted md:text-[21px]">
            Signal from the workbench.
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
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>

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
                  <li className="text-[15px] text-muted">
                    No recent public push events.
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
