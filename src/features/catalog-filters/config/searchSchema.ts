import { z } from 'zod'

import { PAGINATION } from '@/shared/config'

import { CATALOG_FILTER } from './constants'

export const CATALOG_SORT_VALUES = [
	'default',
	'price-asc',
	'price-desc',
	'rating-desc',
	'name-asc',
] as const

export const CATALOG_SEARCH_DEFAULTS = {
	page: PAGINATION.DEFAULT_PAGE,
	limit: PAGINATION.DEFAULT_LIMIT,
	q: CATALOG_FILTER.DEFAULT_QUERY,
	category: CATALOG_FILTER.DEFAULT_CATEGORY,
	sort: CATALOG_FILTER.DEFAULT_SORT,
} as const

export const catalogSearchSchema = z.object({
	page: z.coerce.number().int().min(1).catch(CATALOG_SEARCH_DEFAULTS.page),
	limit: z.coerce
		.number()
		.int()
		.min(1)
		.max(PAGINATION.MAX_LIMIT)
		.catch(CATALOG_SEARCH_DEFAULTS.limit),
	q: z.string().catch(CATALOG_SEARCH_DEFAULTS.q),
	category: z.string().catch(CATALOG_SEARCH_DEFAULTS.category),
	sort: z.enum(CATALOG_SORT_VALUES).catch(CATALOG_SEARCH_DEFAULTS.sort),
})

export type CatalogSearch = z.infer<typeof catalogSearchSchema>
