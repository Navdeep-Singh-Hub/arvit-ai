import Link from "next/link";
import { ArrowRight, Tablet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TABLET_PRODUCTS } from "@/lib/data/tablet-products";
import { cn } from "@/lib/utils";

/** Always-on homepage section clarifying the two tablet SKUs. */
export function TabletProducts() {
  return (
    <section id="tablets" className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="Our tablets"
          eyebrowIcon={Tablet}
          title="One brand. Two devices. Clear difference."
          description="Adults get a focused AAC tablet. Children get AAC plus speech AI, occupational therapy games, special education, videos, and progress — on a single therapy tablet."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {TABLET_PRODUCTS.map((product) => {
            const isTherapy = product.id === "therapy-child";
            return (
              <StaggerItem key={product.id} className="h-full">
                <Link
                  href={product.href}
                  className={cn(
                    "group card-glow relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9",
                    isTherapy && "glow-border"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase",
                      isTherapy
                        ? "bg-brand-primary/15 text-brand-primary"
                        : "bg-brand-secondary/15 text-brand-secondary"
                    )}
                  >
                    {product.audience}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-base font-medium text-foreground/85">{product.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

                  <ul className="mt-6 grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
                    {product.highlights.map(({ icon: Icon, label }) => (
                      <li
                        key={label}
                        className="flex items-center gap-2.5 rounded-xl bg-muted/50 px-3 py-2.5 text-sm text-foreground/85"
                      >
                        <Icon
                          className={cn(
                            "size-4 shrink-0",
                            isTherapy ? "text-brand-primary" : "text-brand-secondary"
                          )}
                        />
                        {label}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
                    Learn more
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
