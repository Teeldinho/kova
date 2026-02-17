export const THEME = {
	STORAGE_KEY: 'kova-theme',
	DARK_CLASS: 'dark',
	LIGHT: 'light',
	DARK: 'dark',
	TOGGLE_ARIA_LABEL: 'Toggle theme',
} as const

export type Theme = typeof THEME.LIGHT | typeof THEME.DARK
