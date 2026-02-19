import { createFileRoute, stripSearchParams } from '@tanstack/react-router'

import { productQueries } from '@/entities/product'
import {
	CATALOG_SEARCH_DEFAULTS,
	catalogSearchSchema,
} from '@/features/catalog-filters'
import { CatalogError, CatalogPage, CatalogPending } from '@/pages/catalog'
import { APP_NAME, APP_TAGLINE, SEO } from '@/shared/config'
import { getCanonicalUrl, getOgImageUrl } from '@/shared/lib'

export const Route = createFileRoute('/')({
	validateSearch: catalogSearchSchema,
	head: () => {
		const canonicalUrl = getCanonicalUrl('/')
		const ogImageUrl = getOgImageUrl()

		return {
			meta: [
				{
					title: `${APP_NAME} Catalog - ${APP_TAGLINE}`,
				},
				{
					name: 'description',
					content: SEO.DEFAULT_DESCRIPTION,
				},
				{
					property: 'og:title',
					content: `${APP_NAME} Catalog - ${APP_TAGLINE}`,
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
