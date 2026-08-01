import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LegalNotice } from "@/components/sections/shared/legal-notice";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ARVIT AI collects, uses, and protects information across the platform.",
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    heading: "Information we collect",
    body: [
      "Account information such as name, email address, and role (parent, therapist, or administrator) when you create an account or request a demo.",
      "Therapy and communication data generated through the platform, including session activity, progress metrics, and AAC usage, which we treat as sensitive health-adjacent information.",
      "Device and usage information such as browser type, general location, and interaction data used to keep the platform secure and improve performance.",
    ],
  },
  {
    heading: "How we use information",
    body: [
      "To provide, personalize, and improve therapy plans, dashboards, and reporting for parents and therapists.",
      "To communicate with you about your account, scheduled demos, and service updates.",
      "To maintain the security, integrity, and reliability of the platform, including detecting misuse.",
    ],
  },
  {
    heading: "Children's privacy",
    body: [
      "ARVIT AI is used by children under the guidance of a parent, guardian, or licensed therapist. We do not knowingly collect information directly from a child without appropriate consent from a parent, guardian, or supervising clinician, consistent with applicable children's privacy laws.",
      "Parents and guardians can request access to, correction of, or deletion of their child's information at any time by contacting us.",
    ],
  },
  {
    heading: "Data security",
    body: [
      "Data is encrypted in transit and at rest. Access to sensitive records is role-based and logged, and we apply the principle of least privilege across our systems.",
      "No system is completely secure, and we continuously review our safeguards as the platform evolves.",
    ],
  },
  {
    heading: "Your rights and choices",
    body: [
      "Depending on your location, you may have the right to access, correct, export, or delete your personal information, and to object to or restrict certain processing.",
      "You can exercise these rights by contacting us using the details below.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We retain account and therapy data for as long as your account is active or as needed to provide the service, and as required by applicable clinical record-keeping or legal obligations.",
    ],
  },
  {
    heading: "Third-party services",
    body: [
      "We may use trusted third-party providers for hosting, analytics, and communications. These providers are contractually bound to protect your information and use it only for the purposes we specify.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy as the platform evolves. Material changes will be communicated through the platform or by email before they take effect.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="relative py-32 sm:py-40">
      <Container size="narrow">
        <LegalNotice />
        <p className="text-sm font-medium text-brand-primary dark:text-brand-primary-light">Legal</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: July 24, 2026</p>

        <div className="mt-10 space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h2 className="text-lg font-semibold text-foreground">Contact us</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Questions about this policy or your data can be sent to{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand-primary hover:underline dark:text-brand-primary-light">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
