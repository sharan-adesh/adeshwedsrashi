import { Blend, Music2, Flower2, Flame } from "lucide-react";
import couplePhoto1 from "../assets/couple-1.jpg";
import couplePhoto2 from "../assets/couple-2.jpg";
import couplePhoto3 from "../assets/couple-3.jpg";
import couplePhoto4 from "../assets/couple-4.jpg";
import couplePhoto5 from "../assets/couple-five.jpg";

export const navigationItems = [
  ["The Invitation", "invitation"],
  ["The Couple", "couple"],
  ["Celebrations", "celebrations"],
  ["Venue", "venue"],
] as const;

export const footerContent = {
  message: "Made with love, for the people we love.",
  contactNumber: "+91 9958162460 | +91 8349263178",
  blessing: "|| शुभम् भवतु ||",
} as const;

export const celebrationEvents = [
  {
    name: "Engagement",
    time: "7:00 PM",
    detail:
      "Join us as we exchange rings, promise a lifetime of love, and toast to new beginnings.",
    icon: Blend,
  },
  {
    name: "Sangeet",
    time: "8:00 PM",
    detail:
      "Bring your best moves for an evening of family performances, and dancing under the stars.",
    icon: Music2,
  },
  {
    name: "Haldi",
    time: "11:00 AM",
    detail:
      "A splash of turmeric, a shower of marigolds, and lots of love to bless the bride and groom.",
    icon: Flower2,
  },
  {
    name: "Baarat & Varmala",
    time: "7:00 PM",
    detail:
      "Welcome the baarat with the beat of the dhol, then gather as we exchange garlands and begin our forever.",
    icon: Flame,
  },
] as const;

export const coupleStoryPhotos = [
  {
    src: couplePhoto1,
    caption: "A little destiny",
    alt: "Couple smiling together in a palace courtyard",
  },
  {
    src: couplePhoto2,
    caption: "Closer, always",
    alt: "Couple sharing a quiet moment beside a carved palace window",
  },
  {
    src: couplePhoto3,
    caption: "You, me & a little sunshine",
    alt: "Couple holding hands in a marigold garden",
  },
  {
    src: couplePhoto4,
    caption: "My favourite place is beside you",
    alt: "Couple sitting together on sandstone palace steps",
  },
  {
    src: couplePhoto5,
    caption: "Our forever begins",
    alt: "Couple embracing beneath an ornate palace arch",
  },
] as const;
