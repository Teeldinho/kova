import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { navigateMock, useNavigateMock } = vi.hoisted(() => ({
	navigateMock: vi.fn(),
	useNavigateMock: vi.fn(),
}))

vi.mock('@tanstack/react-router', () => ({
	useNavigate: useNavigateMock,
}))

import { useCheckoutErrorPage } from './useCheckoutErrorPage'

describe('useCheckoutErrorPage', () => {
	test('exposes retry and home navigation handlers', () => {
		useNavigateMock.mockReturnValue(navigateMock)

		const { result } = renderHook(() =>
			useCheckoutErrorPage({ reason: 'payment_canceled' }),
		)

		result.current.handleCheckoutErrorRetry()
		result.current.handleCheckoutErrorHome()

		expect(result.current.errorReason).toBe(
			'Payment was canceled before completion.',
		)
		expect(navigateMock).toHaveBeenNthCalledWith(1, { to: '/checkout' })
		expect(navigateMock).toHaveBeenNthCalledWith(2, { to: '/' })
	})

	test('falls back to unknown reason when reason is not recognized', () => {
		useNavigateMock.mockReturnValue(navigateMock)

		const { result } = renderHook(() =>
			useCheckoutErrorPage({ reason: 'gateway_down' }),
		)

		expect(result.current.errorReason).toBe(
			'No reason provided by the payment provider.',
		)
	})
})
