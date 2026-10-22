import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import { CATALOG_PRODUCTS, formatProductPrice, type PrebookProduct } from "@/lib/commerce/products";
import { TABLET_PRODUCTS } from "@/lib/data/tablet-products";
import { TABLET_MODEL } from "@/lib/media/tablet-model";

const CATALOG = CATALOG_PRODUCTS.map((product) => {
  const tablet = TABLET_PRODUCTS.find((item) => item.id === "aac-adult");
  return {
    product,
    highlights: tablet?.highlights ?? [],
  };
});

export function ProductCatalog() {
  const entry = CATALOG[0];

  return (
    <>
      <PageHero
        eyebrow="Catalog"
        title="One AAC Device."
        description="Built for the child who needs a voice, and the parent who needs to see progress. Pre-book the same device for your family."
        align="left"
      />

      <section className="section-pad pt-0">
        <Container className="max-w-[1400px]">
          <div className="grid items-end gap-8 border-b border-[#12151a]/10 pb-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <p className="max-w-xl text-sm leading-relaxed text-[#12151a]/65">
              Inclusive INR. One device — not a child product and an adult product.
            </p>
            <div className="relative hidden h-40 overflow-hidden rounded-3xl bg-[#e7f4f2] lg:block">
              <Image
                src={TABLET_MODEL.beauty}
                alt="ARVIT AAC Device"
                fill
                sizes="280px"
                className="object-contain p-4"
              />
            </div>
          </div>

          {entry ? (
            <div className="mt-10">
              <CatalogEntry product={entry.product} highlights={entry.highlights} />
            </div>
          ) : null}
        </Container>
      </section>

      <section className="section-pad border-t border-[#12151a]/8 pt-0">
        <Container className="max-w-[1400px]">
          <h2 className="text-h3 text-[#12151a]">On the same device</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[#12151a]/8 bg-[#e7f4f2] p-6 sm:p-8">
              <p className="text-eyebrow">For the child</p>
              <p className="mt-4 text-lg font-medium tracking-tight text-[#12151a]">A voice they can use today</p>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-[#12151a]/70">
                <li>Symbol and picture boards</li>
                <li>AI text-to-speech</li>
                <li>Speech practice and motor games</li>
                <li>Works offline for core AAC</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-[#12151a]/8 bg-[#fffdf9] p-6 sm:p-8">
              <p className="text-eyebrow">For the parent</p>
              <p className="mt-4 text-lg font-medium tracking-tight text-[#12151a]">Progress you can actually read</p>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-[#12151a]/70">
                <li>Plain-language session summaries</li>
                <li>Home-practice suggestions</li>
                <li>Vocabulary and safety controls</li>
                <li>Share a view with your therapist</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function CatalogEntry({
  product,
  highlights,
}: {
  product: PrebookProduct;
  highlights: { label: string }[];
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-[#12151a]/8 bg-[#fffdf9] shadow-[0_18px_40px_-28px_rgb(18_21_26_/_0.35)]">
      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="flex flex-col justify-between gap-6 bg-[#e7f4f2] p-6 sm:p-8">
          <p className="font-display text-5xl font-medium tracking-tight text-[#0a6b64]">01</p>
          <div>
            <p className="text-eyebrow">{product.audience}</p>
            <p className="font-display mt-3 text-4xl font-medium tracking-tight text-[#12151a]">
              {formatProductPrice(product)}
            </p>
            <p className="mt-2 text-xs text-[#12151a]/55">Inclusive price in INR</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <h2 className="text-h3 text-[#12151a]">{product.name}</h2>
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
