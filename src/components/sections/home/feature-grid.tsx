import Link from "next/link";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { FEATURES } from "@/lib/data/features";

/** The six things a parent asks about first. Everything else lives on /features. */
const HOME_FEATURES: { title: string; name: string; tag: string; tint: string }[] = [
  { title: "Symbol & Picture Boards", name: "Picture Boards", tag: "Communication", tint: "bg-[#dbf0f9]" },
  { title: "AI Text-to-Speech", name: "Text-to-Speech", tag: "Voice", tint: "bg-[#ffeba4]" },
  { title: "Phrase Prediction", name: "Phrase Prediction", tag: "Faster sentences", tint: "bg-[#d9d3f5]" },
  { title: "Parent Dashboard", name: "Parent View", tag: "For parents", tint: "bg-[#e0f5f4]" },
  { title: "Offline AAC Mode", name: "Offline Mode", tag: "Works anywhere", tint: "bg-[#ffd9d2]" },
  { title: "Secure Cloud Platform", name: "Private & Secure", tag: "Safety", tint: "bg-[#dff3c4]" },
];

export function FeatureGrid() {
  const features = HOME_FEATURES.flatMap((item) => {
    const feature = FEATURES.find((f) => f.title === item.title);
    return feature ? [{ ...item, feature }] : [];
  });

  return (
    <section className="bg-zigzag-warm py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <SectionHeading
          align="center"
          title="Everything Works Together"
          accent="Together"
          description="Communication for your child, clarity for you"
        />

        <p className="pill mx-auto mt-8 flex w-max max-w-full">
          <Star className="size-4 fill-[#ffb82e] text-[#ffb82e]" aria-hidden />
          On every ARVIT device
        </p>

        <StaggerGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map(({ feature, name, tag, tint }) => (
            <StaggerItem key={feature.title} className="h-full">
              <Link
                href={feature.href ?? "/features"}
                className="group flex h-full items-start gap-5 rounded-[20px] border border-black/20 bg-white p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-14px_rgb(21_16_43_/_0.35)]"
              >
                <span
                  className={`flex size-[76px] shrink-0 items-center justify-center rounded-full ${tint} transition-transform duration-200 group-hover:scale-105`}
                >
                  <feature.icon className="size-9 text-[#15102b]" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="block">
                  <span className="font-display block text-[1.375rem] leading-tight text-black">{name}</span>
                  <span className="mt-1 block text-sm font-semibold uppercase text-[#28958a]">{tag}</span>
                  <span className="mt-2.5 block text-lg leading-snug text-black/75">{feature.description}</span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/features" variant="solid" magnetic={false} className="px-10">
            All Features
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
