import { describe, expect, test } from 'vitest'

import { mapStripeCheckoutError } from './mapStripeCheckoutError'

describe('mapStripeCheckoutError', () => {
	test('returns missing key message for missing secret key error code', () => {
		expect(
			mapStripeCheckoutError(new Error('STRIPE_CHECKOUT_MISSING_SECRET_KEY')),
		).toBe('Secure checkout is currently unavailable. Please contact support.')
	})

	test('returns default message for unknown errors', () => {
		expect(mapStripeCheckoutError(new Error('SOMETHING_ELSE'))).toBe(
			'Unable to start secure checkout. Please retry.',
		)
	})

	test('returns default message for non-error values', () => {
		expect(mapStripeCheckoutError('bad')).toBe(
			'Unable to start secure checkout. Please retry.',
		)
	})
})
