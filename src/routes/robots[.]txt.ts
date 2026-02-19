import { createFileRoute } from '@tanstack/react-router'

import { SEO } from '@/shared/config'
import { buildRobotsTxt, getAbsoluteUrl, getRequestOrigin } from '@/shared/lib'

export const Route = createFileRoute('/robots.txt')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const origin = getRequestOrigin(request)
				const sitemapUrl = getAbsoluteUrl(origin, SEO.SITEMAP_PATH)

				return new Response(buildRobotsTxt(sitemapUrl), {
					headers: {
						'Cache-Control': SEO.SITEMAP_CACHE_CONTROL,
						'Content-Type': 'text/plain; charset=utf-8',
					},
				})
			},
		},
	},
})
