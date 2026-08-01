import Link from "next/link";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/icons/logo";
import { Reveal } from "@/components/motion/reveal";
import { SOCIAL_ICON_MAP } from "@/components/icons/social-icons";
import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 overflow-hidden rounded-t-[2.5rem] bg-brand-ink text-white/70">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,rgb(37_99_235_/_0.35),transparent_70%)]"
      />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-[0.04]" />

      <Container className="relative py-16 sm:py-20">
        <Reveal className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo className="text-white" />
            <p className="mt-4 text-sm leading-relaxed text-white/55">{SITE.description}</p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICON_MAP[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Tablets" links={FOOTER_LINKS.platform} />

          <div>
            <p className="text-sm font-semibold text-white">Get in touch</p>
            <ul className="mt-4 space-y-3 text-sm text-white/55">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-secondary" />
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneCall className="mt-0.5 size-4 shrink-0 text-brand-secondary" />
                <a href={SITE.phoneHref} className="transition-colors hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-secondary" />
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-xs text-white/45">
            © {year} {SITE.legalName} All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-white/45 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-white/55 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
