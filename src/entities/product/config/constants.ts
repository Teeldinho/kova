export const PRODUCT = {
	CARD_TITLE_TRUNCATE_LENGTH: 50,
	CARD_ANIMATION_OFFSET_Y: 20,
	CARD_PREFETCH_INTENT_DELAY_MS: 80,
	CARD_TILT_RANGE: 0.5,
	CARD_TILT_DEGREES: 5,
	CARD_TILT_SPRING_STIFFNESS: 100,
	CARD_TILT_SPRING_DAMPING: 20,
	QUERY_CACHE_TIME_MS: 1000 * 60 * 20,
	QUERY_DETAIL_STALE_TIME_MS: 1000 * 60 * 10,
	QUERY_LIST_STALE_TIME_MS: 1000 * 60 * 5,
	MAX_RATING: 5,
	DESCRIPTION_TRUNCATE_LENGTH: 100,
	IMAGE: {
		DEFAULT_WIDTH: 480,
		HEIGHT: 640,
		WIDTH: 640,
		SIZES: '(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 30vw',
		SRCSET_WIDTHS: [240, 320, 480, 640],
	},
} as const

export const PRODUCT_CATEGORIES = [
	{ label: 'All', value: 'all' },
	{ label: "Men's Clothing", value: "men's clothing" },
	{ label: "Women's Clothing", value: "women's clothing" },
	{ label: 'Electronics', value: 'electronics' },
	{ label: 'Jewelery', value: 'jewelery' },
] as const
