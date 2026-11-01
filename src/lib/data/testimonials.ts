export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  audience?: "adult" | "child" | "both";
};

/** Real testimonials only. Add entries once families and clinicians have given permission. */
export const TESTIMONIALS: Testimonial[] = [];

export function getTestimonialsForAudience(_audience: "adult" | "child" | null): Testimonial[] {
  return TESTIMONIALS;
}
