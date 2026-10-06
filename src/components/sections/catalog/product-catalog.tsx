import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import { PREBOOK_PRODUCTS, formatProductPrice, type PrebookProduct } from "@/lib/commerce/products";
import { TABLET_PRODUCTS } from "@/lib/data/tablet-products";
import { TABLET_MODEL } from "@/lib/media/tablet-model";
import { cn } from "@/lib/utils";

const CATALOG = PREBOOK_PRODUCTS.map((product, index) => {
  const tablet = TABLET_PRODUCTS.find((item) =>
    product.id === "aac-app" ? item.id === "aac-adult" : item.id === "therapy-child"
  );
  return {
    product,
    highlights: tablet?.highlights ?? [],
    index: String(index + 1).padStart(2, "0"),
    tone: (product.id === "therapy-app" ? "coral" : "teal") as "coral" | "teal",
  };
});

export function ProductCatalog() {
  return (
    <>
      <PageHero
        eyebrow="Catalog"
        title="Two products. One purpose."
        description="Choose the Adult AAC Device for communication, or the Child AAC + Therapy Progress App for therapy that families and clinicians can follow. Both are open for pre-book."
        align="left"
      />

      <section className="section-pad pt-0">
        <Container className="max-w-[1400px]">
          <div className="grid items-end gap-8 border-b border-[#12151a]/10 pb-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <p className="max-w-xl text-sm leading-relaxed text-[#12151a]/65">
              Prices are inclusive of INR. The Therapy App is still in production and can be reserved now.
            </p>
            <div className="relative hidden h-40 overflow-hidden rounded-3xl bg-[#e7f4f2] lg:block">
              <Image
                src={TABLET_MODEL.beauty}
                alt="ARVIT tablet"
                fill
                sizes="280px"
                className="object-contain p-4"
              />
            </div>
          </div>

          <ol className="mt-10 space-y-6">
            {CATALOG.map((entry) => (
              <li key={entry.product.id}>
                <CatalogEntry {...entry} />
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-pad border-t border-[#12151a]/8 pt-0">
        <Container className="max-w-[1400px]">
          <h2 className="text-h3 text-[#12151a]">Compare</h2>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-[#12151a]/8 bg-[#fffdf9]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">Compare the AAC Device and the Therapy App</caption>
              <thead>
                <tr className="border-b border-[#12151a]/10">
                  <th scope="col" className="px-5 py-4 font-medium text-[#12151a]/50">
                    <span className="sr-only">Detail</span>
                  </th>
                  {CATALOG.map((entry) => (
                    <th key={entry.product.id} scope="col" className="px-5 py-4 font-semibold text-[#12151a]">
                      {entry.product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompareRow label="Who it is for" values={CATALOG.map((entry) => entry.product.audience)} />
                <CompareRow label="Price" values={CATALOG.map((entry) => formatProductPrice(entry.product))} />
                <CompareRow
                  label="Status"
                  values={CATALOG.map((entry) =>
                    entry.product.comingSoon ? "Coming soon · pre-book open" : "Available to pre-book"
                  )}
                />
                <CompareRow
                  label="Includes"
                  values={CATALOG.map((entry) => entry.highlights.map((item) => item.label).join(" · "))}
                />
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
}

function CatalogEntry({
  product,
  highlights,
  index,
  tone,
}: {
  product: PrebookProduct;
  highlights: { label: string }[];
  index: string;
  tone: "teal" | "coral";
}) {
  const accent = tone === "coral" ? "#c2410c" : "#0c8f86";

  return (
    <article className="overflow-hidden rounded-3xl border border-[#12151a]/8 bg-[#fffdf9] shadow-[0_18px_40px_-28px_rgb(18_21_26_/_0.35)]">
      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
        <div
          className={cn(
            "flex flex-col justify-between gap-6 p-6 sm:p-8",
            tone === "coral" ? "bg-[#fde8e1]" : "bg-[#e7f4f2]"
          )}
        >
          <p className="font-display text-5xl font-medium tracking-tight" style={{ color: accent }}>
            {index}
          </p>
          <div>
            <p className="text-eyebrow">{product.audience}</p>
            <p className="font-display mt-3 text-4xl font-medium tracking-tight text-[#12151a]">
              {formatProductPrice(product)}
            </p>
            <p className="mt-2 text-xs text-[#12151a]/55">
              {product.comingSoon ? "Inclusive INR · ships when ready" : "Inclusive price in INR"}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-h3 text-[#12151a]">{product.name}</h2>
            {product.comingSoon ? (
              <span className="text-eyebrow rounded-full bg-[#c2410c] px-2.5 py-1 !text-white">Coming soon</span>
            ) : null}
          </div>
          <p className="mt-3 text-lg font-medium tracking-tight text-[#12151a]/75">{product.tagline}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#12151a]/65 sm:text-base">{product.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <li
                key={item.label}
                className="rounded-full bg-[#f3eee6] px-3 py-1.5 text-xs font-medium text-[#12151a]"
              >
                {item.label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <AddToCartButton
              productId={product.id}
              label={`Pre-book ${product.shortName}`}
              variant="gradient"
              size="lg"
            />
            <ButtonLink href={product.href} variant="outline" size="lg" className="w-full sm:w-auto">
              Product details
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <Link href="/cart" className="mt-4 inline-flex text-xs text-[#0a6b64] hover:underline">
            Review cart
          </Link>
        </div>
      </div>
    </article>
  );
}

function CompareRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="border-b border-[#12151a]/8 last:border-0">
      <th scope="row" className="px-5 py-4 align-top font-medium text-[#12151a]/55">
        {label}
      </th>
      {values.map((value) => (
        <td key={value} className="px-5 py-4 align-top leading-relaxed text-[#12151a]">
          {value}
        </td>
      ))}
    </tr>
  );
}
