import { describe, expect, test } from 'vitest'

import { SEO } from '@/shared/config'

import {
	getAbsoluteUrl,
	getCanonicalUrl,
	getOgImageUrl,
	getRequestOrigin,
} from './seo'

describe('seo url helpers', () => {
	test('builds canonical url from provided site url and pathname', () => {
		expect(getCanonicalUrl('/checkout/', 'https://kova.store/')).toBe(
			'https://kova.store/checkout',
		)
	})

	test('returns normalized pathname when site url resolves to empty value', () => {
		expect(getCanonicalUrl('/products/7/', '')).toBe('/products/7')
	})

	test('builds absolute og image url from provided site url', () => {
		expect(getOgImageUrl('https://kova.store/')).toBe(
			`https://kova.store${SEO.DEFAULT_OG_IMAGE_PATH}`,
		)
	})

	test('creates absolute url with normalized origin and pathname', () => {
		expect(getAbsoluteUrl('https://kova.store/', '/cart/')).toBe(
			'https://kova.store/cart',
		)
	})

	test('extracts request origin without trailing slashes', () => {
		const request = new Request('https://kova.store/products/7?from=search')

		expect(getRequestOrigin(request)).toBe('https://kova.store')
	})
})
