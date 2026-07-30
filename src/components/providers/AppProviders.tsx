"use client";

import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Preloader } from "@/components/effects/Preloader";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { AmbientField } from "@/components/effects/AmbientField";
import { ScrollOrchestrator } from "@/components/effects/ScrollOrchestrator";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <AmbientField />
      <ScrollOrchestrator />
      <div className="relative z-10">{children}</div>
    </SmoothScroll>
  );
}
