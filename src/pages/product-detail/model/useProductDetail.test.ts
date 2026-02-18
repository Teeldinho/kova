import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const {
	getCartRewardSnapshotMock,
	handleCartItemAddMock,
	handleCartSheetOpenMock,
	lenisScrollToMock,
	toastSuccessMock,
	useCartMock,
	useProductMock,
} = vi.hoisted(() => ({
	getCartRewardSnapshotMock: vi.fn(),
	handleCartItemAddMock: vi.fn(),
	handleCartSheetOpenMock: vi.fn(),
	lenisScrollToMock: vi.fn(),
	toastSuccessMock: vi.fn(),
	useCartMock: vi.fn(),
	useProductMock: vi.fn(),
}))

vi.mock('@/entities/product', () => ({
	useProduct: useProductMock,
}))

vi.mock('@/entities/cart', () => ({
	CART: {
		MIN_ITEM_QUANTITY: 1,
		MAX_ITEM_QUANTITY: 10,
	},
	getCartRewardSnapshot: getCartRewardSnapshotMock,
	useCart: useCartMock,
}))

vi.mock('@/shared/model', () => ({
	useCartSheet: () => ({
		handleCartSheetOpen: handleCartSheetOpenMock,
	}),
	// Mock the Lenis instance returned by useLenis()
	useLenis: () => ({ scrollTo: lenisScrollToMock }),
}))

vi.mock('sonner', () => ({
	toast: {
		success: toastSuccessMock,
	},
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
		handleCartSheetOpenMock.mockReset()
		lenisScrollToMock.mockReset()
		toastSuccessMock.mockReset()
		getCartRewardSnapshotMock.mockReset()
		getCartRewardSnapshotMock.mockReturnValue({
			activeTier: null,
			nextTier: null,
			amountToNextTierInZar: 0,
			progressToNextTier: 0,
			discountRate: 0,
			hasUnlockedReward: false,
		})
		useProductMock.mockReturnValue({ data: mockProduct })
		useCartMock.mockReturnValue({
			handleCartItemAdd: handleCartItemAddMock,
			subtotal: 20,
		})
	})

	test('returns product and default quantity', () => {
		const { result } = renderHook(() => useProductDetail(1))

		expect(result.current.product).toEqual(mockProduct)
		expect(result.current.quantity).toBe(1)
		expect(result.current.projectedRewardSnapshot).toEqual({
			activeTier: null,
			nextTier: null,
			amountToNextTierInZar: 0,
			progressToNextTier: 0,
			discountRate: 0,
			hasUnlockedReward: false,
		})
		expect(getCartRewardSnapshotMock).toHaveBeenCalledWith(120)
	})

	test('scrolls to top via Lenis immediately on mount', () => {
		renderHook(() => useProductDetail(1))

		expect(lenisScrollToMock).toHaveBeenCalledWith(0, {
			immediate: true,
			force: true,
		})
	})

	test('scrolls to top again when product id changes', () => {
		const { rerender } = renderHook(
			({ currentProductId }) => useProductDetail(currentProductId),
			{
				initialProps: { currentProductId: 1 },
			},
		)

		expect(lenisScrollToMock).toHaveBeenCalledTimes(1)

		rerender({ currentProductId: 2 })

		expect(lenisScrollToMock).toHaveBeenCalledTimes(2)
	})

	test('does not scroll when productId < 1', () => {
		renderHook(() => useProductDetail(0))

		expect(lenisScrollToMock).not.toHaveBeenCalled()
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
		expect(toastSuccessMock).toHaveBeenCalledWith(
			'Added to bag',
			expect.objectContaining({
				description: expect.stringContaining('Test Product'),
				action: {
					label: 'Open Cart',
					onClick: handleCartSheetOpenMock,
				},
			}),
		)
		expect(result.current.quantity).toBe(1)
	})
})
