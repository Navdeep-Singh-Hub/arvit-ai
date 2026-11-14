import { BellRing, Languages, WifiOff } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { CATALOG_PRODUCTS, formatProductPrice } from "@/lib/commerce/products";

/** Three plain facts in place of award logos — add real badges/press here when you have them. */
const TRUST = [
  { icon: WifiOff, tint: "bg-[#ffeba4]", title: "Works Offline", text: "Talks anywhere, no Wi-Fi needed" },
  { icon: Languages, tint: "bg-[#dbf0f9]", title: "5 Indian Languages", text: "English, Hindi, Punjabi, Tamil, Telugu" },
  { icon: BellRing, tint: "bg-[#ffd9d2]", title: "One-Tap Caregiver Alert", text: "WhatsApp call to both caregivers" },
];

export function TrustRow() {
  return (
    <section className="bg-white pb-12 sm:pb-16">
      <Container className="max-w-[1280px]">
        <ul className="grid grid-cols-1 divide-y divide-black/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {TRUST.map((item) => (
            <li key={item.title} className="flex items-center gap-4 px-2 py-5 sm:px-8 sm:py-2">
              <span className={`flex size-14 shrink-0 items-center justify-center rounded-full ${item.tint}`}>
                <item.icon className="size-6 text-[#15102b]" strokeWidth={1.9} aria-hidden />
              </span>
              <span>
                <span className="font-display block text-xl leading-tight text-black">{item.title}</span>
                <span className="block text-base text-black/70">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/**
 * Sky-blue band with three big-number cards. These are facts about the offer, not
 * outcome statistics — replace with real parent-reported results once you have them.
 */
export function Highlights() {
  const product = CATALOG_PRODUCTS[0];
  const cards = [
    { label: "One device", value: "1", note: "For your child and for you" },
    { label: "From booking to first words", value: "3 steps", note: "Book, we call, it arrives ready" },
    { label: "One clear price", value: formatProductPrice(product), note: "Inclusive, no hidden extras" },
  ];

  return (
    <section className="bg-zigzag-sky py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <SectionHeading
          align="center"
          title="What Your Family Gets From Day One"
          accent="Day One"
          accentColor="blue"
        />
        <StaggerGroup className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
          {cards.map((card) => (
            <StaggerItem
              key={card.label}
              className="rounded-[20px] border border-[#d9d9de] bg-white px-6 py-7 text-center"
            >
              <p className="font-display text-[1.375rem] leading-tight text-black">{card.label}</p>
              <p className="font-display mt-3 text-5xl leading-[1.2] text-[#007ad1]">{card.value}</p>
              <p className="mt-3 text-lg text-black/70">{card.note}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
