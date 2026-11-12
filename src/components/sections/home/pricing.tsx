import Link from "next/link";
import { Check, Headset, PhoneCall, ShieldCheck, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import { LogoMark } from "@/components/icons/logo";
import { BoardScreen, DeviceFrame } from "@/components/illustrations/device";
import { CATALOG_PRODUCTS, formatProductPrice } from "@/lib/commerce/products";

const PRODUCT = CATALOG_PRODUCTS[0];

const INCLUDED = [
  "Symbol boards, text-to-speech and phrase prediction",
  "Parent view with progress and home practice",
  "Offline mode, so it talks anywhere",
  "A setup call with our team",
];

const GENERIC = ["Built to entertain, not to talk", "Communication apps cost extra", "No view of progress", "You set it all up alone"];
const ARVIT = ["Built for communication", "Boards and voice from day one", "Progress you can read", "Our team helps you start"];

/** Navy band: the buy card, then the "regular tablet vs ARVIT" pair. */
export function Pricing() {
  return (
    <section id="tablets" className="section-dark scroll-mt-24 py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <div className="mx-auto max-w-[560px] rounded-[20px] bg-white p-6 text-black shadow-[0_30px_60px_-20px_rgb(0_0_0_/_0.6)] sm:p-8">
          <div className="mx-auto w-[78%]">
            <DeviceFrame>
              <BoardScreen />
            </DeviceFrame>
          </div>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
            <div>
              <p className="pill">{PRODUCT.audience}</p>
              <h2 className="text-h3 mt-3 !text-[#15102b]">ARVIT {PRODUCT.name}</h2>
            </div>
            <p className="font-display text-4xl leading-none text-[#15102b]">{formatProductPrice(PRODUCT)}</p>
          </div>

          <ul className="mt-6 space-y-2.5">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-black/80">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e0f5f4]">
                  <Check className="size-3.5 text-[#28958a]" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <AddToCartButton
            productId={PRODUCT.id}
            label={`Book now · ${formatProductPrice(PRODUCT)}`}
            variant="gradient"
            size="xl"
            className="mt-7 w-full justify-center sm:w-full"
          />

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-black/70">
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4" strokeWidth={1.75} aria-hidden />
              Pay online or later
            </li>
            <li className="flex items-center gap-2">
              <span className="mr-1 size-1 rounded-full bg-black/40" aria-hidden />
              <PhoneCall className="size-4" strokeWidth={1.75} aria-hidden />
              Free demo call
            </li>
            <li className="flex items-center gap-2">
              <span className="mr-1 size-1 rounded-full bg-black/40" aria-hidden />
              <Headset className="size-4" strokeWidth={1.75} aria-hidden />
              Setup support
            </li>
          </ul>
          <p className="mt-4 text-center text-sm text-black/60">
            Inclusive price in INR.{" "}
            <Link href={PRODUCT.href} className="font-semibold text-[#28958a] underline-offset-4 hover:underline">
              See everything it does
            </Link>
          </p>
        </div>

        <div className="mt-16 text-center sm:mt-20">
          <p className="inline-flex rounded-full border border-[#ff7463]/40 bg-[#ff7463]/15 px-4 py-1.5 text-sm font-medium uppercase text-white">
            Not all screens are equal
          </p>
          <h2 className="text-h2 mt-4 !text-white">
            A Regular Tablet Has <span className="text-[#ff7463]">A Hidden Cost</span>
          </h2>
          <p className="mt-3 text-lg text-white/85">You become the installer, the trainer and the tech support</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[680px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
          <div className="rounded-[20px] border border-white/25 bg-white/10 p-7">
            <p className="font-display text-center text-2xl text-[#ff7463]">Regular Tablet</p>
            <ul className="mt-5 space-y-3">
              {GENERIC.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-white">
                  <X className="mt-0.5 size-5 shrink-0 text-[#ff7463]" strokeWidth={2.5} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border border-[#28958a] bg-[#28958a]/25 p-7">
            <p className="flex items-center justify-center gap-3">
              <LogoMark className="size-9" />
              <span className="font-display text-2xl text-white">Arvit</span>
            </p>
            <ul className="mt-5 space-y-3">
              {ARVIT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-white">
                  <Check className="mt-0.5 size-5 shrink-0 text-[#7fe0d4]" strokeWidth={2.5} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
