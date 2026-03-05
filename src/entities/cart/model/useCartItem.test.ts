import { describe, expect, test } from 'vitest'

import type { CartItem } from './types'
import { useCartItem } from './useCartItem'

const MOCK_ITEM: CartItem = {
	product: {
		id: 1,
		title: 'Test Product',
		price: 25,
		description: 'A product',
		category: 'electronics',
		image: '/test.jpg',
		rating: {
			rate: 4.2,
			count: 20,
		},
	},
	quantity: 2,
}

describe('useCartItem', () => {
	test('returns derived cart item values', () => {
		const result = useCartItem(MOCK_ITEM)

		expect(result.title).toBe('Test Product')
		expect(result.quantity).toBe(2)
		expect(result.displayPrice).toContain('R')
		expect(result.decreaseQuantityLabel).toBe('Decrease quantity')
		expect(result.increaseQuantityLabel).toBe('Increase quantity')
		expect(result.imageSrc).toBe('/test.jpg')
		expect(result.imageSrcSet).toBeUndefined()
	})
})
