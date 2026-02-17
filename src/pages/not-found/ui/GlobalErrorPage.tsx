import type { ErrorComponentProps } from '@tanstack/react-router'

import { Button } from '@/shared/ui'

import { GLOBAL_ERROR } from '../config/constants'

export function GlobalErrorPage({ reset }: ErrorComponentProps) {
	return (
		<div className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
			<h1 className="font-mono text-xl font-bold uppercase tracking-wider md:text-2xl">
				{GLOBAL_ERROR.TITLE}
			</h1>
			<p className="max-w-xl font-mono text-xs uppercase tracking-widest text-muted-foreground">
				{GLOBAL_ERROR.DESCRIPTION}
			</p>
			<Button
				type="button"
				onClick={reset}
				className="rounded-none font-mono text-[10px] uppercase tracking-widest"
			>
				{GLOBAL_ERROR.RETRY_LABEL}
			</Button>
		</div>
	)
}
