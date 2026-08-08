"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Tablet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import { formatProductPrice, type PrebookProduct } from "@/lib/commerce/products";
import { TABLET_PRODUCTS } from "@/lib/data/tablet-products";
import { AUDIENCE_COPY } from "@/lib/audience/content";
import { getAudienceProducts } from "@/lib/audience/filter";
import { useAudience } from "@/components/providers/audience-provider";
import { TabletViewer } from "@/components/three/tablet-viewer";

const HIGHLIGHTS_BY_PREBOOK_ID: Record<PrebookProduct["id"], (typeof TABLET_PRODUCTS)[number]["highlights"]> = {
  "aac-app": TABLET_PRODUCTS.find((t) => t.id === "aac-adult")?.highlights ?? [],
  "therapy-app": TABLET_PRODUCTS.find((t) => t.id === "therapy-child")?.highlights ?? [],
};

function ProductCard({ product }: { product: PrebookProduct }) {
  const prefersReducedMotion = useReducedMotion();
  const highlights = HIGHLIGHTS_BY_PREBOOK_ID[product.id];

  return (
    <motion.div
      layout
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-5xl"
    >
      <div className="grid grid-cols-1 border border-black/10 bg-white lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="relative min-h-[220px] border-b border-black/10 bg-[#f4f4f4] sm:min-h-[300px] lg:min-h-[min(100%,420px)] lg:border-b-0 lg:border-r">
          <TabletViewer
            variant="light"
            size="card"
            interactive
            defer={false}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <div className="flex flex-col p-5 sm:p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-eyebrow inline-flex items-center gap-1.5 text-black/55">
              <Tablet className="size-3.5" />
              {product.audience}
            </span>
            {product.comingSoon ? (
              <span className="text-eyebrow bg-[#000000] px-2.5 py-1 !text-[#ffffff]">Coming soon</span>
            ) : null}
          </div>

          <h3 className="text-h3 mt-6 text-black sm:mt-8">{product.name}</h3>
          <p className="mt-2 text-base font-medium tracking-tight text-black/70 sm:mt-3 sm:text-lg">{product.tagline}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/60 sm:mt-6 sm:text-base">{product.description}</p>

          <ul className="mt-6 grid grid-cols-1 gap-px border border-black/10 bg-black/10 sm:mt-10 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 bg-white px-3 py-3.5 text-sm font-medium text-black sm:px-4 sm:py-4"
              >
                <Icon className="size-4 shrink-0 text-black" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-6 border-t border-black/10 pt-8 sm:mt-12 sm:gap-8 sm:pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-eyebrow text-black/55">
                {product.comingSoon ? "Pre-book price" : "Price"}
              </p>
              <p className="mt-2 text-[clamp(2rem,8vw,3.5rem)] font-normal tracking-tight text-black">
                {formatProductPrice(product)}
              </p>
              <p className="mt-2 text-xs text-black/50">
                {product.comingSoon ? "Inclusive INR · ships when ready" : "Inclusive price in INR"}
              </p>
            </div>
            <Link
              href={product.href}
              className="text-nav inline-flex items-center gap-2 text-black transition-opacity hover:opacity-60"
            >
              Learn more
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-6 sm:mt-8">
            <AddToCartButton
              productId={product.id}
              label={`Pre-book ${product.shortName}`}
              variant="gradient"
              size="xl"
              className="w-full justify-center sm:max-w-xs"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TabletProducts() {
  const { audience, copy, ready } = useAudience();
  const active = copy ?? AUDIENCE_COPY.adult;
  const products = getAudienceProducts(audience);

  if (!ready || !audience) {
    return (
      <section id="tablets" className="section-pad section-light border-t border-black/5">
        <Container>
          <p className="text-center text-muted-foreground">Choose Adult or Child to see your system.</p>
        </Container>
      </section>
    );
  }

  return (
    <section id="tablets" className="section-pad section-light border-t border-black/5">
      <Container size="wide" className="max-w-[1400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={audience}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeading
              eyebrow={active.tabletsEyebrow}
              title={active.tabletsTitle}
              description={active.tabletsDescription}
              align="left"
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 sm:mt-20">
          <AnimatePresence mode="wait">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
