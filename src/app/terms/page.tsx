import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LegalNotice } from "@/components/sections/shared/legal-notice";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of the ARVIT AI platform.",
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    heading: "Acceptance of terms",
    body: [
      `By creating an account or using ${SITE.name}, you agree to these Terms of Service and our Privacy Policy. If you are using the platform on behalf of a child, school, clinic, or organization, you confirm you have the authority to accept these terms on their behalf.`,
    ],
  },
  {
    heading: "Not a substitute for professional care",
    body: [
      "ARVIT AI is a technology platform that supports — and does not replace — care delivered by licensed therapists and medical professionals. AI-generated assessments and therapy plans are intended for review by a qualified clinician before being relied upon.",
      "In a medical or safety emergency, contact your local emergency services immediately. Do not rely on the platform for emergency communication or crisis response.",
    ],
  },
  {
    heading: "Accounts and eligibility",
    body: [
      "You must provide accurate information when creating an account and are responsible for maintaining the confidentiality of your login credentials.",
      "Accounts used on behalf of a child must be created and supervised by a parent, legal guardian, or authorized clinician.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "You agree not to misuse the platform, including attempting to access accounts or data that are not yours, interfering with the service's operation, or using the platform for purposes other than its intended therapeutic and communication use.",
    ],
  },
  {
    heading: "Subscriptions and payment",
    body: [
      "Paid plans are billed on the schedule presented at signup. Fees are non-refundable except where required by law or expressly stated otherwise in a separate agreement.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      `All content, software, and trademarks associated with ${SITE.name} are owned by ${SITE.legalName} or its licensors. You retain ownership of the content you or your child create while using the platform.`,
    ],
  },
  {
    heading: "Disclaimers and limitation of liability",
    body: [
      "The platform is provided on an \"as is\" and \"as available\" basis without warranties of any kind, express or implied, to the fullest extent permitted by law.",
      `To the fullest extent permitted by law, ${SITE.legalName} will not be liable for indirect, incidental, or consequential damages arising from use of the platform.`,
    ],
  },
  {
    heading: "Termination",
    body: [
      "You may stop using the platform at any time. We may suspend or terminate access for violations of these terms or to protect the safety and integrity of the service.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms from time to time. Continued use of the platform after changes take effect constitutes acceptance of the revised terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="relative py-32 sm:py-40">
      <Container size="narrow">
        <LegalNotice />
        <p className="text-sm font-medium text-brand-primary dark:text-brand-primary-light">Legal</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Terms of Service</h1>
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
              Questions about these terms can be sent to{" "}
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
