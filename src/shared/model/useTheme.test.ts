import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { THEME } from '../config/theme'
import { getInitialTheme, useTheme } from './useTheme'

let mediaQueryMatches = false
let mediaQueryChangeHandler: ((event: MediaQueryListEvent) => void) | null =
	null

const emitSystemThemeChange = () => {
	mediaQueryChangeHandler?.({
		matches: mediaQueryMatches,
	} as MediaQueryListEvent)
}

const mockMatchMedia = (matches: boolean) => {
	mediaQueryMatches = matches
	mediaQueryChangeHandler = null

	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			get matches() {
				return mediaQueryMatches
			},
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(
				(eventName: string, handler: (event: MediaQueryListEvent) => void) => {
					if (eventName !== 'change') {
						return
					}

					mediaQueryChangeHandler = handler
				},
			),
			removeEventListener: vi.fn(
				(eventName: string, handler: (event: MediaQueryListEvent) => void) => {
					if (eventName !== 'change') {
						return
					}

					if (mediaQueryChangeHandler === handler) {
						mediaQueryChangeHandler = null
					}
				},
			),
			dispatchEvent: vi.fn(),
		})),
	})
}

beforeEach(() => {
	localStorage.clear()
	document.documentElement.classList.remove(THEME.DARK_CLASS)
	mockMatchMedia(false)
})

afterEach(() => {
	vi.restoreAllMocks()
})

describe('getInitialTheme', () => {
	test('returns stored theme from localStorage when available', () => {
		localStorage.setItem(THEME.STORAGE_KEY, THEME.DARK)
		expect(getInitialTheme()).toBe(THEME.DARK)
	})

	test('returns dark when OS prefers dark and no stored value', () => {
		mockMatchMedia(true)
		expect(getInitialTheme()).toBe(THEME.DARK)
	})

	test('returns light when OS prefers light and no stored value', () => {
		mockMatchMedia(false)
		expect(getInitialTheme()).toBe(THEME.LIGHT)
	})

	test('ignores invalid stored values', () => {
		localStorage.setItem(THEME.STORAGE_KEY, 'invalid-theme')
		mockMatchMedia(false)
		expect(getInitialTheme()).toBe(THEME.LIGHT)
	})
})

describe('useTheme', () => {
	test('syncs state with stored dark theme on mount', async () => {
		localStorage.setItem(THEME.STORAGE_KEY, THEME.DARK)
		document.documentElement.classList.remove(THEME.DARK_CLASS)

		const { result } = renderHook(() => useTheme())

		await waitFor(() => {
			expect(result.current.theme).toBe(THEME.DARK)
		})

		expect(document.documentElement.classList.contains(THEME.DARK_CLASS)).toBe(
			true,
		)
	})

	test('returns current theme and toggle handler', () => {
		const { result } = renderHook(() => useTheme())

		expect(result.current.theme).toBe(THEME.LIGHT)
		expect(result.current.isDarkMode).toBe(false)
		expect(result.current.handleThemeToggle).toBeTypeOf('function')
	})

	test('toggles from light to dark', () => {
		const { result } = renderHook(() => useTheme())

		act(() => {
			result.current.handleThemeToggle()
		})

		expect(document.documentElement.classList.contains(THEME.DARK_CLASS)).toBe(
			true,
		)
		expect(localStorage.getItem(THEME.STORAGE_KEY)).toBe(THEME.DARK)
	})

	test('toggles from dark to light', () => {
		localStorage.setItem(THEME.STORAGE_KEY, THEME.DARK)
		document.documentElement.classList.add(THEME.DARK_CLASS)

		const { result } = renderHook(() => useTheme())

		act(() => {
			result.current.handleThemeToggle()
		})

		expect(document.documentElement.classList.contains(THEME.DARK_CLASS)).toBe(
			false,
		)
		expect(localStorage.getItem(THEME.STORAGE_KEY)).toBe(THEME.LIGHT)
	})

	test('syncs theme across tabs when storage changes', () => {
		const { result } = renderHook(() => useTheme())

		act(() => {
			window.dispatchEvent(
				new StorageEvent('storage', {
					key: THEME.STORAGE_KEY,
					newValue: THEME.DARK,
				}),
			)
		})

		expect(result.current.theme).toBe(THEME.DARK)
		expect(document.documentElement.classList.contains(THEME.DARK_CLASS)).toBe(
			true,
		)
	})

	test('follows system theme changes when no stored preference exists', () => {
		const { result } = renderHook(() => useTheme())

		act(() => {
			mediaQueryMatches = true
			emitSystemThemeChange()
		})

		expect(result.current.theme).toBe(THEME.DARK)
		expect(localStorage.getItem(THEME.STORAGE_KEY)).toBeNull()
	})

	test('ignores system theme changes when preference is stored', () => {
		localStorage.setItem(THEME.STORAGE_KEY, THEME.LIGHT)

		const { result } = renderHook(() => useTheme())

		act(() => {
			mediaQueryMatches = true
			emitSystemThemeChange()
		})

		expect(result.current.theme).toBe(THEME.LIGHT)
		expect(document.documentElement.classList.contains(THEME.DARK_CLASS)).toBe(
			false,
		)
	})
})
