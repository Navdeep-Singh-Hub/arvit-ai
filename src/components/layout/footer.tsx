"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/icons/logo";
import { SOCIAL_ICON_MAP } from "@/components/icons/social-icons";
import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { getAudienceFooterPlatform } from "@/lib/audience/filter";
import { useAudience } from "@/components/providers/audience-provider";

export function Footer() {
  const year = new Date().getFullYear();
  const { copy, audience } = useAudience();
  const blurb = copy?.footerBlurb ?? SITE.description;
  const platformLinks = getAudienceFooterPlatform(audience);

  return (
    <footer className="bg-[#15102b] text-white">
      <Container className="max-w-[1280px] py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-14 border-b border-white/10 pb-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo className="text-white" markClassName="size-10" />
            <p className="mt-5 text-base leading-relaxed text-white/80">{blurb}</p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICON_MAP[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-[#ffd235] hover:text-[#15102b]"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn
            title="AAC Device"
            links={platformLinks}
          />
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-white/70">
            © {year} {SITE.legalName}
          </p>
          <p className="text-sm text-white/70">{SITE.email}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase text-[#7fe0d4]">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-base font-light text-white/85 transition-colors hover:text-[#ffd235]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
