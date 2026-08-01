import { AlertTriangle } from "lucide-react";

export function LegalNotice() {
  return (
    <div className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm leading-relaxed text-amber-800 dark:text-amber-400">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <p>
        This page is placeholder content created for design purposes. It has not been reviewed by legal counsel and
        should not be treated as an actual privacy policy or terms of service before launch — please have qualified
        legal counsel review and finalize this content before publishing it live.
      </p>
    </div>
  );
}
