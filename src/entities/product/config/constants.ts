export const PRODUCT = {
  MAX_RATING: 5,
  DESCRIPTION_TRUNCATE_LENGTH: 100,
  FEATURED_INDEX: 0,
} as const;

export const PRODUCT_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
  { label: "Electronics", value: "electronics" },
  { label: "Jewelery", value: "jewelery" },
] as const;
