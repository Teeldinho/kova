import type { FormEventHandler, ReactNode } from 'react'

interface CheckoutFormProps {
	children: ReactNode
	handleCheckoutFormSubmit: FormEventHandler<HTMLFormElement>
}

export function CheckoutForm({
	children,
	handleCheckoutFormSubmit,
}: CheckoutFormProps) {
	return (
		<form className="space-y-6" onSubmit={handleCheckoutFormSubmit} noValidate>
			{children}
		</form>
	)
}
