import { Button } from '@/shared/ui'

import { CHECKOUT_FORM } from '../config/constants'
import { shouldShowCheckoutSubmitError } from '../lib/checkoutSubmit'
import type { CheckoutFormApi } from '../model/useCheckoutForm'

interface CheckoutSubmitButtonProps {
	disabled: boolean
	form: CheckoutFormApi
	isPending: boolean
}

export function CheckoutSubmitButton({
	disabled,
	form,
	isPending,
}: CheckoutSubmitButtonProps) {
	return (
		<div className="space-y-2">
			<Button
				type="submit"
				disabled={disabled}
				className="h-11 w-full rounded-none font-mono text-[10px] uppercase tracking-widest"
			>
				{isPending
					? CHECKOUT_FORM.SUBMIT_PENDING_LABEL
					: CHECKOUT_FORM.SUBMIT_LABEL}
			</Button>

			<form.Subscribe
				selector={(state) =>
					shouldShowCheckoutSubmitError(state.submissionAttempts, state.isValid)
				}
			>
				{(shouldShowInvalidMessage) =>
					shouldShowInvalidMessage ? (
						<p
							role="alert"
							aria-live="polite"
							className="font-mono text-[10px] uppercase tracking-wider text-destructive"
						>
							{CHECKOUT_FORM.SUBMIT_INVALID_MESSAGE}
						</p>
					) : null
				}
			</form.Subscribe>
		</div>
	)
}
