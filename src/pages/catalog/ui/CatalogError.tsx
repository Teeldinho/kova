import type { ErrorComponentProps } from '@tanstack/react-router'

import { Button } from '@/shared/ui'

import { CATALOG_ERROR } from '../config/constants'

export function CatalogError({ reset }: ErrorComponentProps) {
	return (
		<div className="mx-auto flex min-h-[50dvh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
			<h2 className="font-mono text-lg font-bold uppercase tracking-widest">
				{CATALOG_ERROR.TITLE}
			</h2>
			<p className="font-sans text-sm text-muted-foreground">
				{CATALOG_ERROR.DESCRIPTION}
			</p>
			<Button
				type="button"
				onClick={reset}
				className="rounded-none font-mono text-[10px] uppercase tracking-widest"
			>
				{CATALOG_ERROR.RETRY_LABEL}
			</Button>
		</div>
	)
}
