export type FaqItem = {
  question: string;
  answer: string;
  /** Which audience experiences show this FAQ. Omit = both. */
  audience?: "adult" | "child" | "both";
};

export const FAQ: FaqItem[] = [
  {
    audience: "adult",
    question: "What is the ARVIT AAC Device?",
    answer:
      "The AAC Device is ARVIT's dedicated adult communication product — symbol boards, text-to-speech, phrase prediction, and voice personalization for people who are non-speaking or have lost speech.",
  },
  {
    audience: "child",
    question: "What is the AAC + Therapy Progress App?",
    answer:
      "It's ARVIT's child experience: AAC plus AI speech therapy, occupational therapy games that track body landmarks, special education, education videos, and live progress for parents and therapists.",
  },
  {
    audience: "adult",
    question: "Who is the AAC Device for?",
    answer:
      "Adults who are non-speaking or have lost speech — including stroke recovery, ALS, cerebral palsy, TBI, and progressive neurological conditions. Caregivers and clinicians can support them, but the product is adult-first.",
  },
  {
    audience: "child",
    question: "Does AI replace my child's therapist?",
    answer:
      "No. The Therapy App extends a therapist's reach — it does not replace clinical judgment. Plans and progress stay reviewable by licensed clinicians.",
  },
  {
    audience: "child",
    question: "How does speech therapy work?",
    answer:
      "Our AI speech model listens, analyzes, and guides articulation and language practice in real time — adaptive feedback every session, not a fixed playlist.",
  },
  {
    audience: "child",
    question: "How does occupational therapy work?",
    answer:
      "OT games track landmarks of the child's body so motor and daily-living practice is interactive, measurable, and adjusted to how they move.",
  },
  {
    audience: "adult",
    question: "Can AAC work offline?",
    answer:
      "Yes. Core AAC — symbol boards, phrase prediction, and text-to-speech — works offline so communication never depends on a connection.",
  },
  {
    audience: "child",
    question: "Can AAC work offline on the Therapy App?",
    answer:
      "Yes. Core AAC works offline on the Therapy App, so communication never depends on a connection.",
  },
  {
    audience: "both",
    question: "Is my data secure?",
    answer:
      "Yes. Data is encrypted in transit and at rest, access is role-based, and actions are logged for clinical-grade protection.",
  },
  {
    audience: "adult",
    question: "How do I get started with the AAC Device?",
    answer:
      "Pre-book from the homepage or contact our team for a live walkthrough. Most adults and clinics are onboarded quickly after a short demo.",
  },
  {
    audience: "child",
    question: "How do I get started with Therapy?",
    answer:
      "Pre-book from the homepage or book a demo. We'll match the Therapy App to your child's care plan — families and practices onboard in about a week.",
  },
  {
    audience: "both",
    question: "Do you work with clinics and hospitals?",
    answer:
      "Yes. We deploy through Solutions for private practices and health systems, with onboarding and admin tooling for teams.",
  },
];

export function getFaqForAudience(audience: "adult" | "child" | null): FaqItem[] {
  if (!audience) return FAQ.filter((f) => f.audience === "both" || !f.audience);
  return FAQ.filter((f) => !f.audience || f.audience === "both" || f.audience === audience);
}
