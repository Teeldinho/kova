import { describe, expect, test, vi } from 'vitest'

import { useQuickAddToCart } from './useQuickAddToCart'

vi.mock('@/entities/cart', () => ({
	useCart: () => ({
		handleCartItemAdd: mockHandleCartItemAdd,
	}),
}))

vi.mock('@/shared/model', () => ({
	useCartSheet: () => ({
		handleCartSheetOpen: mockHandleCartSheetOpen,
	}),
}))

const mockHandleCartItemAdd = vi.fn()
const mockHandleCartSheetOpen = vi.fn()

const MOCK_PRODUCT = {
	id: 1,
	title: 'Test Product',
	price: 29.99,
	description: 'A test product',
	category: "men's clothing" as const,
	image: '/test.jpg',
	rating: { rate: 4.5, count: 100 },
}

describe('useQuickAddToCart', () => {
	test('returns a quick add handler', () => {
		const result = useQuickAddToCart()
		expect(result.handleProductQuickAdd).toBeTypeOf('function')
	})

	test('adds product to cart with quantity 1 and opens cart sheet', () => {
		const { handleProductQuickAdd } = useQuickAddToCart()
		handleProductQuickAdd(MOCK_PRODUCT)

		expect(mockHandleCartItemAdd).toHaveBeenCalledWith(MOCK_PRODUCT, 1)
		expect(mockHandleCartSheetOpen).toHaveBeenCalledOnce()
	})

	test('opens cart sheet after adding item', () => {
		const { handleProductQuickAdd } = useQuickAddToCart()
		handleProductQuickAdd(MOCK_PRODUCT)

		const addCallOrder = mockHandleCartItemAdd.mock.invocationCallOrder[0]
		const openCallOrder = mockHandleCartSheetOpen.mock.invocationCallOrder[0]

		if (addCallOrder !== undefined && openCallOrder !== undefined) {
			expect(addCallOrder).toBeLessThan(openCallOrder)
		}
	})
})
