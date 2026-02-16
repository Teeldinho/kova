import { describe, expect, test } from 'vitest'

import type { Product } from './types'
import { useProductCard } from './useProductCard'

const MOCK_PRODUCT: Product = {
	id: 7,
	title:
		'Long Product Name For Display Truncation Checks That Should Be Trimmed',
	price: 10,
	description: 'A product used for testing',
	category: "men's clothing",
	image: '/item.png',
	rating: {
		rate: 4.4,
		count: 14,
	},
}

describe('useProductCard', () => {
	test('returns derived values for non-featured cards', () => {
		const result = useProductCard({
			featured: false,
			index: 2,
			product: MOCK_PRODUCT,
		})

		expect(result.productId).toBe('7')
		expect(result.categoryLabel).toBe("Men's Clothing")
		expect(result.displayTitle).toContain('...')
		expect(result.displayPrice).toContain('R')
		expect(result.motionDelay).toBeGreaterThan(0)
		expect(result.featuredClassName).toBe('')
	})

	test('returns full title and featured class for featured cards', () => {
		const result = useProductCard({
			featured: true,
			index: 0,
			product: MOCK_PRODUCT,
		})

		expect(result.displayTitle).toBe(MOCK_PRODUCT.title)
		expect(result.featuredClassName).toBe('col-span-2 row-span-2')
	})
})
