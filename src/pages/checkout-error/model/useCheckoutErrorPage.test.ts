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
	test('navigates back to cart', () => {
		useNavigateMock.mockReturnValue(navigateMock)

		const { result } = renderHook(() => useCheckoutErrorPage())

		result.current.handleCheckoutErrorBack()

		expect(navigateMock).toHaveBeenCalledWith({ to: '/cart' })
	})
})
