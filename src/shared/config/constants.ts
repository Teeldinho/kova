export const APP_NAME = 'KOVA' as const
export const APP_TAGLINE = 'Every detail, considered.' as const

export const ROUTES = {
	CART: '/cart',
	CHECKOUT: '/checkout',
	CHECKOUT_ERROR: '/checkout/error',
	CHECKOUT_SUCCESS: '/checkout/success',
	HOME: '/',
} as const

export const CURRENCY = {
	CODE: 'ZAR',
	SYMBOL: 'R',
	LOCALE: 'en-ZA',
	EXCHANGE_RATE: 16,
} as const

export const PAGINATION = {
	DEFAULT_PAGE: 1,
	DEFAULT_LIMIT: 12,
	MAX_LIMIT: 48,
} as const

export const ANIMATION = {
	STAGGER_DELAY: 0.05,
	FADE_DURATION: 0.4,
	SPRING_DAMPING: 35,
	SPRING_STIFFNESS: 600,
	MARQUEE_DURATION: 25,
} as const

export const CURSOR = {
	HOVER_SCALE: 3.5,
	OFFSET: 16,
	INTERACTIVE_SELECTOR:
		'button, a, [role="button"], input, select, .interactive',
} as const

export const ROUTER = {
	PRELOAD_STALE_TIME_MS: 1000 * 60 * 2,
} as const

export const SORT_OPTIONS = [
	{ label: 'Default', value: 'default' },
	{ label: 'Price: Low to High', value: 'price-asc' },
	{ label: 'Price: High to Low', value: 'price-desc' },
	{ label: 'Rating: High to Low', value: 'rating-desc' },
	{ label: 'Name: A-Z', value: 'name-asc' },
] as const

export type SortOption = (typeof SORT_OPTIONS)[number]['value']
