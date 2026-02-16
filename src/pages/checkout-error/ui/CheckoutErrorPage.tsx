import { WarningCircle } from '@phosphor-icons/react'

import { Button } from '@/shared/ui'

import { CHECKOUT_ERROR } from '../config/constants'
import { useCheckoutErrorPage } from '../model/useCheckoutErrorPage'

interface CheckoutErrorPageProps {
	reason?: string
}

export function CheckoutErrorPage({ reason }: CheckoutErrorPageProps) {
	const { errorReason, handleCheckoutErrorHome, handleCheckoutErrorRetry } =
		useCheckoutErrorPage({ reason })

	return (
		<div className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
			<WarningCircle size={56} weight="duotone" className="text-destructive" />
			<h1 className="font-mono text-xl font-bold uppercase tracking-wider md:text-2xl">
				{CHECKOUT_ERROR.TITLE}
			</h1>
			<p className="max-w-xl font-mono text-xs uppercase tracking-widest text-muted-foreground">
				{CHECKOUT_ERROR.DESCRIPTION}
			</p>
			<div className="w-full max-w-xl border border-border bg-card p-4 text-left">
				<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
					{CHECKOUT_ERROR.REASON_LABEL}
				</p>
				<p className="mt-2 font-mono text-xs uppercase tracking-widest">
					{errorReason}
				</p>
			</div>
			<div className="flex w-full max-w-xl flex-col gap-3 md:flex-row">
				<Button
					type="button"
					onClick={handleCheckoutErrorRetry}
					className="h-11 flex-1 rounded-none font-mono text-[10px] uppercase tracking-widest"
				>
					{CHECKOUT_ERROR.RETRY_LABEL}
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={handleCheckoutErrorHome}
					className="h-11 flex-1 rounded-none font-mono text-[10px] uppercase tracking-widest"
				>
					{CHECKOUT_ERROR.HOME_LABEL}
				</Button>
			</div>
		</div>
	)
}
