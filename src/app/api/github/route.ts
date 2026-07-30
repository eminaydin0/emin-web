import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

const USERNAME_FALLBACK = "eminaydin0";

function githubHeaders() {
  return {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "emin-web",
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  };
}

async function safeJson<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, {
      headers: githubHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function GET(request: NextRequest) {
  const username =
    request.nextUrl.searchParams.get("username") || USERNAME_FALLBACK;

  const [user, repos, events, contributions] = await Promise.all([
    safeJson<{
      public_repos?: number;
      followers?: number;
      following?: number;
      public_gists?: number;
      avatar_url?: string;
      html_url?: string;
      bio?: string;
    }>(`https://api.github.com/users/${username}`, {
      public_repos: 19,
      followers: 2,
      following: 0,
      public_gists: 0,
    }),
    safeJson<
      Array<{
        id: number;
        name: string;
        full_name: string;
        description: string | null;
        html_url: string;
        language: string | null;
        stargazers_count: number;
        forks_count: number;
        updated_at: string;
        fork: boolean;
      }>
    >(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, []),
    safeJson<
      Array<{
        id: string;
        type: string;
        repo: { name: string; url: string };
        created_at: string;
        payload?: {
          commits?: Array<{ message: string; sha: string }>;
          ref_type?: string;
          action?: string;
        };
      }>
    >(`https://api.github.com/users/${username}/events/public?per_page=30`, []),
    safeJson<{
      contributions?: Array<{ date: string; count: number; level: number }>;
      total?: Record<string, number>;
    }>(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {}),
  ]);

  const ownRepos = repos
    .filter((r) => !r.fork)
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 4)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      updatedAt: r.updated_at,
    }));

  const recentCommits = events
    .filter((e) => e.type === "PushEvent")
    .flatMap((e) =>
      (e.payload?.commits ?? []).slice(0, 2).map((c) => ({
        message: c.message.split("\n")[0],
        sha: c.sha.slice(0, 7),
        repo: e.repo.name,
        url: `https://github.com/${e.repo.name}`,
        at: e.created_at,
      }))
    )
    .slice(0, 6);

  const contributionDays = contributions.contributions ?? [];
  const totalLastYear =
    contributions.total?.[
      Object.keys(contributions.total ?? {}).sort().at(-1) ?? ""
    ] ?? contributionDays.reduce((sum, d) => sum + (d.count || 0), 0);

  return NextResponse.json({
    profile: {
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      publicGists: user.public_gists ?? 0,
      avatarUrl: user.avatar_url,
      url: user.html_url ?? `https://github.com/${username}`,
      bio: user.bio ?? null,
    },
    repos: ownRepos,
    recentCommits,
    contributions: {
      days: contributionDays.slice(-371),
      totalLastYear,
    },
  });
}
