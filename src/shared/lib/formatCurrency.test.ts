import { describe, expect, test } from 'vitest'

import { formatPrice } from './formatCurrency'

describe('formatPrice', () => {
	test('converts USD to ZAR and formats correctly', () => {
		const result = formatPrice(10)
		expect(result).toContain('160')
	})

	test('formats with ZAR currency symbol', () => {
		const result = formatPrice(10)
		expect(result).toMatch(/R/)
	})

	test('handles zero price', () => {
		const result = formatPrice(0)
		expect(result).toContain('0')
	})

	test('handles decimal prices', () => {
		const result = formatPrice(9.99)
		expect(result).toContain('159')
	})

	test('handles large prices', () => {
		const result = formatPrice(999.99)
		expect(result).toContain('15')
	})

	test('applies exchange rate of 16', () => {
		const result = formatPrice(1)
		expect(result).toContain('16')
	})

	test('handles fractional cent values', () => {
		const result = formatPrice(0.5)
		expect(result).toContain('8')
	})
})
