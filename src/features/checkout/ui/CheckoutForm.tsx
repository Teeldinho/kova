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
		<form
			className="grid gap-6 lg:grid-cols-[1fr_320px]"
			onSubmit={handleCheckoutFormSubmit}
			noValidate
		>
			{children}
		</form>
	)
}
