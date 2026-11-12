import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { WHO_WE_HELP } from "@/lib/data/who-we-help";
import { FAMILY_COPY } from "@/lib/audience/content";

const TINTS = ["bg-[#dbf0f9]", "bg-[#ffeba4]", "bg-[#e0f5f4]", "bg-[#d9d3f5]", "bg-[#ffd9d2]", "bg-[#dff3c4]"];

export function WhoWeHelp() {
  return (
    <section className="bg-zigzag-sky py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <SectionHeading
          align="center"
          title="Made For Every Kind Of Communicator"
          accent="Every Kind"
          accentColor="blue"
          description={FAMILY_COPY.whoDescription}
        />

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {WHO_WE_HELP.map((condition, index) => (
            <StaggerItem key={condition.title} className="h-full">
              <div className="h-full rounded-[20px] border border-[#d9d9de] bg-white p-5 transition-transform duration-200 hover:-translate-y-1">
                <span
                  className={`flex size-12 items-center justify-center rounded-full ${TINTS[index % TINTS.length]}`}
                >
                  <condition.icon className="size-6 text-[#15102b]" strokeWidth={1.75} aria-hidden />
                </span>
                <p className="font-display mt-4 text-xl leading-tight text-black">{condition.title}</p>
                <p className="mt-1.5 text-base leading-snug text-black/70">{condition.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
