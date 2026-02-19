import { createFileRoute } from '@tanstack/react-router'

import { getAllProducts } from '@/shared/api'
import { ROUTES, SEO } from '@/shared/config'
import {
	buildSitemapXml,
	getAbsoluteUrl,
	getRequestOrigin,
	type SitemapEntry,
} from '@/shared/lib'

const STATIC_SITEMAP_ENTRIES = [
	{
		changeFrequency: 'daily',
		pathname: ROUTES.HOME,
		priority: 1,
	},
	{
		changeFrequency: 'daily',
		pathname: ROUTES.CART,
		priority: 0.6,
	},
	{
		changeFrequency: 'daily',
		pathname: ROUTES.CHECKOUT,
		priority: 0.5,
	},
] as const

const getProductSitemapEntries = async (
	origin: string,
): Promise<SitemapEntry[]> => {
	try {
		const productsResponse = await getAllProducts()

		return productsResponse.data.map((product) => ({
			url: getAbsoluteUrl(origin, `/products/${product.id}`),
			changeFrequency: 'weekly',
			priority: 0.7,
		}))
	} catch {
		return []
	}
}

export const Route = createFileRoute('/sitemap.xml')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const origin = getRequestOrigin(request)

				const staticEntries: SitemapEntry[] = STATIC_SITEMAP_ENTRIES.map(
					(entry) => ({
						url: getAbsoluteUrl(origin, entry.pathname),
						changeFrequency: entry.changeFrequency,
						priority: entry.priority,
					}),
				)

				const productEntries = await getProductSitemapEntries(origin)
				const sitemapXml = buildSitemapXml([
					...staticEntries,
					...productEntries,
				])

				return new Response(sitemapXml, {
					headers: {
						'Cache-Control': SEO.SITEMAP_CACHE_CONTROL,
						'Content-Type': 'application/xml; charset=utf-8',
					},
				})
			},
		},
	},
})
