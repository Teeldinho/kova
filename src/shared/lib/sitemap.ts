import { ROBOTS, ROUTES, SITEMAP } from '@/shared/config'

import { getAbsoluteUrl } from './seo'

type SitemapChangeFrequency = 'daily' | 'weekly' | 'monthly'

interface SitemapEntry {
	changeFrequency: SitemapChangeFrequency
	lastModifiedAt?: string
	priority: number
	url: string
}

const toXmlEntry = ({
	changeFrequency,
	lastModifiedAt,
	priority,
	url,
}: SitemapEntry): string => {
	const lastModifiedTag = lastModifiedAt
		? `\n    <lastmod>${lastModifiedAt}</lastmod>`
		: ''

	return `  <url>\n    <loc>${url}</loc>${lastModifiedTag}\n    <changefreq>${changeFrequency}</changefreq>\n    <priority>${priority.toFixed(1)}</priority>\n  </url>`
}

export const buildSitemapXml = (entries: SitemapEntry[]): string =>
	[
		SITEMAP.XML_HEADER,
		SITEMAP.URLSET_OPEN,
		...entries.map((entry) => toXmlEntry(entry)),
		SITEMAP.URLSET_CLOSE,
	].join('\n')

export const buildRobotsTxt = (sitemapUrl: string): string =>
	`${ROBOTS.ALLOW_ALL}\nSitemap: ${sitemapUrl}\n`

export const buildStaticSitemapEntries = (origin: string): SitemapEntry[] =>
	SITEMAP.STATIC_ENTRIES.map((entry) => ({
		url: getAbsoluteUrl(origin, entry.pathname),
		changeFrequency: entry.changeFrequency,
		priority: entry.priority,
	}))

export const buildProductSitemapEntries = (
	origin: string,
	productIds: number[],
): SitemapEntry[] =>
	productIds.map((productId) => ({
		url: getAbsoluteUrl(
			origin,
			ROUTES.PRODUCT_DETAIL.replace('$productId', String(productId)),
		),
		changeFrequency: SITEMAP.PRODUCT_ENTRY.CHANGE_FREQUENCY,
		priority: SITEMAP.PRODUCT_ENTRY.PRIORITY,
	}))

export type { SitemapChangeFrequency, SitemapEntry }
