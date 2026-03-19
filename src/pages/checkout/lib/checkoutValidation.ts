import { z } from 'zod'

import type { CheckoutCustomer } from '../model/types'

export const checkoutCustomerSchema = z.object({
	address: z.string().trim().min(2, 'Address is required.'),
	city: z.string().trim().min(2, 'City is required.'),
	country: z.string().trim().min(2, 'Country is required.'),
	email: z.string().trim().email('Enter a valid email address.'),
	fullName: z.string().trim().min(2, 'Full name is required.'),
	postalCode: z.string().trim().min(2, 'Postal code is required.'),
})

export type CheckoutFormErrors = Partial<Record<keyof CheckoutCustomer, string>>

export const getCheckoutDefaultValues = (): CheckoutCustomer => ({
	address: '',
	city: '',
	country: '',
	email: '',
	fullName: '',
	postalCode: '',
})

export const hasCheckoutErrors = (errors: CheckoutFormErrors): boolean =>
	Object.values(errors).some(Boolean)

export const validateCheckoutCustomer = (
	values: CheckoutCustomer,
): CheckoutFormErrors => {
	const parsed = checkoutCustomerSchema.safeParse(values)

	if (parsed.success) {
		return {}
	}

	return parsed.error.issues.reduce<CheckoutFormErrors>((acc, issue) => {
		const field = issue.path[0]

		if (typeof field === 'string') {
			const typedField = field as keyof CheckoutCustomer
			acc[typedField] = issue.message
		}

		return acc
	}, {})
}
