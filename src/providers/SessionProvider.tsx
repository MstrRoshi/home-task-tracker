"use client";

import { MockSessionProvider } from "./MockSessionProvider";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <MockSessionProvider>{children}</MockSessionProvider>;
} 