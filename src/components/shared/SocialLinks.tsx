"use client";

import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  XIcon,
} from "@/components/icons/brand-icons";
import { socialLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  x: XIcon,
};

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export function SocialLinks({ className, iconClassName = "h-5 w-5" }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-violet-500/30 hover:bg-violet-500/10 transition-all focus-ring"
            aria-label={`${link.name} profili`}
            data-cursor="pointer"
          >
            <Icon className={iconClassName} />
          </a>
        );
      })}
    </div>
  );
}
