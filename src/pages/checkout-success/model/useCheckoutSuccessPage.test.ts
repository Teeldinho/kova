import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const {
	handleCartClearMock,
	navigateMock,
	toastSuccessMock,
	useCartMock,
	useNavigateMock,
} = vi.hoisted(() => ({
	handleCartClearMock: vi.fn(),
	navigateMock: vi.fn(),
	toastSuccessMock: vi.fn(),
	useCartMock: vi.fn(),
	useNavigateMock: vi.fn(),
}))

vi.mock('@/entities/cart', () => ({
	useCart: useCartMock,
}))

vi.mock('@tanstack/react-router', () => ({
	useNavigate: useNavigateMock,
}))

vi.mock('sonner', () => ({
	toast: {
		success: toastSuccessMock,
	},
}))

import { useCheckoutSuccessPage } from './useCheckoutSuccessPage'

beforeEach(() => {
	handleCartClearMock.mockReset()
	navigateMock.mockReset()
	toastSuccessMock.mockReset()
	useCartMock.mockReset()
	useNavigateMock.mockReset()
})

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
		expect(toastSuccessMock).toHaveBeenCalledWith('Order confirmed')
		expect(result.current.orderDetails).toEqual([
			{ label: 'Order ID', value: 'ORD-34567890' },
			{ label: 'Status', value: 'Confirmed' },
			{ label: 'Estimated Delivery', value: '3-5 business days' },
		])
		expect(navigateMock).toHaveBeenCalledWith({ to: '/' })
	})

	test('does not clear cart when session id is missing', () => {
		useCartMock.mockReturnValue({
			handleCartClear: handleCartClearMock,
		})
		useNavigateMock.mockReturnValue(navigateMock)

		renderHook(() => useCheckoutSuccessPage({ sessionId: undefined }))

		expect(handleCartClearMock).not.toHaveBeenCalled()
		expect(toastSuccessMock).not.toHaveBeenCalled()
	})
})
