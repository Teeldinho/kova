import { act, renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { useImageLoadState } from './useImageLoadState'

describe('useImageLoadState', () => {
	test('tracks load state and resets on source change', () => {
		const { result, rerender } = renderHook(
			({ src }) => useImageLoadState(src),
			{
				initialProps: {
					src: '/one.webp',
				},
			},
		)

		expect(result.current.isImageLoaded).toBe(false)

		act(() => {
			result.current.handleImageLoad()
		})

		expect(result.current.isImageLoaded).toBe(true)

		rerender({ src: '/two.webp' })

		expect(result.current.isImageLoaded).toBe(false)
	})

	test('marks image as completed when error occurs', () => {
		const { result } = renderHook(() => useImageLoadState('/missing.webp'))

		act(() => {
			result.current.handleImageError()
		})

		expect(result.current.isImageLoaded).toBe(true)
	})
})
