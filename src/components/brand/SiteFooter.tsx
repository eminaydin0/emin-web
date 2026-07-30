import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="container-wide flex flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
        <div>
          <p className="text-sm font-medium tracking-[-0.02em] text-foreground">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-sm text-muted">{siteConfig.location}</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="focus-ring transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
        <p className="text-sm text-muted-soft">© {year}</p>
      </div>
    </footer>
  );
}
