import { createFileRoute } from '@tanstack/react-router'

import { productQueries } from '@/entities/product'
import { catalogSearchSchema } from '@/features/catalog-filters'
import { CatalogError, CatalogPage, CatalogPending } from '@/pages/catalog'

export const Route = createFileRoute('/')({
	validateSearch: catalogSearchSchema,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(productQueries.list())
		return null
	},
	pendingComponent: CatalogPending,
	errorComponent: CatalogError,
	component: CatalogPage,
})
