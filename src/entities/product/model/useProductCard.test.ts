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
	image: 'https://cdn.example.com/item.png',
	rating: {
		rate: 4.4,
		count: 14,
	},
}

describe('useProductCard', () => {
	test('returns derived values for catalog cards', () => {
		const result = useProductCard({
			index: 2,
			product: MOCK_PRODUCT,
		})

		expect(result.productId).toBe('7')
		expect(result.categoryLabel).toBe("Men's Clothing")
		expect(result.displayTitle).toContain('...')
		expect(result.displayPrice).toContain('R')
		expect(result.motionDelay).toBeGreaterThan(0)
		expect(result.imageSrc).toContain('https://wsrv.nl/?')
		expect(result.imageSrcSet).toContain('320w')
		expect(result.shouldPrioritizeImage).toBe(false)
	})

	test('prioritizes first card image loading', () => {
		const result = useProductCard({
			index: 0,
			product: MOCK_PRODUCT,
		})

		expect(result.shouldPrioritizeImage).toBe(true)
	})
})
