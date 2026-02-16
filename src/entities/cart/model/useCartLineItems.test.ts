import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { useCartLineItems } from './useCartLineItems'

describe('useCartLineItems', () => {
	test('maps cart items to item handlers', () => {
		const handleCartItemQuantityUpdate = vi.fn()
		const handleCartItemRemove = vi.fn()

		const { result } = renderHook(() =>
			useCartLineItems({
				handleCartItemQuantityUpdate,
				handleCartItemRemove,
				items: [
					{
						product: {
							id: 1,
							title: 'Item',
							price: 20,
							description: 'desc',
							category: 'electronics',
							image: '/img.jpg',
							rating: { rate: 4, count: 10 },
						},
						quantity: 2,
					},
				],
			}),
		)

		result.current[0]?.handleCartItemIncrease()
		result.current[0]?.handleCartItemDecrease()
		result.current[0]?.handleCartItemRemove()

		expect(handleCartItemQuantityUpdate).toHaveBeenNthCalledWith(1, 1, 3)
		expect(handleCartItemQuantityUpdate).toHaveBeenNthCalledWith(2, 1, 1)
		expect(handleCartItemRemove).toHaveBeenCalledWith(1)
	})
})
