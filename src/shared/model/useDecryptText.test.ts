import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { useDecryptText } from './useDecryptText'

describe('useDecryptText', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
		vi.restoreAllMocks()
	})

	test('decrypts the masked text after the configured delay', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0)

		const { result } = renderHook(() =>
			useDecryptText({ text: 'AB', delay: 50 }),
		)

		expect(result.current).toBe('AA')

		act(() => {
			vi.advanceTimersByTime(49)
		})

		expect(result.current).toBe('AA')

		act(() => {
			vi.advanceTimersByTime(2_000)
		})

		expect(result.current).toBe('AB')
	})

	test('restarts masking when text changes', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0)

		const { result, rerender } = renderHook(
			({ text }) => useDecryptText({ text, delay: 0 }),
			{
				initialProps: {
					text: 'AB',
				},
			},
		)

		act(() => {
			vi.advanceTimersByTime(2_000)
		})

		expect(result.current).toBe('AB')

		act(() => {
			rerender({ text: 'CD' })
		})

		expect(result.current).toBe('AA')
	})
})
