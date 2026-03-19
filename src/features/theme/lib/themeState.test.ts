import { beforeEach, describe, expect, test, vi } from 'vitest'

import { THEME } from '../config/constants'
import {
	getStoredTheme,
	isValidTheme,
	persistTheme,
	resolveNextTheme,
	resolveThemeFromMediaMatch,
} from './themeState'

beforeEach(() => {
	localStorage.clear()

	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockImplementation(() => ({
			matches: false,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		})),
	})
})

describe('isValidTheme', () => {
	test('returns true for known theme values', () => {
		expect(isValidTheme(THEME.DARK)).toBe(true)
		expect(isValidTheme(THEME.LIGHT)).toBe(true)
	})

	test('returns false for unknown theme value', () => {
		expect(isValidTheme('unknown')).toBe(false)
	})
})

describe('getStoredTheme', () => {
	test('returns stored theme when valid', () => {
		localStorage.setItem(THEME.STORAGE_KEY, THEME.DARK)

		expect(getStoredTheme()).toBe(THEME.DARK)
	})

	test('returns null for invalid stored theme', () => {
		localStorage.setItem(THEME.STORAGE_KEY, 'broken')

		expect(getStoredTheme()).toBeNull()
	})
})

describe('resolveThemeFromMediaMatch', () => {
	test('maps matchMedia boolean to theme value', () => {
		expect(resolveThemeFromMediaMatch(true)).toBe(THEME.DARK)
		expect(resolveThemeFromMediaMatch(false)).toBe(THEME.LIGHT)
	})
})

describe('resolveNextTheme', () => {
	test('toggles to opposite theme', () => {
		expect(resolveNextTheme(THEME.LIGHT)).toBe(THEME.DARK)
		expect(resolveNextTheme(THEME.DARK)).toBe(THEME.LIGHT)
	})
})

describe('storage safety', () => {
	test('returns null when localStorage API is unavailable', () => {
		const originalLocalStorage = globalThis.localStorage

		Object.defineProperty(globalThis, 'localStorage', {
			configurable: true,
			writable: true,
			value: {},
		})

		try {
			expect(getStoredTheme()).toBeNull()
		} finally {
			Object.defineProperty(globalThis, 'localStorage', {
				configurable: true,
				writable: true,
				value: originalLocalStorage,
			})
		}
	})

	test('does not throw when localStorage API is unavailable', () => {
		const originalLocalStorage = globalThis.localStorage

		Object.defineProperty(globalThis, 'localStorage', {
			configurable: true,
			writable: true,
			value: {},
		})

		try {
			expect(() => persistTheme(THEME.DARK)).not.toThrow()
		} finally {
			Object.defineProperty(globalThis, 'localStorage', {
				configurable: true,
				writable: true,
				value: originalLocalStorage,
			})
		}
	})
})
