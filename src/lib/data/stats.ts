export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const STATS: Stat[] = [
  { value: 10000, suffix: "+", label: "Therapy Sessions Delivered" },
  { value: 500, suffix: "+", label: "Families Supported" },
  { value: 100, suffix: "+", label: "Licensed Therapists" },
  { value: 95, suffix: "%", label: "Reported Satisfaction" },
];
