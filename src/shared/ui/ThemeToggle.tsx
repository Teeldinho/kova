import { Moon, Sun } from '@phosphor-icons/react'
import { useHydrated } from '@tanstack/react-router'

import { THEME } from '../config/theme'
import { useTheme } from '../model/useTheme'
import { Button } from './button'

export function ThemeToggle() {
	const { isDarkMode, handleThemeToggle } = useTheme()
	const isHydrated = useHydrated()

	return (
		<Button
			type="button"
			variant="outline"
			size="icon"
			className="h-9 w-9 rounded-none"
			onClick={handleThemeToggle}
			aria-label={THEME.TOGGLE_ARIA_LABEL}
		>
			{isHydrated && isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
		</Button>
	)
}
