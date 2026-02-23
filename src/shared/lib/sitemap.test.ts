import { describe, expect, test } from 'vitest'

import { SITEMAP } from '@/shared/config'

import {
	buildProductSitemapEntries,
	buildRobotsTxt,
	buildSitemapXml,
	buildStaticSitemapEntries,
} from './sitemap'

describe('sitemap helpers', () => {
	test('builds static sitemap entries from configured routes', () => {
		const entries = buildStaticSitemapEntries('https://kova.store')

		expect(entries).toHaveLength(SITEMAP.STATIC_ENTRIES.length)
		expect(entries[0]?.url).toBe('https://kova.store/')
	})

	test('builds product sitemap entries from product ids', () => {
		const entries = buildProductSitemapEntries('https://kova.store', [4, 5])

		expect(entries).toHaveLength(2)
		expect(entries[0]).toMatchObject({
			changeFrequency: SITEMAP.PRODUCT_ENTRY.CHANGE_FREQUENCY,
			priority: SITEMAP.PRODUCT_ENTRY.PRIORITY,
			url: 'https://kova.store/products/4',
		})
	})

	test('renders valid sitemap xml envelope', () => {
		const xml = buildSitemapXml([
			{
				url: 'https://kova.store/',
				changeFrequency: 'daily',
				priority: 1,
			},
		])

		expect(xml).toContain(SITEMAP.XML_HEADER)
		expect(xml).toContain('<loc>https://kova.store/</loc>')
		expect(xml).toContain('</urlset>')
	})

	test('renders robots.txt with sitemap reference', () => {
		const robotsTxt = buildRobotsTxt('https://kova.store/sitemap.xml')

		expect(robotsTxt).toContain('User-agent: *')
		expect(robotsTxt).toContain('Sitemap: https://kova.store/sitemap.xml')
	})
})
