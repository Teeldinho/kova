export const APP_NAME = 'KOVA' as const
export const APP_TAGLINE = 'Every detail, considered.' as const

export const ROUTES = {
	CART: '/cart',
	CHECKOUT: '/checkout',
	CHECKOUT_ERROR: '/checkout/error',
	CHECKOUT_SUCCESS: '/checkout/success',
	PRODUCT_DETAIL: '/products/$productId',
	HOME: '/',
} as const

export const SEO = {
	DEFAULT_DESCRIPTION:
		'Curated essentials with a sharp silhouette, precise materials, and everyday utility.',
	DEFAULT_OG_IMAGE_PATH: '/logo512.png',
	SITE_URL_ENV_KEY: 'VITE_SITE_URL',
	TWITTER_CARD: 'summary_large_image',
	DEFAULT_ROBOTS_CONTENT: 'index,follow',
} as const

export const SITEMAP = {
	PATH: '/sitemap.xml',
	CACHE_CONTROL:
		'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400',
	CONTENT_TYPE: 'application/xml; charset=utf-8',
	XML_HEADER: '<?xml version="1.0" encoding="UTF-8"?>',
	URLSET_OPEN: '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
	URLSET_CLOSE: '</urlset>',
	PRODUCT_ENTRY: {
		CHANGE_FREQUENCY: 'weekly',
		PRIORITY: 0.7,
	},
	STATIC_ENTRIES: [
		{
			pathname: ROUTES.HOME,
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			pathname: ROUTES.CART,
			changeFrequency: 'daily',
			priority: 0.6,
		},
		{
			pathname: ROUTES.CHECKOUT,
			changeFrequency: 'daily',
			priority: 0.5,
		},
	],
} as const

export const ROBOTS = {
	CONTENT_TYPE: 'text/plain; charset=utf-8',
	ALLOW_ALL: 'User-agent: *\nDisallow:',
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

export const QUERY = {
	DEFAULT_STALE_TIME_MS: 1000 * 60 * 5,
	REFETCH_ON_WINDOW_FOCUS: false,
} as const

export const IMAGE = {
	CDN_BASE_URL: 'https://wsrv.nl/',
	DEFAULT_QUALITY: 70,
	DEFAULT_FORMAT: 'webp',
} as const

export const SORT_OPTIONS = [
	{ label: 'Default', value: 'default' },
	{ label: 'Price: Low to High', value: 'price-asc' },
	{ label: 'Price: High to Low', value: 'price-desc' },
	{ label: 'Rating: High to Low', value: 'rating-desc' },
	{ label: 'Name: A-Z', value: 'name-asc' },
] as const

export type SortOption = (typeof SORT_OPTIONS)[number]['value']
