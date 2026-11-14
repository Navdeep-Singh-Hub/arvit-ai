import { Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Product video: the ARVIT Tab promo (v3), re-encoded to 720p for the web.
 * Set to null to show the empty placeholder frame instead.
 */
export const DEMO_VIDEO_URL: string | null = "/videos/arvit-promo.mp4";
const DEMO_VIDEO_POSTER = "/videos/arvit-promo-poster.jpg";

export function DemoSection() {
  return (
    <section id="demo" className="bg-white py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <SectionHeading align="center" title="ARVIT In Action" accent="In Action" />
        <p className="mx-auto mt-3 max-w-[560px] text-center text-lg text-black/70">
          Watch how ARVIT Tab helps a child talk, learn and play. 77 seconds, sound on.
        </p>

        <div className="relative mx-auto mt-10 aspect-video w-full max-w-[880px] overflow-hidden rounded-[20px] border border-black/20 bg-[#15102b] shadow-[0_30px_60px_-30px_rgb(21_16_43_/_0.6)]">
          {DEMO_VIDEO_URL ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={DEMO_VIDEO_URL}
              poster={DEMO_VIDEO_POSTER}
              controls
              playsInline
              preload="none"
              aria-label="ARVIT Tab promo video"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center rounded-[20px] border-2 border-dashed border-black/15 bg-[#f7f4f3]">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-[#15102b]/80 text-white">
                <Play className="size-7 translate-x-0.5 fill-current" aria-hidden />
                <span className="sr-only">Video coming soon</span>
              </span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
