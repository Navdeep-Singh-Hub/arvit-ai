"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AUDIENCE_COPY,
  AUDIENCE_STORAGE_KEY,
  type Audience,
  type AudienceCopy,
} from "@/lib/audience/content";

type AudienceContextValue = {
  audience: Audience | null;
  ready: boolean;
  copy: AudienceCopy | null;
  setAudience: (value: Audience) => void;
  clearAudience: () => void;
  openGate: () => void;
  gateOpen: boolean;
};

const AudienceContext = createContext<AudienceContextValue | null>(null);

function applyAudienceAttr(audience: Audience | null) {
  if (typeof document === "undefined") return;
  if (audience) {
    document.documentElement.dataset.audience = audience;
  } else {
    delete document.documentElement.dataset.audience;
  }
}

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<Audience | null>(null);
  const [ready, setReady] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    const value: Audience = "child";
    setAudienceState(value);
    applyAudienceAttr(value);
    try {
      localStorage.setItem(AUDIENCE_STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setGateOpen(false);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyAudienceAttr(audience);
    if (!audience) return;
    const previousOverflow = document.body.style.overflow;
    // only lock when gate is open
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [audience, ready]);

  useEffect(() => {
    if (!ready) return;
    if (gateOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("lenis-stopped");
      window.dispatchEvent(new CustomEvent("arvit:lenis-stop"));
      return () => {
        document.body.style.overflow = prev;
        document.documentElement.classList.remove("lenis-stopped");
        window.dispatchEvent(new CustomEvent("arvit:lenis-start"));
      };
    }
  }, [gateOpen, ready]);

  const setAudience = useCallback((_value: Audience) => {
    const next: Audience = "child";
    setAudienceState(next);
    applyAudienceAttr(next);
    try {
      localStorage.setItem(AUDIENCE_STORAGE_KEY, next);
    } catch {
      // ignore
    }
    setGateOpen(false);
  }, []);

  const clearAudience = useCallback(() => {
    setAudienceState(null);
    applyAudienceAttr(null);
    try {
      localStorage.removeItem(AUDIENCE_STORAGE_KEY);
    } catch {
      // ignore
    }
    setGateOpen(true);
  }, []);

  const openGate = useCallback(() => {
    setGateOpen(false);
  }, []);

  const copy = audience ? AUDIENCE_COPY[audience] : null;

  const value = useMemo(
    () => ({
      audience,
      ready,
      copy,
      setAudience,
      clearAudience,
      openGate,
      gateOpen,
    }),
    [audience, ready, copy, setAudience, clearAudience, openGate, gateOpen]
  );

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>;
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error("useAudience must be used within AudienceProvider");
  return ctx;
}
