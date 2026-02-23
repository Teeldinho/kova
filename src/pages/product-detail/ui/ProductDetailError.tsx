import type { ErrorComponentProps } from '@tanstack/react-router'

import { Button } from '@/shared/ui'

import { PRODUCT_DETAIL_ERROR } from '../config/constants'

export function ProductDetailError({ reset }: ErrorComponentProps) {
	return (
		<div className="mx-auto flex min-h-[60dvh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
			<h2 className="font-mono text-lg font-bold uppercase tracking-widest">
				{PRODUCT_DETAIL_ERROR.TITLE}
			</h2>
			<p className="text-sm text-muted-foreground">
				{PRODUCT_DETAIL_ERROR.DESCRIPTION}
			</p>
			<Button
				type="button"
				onClick={reset}
				className="rounded-none font-mono text-[10px] uppercase tracking-widest"
			>
				{PRODUCT_DETAIL_ERROR.RETRY_LABEL}
			</Button>
		</div>
	)
}
