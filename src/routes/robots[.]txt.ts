import { createFileRoute } from '@tanstack/react-router'

import { ROBOTS, SITEMAP } from '@/shared/config'
import { buildRobotsTxt, getAbsoluteUrl, getRequestOrigin } from '@/shared/lib'

const getRobotsHeaders = () => ({
	'Cache-Control': SITEMAP.CACHE_CONTROL,
	'Content-Type': ROBOTS.CONTENT_TYPE,
})

export const Route = createFileRoute('/robots.txt')({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const origin = getRequestOrigin(request)
				const sitemapUrl = getAbsoluteUrl(origin, SITEMAP.PATH)

				return new Response(buildRobotsTxt(sitemapUrl), {
					headers: getRobotsHeaders(),
				})
			},
			HEAD: async () => {
				return new Response(null, {
					headers: getRobotsHeaders(),
				})
			},
		},
	},
})
