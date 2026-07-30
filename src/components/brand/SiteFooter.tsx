import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-background-soft">
      <div className="mx-auto flex max-w-[980px] flex-col gap-4 px-5 py-8 text-[12px] text-muted-soft md:flex-row md:items-center md:justify-between md:px-6">
        <p>
          Copyright © {year} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex gap-5">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted"
          >
            LinkedIn
          </a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-muted">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
