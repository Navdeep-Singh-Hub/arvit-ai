"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { AccordionItem } from "@/components/ui/accordion";
import { getFaqForAudience } from "@/lib/data/faq";
import { useAudience } from "@/components/providers/audience-provider";
import { THERAPY_PROGRESS_ENABLED } from "@/lib/flags";

export function Faq() {
  const { audience } = useAudience();
  const effective =
    THERAPY_PROGRESS_ENABLED && audience === "child" ? "child" : "adult";
  const items = getFaqForAudience(effective);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-pad section-light border-t border-black/5">
      <Container size="narrow">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers for your path"
          description="Questions tailored to the experience you chose — adult AAC or child therapy."
        />

        <StaggerGroup key={effective} className="mt-14 space-y-4">
          {items.map((item, index) => (
            <StaggerItem key={item.question}>
              <AccordionItem
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
