"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { AccordionItem } from "@/components/ui/accordion";
import { FAQ } from "@/lib/data/faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative section-pad">
      <Container size="narrow">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers before you ask"
          description="Still curious about something? Reach out and our team will get back to you within one business day."
        />

        <StaggerGroup className="mt-14 space-y-4">
          {FAQ.map((item, index) => (
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
