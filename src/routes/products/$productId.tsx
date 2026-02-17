import { createFileRoute, notFound } from '@tanstack/react-router'

import { productQueries } from '@/entities/product'
import {
	ProductDetailError,
	ProductDetailPage,
	ProductDetailPending,
} from '@/pages/product-detail'

export const Route = createFileRoute('/products/$productId')({
	loader: async ({ context, params }) => {
		const productId = Number.parseInt(params.productId, 10)

		if (Number.isNaN(productId)) {
			throw notFound()
		}

		await context.queryClient.ensureQueryData(productQueries.detail(productId))
		await context.queryClient.ensureQueryData(productQueries.list())
		return null
	},
	pendingComponent: ProductDetailPending,
	errorComponent: ProductDetailError,
	component: ProductDetailRoute,
})

function ProductDetailRoute() {
	const { productId } = Route.useParams()

	return <ProductDetailPage productId={Number.parseInt(productId, 10)} />
}
