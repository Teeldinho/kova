import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const {
	navigateMock,
	useCartLineItemsMock,
	useCartMock,
	useCartSheetMock,
	useNavigateMock,
} = vi.hoisted(() => ({
	navigateMock: vi.fn(),
	useCartLineItemsMock: vi.fn(),
	useCartMock: vi.fn(),
	useCartSheetMock: vi.fn(),
	useNavigateMock: vi.fn(),
}))

vi.mock('@/entities/cart', () => ({
	useCartLineItems: useCartLineItemsMock,
	useCart: useCartMock,
}))

vi.mock('@/shared/model', () => ({
	useCartSheet: useCartSheetMock,
}))

vi.mock('@tanstack/react-router', () => ({
	useNavigate: useNavigateMock,
}))

import { useCartSheetWidget } from './useCartSheetWidget'

describe('useCartSheetWidget', () => {
	test('returns mapped line item handlers', () => {
		const handleCartItemQuantityUpdate = vi.fn()
		const handleCartItemRemove = vi.fn()
		const handleCartSheetClose = vi.fn()
		const cartLineItems = [
			{
				item: {
					product: {
						id: 1,
						title: 'Test Product',
						price: 10,
						description: 'desc',
						category: 'electronics',
						image: '/product.jpg',
						rating: { rate: 4.2, count: 10 },
					},
					quantity: 2,
				},
				handleCartItemDecrease: vi.fn(),
				handleCartItemIncrease: vi.fn(),
				handleCartItemRemove: vi.fn(),
			},
		]

		useCartMock.mockReturnValue({
			items: [
				{
					product: {
						id: 1,
						title: 'Test Product',
						price: 10,
						description: 'desc',
						category: 'electronics',
						image: '/product.jpg',
						rating: { rate: 4.2, count: 10 },
					},
					quantity: 2,
				},
			],
			subtotal: 20,
			tax: 0,
			total: 20,
			handleCartItemQuantityUpdate,
			handleCartItemRemove,
		})

		useCartSheetMock.mockReturnValue({
			isOpen: true,
			handleCartSheetOpenChange: vi.fn(),
			handleCartSheetClose,
		})
		useCartLineItemsMock.mockReturnValue(cartLineItems)
		useNavigateMock.mockReturnValue(navigateMock)

		const { result } = renderHook(() => useCartSheetWidget())

		expect(result.current.cartItems).toHaveLength(1)
		result.current.cartItems[0]?.handleCartItemIncrease()
		result.current.cartItems[0]?.handleCartItemDecrease()
		result.current.cartItems[0]?.handleCartItemRemove()
		result.current.handleCartStartShopping()
		result.current.handleCartCheckoutNavigate()

		expect(useCartLineItemsMock).toHaveBeenCalledWith({
			handleCartItemQuantityUpdate,
			handleCartItemRemove,
			items: [
				{
					product: {
						id: 1,
						title: 'Test Product',
						price: 10,
						description: 'desc',
						category: 'electronics',
						image: '/product.jpg',
						rating: { rate: 4.2, count: 10 },
					},
					quantity: 2,
				},
			],
		})
		expect(handleCartSheetClose).toHaveBeenCalled()
		expect(navigateMock).toHaveBeenCalledWith({ to: '/checkout' })
	})
})
