import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { navigateMock, useNavigateMock } = vi.hoisted(() => ({
	navigateMock: vi.fn(),
	useNavigateMock: vi.fn(),
}))

vi.mock('@tanstack/react-router', () => ({
	useNavigate: useNavigateMock,
}))

import { useNotFoundPage } from './useNotFoundPage'

describe('useNotFoundPage', () => {
	test('navigates back home', () => {
		useNavigateMock.mockReturnValue(navigateMock)

		const { result } = renderHook(() => useNotFoundPage())

		result.current.handleNotFoundBackHome()

		expect(navigateMock).toHaveBeenCalledWith({ to: '/' })
	})
})
