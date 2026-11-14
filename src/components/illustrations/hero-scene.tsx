import { DeviceFrame, RealScreen, SCREENS } from "@/components/illustrations/device";

/**
 * Hero picture: a drawn child holding the AAC Device, showing a real screenshot of the app.
 * Swap this for a real photo when one is available (same rounded frame, same size).
 */
export function HeroScene() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[28px] bg-[#bfe3f2]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {/* Room: wall, window light, sofa */}
        <rect width="400" height="400" fill="#cfeaf5" />
        <circle cx="330" cy="70" r="120" fill="#e3f4fa" />
        <rect x="-10" y="250" width="420" height="160" rx="40" fill="#5fb3c9" />
        <rect x="-10" y="300" width="420" height="120" fill="#4aa0b8" />
        <path d="M30 60l10-14 10 14 10-14M70 130l-10 20M80 134l-10 20" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".8" />
        <path d="M330 190l10-12 8 14 10-12" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".8" />

        {/* Child */}
        <g transform="translate(0 -52)">
        <path d="M62 470V400c0-74 52-112 138-112s138 38 138 112v70Z" fill="#ffffff" />
        <g stroke="#28958a" strokeWidth="9" strokeLinecap="round" opacity=".85">
          <path d="M92 330h216M72 356h256M64 384h272M64 412h272M64 440h272" />
        </g>
        <rect x="176" y="246" width="48" height="54" rx="20" fill="#e8b48c" />
        <circle cx="121" cy="184" r="15" fill="#f2c7a2" />
        <circle cx="279" cy="184" r="15" fill="#f2c7a2" />
        <ellipse cx="200" cy="178" rx="80" ry="86" fill="#f7d2b0" />
        <path
          d="M118 172c-8-72 40-100 86-98 50 2 88 30 78 100-14-34-40-52-82-50-38 2-66 16-82 48Z"
          fill="#7a4a2a"
        />
        <path d="M150 118c14-22 40-32 62-28" stroke="#93603a" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* Face: happy closed eyes, big open smile */}
        <path d="M156 178q11-14 22 0M222 178q11-14 22 0" stroke="#15102b" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="148" cy="206" r="13" fill="#ff9d8a" opacity=".55" />
        <circle cx="252" cy="206" r="13" fill="#ff9d8a" opacity=".55" />
        <path d="M168 210q32 46 64 0Z" fill="#7a2733" />
        <path d="M176 212h48q-3 9-24 9t-24-9Z" fill="#ffffff" />
        <path d="M186 240q14-12 28 0-14 8-28 0Z" fill="#ff8f9c" />
        </g>
      </svg>

      {/* Device held up to the camera */}
      <div className="absolute -bottom-[2%] left-1/2 w-[68%] -translate-x-1/2 -rotate-[5deg]">
        <DeviceFrame>
          <RealScreen {...SCREENS.aac} priority />
        </DeviceFrame>
        {/* Hands gripping the case */}
        <span className="absolute -left-[5%] top-[38%] h-[30%] w-[11%] rounded-full bg-[#f7d2b0] shadow-[inset_-4px_0_0_rgb(0_0_0_/_0.08)]" />
        <span className="absolute -right-[5%] top-[30%] h-[30%] w-[11%] rounded-full bg-[#f7d2b0] shadow-[inset_4px_0_0_rgb(0_0_0_/_0.08)]" />
      </div>
    </div>
  );
}
