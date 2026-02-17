import { describe, expect, test } from 'vitest'

import type { CartItem } from '@/entities/cart/@x/order'
import { CURRENCY } from '@/shared/config'

import { buildCheckoutLineItems } from './buildCheckoutLineItems'

const CART_ITEMS: CartItem[] = [
	{
		product: {
			id: 1,
			title: 'Premium Jacket',
			price: 120.49,
			description: 'A tailored fit jacket',
			category: "men's clothing",
			image: '/jacket.jpg',
			rating: { rate: 4.5, count: 120 },
		},
		quantity: 2,
	},
]

describe('buildCheckoutLineItems', () => {
	test('converts USD price to ZAR cents using exchange rate', () => {
		const result = buildCheckoutLineItems(CART_ITEMS)
		const expectedZarCents = Math.round(120.49 * CURRENCY.EXCHANGE_RATE * 100)

		expect(result).toEqual([
			{
				description: 'A tailored fit jacket',
				image: '/jacket.jpg',
				name: 'Premium Jacket',
				quantity: 2,
				unitAmountInCents: expectedZarCents,
			},
		])
	})

	test('enforces minimum charge amount for very low prices', () => {
		const result = buildCheckoutLineItems([
			{
				product: {
					id: 2,
					title: 'Low Price Item',
					price: 0.001,
					description: 'Tiny price',
					category: 'electronics',
					image: '/tiny.jpg',
					rating: { rate: 4.0, count: 10 },
				},
				quantity: 1,
			},
		])

		expect(result[0]?.unitAmountInCents).toBe(50)
	})

	test('returns empty array for empty cart', () => {
		expect(buildCheckoutLineItems([])).toEqual([])
	})
})
