import { describe, expect, test } from 'vitest'

import {
	getCheckoutDefaultValues,
	hasCheckoutErrors,
	validateCheckoutCustomer,
} from './checkoutValidation'

describe('checkoutValidation', () => {
	test('returns empty errors for valid customer data', () => {
		const errors = validateCheckoutCustomer({
			address: '1 Main Street',
			city: 'Johannesburg',
			country: 'South Africa',
			email: 'user@example.com',
			fullName: 'Jane Doe',
			postalCode: '2000',
		})

		expect(errors).toEqual({})
		expect(hasCheckoutErrors(errors)).toBe(false)
	})

	test('returns field errors for invalid data', () => {
		const errors = validateCheckoutCustomer(getCheckoutDefaultValues())

		expect(errors.fullName).toBeDefined()
		expect(errors.email).toBeDefined()
		expect(hasCheckoutErrors(errors)).toBe(true)
	})
})
