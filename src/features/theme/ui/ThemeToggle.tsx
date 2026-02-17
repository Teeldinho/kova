import { Moon, Sun } from '@phosphor-icons/react'

import { Button } from '@/shared/ui'

import { THEME } from '../config/constants'
import { useTheme } from '../model/useTheme'

export function ThemeToggle() {
	const { isDarkMode, handleThemeToggle } = useTheme()

	return (
		<Button
			type="button"
			variant="outline"
			size="icon"
			className="h-9 w-9 rounded-none"
			onClick={handleThemeToggle}
			aria-label={THEME.TOGGLE_ARIA_LABEL}
		>
			{isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
		</Button>
	)
}
