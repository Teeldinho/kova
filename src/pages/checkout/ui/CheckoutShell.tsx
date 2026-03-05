import type { ReactNode } from 'react'

interface CheckoutShellProps {
	children: ReactNode
	header: ReactNode
}

interface CheckoutShellContentProps {
	aside: ReactNode
	main: ReactNode
}

export function CheckoutShell({ children, header }: CheckoutShellProps) {
	return (
		<div className="relative mx-auto max-w-7xl px-4 pt-32 pb-12 md:px-6 md:pt-40 md:pb-20">
			<div className="specimen-grid pointer-events-none absolute inset-0 opacity-5" />

			<header className="mb-16 space-y-6 border-b border-border pb-12">
				{header}
			</header>

			{children}
		</div>
	)
}

export function CheckoutShellContent({
	aside,
	main,
}: CheckoutShellContentProps) {
	return (
		<div className="grid gap-20 lg:grid-cols-[1fr_420px]">
			<div className="min-w-0 space-y-16">{main}</div>

			<aside className="min-w-0 space-y-10 lg:sticky lg:top-32">{aside}</aside>
		</div>
	)
}
