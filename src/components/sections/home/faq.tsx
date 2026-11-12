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
    <section className="bg-white py-16 sm:py-20">
      <Container size="narrow">
        <SectionHeading
          align="center"
          title="Answers For Families"
          accent="Families"
          description="Questions for the child who uses the AAC Device and the parent who follows along."
        />

        <StaggerGroup key={effective} className="mt-10 space-y-4">
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
