export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  audience?: "adult" | "child" | "both";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    audience: "both",
    quote:
      "Our son uses the boards and voice. I finally see speech and AAC in one place — not five apps to check after school.",
    name: "Amara O.",
    role: "Parent",
    initials: "AO",
  },
  {
    audience: "both",
    quote:
      "Progress used to be a guessing game. Now I can show our therapist what happened at home this week.",
    name: "Marcus T.",
    role: "Parent",
    initials: "MT",
  },
  {
    audience: "both",
    quote:
      "She asks for her practice every morning. I get a short summary I can actually read.",
    name: "Sofia L.",
    role: "Parent",
    initials: "SL",
  },
  {
    audience: "both",
    quote:
      "Families stay in the loop without a clinical dashboard. The parent view is the piece we were missing.",
    name: "Elena V., OTR/L",
    role: "Occupational Therapist",
    initials: "EV",
  },
];

export function getTestimonialsForAudience(_audience: "adult" | "child" | null): Testimonial[] {
  return TESTIMONIALS;
}
