export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  audience?: "adult" | "child" | "both";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    audience: "child",
    quote:
      "The Therapy App gave our son AAC and speech practice in one place. The OT landmark games finally made motor work feel like play.",
    name: "Amara O.",
    role: "Parent",
    initials: "AO",
  },
  {
    audience: "adult",
    quote:
      "After the stroke, the AAC Device felt built for adults — not a children's toy with big icons. He builds full phrases again.",
    name: "Daniel K., M.S. CCC-SLP",
    role: "Speech-Language Pathologist",
    initials: "DK",
  },
  {
    audience: "adult",
    quote:
      "Our rehab floor onboarded Adult AAC without confusing pediatric workflows. Clear product, clear training.",
    name: "Priya R.",
    role: "Clinical Director",
    initials: "PR",
  },
  {
    audience: "child",
    quote:
      "Progress used to be a guessing game. Now I see speech, OT, and AAC curves week over week on the Therapy App.",
    name: "Marcus T.",
    role: "Parent",
    initials: "MT",
  },
  {
    audience: "child",
    quote:
      "She asks for her Therapy games every morning — speech AI drills and education videos she actually finishes.",
    name: "Sofia L.",
    role: "Parent",
    initials: "SL",
  },
  {
    audience: "child",
    quote:
      "As an OT, body-landmark games are the win — motor goals recalibrate mid-session instead of waiting for a plateau.",
    name: "Elena V., OTR/L",
    role: "Occupational Therapist",
    initials: "EV",
  },
  {
    audience: "adult",
    quote:
      "Phrase prediction and voice personalization finally feel designed for adult AAC clinics — not a padded kids product.",
    name: "Jordan M.",
    role: "Adult AAC Specialist",
    initials: "JM",
  },
];

export function getTestimonialsForAudience(audience: "adult" | "child" | null): Testimonial[] {
  if (!audience) return TESTIMONIALS.filter((t) => t.audience === "both" || !t.audience);
  return TESTIMONIALS.filter((t) => !t.audience || t.audience === "both" || t.audience === audience);
}
