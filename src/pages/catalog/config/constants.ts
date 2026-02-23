export const CATALOG_HERO = {
	ACTION_LABEL: 'Browse products',
	EYEBROW: 'Kova essentials',
	TITLE: 'THE EDIT',
	DESCRIPTION:
		'Curated essentials with a sharp silhouette, precise materials, and everyday utility.',
	TOTAL_ITEMS_SUFFIX: 'products',
} as const

export const CATALOG_GRID_DESKTOP_CLASS_PATTERN = [
	'lg:col-span-6',
	'lg:col-span-6',
	'lg:col-span-4',
	'lg:col-span-4',
	'lg:col-span-4',
] as const

export const CATALOG_MARQUEE_ITEMS = [
	'NEW ARRIVALS',
	'EXCLUSIVE COLLECTION',
	'LIMITED EDITION',
	'FREE SHIPPING',
] as const

export const CATALOG_ERROR = {
	DESCRIPTION: 'We could not load products right now. Please try again.',
	RETRY_LABEL: 'Retry',
	TITLE: 'Unable to load catalog',
} as const
