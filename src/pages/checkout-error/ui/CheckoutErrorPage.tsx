import { Button } from '@/shared/ui'

import { CHECKOUT_ERROR } from '../config/constants'
import { useCheckoutErrorPage } from '../model/useCheckoutErrorPage'

export function CheckoutErrorPage() {
	const { handleCheckoutErrorBack } = useCheckoutErrorPage()

	return (
		<div className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
			<h1 className="font-mono text-xl font-bold uppercase tracking-wider md:text-2xl">
				{CHECKOUT_ERROR.TITLE}
			</h1>
			<p className="max-w-xl font-mono text-xs uppercase tracking-widest text-muted-foreground">
				{CHECKOUT_ERROR.DESCRIPTION}
			</p>
			<Button
				type="button"
				onClick={handleCheckoutErrorBack}
				className="rounded-none font-mono text-[10px] uppercase tracking-widest"
			>
				{CHECKOUT_ERROR.BACK_LABEL}
			</Button>
		</div>
	)
}
