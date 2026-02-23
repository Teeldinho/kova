import { createFileRoute } from '@tanstack/react-router'

import { getSitemapProductIds } from '@/shared/api'
import { SITEMAP } from '@/shared/config'
import {
	buildProductSitemapEntries,
	buildSitemapXml,
	buildStaticSitemapEntries,
	getRequestOrigin,
} from '@/shared/lib'

export const Route = createFileRoute('/sitemap.xml')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const origin = getRequestOrigin(request)
				const staticEntries = buildStaticSitemapEntries(origin)
				const productIds = await getSitemapProductIds()
				const productEntries = buildProductSitemapEntries(origin, productIds)
				const sitemapXml = buildSitemapXml([
					...staticEntries,
					...productEntries,
				])

				return new Response(sitemapXml, {
					headers: {
						'Cache-Control': SITEMAP.CACHE_CONTROL,
						'Content-Type': SITEMAP.CONTENT_TYPE,
					},
				})
			},
		},
	},
})
