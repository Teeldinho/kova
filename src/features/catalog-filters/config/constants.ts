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
