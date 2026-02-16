import type { ErrorComponentProps } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'

export function CatalogError({ reset }: ErrorComponentProps) {
	const handleCatalogRetry = () => {
		reset()
	}

	return (
		<div className="mx-auto flex min-h-[50dvh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
			<h2 className="font-mono text-lg font-bold uppercase tracking-widest">
				Unable to load catalog
			</h2>
			<p className="font-sans text-sm text-muted-foreground">
				We could not load products right now. Please try again.
			</p>
			<Button
				type="button"
				onClick={handleCatalogRetry}
				className="rounded-none font-mono text-[10px] uppercase tracking-widest"
			>
				Retry
			</Button>
		</div>
	)
}
