import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { destroyMock, lenisConstructorMock } = vi.hoisted(() => ({
	destroyMock: vi.fn(),
	lenisConstructorMock: vi.fn(),
}))

vi.mock('lenis', () => ({
	default: vi.fn().mockImplementation((...args) => {
		lenisConstructorMock(...args)

		return {
			destroy: destroyMock,
		}
	}),
}))

import { useLenis } from './useLenis'

describe('useLenis', () => {
	test('creates and destroys lenis instance', () => {
		const { unmount } = renderHook(() => useLenis())

		expect(lenisConstructorMock).toHaveBeenCalledWith({
			autoRaf: true,
			wheelMultiplier: 1.2,
		})

		unmount()

		expect(destroyMock).toHaveBeenCalled()
	})
})
