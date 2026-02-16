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

export const catalogSearchSchema = z.object({
	page: z.coerce.number().int().min(1).catch(PAGINATION.DEFAULT_PAGE),
	limit: z.coerce
		.number()
		.int()
		.min(1)
		.max(PAGINATION.MAX_LIMIT)
		.catch(PAGINATION.DEFAULT_LIMIT),
	q: z.string().catch(CATALOG_FILTER.DEFAULT_QUERY),
	category: z.string().catch(CATALOG_FILTER.DEFAULT_CATEGORY),
	sort: z.enum(CATALOG_SORT_VALUES).catch(CATALOG_FILTER.DEFAULT_SORT),
})

export type CatalogSearch = z.infer<typeof catalogSearchSchema>
