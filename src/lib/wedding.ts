export const couple = {
  groom: {
    firstName: "Adesh",
    fullName: "Adesh Sharan",
    parents:
    {
      mother: "Usha Shrivastava",
      father: "Krishna Kanhiya Sharan"
    },
    portraitAlt: "Adesh in an ivory embroidered sherwani",
    story: [
      "A techie by profession, an explorer at heart.",
      "Makes the best chai. Always lets her have the last word.",
    ],
  },
  bride: {
    firstName: "Rashi",
    fullName: "Rashi Shrivastava",
    parents:
    {
      mother: "Savitri Khare",
      father: "Late Mohan Murari Shrivastava"
    },
    portraitAlt: "Rashi in a traditional crimson bridal lehenga",
    story: [
      "A designer with a love for the little things.",
      "A sunshine soul. His favourite person, forever.",
    ],
  },
} as const;

export const coupleDisplayName = `${couple.groom.firstName} & ${couple.bride.firstName}`;
export const coupleInitials = [
  couple.groom.firstName[0],
  couple.bride.firstName[0],
] as const;
export const coupleHashtag = `#${couple.groom.firstName}Ki${couple.bride.firstName}`.toLowerCase();

export const weddingDate = new Date("2026-12-11T17:00:00+05:30");
const dateOptions = { timeZone: "Asia/Kolkata" } as const;
const fullDateFormatter = new Intl.DateTimeFormat("en-GB", {
  ...dateOptions,
  day: "numeric",
  month: "long",
  year: "numeric",
});
const dayMonthFormatter = new Intl.DateTimeFormat("en-GB", {
  ...dateOptions,
  day: "numeric",
  month: "long",
});
const dayFormatter = new Intl.DateTimeFormat("en-GB", {
  ...dateOptions,
  day: "numeric",
});
const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  ...dateOptions,
  month: "long",
});
const yearFormatter = new Intl.DateTimeFormat("en-GB", {
  ...dateOptions,
  year: "numeric",
});
const firstCelebrationDate = new Date(weddingDate.getTime() - 24 * 60 * 60 * 1000);

export const weddingDateLabel = fullDateFormatter.format(weddingDate);
export const weddingDateDisplayLabel = weddingDateLabel.toLocaleUpperCase("en");
export const celebrationDateRange = `${dayFormatter.format(firstCelebrationDate)}–${dayFormatter.format(weddingDate)} ${monthFormatter.format(weddingDate)} ${yearFormatter.format(weddingDate)}`;
export const celebrationDays = [
  `${dayMonthFormatter.format(firstCelebrationDate)} · Day One`,
  `${dayMonthFormatter.format(weddingDate)} · Day Two`,
] as const;

export const city = "Gwalior";
export const region = "Madhya Pradesh";
export const venue = {
  name: "The Green Petal Resort",
  line1: "Shivpuri Link Road, Gwalior",
  line2: "Madhya Pradesh 474001, India",
  // landmark: "Gwalior Fort",
};

export const travelOptions = [
  {
    mode: "By air",
    details: "Rajmata Vijaya Raje Scindia Air Terminal, approximately 20 km away.",
  },
  {
    mode: "By train",
    details: "Gwalior Junction Railway Station, approximately 8 km away.",
  },
  {
    mode: "By road",
    details: "Shivpuri Link road",
  },
] as const;

export function countdown(now: number) {
  const total = Math.max(0, Math.floor((weddingDate.getTime() - now) / 1000));
  return [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60];
}

function toCalendarDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

const weddingEnd = new Date(weddingDate.getTime() + 6.5 * 60 * 60 * 1000);
export const calendarUrl =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: `${coupleDisplayName} — Wedding Celebration`,
    dates: `${toCalendarDate(weddingDate)}/${toCalendarDate(weddingEnd)}`,
    details: "Join our families for an evening of love, blessings, and celebration.",
    location: `${venue.name}, ${venue.line1}, ${venue.line2}`,
  }).toString();

export const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${venue.name}, ${city}`);
