import { Button } from '@/shared/ui'

import { CHECKOUT_FORM } from '../config/constants'

interface CheckoutSubmitButtonProps {
	disabled: boolean
	isPending: boolean
}

export function CheckoutSubmitButton({
	disabled,
	isPending,
}: CheckoutSubmitButtonProps) {
	return (
		<Button
			type="submit"
			disabled={disabled}
			className="h-11 w-full rounded-none font-mono text-[10px] uppercase tracking-widest"
		>
			{isPending
				? CHECKOUT_FORM.SUBMIT_PENDING_LABEL
				: CHECKOUT_FORM.SUBMIT_LABEL}
		</Button>
	)
}
