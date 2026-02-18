export const CATALOG_FILTER = {
	DEFAULT_CATEGORY: 'all',
	DEFAULT_QUERY: '',
	DEFAULT_SORT: 'default',
	SEARCH_DEBOUNCE_MS: 250,
	CATEGORY_LABEL: 'Category',
	CATEGORY_PLACEHOLDER: 'Category',
	IDS: {
		CATEGORY: 'catalog-category',
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
