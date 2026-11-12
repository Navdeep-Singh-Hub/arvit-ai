import { Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Product video. Left empty on purpose: set this to a hosted MP4
 * (e.g. "/videos/arvit-demo.mp4") and the player appears in the same frame.
 */
export const DEMO_VIDEO_URL: string | null = null;

export function DemoSection() {
  return (
    <section id="demo" className="bg-white py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <SectionHeading align="center" title="ARVIT In Action" accent="In Action" />

        <div className="relative mx-auto mt-10 aspect-video w-full max-w-[760px] overflow-hidden rounded-[20px] bg-[#f7f4f3]">
          {DEMO_VIDEO_URL ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={DEMO_VIDEO_URL}
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-black/15 rounded-[20px]">
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
