import { describe, expect, test } from 'vitest'

import {
	getCheckoutFieldErrorId,
	getCheckoutFieldErrorMessage,
} from './checkoutField'

describe('checkoutField', () => {
	test('builds the checkout field error id', () => {
		expect(getCheckoutFieldErrorId('checkout-email')).toBe(
			'checkout-email-error',
		)
	})

	test('returns the first string error message', () => {
		expect(getCheckoutFieldErrorMessage(['Email is required'])).toBe(
			'Email is required',
		)
	})

	test('returns undefined when there are no errors', () => {
		expect(getCheckoutFieldErrorMessage(undefined)).toBeUndefined()
		expect(getCheckoutFieldErrorMessage([])).toBeUndefined()
	})

	test('returns undefined when first error is not a string', () => {
		expect(getCheckoutFieldErrorMessage([new Error('Invalid')])).toBeUndefined()
	})
})
