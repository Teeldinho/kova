import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { navigateMock, useCartMock, useCartLineItemsMock, useNavigateMock } =
	vi.hoisted(() => ({
		navigateMock: vi.fn(),
		useCartMock: vi.fn(),
		useCartLineItemsMock: vi.fn(),
		useNavigateMock: vi.fn(),
	}))

vi.mock('@/entities/cart', () => ({
	useCart: useCartMock,
	useCartLineItems: useCartLineItemsMock,
}))

vi.mock('@tanstack/react-router', () => ({
	useNavigate: useNavigateMock,
}))

import { useCartPage } from './useCartPage'

describe('useCartPage', () => {
	test('returns cart state and navigation handlers', () => {
		useCartMock.mockReturnValue({
			handleCartItemQuantityUpdate: vi.fn(),
			handleCartItemRemove: vi.fn(),
			isCartEmpty: false,
			items: [],
			subtotal: 10,
			tax: 0,
			total: 10,
		})
		useCartLineItemsMock.mockReturnValue([])
		useNavigateMock.mockReturnValue(navigateMock)

		const { result } = renderHook(() => useCartPage())

		result.current.handleCartCheckoutNavigate()
		result.current.handleCartContinueShopping()

		expect(navigateMock).toHaveBeenNthCalledWith(1, { to: '/checkout' })
		expect(navigateMock).toHaveBeenNthCalledWith(2, { to: '/' })
		expect(result.current.isCartEmpty).toBe(false)
		expect(result.current.total).toBe(10)
	})
})
