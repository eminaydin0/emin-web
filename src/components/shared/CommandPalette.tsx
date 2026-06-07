"use client";

import { Command } from "cmdk";
import { useCallback, useEffect, useState } from "react";
import {
  Briefcase,
  Code2,
  Home,
  Mail,
  Search,
  User,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { systemModules } from "@/data/modules";
import { projects } from "@/data/projects";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const moduleIcons: Record<string, React.ReactNode> = {
  CORE: <Home className="h-4 w-4" />,
  IDENTITY: <User className="h-4 w-4" />,
  MATRIX: <Code2 className="h-4 w-4" />,
  MISSIONS: <Briefcase className="h-4 w-4" />,
  EVOLUTION: <Briefcase className="h-4 w-4" />,
  PROTOCOL: <Mail className="h-4 w-4" />,
};

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState("");

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      setSearch("");
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [onOpenChange]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 max-w-lg">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <Command
          className="bg-transparent"
          loop
          shouldFilter
        >
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="h-4 w-4 text-white/30 shrink-0" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search sections, projects, articles..."
              className="flex-1 bg-transparent px-3 py-4 text-sm text-white placeholder:text-white/30 outline-none"
            />
            <kbd className="hidden sm:inline font-mono text-[10px] text-white/20 border border-white/10 rounded px-1.5 py-0.5">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-[360px] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-white/30">
              No results found.
            </Command.Empty>

            <Command.Group heading="System Modules" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-white/30">
              {systemModules.map((mod) => (
                <Command.Item
                  key={mod.id}
                  onSelect={() => navigate(mod.href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 cursor-pointer data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
                >
                  {moduleIcons[mod.label] ?? <Search className="h-4 w-4" />}
                  {mod.label} — {mod.sublabel}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Missions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-white/30">
              {projects.slice(0, 6).map((project) => (
                <Command.Item
                  key={project.id}
                  onSelect={() => navigate("#missions")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 cursor-pointer data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
                >
                  <Briefcase className="h-4 w-4" />
                  {project.title}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
