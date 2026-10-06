"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTestimonialsForAudience } from "@/lib/data/testimonials";
import { useAudience } from "@/components/providers/audience-provider";
import { THERAPY_PROGRESS_ENABLED } from "@/lib/flags";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { audience } = useAudience();
  const effective =
    THERAPY_PROGRESS_ENABLED && audience === "child" ? "child" : "adult";
  const list = getTestimonialsForAudience(effective);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 5500, stopOnInteraction: true, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect, list]);

  return (
    <section className="section-pad section-light border-t border-black/5">
      <Container>
        <SectionHeading
          eyebrow="Stories from your path"
          title="Real progress, in their own words"
        />

        <div className="relative mt-16" key={effective}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4 flex sm:-ml-6">
              {list.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 sm:pl-6 lg:basis-1/3"
                >
                  <div className="card-glow flex h-full flex-col rounded-3xl p-7">
                    <Quote className="size-8 fill-[#c2410c]/15 text-[#c2410c]" />
                    <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground/85">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0a6b64] text-sm font-semibold text-white">
                        {testimonial.initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => emblaApi?.scrollPrev()}
              className="flex size-10 items-center justify-center rounded-full border border-black/15 bg-white text-black transition-transform hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center">
              {list.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === selectedIndex ? "true" : undefined}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className="flex items-center justify-center p-2.5"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-300",
                      index === selectedIndex ? "w-6 bg-gradient-brand" : "w-1.5 bg-border"
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => emblaApi?.scrollNext()}
              className="flex size-10 items-center justify-center rounded-full border border-black/15 bg-white text-black transition-transform hover:scale-105 active:scale-95"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
