import { describe, expect, test } from 'vitest'

import type { Product } from '@/entities/product'

import {
	filterProducts,
	getPageNumbers,
	paginateProducts,
	sortProducts,
} from './catalogFilters'

const PRODUCTS: Product[] = [
	{
		id: 1,
		title: 'Alpha Jacket',
		price: 50,
		description: 'Warm winter jacket',
		category: "men's clothing",
		image: '/alpha.jpg',
		rating: { rate: 3.9, count: 10 },
	},
	{
		id: 2,
		title: 'Beta Headphones',
		price: 120,
		description: 'Noise cancelling headphones',
		category: 'electronics',
		image: '/beta.jpg',
		rating: { rate: 4.8, count: 50 },
	},
	{
		id: 3,
		title: 'Gamma Ring',
		price: 80,
		description: 'Handmade silver ring',
		category: 'jewelery',
		image: '/gamma.jpg',
		rating: { rate: 4.2, count: 22 },
	},
]

describe('filterProducts', () => {
	test('returns all products when search and category are default', () => {
		const result = filterProducts(PRODUCTS, {
			searchTerm: '',
			category: 'all',
		})

		expect(result).toHaveLength(3)
	})

	test('filters by search term in title', () => {
		const result = filterProducts(PRODUCTS, {
			searchTerm: 'beta',
			category: 'all',
		})

		expect(result).toHaveLength(1)
		expect(result[0]?.id).toBe(2)
	})

	test('filters by category', () => {
		const result = filterProducts(PRODUCTS, {
			searchTerm: '',
			category: 'electronics',
		})

		expect(result).toHaveLength(1)
		expect(result[0]?.id).toBe(2)
	})

	test('applies both search and category filters', () => {
		const result = filterProducts(PRODUCTS, {
			searchTerm: 'ring',
			category: 'jewelery',
		})

		expect(result).toHaveLength(1)
		expect(result[0]?.id).toBe(3)
	})
})

describe('sortProducts', () => {
	test('sorts by ascending price', () => {
		const result = sortProducts(PRODUCTS, 'price-asc')
		expect(result.map((product) => product.id)).toEqual([1, 3, 2])
	})

	test('sorts by descending price', () => {
		const result = sortProducts(PRODUCTS, 'price-desc')
		expect(result.map((product) => product.id)).toEqual([2, 3, 1])
	})

	test('sorts by descending rating', () => {
		const result = sortProducts(PRODUCTS, 'rating-desc')
		expect(result.map((product) => product.id)).toEqual([2, 3, 1])
	})

	test('sorts by alphabetical name', () => {
		const result = sortProducts(PRODUCTS, 'name-asc')
		expect(result.map((product) => product.id)).toEqual([1, 2, 3])
	})
})

describe('paginateProducts', () => {
	test('returns correct page data', () => {
		const result = paginateProducts(PRODUCTS, { page: 2, limit: 2 })

		expect(result.items).toHaveLength(1)
		expect(result.items[0]?.id).toBe(3)
		expect(result.totalPages).toBe(2)
		expect(result.currentPage).toBe(2)
	})

	test('clamps page number to valid range', () => {
		const result = paginateProducts(PRODUCTS, { page: 99, limit: 2 })

		expect(result.currentPage).toBe(2)
		expect(result.items[0]?.id).toBe(3)
	})
})

describe('getPageNumbers', () => {
	test('returns sequential page numbers', () => {
		expect(getPageNumbers(4)).toEqual([1, 2, 3, 4])
	})
})
