interface SitemapEntry {
	changeFrequency: 'daily' | 'weekly' | 'monthly'
	lastModifiedAt?: string
	priority: number
	url: string
}

const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>'
const URLSET_OPEN =
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
const URLSET_CLOSE = '</urlset>'

const ROBOTS_ALLOW_ALL = 'User-agent: *\nDisallow:'

const toXmlEntry = ({
	changeFrequency,
	lastModifiedAt,
	priority,
	url,
}: SitemapEntry): string => {
	const lastModifiedTag = lastModifiedAt
		? `\n    <lastmod>${lastModifiedAt}</lastmod>`
		: ''

	return [
		'  <url>',
		`    <loc>${url}</loc>`,
		lastModifiedTag,
		`\n    <changefreq>${changeFrequency}</changefreq>`,
		`\n    <priority>${priority.toFixed(1)}</priority>`,
		'\n  </url>',
	].join('')
}

export const buildSitemapXml = (entries: SitemapEntry[]): string =>
	[
		XML_HEADER,
		URLSET_OPEN,
		...entries.map((entry) => toXmlEntry(entry)),
		URLSET_CLOSE,
	].join('\n')

export const buildRobotsTxt = (sitemapUrl: string): string =>
	`${ROBOTS_ALLOW_ALL}\nSitemap: ${sitemapUrl}\n`

export type { SitemapEntry }
