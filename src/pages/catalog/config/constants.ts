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
