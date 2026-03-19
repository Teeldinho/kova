export const CATALOG_HERO = {
	ACTION_LABEL: 'Browse products',
	EYEBROW: 'Kova essentials',
	TITLE: 'THE EDIT',
	DESCRIPTION:
		'Curated essentials with a sharp silhouette, precise materials, and everyday utility.',
	TITLE_LETTER_DURATION_SEC: 0.42,
	TITLE_LETTER_STAGGER_SEC: 0.045,
	TITLE_LETTER_Y_OFFSET_PX: 18,
	TITLE_WORD_GAP_EM: 0.36,
	ARCHIVE_INDEX_LABEL: 'Archive Index',
	ARCHIVE_INDEX_VALUE: 'LIVE',
	STATUS_LABEL: 'Status',
	STATUS_VALUE: 'Active_Archive',
	REGISTRY_CIRCLE_TEXT: 'Registry • Specimen • Archive • ',
	PROTOCOL_VERSION: 'Sync_Protocol_v4.0.6',
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

export const CATALOG_FILTER = {
	DEFAULT_CATEGORY: 'all',
	DEFAULT_QUERY: '',
	DEFAULT_SORT: 'default',
	PAGE_CHANGE_SCROLL_OFFSET_PX: -80,
	PAGE_CHANGE_SCROLL_DURATION_MULTIPLIER: 0.7,
	SEARCH_DEBOUNCE_MS: 250,
	CATEGORY_LABEL: 'Category',
	CATEGORY_PLACEHOLDER: 'Category',
	IDS: {
		CATEGORY: 'catalog-category',
		PRODUCTS_SECTION: 'catalog-products-section',
		SEARCH: 'catalog-search',
		SORT: 'catalog-sort',
	},
	SEARCH_LABEL: 'Search',
	SEARCH_PLACEHOLDER: 'Search products',
	SORT_LABEL: 'Sort',
	SORT_PLACEHOLDER: 'Sort by',
} as const

export const CATALOG_PAGINATION = {
	FIRST_PAGE: 1,
	NAVIGATION_LABEL: 'Products pagination',
	NEXT_LABEL: 'Next page',
	PREVIOUS_LABEL: 'Previous page',
} as const

export const QUICK_ADD = {
	DEFAULT_QUANTITY: 1,
	BUTTON_LABEL: 'Quick Add',
	BUTTON_ARIA_PREFIX: 'Add to cart:',
	TOAST: {
		TITLE: 'Added to bag',
		ACTION_LABEL: 'Open Cart',
	},
} as const
