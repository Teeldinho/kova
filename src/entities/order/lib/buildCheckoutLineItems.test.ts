import { describe, expect, test } from 'vitest'

import type { CartItem } from '@/entities/cart/@x/order'

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
	test('maps cart items to checkout line items', () => {
		const result = buildCheckoutLineItems(CART_ITEMS)

		expect(result).toEqual([
			{
				description: 'A tailored fit jacket',
				image: '/jacket.jpg',
				name: 'Premium Jacket',
				quantity: 2,
				unitAmountInCents: 12049,
			},
		])
	})

	test('enforces minimum charge amount', () => {
		const result = buildCheckoutLineItems([
			{
				product: {
					id: 2,
					title: 'Low Price Item',
					price: 0.01,
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
})
