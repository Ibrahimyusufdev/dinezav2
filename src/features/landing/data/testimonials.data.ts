export interface Testimonial {
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
  quote: string;
  earned: string;
  dinners: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Jasmine L.",
    role: "Diner · Atlanta",
    initials: "JL",
    avatarColor: "#E8A87C",
    quote:
      "With Dineza, I turned my social life into a rewarding journey. Now, every dinner is an opportunity to earn. I've made back over $100 in three months.",
    earned: "$100",
    dinners: 14,
  },
  {
    name: "Sophia M.",
    role: "Diner · San Jose",
    initials: "SM",
    avatarColor: "#C27BA0",
    quote:
      "No more wasted evenings. Dineza ensures my time is valued, and my wallet is happy. I recommend it to every woman I know who loves good food.",
    earned: "$80",
    dinners: 9,
  },
];
