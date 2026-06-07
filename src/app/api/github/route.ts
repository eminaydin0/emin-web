import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { public_repos: 19, followers: 2, public_gists: 0 },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      public_repos: data.public_repos,
      followers: data.followers,
      public_gists: data.public_gists,
    });
  } catch {
    return NextResponse.json(
      { public_repos: 19, followers: 2, public_gists: 0 },
      { status: 200 }
    );
  }
}
