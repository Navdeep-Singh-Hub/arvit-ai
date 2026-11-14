import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/shared/page-hero";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { MapVisual } from "@/components/illustrations/map-visual";
import { Reveal } from "@/components/motion/reveal";
import { SOCIAL_ICON_MAP } from "@/components/icons/social-icons";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ARVIT AI — book a demo of the Adult AAC Tablet or Child Therapy Tablet, ask about pricing, or talk through a partnership.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        eyebrowIcon={MessageSquare}
        title="Tell us which tablet you need"
        description="Whether you're choosing the Adult AAC Tablet, the Child Therapy Tablet, or evaluating both for a school or health system — our team responds within one business day."
      />

      <section className="relative pb-24 sm:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <ContactForm />
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal delay={0.1}>
                <div className="card-surface rounded-3xl p-7">
                  <h3 className="text-base font-semibold text-foreground">Contact details</h3>
                  <ul className="mt-5 space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <Mail className="mt-0.5 size-4 shrink-0 text-brand-primary dark:text-brand-primary-light" />
                      <a href={`mailto:${SITE.email}`} className="text-foreground/85 hover:text-brand-primary">
                        {SITE.email}
                      </a>
                    </li>
                    {SITE.phone ? (
                    <li className="flex items-start gap-3">
                      <PhoneCall className="mt-0.5 size-4 shrink-0 text-brand-primary dark:text-brand-primary-light" />
                      <a href={SITE.phoneHref} className="text-foreground/85 hover:text-brand-primary">
                        {SITE.phone}
                      </a>
                    </li>
                    ) : null}
                    {SITE.address ? (
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-brand-primary dark:text-brand-primary-light" />
                      <span className="text-foreground/85">{SITE.address}</span>
                    </li>
                    ) : null}
                  </ul>

                  <div className="mt-6 flex items-center gap-2 border-t border-border pt-6">
                    {SOCIAL_LINKS.map((social) => {
                      const Icon = SOCIAL_ICON_MAP[social.icon];
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
                        >
                          <Icon className="size-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <MapVisual />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
