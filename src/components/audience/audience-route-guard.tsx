"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAudience } from "@/components/providers/audience-provider";
import { getAudienceRedirectTarget, getBlockedPaths } from "@/lib/audience/filter";
import { THERAPY_PROGRESS_ENABLED } from "@/lib/flags";

/**
 * Redirects users away from product pages that don't match their path.
 * While Therapy Progress is temporarily disabled, /ai-therapy and /parents
 * always redirect to Adult AAC.
 */
export function AudienceRouteGuard() {
  const { audience, ready, setAudience } = useAudience();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;

    // Force adult when therapy product is temporarily offline
    if (!THERAPY_PROGRESS_ENABLED && audience === "child") {
      setAudience("adult");
      return;
    }

    if (!audience && THERAPY_PROGRESS_ENABLED) return;
    const effective = audience ?? "adult";

    const blocked = getBlockedPaths(effective);
    const isBlocked = blocked.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );

    if (isBlocked) {
      router.replace(getAudienceRedirectTarget(effective));
    }
  }, [audience, ready, pathname, router, setAudience]);

  return null;
}
