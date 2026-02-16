import { describe, expect, test } from 'vitest'

import { useProductDetailInfo } from './useProductDetailInfo'

describe('useProductDetailInfo', () => {
	test('returns formatted product detail display values', () => {
		const result = useProductDetailInfo({
			id: 1,
			title: 'Product',
			price: 20,
			description: 'Description',
			category: "women's clothing",
			image: '/item.jpg',
			rating: { rate: 4.8, count: 40 },
		})

		expect(result.categoryLabel).toBe("Women's Clothing")
		expect(result.displayPrice).toContain('R')
		expect(result.addToCartLabel).toBe('Add To Cart')
	})
})
