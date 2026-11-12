import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

/** Friendly mark: rounded teal tile with a speech bubble + sound wave (a voice). */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#28958a" />
      <path
        d="M10 11.5h20a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5H19l-5.5 4.5v-4.5H10A2.5 2.5 0 0 1 7.5 24V14a2.5 2.5 0 0 1 2.5-2.5Z"
        fill="#ffffff"
      />
      <path d="M14 19v0M18 16.5v5M22 14.5v9M26 17v4" stroke="#15102b" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="14" cy="19" r="1.3" fill="#ffd235" stroke="#15102b" strokeWidth="1" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
  mark?: boolean;
};

export function Logo({ className, markClassName, mark = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 tracking-tight", className)}>
      <LogoMark className={cn("size-7 shrink-0", markClassName)} />
      {!mark && (
        <span className="font-display text-[1.6rem] leading-none">
          Arvit
        </span>
      )}
    </span>
  );
}
