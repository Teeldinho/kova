import { useEffect, useState } from 'react'

import { THEME, type Theme } from '../config/theme'
import {
	applyThemeClass,
	getStoredTheme,
	getSystemTheme,
	getThemeFromDocument,
	isValidTheme,
	persistTheme,
	resolveNextTheme,
	resolveTheme,
	resolveThemeFromMediaMatch,
} from '../lib/themeState'

export function getInitialTheme(): Theme {
	return resolveTheme()
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

			syncTheme(resolveThemeFromMediaMatch(event.matches))
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
			const nextTheme = resolveNextTheme(currentTheme)

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
