import { act, renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { useCartSheet } from './useCartSheet'

describe('useCartSheet', () => {
	test('opens and closes cart sheet state', () => {
		const { result } = renderHook(() => useCartSheet())

		expect(result.current.isOpen).toBe(false)

		act(() => {
			result.current.handleCartSheetOpen()
		})

		expect(result.current.isOpen).toBe(true)

		act(() => {
			result.current.handleCartSheetOpenChange(false)
		})

		expect(result.current.isOpen).toBe(false)
	})
})
