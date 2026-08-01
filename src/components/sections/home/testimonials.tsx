"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
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
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading eyebrow="Loved by families and therapists" title="Real progress, in their own words" />

        <div className="relative mt-16">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4 flex sm:-ml-6">
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 sm:pl-6 lg:basis-1/3"
                >
                  <div className="card-glow flex h-full flex-col rounded-3xl p-7">
                    <Quote className="size-8 fill-brand-primary/15 text-brand-primary/30" />
                    <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground/85">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-semibold text-white">
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
              className="glass flex size-10 items-center justify-center rounded-full text-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center">
              {TESTIMONIALS.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === selectedIndex}
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
              className="glass flex size-10 items-center justify-center rounded-full text-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
