import { PAGINATION } from '@/shared/config'

import { CATALOG_FILTER } from '../config/constants'
import type { CatalogSearch } from '../config/searchSchema'

type CatalogSearchParams = Partial<CatalogSearch>

const isDefaultPage = (page: number) => page === PAGINATION.DEFAULT_PAGE
const isDefaultLimit = (limit: number) => limit === PAGINATION.DEFAULT_LIMIT
const isDefaultQuery = (query: string) => query.length === 0
const isDefaultCategory = (category: string) =>
	category === CATALOG_FILTER.DEFAULT_CATEGORY
const isDefaultSort = (sort: CatalogSearch['sort']) =>
	sort === CATALOG_FILTER.DEFAULT_SORT

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
