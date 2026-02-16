import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const { handleCartItemAddMock, useCartMock, useProductMock } = vi.hoisted(
	() => ({
		handleCartItemAddMock: vi.fn(),
		useCartMock: vi.fn(),
		useProductMock: vi.fn(),
	}),
)

vi.mock('@/entities/product', () => ({
	useProduct: useProductMock,
}))

vi.mock('@/entities/cart', () => ({
	CART: {
		MIN_ITEM_QUANTITY: 1,
		MAX_ITEM_QUANTITY: 10,
	},
	useCart: useCartMock,
}))

import { useProductDetail } from './useProductDetail'

describe('useProductDetail', () => {
	const mockProduct = {
		id: 1,
		title: 'Test Product',
		price: 100,
		description: 'Description',
		category: 'electronics',
		image: '/product.jpg',
		rating: { rate: 4.3, count: 120 },
	}

	beforeEach(() => {
		handleCartItemAddMock.mockReset()
		useProductMock.mockReturnValue({ data: mockProduct })
		useCartMock.mockReturnValue({ handleCartItemAdd: handleCartItemAddMock })
	})

	test('returns product and default quantity', () => {
		const { result } = renderHook(() => useProductDetail(1))

		expect(result.current.product).toEqual(mockProduct)
		expect(result.current.quantity).toBe(1)
	})

	test('increments quantity', () => {
		const { result } = renderHook(() => useProductDetail(1))

		act(() => {
			result.current.handleProductQuantityIncrease()
		})

		expect(result.current.quantity).toBe(2)
	})

	test('decrements quantity but not below minimum', () => {
		const { result } = renderHook(() => useProductDetail(1))

		act(() => {
			result.current.handleProductQuantityDecrease()
		})

		expect(result.current.quantity).toBe(1)
	})

	test('adds selected quantity to cart and resets quantity', () => {
		const { result } = renderHook(() => useProductDetail(1))

		act(() => {
			result.current.handleProductQuantityIncrease()
			result.current.handleProductQuantityIncrease()
		})

		act(() => {
			result.current.handleProductAddToCart()
		})

		expect(handleCartItemAddMock).toHaveBeenCalledWith(mockProduct, 3)
		expect(result.current.quantity).toBe(1)
	})
})
