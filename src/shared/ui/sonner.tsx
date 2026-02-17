import {
	Alert02Icon,
	CheckmarkCircle02Icon,
	InformationCircleIcon,
	Loading03Icon,
	MultiplicationSignCircleIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { type CSSProperties, useEffect, useState } from 'react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

function Toaster(props: ToasterProps) {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		const updateTheme = () => {
			const isDarkModeEnabled =
				document.documentElement.classList.contains('dark')
			setTheme(isDarkModeEnabled ? 'dark' : 'light')
		}

		updateTheme()

		const observer = new MutationObserver(updateTheme)
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		})

		return () => {
			observer.disconnect()
		}
	}, [])

	return (
		<Sonner
			theme={theme}
			className="toaster group"
			icons={{
				success: (
					<HugeiconsIcon
						icon={CheckmarkCircle02Icon}
						strokeWidth={2}
						className="size-4"
					/>
				),
				info: (
					<HugeiconsIcon
						icon={InformationCircleIcon}
						strokeWidth={2}
						className="size-4"
					/>
				),
				warning: (
					<HugeiconsIcon
						icon={Alert02Icon}
						strokeWidth={2}
						className="size-4"
					/>
				),
				error: (
					<HugeiconsIcon
						icon={MultiplicationSignCircleIcon}
						strokeWidth={2}
						className="size-4"
					/>
				),
				loading: (
					<HugeiconsIcon
						icon={Loading03Icon}
						strokeWidth={2}
						className="size-4 animate-spin"
					/>
				),
			}}
			style={
				{
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--border)',
					'--border-radius': 'var(--radius)',
				} as CSSProperties
			}
			toastOptions={{
				classNames: {
					toast:
						'border border-border bg-popover text-popover-foreground shadow-none font-mono text-xs',
					title: 'text-xs font-semibold tracking-wide',
					description: 'text-xs text-muted-foreground',
					actionButton:
						'bg-primary text-primary-foreground rounded-none font-mono text-[10px] uppercase tracking-widest',
					cancelButton:
						'bg-secondary text-secondary-foreground rounded-none font-mono text-[10px] uppercase tracking-widest',
				},
			}}
			{...props}
		/>
	)
}

export { Toaster }
