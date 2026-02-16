import { CheckCircle } from '@phosphor-icons/react'

import { Button } from '@/shared/ui'

import { CHECKOUT_SUCCESS } from '../config/constants'
import { useCheckoutSuccessPage } from '../model/useCheckoutSuccessPage'

interface CheckoutSuccessPageProps {
	sessionId?: string
}

export function CheckoutSuccessPage({ sessionId }: CheckoutSuccessPageProps) {
	const { handleCheckoutSuccessContinue, orderDetails } =
		useCheckoutSuccessPage({ sessionId })

	return (
		<div className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
			<CheckCircle size={56} weight="duotone" className="text-primary" />
			<h1 className="font-mono text-xl font-bold uppercase tracking-wider md:text-2xl">
				{CHECKOUT_SUCCESS.TITLE}
			</h1>
			<p className="max-w-xl font-mono text-xs uppercase tracking-widest text-muted-foreground">
				{CHECKOUT_SUCCESS.DESCRIPTION}
			</p>
			<dl className="w-full max-w-sm space-y-2 border border-border bg-card p-4 text-left">
				{orderDetails.map((detail) => (
					<div key={detail.label} className="grid grid-cols-[120px_1fr] gap-2">
						<dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
							{detail.label}
						</dt>
						<dd className="font-mono text-xs uppercase tracking-widest">
							{detail.value}
						</dd>
					</div>
				))}
			</dl>
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
