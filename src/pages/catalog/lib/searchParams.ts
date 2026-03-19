import {
	CATALOG_SEARCH_DEFAULTS,
	type CatalogSearch,
} from '../config/searchSchema'

type CatalogSearchParams = Partial<CatalogSearch>

const isDefaultPage = (page: number) => page === CATALOG_SEARCH_DEFAULTS.page
const isDefaultLimit = (limit: number) =>
	limit === CATALOG_SEARCH_DEFAULTS.limit
const isDefaultQuery = (query: string) => query.length === 0
const isDefaultCategory = (category: string) =>
	category === CATALOG_SEARCH_DEFAULTS.category
const isDefaultSort = (sort: CatalogSearch['sort']) =>
	sort === CATALOG_SEARCH_DEFAULTS.sort

export const compactCatalogSearch = (
	search: CatalogSearch,
): CatalogSearchParams => {
	const nextQuery = search.q.trim()

	return {
		page: isDefaultPage(search.page) ? undefined : search.page,
		limit: isDefaultLimit(search.limit) ? undefined : search.limit,
		q: isDefaultQuery(nextQuery) ? undefined : nextQuery,
		category: isDefaultCategory(search.category) ? undefined : search.category,
		sort: isDefaultSort(search.sort) ? undefined : search.sort,
	}
}

export const buildCatalogSearch = (
	previous: CatalogSearch,
	patch: CatalogSearchParams,
): CatalogSearchParams => compactCatalogSearch({ ...previous, ...patch })
