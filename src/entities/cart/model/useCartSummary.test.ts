import { describe, expect, test } from 'vitest'

import { useCartSummary } from './useCartSummary'

describe('useCartSummary', () => {
	test('formats all summary values and keeps default checkout label', () => {
		const result = useCartSummary({ subtotal: 10, tax: 0, total: 10 })

		expect(result.displaySubtotal).toContain('R')
		expect(result.displayTax).toContain('R')
		expect(result.displayTotal).toContain('R')
		expect(result.checkoutLabel).toBe('Checkout')
	})

	test('uses custom checkout label when provided', () => {
		const result = useCartSummary({
			checkoutLabel: 'Go To Checkout',
			subtotal: 10,
			tax: 0,
			total: 10,
		})

		expect(result.checkoutLabel).toBe('Go To Checkout')
	})
})
