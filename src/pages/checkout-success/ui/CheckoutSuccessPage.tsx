import { Button } from '@/shared/ui'

import { CHECKOUT_SUCCESS } from '../config/constants'
import { useCheckoutSuccessPage } from '../model/useCheckoutSuccessPage'

interface CheckoutSuccessPageProps {
	sessionId?: string
}

export function CheckoutSuccessPage({ sessionId }: CheckoutSuccessPageProps) {
	const { handleCheckoutSuccessContinue, sessionReference } =
		useCheckoutSuccessPage({ sessionId })

	return (
		<div className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
			<h1 className="font-mono text-xl font-bold uppercase tracking-wider md:text-2xl">
				{CHECKOUT_SUCCESS.TITLE}
			</h1>
			<p className="max-w-xl font-mono text-xs uppercase tracking-widest text-muted-foreground">
				{CHECKOUT_SUCCESS.DESCRIPTION}
			</p>
			{sessionReference ? (
				<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
					{CHECKOUT_SUCCESS.REFERENCE_PREFIX} {sessionReference}
				</p>
			) : null}
			<Button
				type="button"
				onClick={handleCheckoutSuccessContinue}
				className="rounded-none font-mono text-[10px] uppercase tracking-widest"
			>
				{CHECKOUT_SUCCESS.CONTINUE_LABEL}
			</Button>
		</div>
	)
}
