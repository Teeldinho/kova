import { describe, expect, test } from 'vitest'

import type { CatalogSearch } from '../config/searchSchema'

import { buildCatalogSearch, compactCatalogSearch } from './searchParams'

const defaultSearch: CatalogSearch = {
	page: 1,
	limit: 12,
	q: '',
	category: 'all',
	sort: 'default',
}

describe('compactCatalogSearch', () => {
	test('removes default values from search params', () => {
		expect(compactCatalogSearch(defaultSearch)).toEqual({
			page: undefined,
			limit: undefined,
			q: undefined,
			category: undefined,
			sort: undefined,
		})
	})

	test('keeps non-default values in search params', () => {
		expect(
			compactCatalogSearch({
				...defaultSearch,
				page: 3,
				q: '  jacket  ',
				category: 'electronics',
				sort: 'price-asc',
			}),
		).toEqual({
			page: 3,
			limit: undefined,
			q: 'jacket',
			category: 'electronics',
			sort: 'price-asc',
		})
	})
})

describe('buildCatalogSearch', () => {
	test('merges patch and compacts to non-default params', () => {
		expect(buildCatalogSearch(defaultSearch, { q: 'boots' })).toEqual({
			page: undefined,
			limit: undefined,
			q: 'boots',
			category: undefined,
			sort: undefined,
		})
	})
})
