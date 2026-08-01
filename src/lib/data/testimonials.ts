export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

// Placeholder testimonials for pre-launch design purposes.
// Replace with verified quotes and consent before production use.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The Therapy Tablet gave our son AAC and speech practice in one place. The OT landmark games finally made motor work feel like play.",
    name: "Amara O.",
    role: "Parent",
    initials: "AO",
  },
  {
    quote:
      "I prescribe AAC Tablet for adult stroke patients and Therapy Tablet for pediatrics. Same ecosystem, clear device choice — my caseload finally matches reality.",
    name: "Daniel K., M.S. CCC-SLP",
    role: "Speech-Language Pathologist",
    initials: "DK",
  },
  {
    quote:
      "Our clinic onboarded adult AAC and pediatric Therapy tablets in a month without adding staff. The split SKUs made training obvious.",
    name: "Priya R.",
    role: "Clinical Director",
    initials: "PR",
  },
  {
    quote:
      "Progress on the Therapy Tablet used to be a guessing game. Now I see speech, OT, and AAC curves week over week.",
    name: "Marcus T.",
    role: "Parent",
    initials: "MT",
  },
  {
    quote:
      "She asks for her Therapy Tablet games every morning — speech AI drills and education videos she actually finishes.",
    name: "Sofia L.",
    role: "Parent",
    initials: "SL",
  },
  {
    quote:
      "As an OT, body-landmark games are the win — motor goals recalibrate mid-session instead of waiting for me to notice a plateau.",
    name: "Elena V., OTR/L",
    role: "Occupational Therapist",
    initials: "EV",
  },
];
