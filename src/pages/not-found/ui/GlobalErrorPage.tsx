import type { ErrorComponentProps } from '@tanstack/react-router'

import { Button } from '@/shared/ui'

export function GlobalErrorPage({ reset }: ErrorComponentProps) {
	return (
		<div className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
			<h1 className="font-mono text-xl font-bold uppercase tracking-wider md:text-2xl">
				Unexpected Error
			</h1>
			<p className="max-w-xl font-mono text-xs uppercase tracking-widest text-muted-foreground">
				Something went wrong while rendering this page.
			</p>
			<Button
				type="button"
				onClick={reset}
				className="rounded-none font-mono text-[10px] uppercase tracking-widest"
			>
				Retry
			</Button>
		</div>
	)
}
