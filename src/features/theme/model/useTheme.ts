import { useEffect, useState } from 'react'

import { THEME, type Theme } from '../config/constants'

const isValidTheme = (value: string | null): value is Theme =>
	value === THEME.LIGHT || value === THEME.DARK

const getStoredTheme = (): Theme | null => {
	if (typeof window === 'undefined') {
		return null
	}

	const storedTheme = localStorage.getItem(THEME.STORAGE_KEY)

	return isValidTheme(storedTheme) ? storedTheme : null
}

const getSystemTheme = (): Theme => {
	if (typeof window === 'undefined') {
		return THEME.LIGHT
	}

	const prefersDark = window.matchMedia(THEME.MEDIA_QUERY).matches

	return prefersDark ? THEME.DARK : THEME.LIGHT
}

const resolveTheme = (): Theme => getStoredTheme() ?? getSystemTheme()

export function getInitialTheme(): Theme {
	return resolveTheme()
}

const getThemeFromDocument = (): Theme => {
	if (typeof document === 'undefined') return THEME.LIGHT

	return document.documentElement.classList.contains(THEME.DARK_CLASS)
		? THEME.DARK
		: THEME.LIGHT
}

const applyThemeClass = (theme: Theme) => {
	if (typeof document === 'undefined') return

	document.documentElement.classList.toggle(
		THEME.DARK_CLASS,
		theme === THEME.DARK,
	)
}

const persistTheme = (theme: Theme) => {
	if (typeof window === 'undefined') {
		return
	}

	localStorage.setItem(THEME.STORAGE_KEY, theme)
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(getThemeFromDocument)

	useEffect(() => {
		const syncTheme = (nextTheme: Theme) => {
			applyThemeClass(nextTheme)
			setTheme(nextTheme)
		}

		syncTheme(resolveTheme())

		const mediaQuery = window.matchMedia(THEME.MEDIA_QUERY)

		const handleSystemThemeChange = (event: MediaQueryListEvent) => {
			if (getStoredTheme()) {
				return
			}

			syncTheme(event.matches ? THEME.DARK : THEME.LIGHT)
		}

		const handleStorageChange = (event: StorageEvent) => {
			if (event.key !== THEME.STORAGE_KEY) {
				return
			}

			if (isValidTheme(event.newValue)) {
				syncTheme(event.newValue)
				return
			}

			syncTheme(getSystemTheme())
		}

		mediaQuery.addEventListener('change', handleSystemThemeChange)
		window.addEventListener('storage', handleStorageChange)

		return () => {
			mediaQuery.removeEventListener('change', handleSystemThemeChange)
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	const handleThemeToggle = () => {
		setTheme((currentTheme) => {
			const nextTheme = currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT

			applyThemeClass(nextTheme)
			persistTheme(nextTheme)
			return nextTheme
		})
	}

	return {
		theme,
		isDarkMode: theme === THEME.DARK,
		handleThemeToggle,
	}
}
