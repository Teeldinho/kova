import type { CheckoutCustomer } from '@/entities/order'
import { Field, FieldError, FieldLabel, Input } from '@/shared/ui'

import type { CheckoutFormApi } from '../model/useCheckoutForm'

interface CheckoutFieldProps {
	className?: string
	form: CheckoutFormApi
	label: string
	name: keyof CheckoutCustomer
	placeholder: string
	type?: 'email' | 'text'
}

export function CheckoutField({
	className,
	form,
	label,
	name,
	placeholder,
	type = 'text',
}: CheckoutFieldProps) {
	return (
		<form.Field name={name}>
			{(field) => {
				const isInvalid =
					field.state.meta.isTouched && !field.state.meta.isValid

				return (
					<Field data-invalid={isInvalid} className={className}>
						<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
						<Input
							id={field.name}
							name={field.name}
							type={type}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(event) =>
								field.handleChange(event.currentTarget.value)
							}
							placeholder={placeholder}
							aria-required
							aria-invalid={isInvalid}
							autoComplete="off"
						/>
						{isInvalid && <FieldError errors={field.state.meta.errors} />}
					</Field>
				)
			}}
		</form.Field>
	)
}
