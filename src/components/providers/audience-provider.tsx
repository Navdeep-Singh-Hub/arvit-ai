"use client";

import { createContext, useContext, type ReactNode } from "react";
import { AUDIENCE_COPY, type Audience, type AudienceCopy } from "@/lib/audience/content";

/**
 * The site sells one device to one audience (families). The context is kept so existing
 * components keep working, but the value is static: no gate, no client-side wait.
 */
type AudienceContextValue = {
  audience: Audience;
  ready: true;
  copy: AudienceCopy;
};

const VALUE: AudienceContextValue = {
  audience: "child",
  ready: true,
  copy: AUDIENCE_COPY.child,
};

const AudienceContext = createContext<AudienceContextValue>(VALUE);

export function AudienceProvider({ children }: { children: ReactNode }) {
  return <AudienceContext.Provider value={VALUE}>{children}</AudienceContext.Provider>;
}

export function useAudience() {
  return useContext(AudienceContext);
}
