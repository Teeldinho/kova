import { describe, expect, test } from 'vitest'

import { shouldShowCheckoutSubmitError } from './checkoutSubmit'

describe('shouldShowCheckoutSubmitError', () => {
	test('returns true when submit was attempted and form is invalid', () => {
		expect(shouldShowCheckoutSubmitError(1, false)).toBe(true)
	})

	test('returns false when submit has not been attempted', () => {
		expect(shouldShowCheckoutSubmitError(0, false)).toBe(false)
	})

	test('returns false when form is valid', () => {
		expect(shouldShowCheckoutSubmitError(2, true)).toBe(false)
	})
})
