import { useState } from 'react'

import { THEME, type Theme } from '../config/constants'

const isValidTheme = (value: string | null): value is Theme =>
	value === THEME.LIGHT || value === THEME.DARK

export function getInitialTheme(): Theme {
	if (typeof window === 'undefined') return THEME.LIGHT

	const stored = localStorage.getItem(THEME.STORAGE_KEY)
	if (isValidTheme(stored)) return stored

	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
	return prefersDark ? THEME.DARK : THEME.LIGHT
}

const applyTheme = (theme: Theme) => {
	if (typeof document === 'undefined') return

	if (theme === THEME.DARK) {
		document.documentElement.classList.add(THEME.DARK_CLASS)
	} else {
		document.documentElement.classList.remove(THEME.DARK_CLASS)
	}

	localStorage.setItem(THEME.STORAGE_KEY, theme)
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(getInitialTheme)

	const handleThemeToggle = () => {
		const nextTheme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
		setTheme(nextTheme)
		applyTheme(nextTheme)
	}

	return {
		theme,
		isDarkMode: theme === THEME.DARK,
		handleThemeToggle,
	}
}
