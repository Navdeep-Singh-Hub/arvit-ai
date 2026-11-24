import { ArrowRight, BellRing, Headset, Languages, PhoneCall, ShieldCheck, WifiOff } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { HeroScene } from "@/components/illustrations/hero-scene";
import { CATALOG_PRODUCTS, formatProductPrice } from "@/lib/commerce/products";

const PRODUCT = CATALOG_PRODUCTS[0];

/** Only product facts that are true today — no unverified numbers. */
const POINTS = [
  { dot: "bg-[#e11d48]", label: "Real-photo symbol boards" },
  { dot: "bg-[#007ad1]", label: "Multiple languages" },
  { dot: "bg-[#28958a]", label: "Eye control" },
  { dot: "bg-[#ff9d3c]", label: "Weekly report to your phone" },
];

const ASSURANCES = [
  { icon: PhoneCall, label: "Free demo call" },
  { icon: ShieldCheck, label: "Pay online or later" },
  { icon: Headset, label: "Setup support" },
];

function FloatChip({
  icon: Icon,
  title,
  text,
  tint,
  className,
}: {
  icon: typeof WifiOff;
  title: string;
  text: string;
  tint: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute z-10 items-center gap-3 rounded-2xl bg-white py-3 pl-3 pr-5 shadow-[0_10px_30px_-8px_rgb(21_16_43_/_0.35)] ${className ?? ""}`}
    >
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${tint}`}>
        <Icon className="size-5 text-[#15102b]" strokeWidth={2} aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="font-display block text-base text-black">{title}</span>
        <span className="block text-[0.95rem] text-black/75">{text}</span>
      </span>
    </div>
  );
}

/** Hero: picture card with floating chips on the left, the offer on the right. */
export function Hero() {
  return (
    <section className="bg-white pt-[calc(96px+2rem)] pb-12 sm:pt-[calc(104px+3rem)] sm:pb-16">
      <Container className="max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:max-w-none">
            <HeroScene />
            <FloatChip
              icon={Languages}
              title="Tap A Picture, Hear It Spoken"
              text="Words for every moment"
              tint="bg-[#d9d3f5]"
              className="-top-5 right-2 flex animate-float sm:-right-8"
            />
            <FloatChip
              icon={BellRing}
              title="One-Tap Alert"
              text="WhatsApp call to caregivers"
              tint="bg-[#ffd9d2]"
              className="-left-10 top-[38%] hidden animate-float-slow sm:flex"
            />
          </div>

          <div>
            <p className="pill">For children &amp; parents</p>
            <h1 className="text-display mt-5 text-[#15102b]">ARVIT AAC Device</h1>
            <p className="mt-3 text-lg text-black/70">
              Every child deserves to be heard. Your child taps a picture and ARVIT says it out loud.
            </p>
            <p className="mt-2 text-base text-black/60">
              <abbr title="Augmentative and Alternative Communication" className="font-semibold text-[#28958a] no-underline">
                AAC
              </abbr>{" "}
              = Augmentative and Alternative Communication: tools that help children talk when speech is hard.{" "}
              <a href="#what-is-aac" className="font-semibold text-[#28958a] underline-offset-4 hover:underline">
                Learn more
              </a>
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {POINTS.map((point) => (
                <li
                  key={point.label}
                  className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-3.5 py-1.5 text-base text-black shadow-[0_2px_8px_rgb(17_24_39_/_0.04)]"
                >
                  <span className={`size-1.5 rounded-full ${point.dot}`} aria-hidden />
                  {point.label}
                </li>
              ))}
            </ul>

            <ButtonLink
              href="/#tablets"
              size="xl"
              variant="gradient"
              magnetic={false}
              className="mt-9 w-full"
            >
              Book Your Device · {formatProductPrice(PRODUCT)}
              <ArrowRight aria-hidden />
            </ButtonLink>

            <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-black/70">
              {ASSURANCES.map((item, index) => (
                <li key={item.label} className="flex items-center gap-2">
                  {index > 0 ? <span className="mr-1 size-1 rounded-full bg-black/40" aria-hidden /> : null}
                  <item.icon className="size-4" strokeWidth={1.75} aria-hidden />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
