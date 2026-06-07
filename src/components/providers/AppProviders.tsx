"use client";

import { useState, type ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { LaboratoryEnvironment } from "@/components/effects/LaboratoryEnvironment";
import { ScrollOrchestrator } from "@/components/effects/ScrollOrchestrator";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Preloader } from "@/components/shared/Preloader";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { EasterEgg } from "@/components/shared/EasterEgg";
import { CommandCenter } from "@/components/lab/CommandCenter";
import { LabFooter } from "@/components/lab/LabFooter";

export function AppProviders({ children }: { children: ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <TooltipProvider>
      <SmoothScroll>
        <Preloader />
        <ScrollOrchestrator />
        <ScrollProgress />
        <LaboratoryEnvironment />
        <CustomCursor />
        <CommandCenter onOpenPalette={() => setCommandOpen(true)} />
        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
        <EasterEgg />
        <main className="relative z-10 bg-[#020208]">{children}</main>
        <LabFooter />
      </SmoothScroll>
    </TooltipProvider>
  );
}
