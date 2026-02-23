import { act, renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { useCustomCursor } from './useCustomCursor'

describe('useCustomCursor', () => {
	test('tracks cursor position and interactive hover state', () => {
		const { result } = renderHook(() => useCustomCursor())

		expect(result.current.cursorX.get()).toBe(0)
		expect(result.current.cursorY.get()).toBe(0)
		expect(result.current.isHovering).toBe(false)
		expect(result.current.isVisible).toBe(false)

		act(() => {
			window.dispatchEvent(
				new MouseEvent('mousemove', {
					bubbles: true,
					clientX: 40,
					clientY: 52,
				}),
			)
		})

		expect(result.current.cursorX.get()).toBe(24)
		expect(result.current.cursorY.get()).toBe(36)
		expect(result.current.isVisible).toBe(true)

		const interactiveButton = document.createElement('button')
		document.body.append(interactiveButton)

		act(() => {
			interactiveButton.dispatchEvent(
				new MouseEvent('mouseover', {
					bubbles: true,
				}),
			)
		})

		expect(result.current.isHovering).toBe(true)

		const nonInteractiveElement = document.createElement('div')
		document.body.append(nonInteractiveElement)

		act(() => {
			nonInteractiveElement.dispatchEvent(
				new MouseEvent('mouseover', {
					bubbles: true,
				}),
			)
		})

		expect(result.current.isHovering).toBe(false)

		act(() => {
			document.dispatchEvent(new MouseEvent('mouseleave'))
		})

		expect(result.current.isVisible).toBe(false)

		interactiveButton.remove()
		nonInteractiveElement.remove()
	})
})
