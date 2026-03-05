import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const { clearCartMock, navigateMock, toastSuccessMock, useNavigateMock } =
	vi.hoisted(() => ({
		clearCartMock: vi.fn(),
		navigateMock: vi.fn(),
		toastSuccessMock: vi.fn(),
		useNavigateMock: vi.fn(),
	}))

vi.mock('@/entities/cart', () => ({
	clearCart: clearCartMock,
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
	clearCartMock.mockReset()
	navigateMock.mockReset()
	toastSuccessMock.mockReset()
	useNavigateMock.mockReset()
})

describe('useCheckoutSuccessPage', () => {
	test('clears cart and exposes continue handler', () => {
		useNavigateMock.mockReturnValue(navigateMock)

		const { result } = renderHook(() =>
			useCheckoutSuccessPage({ sessionId: 'cs_test_1234567890' }),
		)

		result.current.handleCheckoutSuccessContinue()

		expect(clearCartMock).toHaveBeenCalled()
		expect(toastSuccessMock).toHaveBeenCalledWith('Order confirmed', {
			id: 'checkout-success-order-confirmed',
		})
		expect(result.current.orderDetails).toEqual([
			{ label: 'Order ID', value: 'ORD-34567890' },
			{ label: 'Status', value: 'Confirmed' },
			{ label: 'Estimated Delivery', value: '3-5 business days' },
		])
		expect(navigateMock).toHaveBeenCalledWith({ to: '/' })
	})

	test('does not clear cart when session id is missing', () => {
		useNavigateMock.mockReturnValue(navigateMock)

		renderHook(() => useCheckoutSuccessPage({ sessionId: undefined }))

		expect(clearCartMock).not.toHaveBeenCalled()
		expect(toastSuccessMock).not.toHaveBeenCalled()
	})

	test('handles rerender with same session id without duplicate side effects', () => {
		useNavigateMock.mockReturnValue(navigateMock)

		const { rerender } = renderHook(
			({ sessionId }: { sessionId: string }) =>
				useCheckoutSuccessPage({ sessionId }),
			{
				initialProps: { sessionId: 'cs_test_1234567890' },
			},
		)

		rerender({ sessionId: 'cs_test_1234567890' })

		expect(clearCartMock).toHaveBeenCalledTimes(1)
		expect(toastSuccessMock).toHaveBeenCalledTimes(1)
	})
})
