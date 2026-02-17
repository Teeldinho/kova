import { beforeEach, describe, expect, test, vi } from 'vitest'

const { mockHandleCartItemAdd, mockHandleCartSheetOpen, mockToastSuccess } =
	vi.hoisted(() => ({
		mockHandleCartItemAdd: vi.fn(),
		mockHandleCartSheetOpen: vi.fn(),
		mockToastSuccess: vi.fn(),
	}))

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

vi.mock('@/shared/lib', () => ({
	formatPrice: (value: number) => `R ${value}`,
}))

vi.mock('sonner', () => ({
	toast: {
		success: mockToastSuccess,
	},
}))

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
	beforeEach(() => {
		mockHandleCartItemAdd.mockReset()
		mockHandleCartSheetOpen.mockReset()
		mockToastSuccess.mockReset()
	})

	test('returns a quick add handler', () => {
		const result = useQuickAddToCart()
		expect(result.handleProductQuickAdd).toBeTypeOf('function')
	})

	test('adds product to cart with quantity 1 and opens cart sheet', () => {
		const { handleProductQuickAdd } = useQuickAddToCart()
		handleProductQuickAdd(MOCK_PRODUCT)

		expect(mockHandleCartItemAdd).toHaveBeenCalledWith(MOCK_PRODUCT, 1)
		expect(mockToastSuccess).toHaveBeenCalledWith('Added to bag', {
			description: 'Test Product · R 29.99',
			action: {
				label: 'Open Cart',
				onClick: mockHandleCartSheetOpen,
			},
		})
	})

	test('does not open cart sheet automatically after quick add', () => {
		const { handleProductQuickAdd } = useQuickAddToCart()
		handleProductQuickAdd(MOCK_PRODUCT)

		expect(mockHandleCartSheetOpen).not.toHaveBeenCalled()
	})
})
