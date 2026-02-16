import type { CheckoutCustomer } from '@/entities/order'
import { Input, Label } from '@/shared/ui'

import { CHECKOUT_FORM } from '../config/constants'
import type { CheckoutFieldHandlers } from '../model/useCheckoutForm'

interface CheckoutFieldsProps {
	customer: CheckoutCustomer
	errors: Partial<Record<keyof CheckoutCustomer, string>>
	handlers: CheckoutFieldHandlers
}

const getErrorId = (fieldId: string) => `${fieldId}-error`

export function CheckoutFields({
	customer,
	errors,
	handlers,
}: CheckoutFieldsProps) {
	return (
		<section className="space-y-4 border border-border bg-card p-5">
			<div className="grid gap-4 md:grid-cols-2">
				<div className="space-y-1.5 md:col-span-2">
					<Label htmlFor={CHECKOUT_FORM.IDS.FULL_NAME}>
						{CHECKOUT_FORM.LABELS.FULL_NAME}
					</Label>
					<Input
						id={CHECKOUT_FORM.IDS.FULL_NAME}
						value={customer.fullName}
						onChange={handlers.handleCheckoutFullNameChange}
						placeholder={CHECKOUT_FORM.PLACEHOLDERS.FULL_NAME}
						aria-required
						aria-invalid={Boolean(errors.fullName)}
						aria-describedby={
							errors.fullName
								? getErrorId(CHECKOUT_FORM.IDS.FULL_NAME)
								: undefined
						}
					/>
					{errors.fullName ? (
						<p
							id={getErrorId(CHECKOUT_FORM.IDS.FULL_NAME)}
							role="alert"
							className="text-xs text-destructive"
						>
							{errors.fullName}
						</p>
					) : null}
				</div>

				<div className="space-y-1.5 md:col-span-2">
					<Label htmlFor={CHECKOUT_FORM.IDS.EMAIL}>
						{CHECKOUT_FORM.LABELS.EMAIL}
					</Label>
					<Input
						id={CHECKOUT_FORM.IDS.EMAIL}
						type="email"
						value={customer.email}
						onChange={handlers.handleCheckoutEmailChange}
						placeholder={CHECKOUT_FORM.PLACEHOLDERS.EMAIL}
						aria-required
						aria-invalid={Boolean(errors.email)}
						aria-describedby={
							errors.email ? getErrorId(CHECKOUT_FORM.IDS.EMAIL) : undefined
						}
					/>
					{errors.email ? (
						<p
							id={getErrorId(CHECKOUT_FORM.IDS.EMAIL)}
							role="alert"
							className="text-xs text-destructive"
						>
							{errors.email}
						</p>
					) : null}
				</div>

				<div className="space-y-1.5 md:col-span-2">
					<Label htmlFor={CHECKOUT_FORM.IDS.ADDRESS}>
						{CHECKOUT_FORM.LABELS.ADDRESS}
					</Label>
					<Input
						id={CHECKOUT_FORM.IDS.ADDRESS}
						value={customer.address}
						onChange={handlers.handleCheckoutAddressChange}
						placeholder={CHECKOUT_FORM.PLACEHOLDERS.ADDRESS}
						aria-required
						aria-invalid={Boolean(errors.address)}
						aria-describedby={
							errors.address ? getErrorId(CHECKOUT_FORM.IDS.ADDRESS) : undefined
						}
					/>
					{errors.address ? (
						<p
							id={getErrorId(CHECKOUT_FORM.IDS.ADDRESS)}
							role="alert"
							className="text-xs text-destructive"
						>
							{errors.address}
						</p>
					) : null}
				</div>

				<div className="space-y-1.5">
					<Label htmlFor={CHECKOUT_FORM.IDS.CITY}>
						{CHECKOUT_FORM.LABELS.CITY}
					</Label>
					<Input
						id={CHECKOUT_FORM.IDS.CITY}
						value={customer.city}
						onChange={handlers.handleCheckoutCityChange}
						placeholder={CHECKOUT_FORM.PLACEHOLDERS.CITY}
						aria-required
						aria-invalid={Boolean(errors.city)}
						aria-describedby={
							errors.city ? getErrorId(CHECKOUT_FORM.IDS.CITY) : undefined
						}
					/>
					{errors.city ? (
						<p
							id={getErrorId(CHECKOUT_FORM.IDS.CITY)}
							role="alert"
							className="text-xs text-destructive"
						>
							{errors.city}
						</p>
					) : null}
				</div>

				<div className="space-y-1.5">
					<Label htmlFor={CHECKOUT_FORM.IDS.POSTAL_CODE}>
						{CHECKOUT_FORM.LABELS.POSTAL_CODE}
					</Label>
					<Input
						id={CHECKOUT_FORM.IDS.POSTAL_CODE}
						value={customer.postalCode}
						onChange={handlers.handleCheckoutPostalCodeChange}
						placeholder={CHECKOUT_FORM.PLACEHOLDERS.POSTAL_CODE}
						aria-required
						aria-invalid={Boolean(errors.postalCode)}
						aria-describedby={
							errors.postalCode
								? getErrorId(CHECKOUT_FORM.IDS.POSTAL_CODE)
								: undefined
						}
					/>
					{errors.postalCode ? (
						<p
							id={getErrorId(CHECKOUT_FORM.IDS.POSTAL_CODE)}
							role="alert"
							className="text-xs text-destructive"
						>
							{errors.postalCode}
						</p>
					) : null}
				</div>

				<div className="space-y-1.5 md:col-span-2">
					<Label htmlFor={CHECKOUT_FORM.IDS.COUNTRY}>
						{CHECKOUT_FORM.LABELS.COUNTRY}
					</Label>
					<Input
						id={CHECKOUT_FORM.IDS.COUNTRY}
						value={customer.country}
						onChange={handlers.handleCheckoutCountryChange}
						placeholder={CHECKOUT_FORM.PLACEHOLDERS.COUNTRY}
						aria-required
						aria-invalid={Boolean(errors.country)}
						aria-describedby={
							errors.country ? getErrorId(CHECKOUT_FORM.IDS.COUNTRY) : undefined
						}
					/>
					{errors.country ? (
						<p
							id={getErrorId(CHECKOUT_FORM.IDS.COUNTRY)}
							role="alert"
							className="text-xs text-destructive"
						>
							{errors.country}
						</p>
					) : null}
				</div>
			</div>
		</section>
	)
}
