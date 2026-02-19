import { act, renderHook } from '@testing-library/react'
import type { MouseEvent } from 'react'
import { describe, expect, test } from 'vitest'

import { useProductCardMotion } from './useProductCardMotion'

const createPointerEvent = () =>
	({
		clientX: 120,
		clientY: 80,
		currentTarget: {
			getBoundingClientRect: () =>
				({
					left: 20,
					top: 20,
					width: 200,
					height: 200,
				}) as DOMRect,
		},
	}) as unknown as MouseEvent<HTMLDivElement>

describe('useProductCardMotion', () => {
	test('returns style and pointer handlers when action layer is absent', () => {
		const { result } = renderHook(() =>
			useProductCardMotion({ hasActionNode: false }),
		)

		expect(result.current.cardStyle).toBeDefined()
		expect(result.current.cardStyle?.transformStyle).toBe('preserve-3d')

		act(() => {
			result.current.handleProductCardMouseMove(createPointerEvent())
			result.current.handleProductCardMouseLeave()
		})
	})

	test('returns no style and no-op handlers when action layer is present', () => {
		const { result } = renderHook(() =>
			useProductCardMotion({ hasActionNode: true }),
		)

		expect(result.current.cardStyle).toBeUndefined()

		act(() => {
			result.current.handleProductCardMouseMove(createPointerEvent())
			result.current.handleProductCardMouseLeave()
		})
	})
})
