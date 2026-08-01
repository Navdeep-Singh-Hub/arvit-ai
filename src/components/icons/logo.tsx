import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="arvit-logo-gradient" x1="2" y1="4" x2="38" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="12" fill="url(#arvit-logo-gradient)" />
      <path
        d="M7 21h4.4l2.6-6.5L18 27l3.6-14 2.6 8h5.8"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
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
    <span className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight text-foreground", className)}>
      <LogoMark className={cn("size-8 shrink-0", markClassName)} />
      {!mark && (
        <span className="text-lg leading-none whitespace-nowrap">
          ARVIT <span className="text-gradient">AI</span>
        </span>
      )}
    </span>
  );
}
