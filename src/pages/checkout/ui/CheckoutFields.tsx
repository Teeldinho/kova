import { Card, CardContent, FieldGroup } from '@/shared/ui'

import { CHECKOUT_FORM } from '../config/constants'
import type { CheckoutFormApi } from '../model/useCheckoutForm'
import { CheckoutField } from './CheckoutField'

interface CheckoutFieldsProps {
	form: CheckoutFormApi
}

export function CheckoutFields({ form }: CheckoutFieldsProps) {
	return (
		<Card className="border border-border py-0 ring-0">
			<CardContent className="p-5">
				<FieldGroup>
					<div className="grid gap-4 md:grid-cols-2">
						<CheckoutField
							className="md:col-span-2"
							form={form}
							label={CHECKOUT_FORM.LABELS.FULL_NAME}
							name="fullName"
							placeholder={CHECKOUT_FORM.PLACEHOLDERS.FULL_NAME}
						/>
						<CheckoutField
							className="md:col-span-2"
							form={form}
							label={CHECKOUT_FORM.LABELS.EMAIL}
							name="email"
							placeholder={CHECKOUT_FORM.PLACEHOLDERS.EMAIL}
							type="email"
						/>
						<CheckoutField
							className="md:col-span-2"
							form={form}
							label={CHECKOUT_FORM.LABELS.ADDRESS}
							name="address"
							placeholder={CHECKOUT_FORM.PLACEHOLDERS.ADDRESS}
						/>
						<CheckoutField
							form={form}
							label={CHECKOUT_FORM.LABELS.CITY}
							name="city"
							placeholder={CHECKOUT_FORM.PLACEHOLDERS.CITY}
						/>
						<CheckoutField
							form={form}
							label={CHECKOUT_FORM.LABELS.POSTAL_CODE}
							name="postalCode"
							placeholder={CHECKOUT_FORM.PLACEHOLDERS.POSTAL_CODE}
						/>
						<CheckoutField
							className="md:col-span-2"
							form={form}
							label={CHECKOUT_FORM.LABELS.COUNTRY}
							name="country"
							placeholder={CHECKOUT_FORM.PLACEHOLDERS.COUNTRY}
						/>
					</div>
				</FieldGroup>
			</CardContent>
		</Card>
	)
}
