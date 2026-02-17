import { createFileRoute, stripSearchParams } from '@tanstack/react-router'

import { productQueries } from '@/entities/product'
import {
	CATALOG_SEARCH_DEFAULTS,
	catalogSearchSchema,
} from '@/features/catalog-filters'
import { CatalogError, CatalogPage, CatalogPending } from '@/pages/catalog'

export const Route = createFileRoute('/')({
	validateSearch: catalogSearchSchema,
	search: {
		middlewares: [stripSearchParams(CATALOG_SEARCH_DEFAULTS)],
	},
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(productQueries.list())
		return null
	},
	pendingComponent: CatalogPending,
	errorComponent: CatalogError,
	component: CatalogPage,
})
