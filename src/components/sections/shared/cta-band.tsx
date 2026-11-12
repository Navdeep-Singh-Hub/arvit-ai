import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { BoardScreen, DeviceFrame } from "@/components/illustrations/device";
import { CTA } from "@/lib/constants";

type CtaBandProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

/** Sunny yellow band that closes every page: the ask on the left, the device on the right. */
export function CtaBand({
  title,
  description,
  primaryLabel = CTA.getStarted,
  primaryHref = "/contact",
  secondaryLabel = CTA.bookDemo,
  secondaryHref = "/contact",
}: CtaBandProps) {
  return (
    <section className="bg-[#ffd235] py-12 sm:py-14">
      <Container className="max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <h2 className="text-h2 max-w-2xl text-balance !text-[#15102b]">{title}</h2>
            <p className="mt-3 max-w-xl text-lg text-[#15102b]/85">{description}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={primaryHref} size="xl" variant="solid" magnetic={false} className="w-full sm:w-auto">
                {primaryLabel}
              </ButtonLink>
              <ButtonLink href={secondaryHref} size="xl" variant="white" magnetic={false} className="w-full sm:w-auto">
                {secondaryLabel}
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto hidden w-full max-w-[380px] rounded-[20px] bg-white p-6 lg:block">
            <DeviceFrame>
              <BoardScreen />
            </DeviceFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
