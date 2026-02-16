import type { CheckoutCustomer } from '@/entities/order'
import { Input, Label } from '@/shared/ui'

import { CHECKOUT_FORM } from '../config/constants'
import type { CheckoutFormApi } from '../model/useCheckoutForm'

interface CheckoutFieldsProps {
	form: CheckoutFormApi
}

interface CheckoutFieldProps {
	className?: string
	form: CheckoutFormApi
	id: string
	label: string
	name: keyof CheckoutCustomer
	placeholder: string
	type?: 'email' | 'text'
}

const getErrorId = (fieldId: string) => `${fieldId}-error`

const getFieldErrorMessage = (errors: unknown[] | undefined) => {
	if (!errors || errors.length === 0) {
		return undefined
	}

	const firstError = errors[0]
	return typeof firstError === 'string' ? firstError : undefined
}

function CheckoutField({
	className,
	form,
	id,
	label,
	name,
	placeholder,
	type = 'text',
}: CheckoutFieldProps) {
	const errorId = getErrorId(id)

	return (
		<form.Field name={name}>
			{(field) => {
				const errorMessage = getFieldErrorMessage(field.state.meta.errors)

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

export function CheckoutFields({ form }: CheckoutFieldsProps) {
	return (
		<section className="space-y-4 border border-border bg-card p-5">
			<div className="grid gap-4 md:grid-cols-2">
				<CheckoutField
					className="space-y-1.5 md:col-span-2"
					form={form}
					id={CHECKOUT_FORM.IDS.FULL_NAME}
					label={CHECKOUT_FORM.LABELS.FULL_NAME}
					name="fullName"
					placeholder={CHECKOUT_FORM.PLACEHOLDERS.FULL_NAME}
				/>
				<CheckoutField
					className="space-y-1.5 md:col-span-2"
					form={form}
					id={CHECKOUT_FORM.IDS.EMAIL}
					label={CHECKOUT_FORM.LABELS.EMAIL}
					name="email"
					placeholder={CHECKOUT_FORM.PLACEHOLDERS.EMAIL}
					type="email"
				/>
				<CheckoutField
					className="space-y-1.5 md:col-span-2"
					form={form}
					id={CHECKOUT_FORM.IDS.ADDRESS}
					label={CHECKOUT_FORM.LABELS.ADDRESS}
					name="address"
					placeholder={CHECKOUT_FORM.PLACEHOLDERS.ADDRESS}
				/>
				<CheckoutField
					form={form}
					id={CHECKOUT_FORM.IDS.CITY}
					label={CHECKOUT_FORM.LABELS.CITY}
					name="city"
					placeholder={CHECKOUT_FORM.PLACEHOLDERS.CITY}
				/>
				<CheckoutField
					form={form}
					id={CHECKOUT_FORM.IDS.POSTAL_CODE}
					label={CHECKOUT_FORM.LABELS.POSTAL_CODE}
					name="postalCode"
					placeholder={CHECKOUT_FORM.PLACEHOLDERS.POSTAL_CODE}
				/>
				<CheckoutField
					className="space-y-1.5 md:col-span-2"
					form={form}
					id={CHECKOUT_FORM.IDS.COUNTRY}
					label={CHECKOUT_FORM.LABELS.COUNTRY}
					name="country"
					placeholder={CHECKOUT_FORM.PLACEHOLDERS.COUNTRY}
				/>
			</div>
		</section>
	)
}
