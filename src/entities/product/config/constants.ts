export const PRODUCT = {
	CARD_TITLE_TRUNCATE_LENGTH: 50,
	CARD_ANIMATION_OFFSET_Y: 20,
	CARD_PREFETCH_INTENT_DELAY_MS: 80,
	QUERY_CACHE_TIME_MS: 1000 * 60 * 20,
	QUERY_DETAIL_STALE_TIME_MS: 1000 * 60 * 10,
	QUERY_LIST_STALE_TIME_MS: 1000 * 60 * 5,
	MAX_RATING: 5,
	DESCRIPTION_TRUNCATE_LENGTH: 100,
	FEATURED_INDEX: 0,
} as const

export const PRODUCT_CATEGORIES = [
	{ label: 'All', value: 'all' },
	{ label: "Men's Clothing", value: "men's clothing" },
	{ label: "Women's Clothing", value: "women's clothing" },
	{ label: 'Electronics', value: 'electronics' },
	{ label: 'Jewelery', value: 'jewelery' },
] as const
