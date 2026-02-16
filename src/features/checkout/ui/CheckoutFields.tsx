import { CHECKOUT_FORM } from '../config/constants'
import type { CheckoutFormApi } from '../model/useCheckoutForm'
import { CheckoutField } from './CheckoutField'

interface CheckoutFieldsProps {
	form: CheckoutFormApi
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
