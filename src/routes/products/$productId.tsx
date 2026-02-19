import { createFileRoute, notFound } from '@tanstack/react-router'

import { productQueries } from '@/entities/product'
import {
	ProductDetailError,
	ProductDetailPage,
	ProductDetailPending,
} from '@/pages/product-detail'
import { APP_NAME, SEO } from '@/shared/config'
import { getCanonicalUrl, getOgImageUrl, getServerSiteUrl } from '@/shared/lib'

export const Route = createFileRoute('/products/$productId')({
	loader: async ({ context, params }) => {
		const productId = Number.parseInt(params.productId, 10)

		if (Number.isNaN(productId)) {
			throw notFound()
		}

		await context.queryClient.ensureQueryData(productQueries.detail(productId))

		void context.queryClient.prefetchQuery(productQueries.list())

		return null
	},
	pendingComponent: ProductDetailPending,
	errorComponent: ProductDetailError,
	head: async ({ params }) => {
		const siteUrl = await getServerSiteUrl()
		const canonicalUrl = getCanonicalUrl(
			`/products/${params.productId}`,
			siteUrl,
		)
		const ogImageUrl = getOgImageUrl(siteUrl)

		return {
			meta: [
				{
					title: `Product #${params.productId} - ${APP_NAME}`,
				},
				{
					name: 'description',
					content: SEO.DEFAULT_DESCRIPTION,
				},
				{
					property: 'og:type',
					content: 'product',
				},
				{
					property: 'og:title',
					content: `Product #${params.productId} - ${APP_NAME}`,
				},
				{
					property: 'og:description',
					content: SEO.DEFAULT_DESCRIPTION,
				},
				{
					property: 'og:url',
					content: canonicalUrl,
				},
				{
					name: 'twitter:url',
					content: canonicalUrl,
				},
				...(ogImageUrl
					? [
							{
								property: 'og:image',
								content: ogImageUrl,
							},
						]
					: []),
			],
			links: canonicalUrl
				? [
						{
							rel: 'canonical',
							href: canonicalUrl,
						},
					]
				: [],
		}
	},
	component: ProductDetailRoute,
})

function ProductDetailRoute() {
	const { productId } = Route.useParams()

	return <ProductDetailPage productId={Number.parseInt(productId, 10)} />
}
