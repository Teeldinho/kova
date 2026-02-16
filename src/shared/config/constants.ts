export const APP_NAME = "KOVA" as const;
export const APP_TAGLINE = "Every detail, considered." as const;

export const CURRENCY = {
  CODE: "ZAR",
  SYMBOL: "R",
  LOCALE: "en-ZA",
  EXCHANGE_RATE: 16,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 48,
} as const;

export const ANIMATION = {
  STAGGER_DELAY: 0.04,
  FADE_DURATION: 0.6,
  SPRING_DAMPING: 25,
  SPRING_STIFFNESS: 700,
  MARQUEE_DURATION: 20,
} as const;

export const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating-desc" },
  { label: "Name: A-Z", value: "name-asc" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
