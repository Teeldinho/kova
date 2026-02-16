import { describe, expect, test } from 'vitest'

import type { CartItem } from '../model/types'
import {
	calculateSubtotal,
	calculateTax,
	calculateTotal,
	getCartItemCount,
} from './cartUtils'

const mockItem = (id: number, price: number, quantity: number): CartItem => ({
	product: {
		id,
		title: `Product ${id}`,
		price,
		description: 'Test',
		category: 'test',
		image: 'test.jpg',
		rating: { rate: 4, count: 100 },
	},
	quantity,
})

describe('calculateSubtotal', () => {
	test('returns 0 for empty cart', () => {
		expect(calculateSubtotal([])).toBe(0)
	})

	test('sums single item price * quantity', () => {
		const items = [mockItem(1, 10, 2)]
		expect(calculateSubtotal(items)).toBe(20)
	})

	test('sums multiple items', () => {
		const items = [mockItem(1, 10, 2), mockItem(2, 5, 3)]
		expect(calculateSubtotal(items)).toBe(35)
	})

	test('handles decimal prices', () => {
		const items = [mockItem(1, 9.99, 1)]
		expect(calculateSubtotal(items)).toBeCloseTo(9.99)
	})
})

describe('calculateTax', () => {
	test('returns 0 with default 0% tax rate', () => {
		expect(calculateTax(100)).toBe(0)
	})

	test('calculates tax with custom rate', () => {
		expect(calculateTax(100, 0.15)).toBe(15)
	})
})

describe('calculateTotal', () => {
	test('returns 0 for empty cart', () => {
		expect(calculateTotal([])).toBe(0)
	})

	test('returns subtotal when tax is 0', () => {
		const items = [mockItem(1, 10, 1)]
		expect(calculateTotal(items)).toBe(10)
	})
})

describe('getCartItemCount', () => {
	test('returns 0 for empty cart', () => {
		expect(getCartItemCount([])).toBe(0)
	})

	test('sums quantities of all items', () => {
		const items = [mockItem(1, 10, 2), mockItem(2, 5, 3)]
		expect(getCartItemCount(items)).toBe(5)
	})

	test('counts single item quantity', () => {
		const items = [mockItem(1, 10, 7)]
		expect(getCartItemCount(items)).toBe(7)
	})
})
