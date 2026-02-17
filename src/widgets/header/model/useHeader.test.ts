import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { handleCartSheetOpenMock, useCartMock, useCartSheetMock } = vi.hoisted(
	() => ({
		handleCartSheetOpenMock: vi.fn(),
		useCartMock: vi.fn(),
		useCartSheetMock: vi.fn(),
	}),
)

vi.mock('@/entities/cart', () => ({
	useCart: useCartMock,
}))

vi.mock('@/shared/model', () => ({
	useCartSheet: useCartSheetMock,
}))

import { useHeader } from './useHeader'

describe('useHeader', () => {
	test('returns navigation and cart count with open handler', () => {
		useCartMock.mockReturnValue({ itemCount: 3 })
		useCartSheetMock.mockReturnValue({
			handleCartSheetOpen: handleCartSheetOpenMock,
		})

		const { result } = renderHook(() => useHeader())

		result.current.handleHeaderCartOpen()

		expect(result.current.navigation).toHaveLength(1)
		expect(result.current.navigation[0]?.label).toBe('Shop')
		expect(result.current.itemCount).toBe(3)
		expect(handleCartSheetOpenMock).toHaveBeenCalled()
	})
})
