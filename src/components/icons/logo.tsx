import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

/** Monochrome mark — white square + black waveform (reads on black nav) */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="2" fill="#ffffff" />
      <path
        d="M7 21h4.4l2.6-6.5L18 27l3.6-14 2.6 8h5.8"
        stroke="#000000"
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
    <span className={cn("inline-flex items-center gap-2.5 tracking-tight", className)}>
      <LogoMark className={cn("size-7 shrink-0", markClassName)} />
      {!mark && (
        <span className="text-[1.05rem] font-semibold uppercase leading-none tracking-[0.06em]">
          ARVIT
        </span>
      )}
    </span>
  );
}
