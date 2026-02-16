import type { ErrorComponentProps } from '@tanstack/react-router'

import { Button } from '@/shared/ui'

export function ProductDetailError({ reset }: ErrorComponentProps) {
	return (
		<div className="mx-auto flex min-h-[60dvh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
			<h2 className="font-mono text-lg font-bold uppercase tracking-widest">
				Product unavailable
			</h2>
			<p className="text-sm text-muted-foreground">
				We couldn't load this product right now. Please retry.
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
