"use client";

import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/effects/SmoothScroll";

export function AppProviders({ children }: { children: ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
