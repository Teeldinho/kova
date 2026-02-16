import type { CheckoutCustomer } from '@/entities/order'
import { Input, Label } from '@/shared/ui'

import {
	getCheckoutFieldErrorId,
	getCheckoutFieldErrorMessage,
} from '../lib/checkoutField'
import type { CheckoutFormApi } from '../model/useCheckoutForm'

interface CheckoutFieldProps {
	className?: string
	form: CheckoutFormApi
	id: string
	label: string
	name: keyof CheckoutCustomer
	placeholder: string
	type?: 'email' | 'text'
}

export function CheckoutField({
	className,
	form,
	id,
	label,
	name,
	placeholder,
	type = 'text',
}: CheckoutFieldProps) {
	const errorId = getCheckoutFieldErrorId(id)

	return (
		<form.Field name={name}>
			{(field) => {
				const errorMessage = getCheckoutFieldErrorMessage(
					field.state.meta.errors,
				)

				return (
					<div className={className ?? 'space-y-1.5'}>
						<Label htmlFor={id}>{label}</Label>
						<Input
							id={id}
							type={type}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(event) =>
								field.handleChange(event.currentTarget.value)
							}
							placeholder={placeholder}
							aria-required
							aria-invalid={Boolean(errorMessage)}
							aria-describedby={errorMessage ? errorId : undefined}
						/>
						{errorMessage ? (
							<p id={errorId} role="alert" className="text-xs text-destructive">
								{errorMessage}
							</p>
						) : null}
					</div>
				)
			}}
		</form.Field>
	)
}
