import { useEffect, useState } from 'react'

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

const getThemeFromDocument = (): Theme => {
	if (typeof document === 'undefined') return THEME.LIGHT

	return document.documentElement.classList.contains(THEME.DARK_CLASS)
		? THEME.DARK
		: THEME.LIGHT
}

const applyTheme = (theme: Theme) => {
	if (typeof document === 'undefined') return

	document.documentElement.classList.toggle(
		THEME.DARK_CLASS,
		theme === THEME.DARK,
	)

	localStorage.setItem(THEME.STORAGE_KEY, theme)
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(getThemeFromDocument)

	useEffect(() => {
		const initialTheme = getInitialTheme()
		applyTheme(initialTheme)
		setTheme(initialTheme)
	}, [])

	const handleThemeToggle = () => {
		setTheme((currentTheme) => {
			const nextTheme = currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT

			applyTheme(nextTheme)
			return nextTheme
		})
	}

	return {
		theme,
		isDarkMode: theme === THEME.DARK,
		handleThemeToggle,
	}
}
