import { createFileRoute, stripSearchParams } from '@tanstack/react-router'

import {
	CATALOG_SEARCH_DEFAULTS,
	catalogSearchSchema,
} from '@/features/catalog-filters'
import { CatalogError, CatalogPage } from '@/pages/catalog'
import { getServerSiteUrl } from '@/shared/api'
import { APP_NAME, APP_TAGLINE, SEO } from '@/shared/config'
import { getCanonicalUrl, getOgImageUrl } from '@/shared/lib'

export const Route = createFileRoute('/')({
	validateSearch: catalogSearchSchema,
	head: async () => {
		const siteUrl = await getServerSiteUrl()
		const canonicalUrl = getCanonicalUrl('/', siteUrl)
		const ogImageUrl = getOgImageUrl(siteUrl)

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
	loader: () => null,
	errorComponent: CatalogError,
	component: CatalogPage,
})
