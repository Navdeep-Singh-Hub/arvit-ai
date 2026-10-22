export type FaqItem = {
  question: string;
  answer: string;
  /** Which audience experiences show this FAQ. Omit = both. */
  audience?: "adult" | "child" | "both";
};

export const FAQ: FaqItem[] = [
  {
    audience: "both",
    question: "What is the ARVIT AAC Device?",
    answer:
      "One device for your family. Your child communicates with symbol boards, text-to-speech, and phrase prediction. You see progress, home practice, and safety controls on the same device.",
  },
  {
    audience: "both",
    question: "Who is it for?",
    answer:
      "Children who are non-speaking or still building speech — including autism, ADHD, speech delay, developmental delay, apraxia, and more — and the parents and caregivers who support them.",
  },
  {
    audience: "both",
    question: "Does the device replace my child's therapist?",
    answer:
      "No. ARVIT extends a therapist's plan at home. Licensed clinicians stay in control of goals. Parents get a plain-language view of what happened this week.",
  },
  {
    audience: "both",
    question: "What does my child use, and what do I see?",
    answer:
      "Your child uses boards, voice, speech practice, and games. You see session summaries, trends, home-practice tips, and parent controls for vocabulary and usage.",
  },
  {
    audience: "both",
    question: "Can AAC work offline?",
    answer:
      "Yes. Core AAC — symbol boards, phrase prediction, and text-to-speech — works offline so your child can communicate without a connection.",
  },
  {
    audience: "both",
    question: "Is my family's data secure?",
    answer:
      "Yes. Data is encrypted in transit and at rest, access is role-based for parents and clinicians, and actions are logged.",
  },
  {
    audience: "both",
    question: "How do we get started?",
    answer:
      "Pre-book from the homepage or catalog, or contact us for a live walkthrough. We'll match the AAC Device to your child's care plan — families typically onboard after a short demo.",
  },
  {
    audience: "both",
    question: "Do you work with clinics and schools?",
    answer:
      "Yes. We deploy through Solutions for private practices, schools, and health systems, with onboarding for families and care teams.",
  },
];

export function getFaqForAudience(_audience: "adult" | "child" | null): FaqItem[] {
  return FAQ;
}
