import { THEME, type Theme } from '../config/constants'

export const isValidTheme = (value: string | null): value is Theme =>
	value === THEME.LIGHT || value === THEME.DARK

export const resolveThemeFromMediaMatch = (matches: boolean): Theme =>
	matches ? THEME.DARK : THEME.LIGHT

export const getStoredTheme = (): Theme | null => {
	if (typeof window === 'undefined') {
		return null
	}

	try {
		if (typeof localStorage.getItem !== 'function') {
			return null
		}

		const storedTheme = localStorage.getItem(THEME.STORAGE_KEY)

		return isValidTheme(storedTheme) ? storedTheme : null
	} catch {
		return null
	}
}

export const getSystemTheme = (): Theme => {
	if (typeof window === 'undefined') {
		return THEME.LIGHT
	}

	return resolveThemeFromMediaMatch(
		window.matchMedia(THEME.MEDIA_QUERY).matches,
	)
}

export const resolveTheme = (): Theme => getStoredTheme() ?? getSystemTheme()

export const getThemeFromDocument = (): Theme => {
	if (typeof document === 'undefined') {
		return THEME.LIGHT
	}

	return document.documentElement.classList.contains(THEME.DARK_CLASS)
		? THEME.DARK
		: THEME.LIGHT
}

export const applyThemeClass = (theme: Theme): void => {
	if (typeof document === 'undefined') {
		return
	}

	document.documentElement.classList.toggle(
		THEME.DARK_CLASS,
		theme === THEME.DARK,
	)
}

export const persistTheme = (theme: Theme): void => {
	if (typeof window === 'undefined') {
		return
	}

	try {
		if (typeof localStorage.setItem !== 'function') {
			return
		}

		localStorage.setItem(THEME.STORAGE_KEY, theme)
	} catch {
		// Storage can be unavailable in restricted environments.
	}
}

export const resolveNextTheme = (currentTheme: Theme): Theme =>
	currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
