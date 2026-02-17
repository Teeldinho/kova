import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { toastInfoMock } = vi.hoisted(() => ({
	toastInfoMock: vi.fn(),
}))

vi.mock('sonner', () => ({
	toast: {
		info: toastInfoMock,
	},
}))

import { useCartLineItems } from './useCartLineItems'

describe('useCartLineItems', () => {
	test('maps cart items to item handlers', () => {
		toastInfoMock.mockReset()
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
		expect(toastInfoMock).toHaveBeenCalledWith('Removed from bag', {
			description: 'Item',
		})
	})

	test('shows remove toast when decreasing from minimum quantity', () => {
		toastInfoMock.mockReset()
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
						quantity: 1,
					},
				],
			}),
		)

		result.current[0]?.handleCartItemDecrease()

		expect(handleCartItemQuantityUpdate).toHaveBeenCalledWith(1, 0)
		expect(toastInfoMock).toHaveBeenCalledWith('Removed from bag', {
			description: 'Item',
		})
	})
})
