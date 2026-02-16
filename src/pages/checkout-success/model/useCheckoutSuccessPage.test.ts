import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { handleCartClearMock, navigateMock, useCartMock, useNavigateMock } =
	vi.hoisted(() => ({
		handleCartClearMock: vi.fn(),
		navigateMock: vi.fn(),
		useCartMock: vi.fn(),
		useNavigateMock: vi.fn(),
	}))

vi.mock('@/entities/cart', () => ({
	useCart: useCartMock,
}))

vi.mock('@tanstack/react-router', () => ({
	useNavigate: useNavigateMock,
}))

import { useCheckoutSuccessPage } from './useCheckoutSuccessPage'

describe('useCheckoutSuccessPage', () => {
	test('clears cart and exposes continue handler', () => {
		useCartMock.mockReturnValue({
			handleCartClear: handleCartClearMock,
		})
		useNavigateMock.mockReturnValue(navigateMock)

		const { result } = renderHook(() =>
			useCheckoutSuccessPage({ sessionId: 'cs_test_1234567890' }),
		)

		result.current.handleCheckoutSuccessContinue()

		expect(handleCartClearMock).toHaveBeenCalled()
		expect(result.current.orderDetails).toEqual([
			{ label: 'Order ID', value: 'ORD-34567890' },
			{ label: 'Status', value: 'Confirmed' },
			{ label: 'Estimated Delivery', value: '3-5 business days' },
		])
		expect(navigateMock).toHaveBeenCalledWith({ to: '/' })
	})
})
