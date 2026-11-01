import Image from "next/image";
import { CalendarCheck, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/**
 * Product tour video. Set this to a hosted MP4 (e.g. "/videos/arvit-tour.mp4") once the
 * footage is ready, and add a poster frame from the video. Until then a live demo is offered.
 */
export const DEMO_VIDEO_URL: string | null = null;

export function DemoSection() {
  return (
    <section id="demo" className="section-dark section-pad overflow-hidden">
      <Container className="max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-eyebrow !text-[#5eead4]">See it in action</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-h2 mt-4 max-w-xl text-balance text-white">
                Watch your child find their voice, before you book
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-body-lg mt-6 max-w-lg text-white/75">
                {DEMO_VIDEO_URL
                  ? "A short tour of the boards your child uses and the progress view you follow."
                  : "Get a free live walkthrough on a video call. We'll show you the boards, the voice, and the parent view, and answer every question about your child."}
              </p>
            </Reveal>
            <Reveal delay={0.18} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/contact"
                size="xl"
                variant="gradient"
                magnetic={false}
                className="text-nav h-12 min-h-12 w-full px-8 sm:w-auto"
              >
                <CalendarCheck className="size-4" aria-hidden />
                Book a free demo
              </ButtonLink>
              <ButtonLink
                href="/#tablets"
                size="xl"
                variant="glass"
                magnetic={false}
                className="text-nav h-12 min-h-12 w-full px-8 sm:w-auto"
              >
                Book the device
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-[#171e24]">
              {DEMO_VIDEO_URL ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={DEMO_VIDEO_URL}
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : (
                <>
                  <Image
                    src="/ipad_pro_render/ipad_pro_beauty.png"
                    alt="The ARVIT AAC Device"
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-contain p-6 sm:p-10"
                  />
                  <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0e1418]/85 px-4 py-3 text-sm text-white backdrop-blur sm:inset-x-6 sm:bottom-6">
                    <PlayCircle className="size-5 shrink-0 text-[#5eead4]" aria-hidden />
                    <span>
                      <span className="font-semibold">Product tour video coming soon.</span>{" "}
                      <span className="text-white/75">Live demos available now.</span>
                    </span>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
