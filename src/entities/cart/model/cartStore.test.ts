import { beforeEach, describe, expect, test } from 'vitest'

import type { Product } from '@/entities/product/@x/cart'

import { CART } from '../config/constants'
import {
	addItem,
	cartStore,
	clearCart,
	removeItem,
	updateQuantity,
} from './cartStore'

const createProduct = (id: number, price: number): Product => ({
	id,
	title: `Product ${id}`,
	price,
	description: 'Description',
	category: 'electronics',
	image: '/item.jpg',
	rating: { count: 10, rate: 4.2 },
})

describe('cartStore', () => {
	beforeEach(() => {
		localStorage.clear()
		clearCart()
	})

	test('adds and updates item quantity', () => {
		const product = createProduct(1, 20)

		addItem(product)
		addItem(product, 2)

		expect(cartStore.state.items).toHaveLength(1)
		expect(cartStore.state.items[0]?.quantity).toBe(3)
	})

	test('removes item when quantity set below minimum', () => {
		const product = createProduct(1, 20)

		addItem(product)
		updateQuantity(product.id, 0)

		expect(cartStore.state.items).toEqual([])
	})

	test('persists state in localStorage', () => {
		const product = createProduct(2, 30)

		addItem(product)

		const raw = localStorage.getItem(CART.STORAGE_KEY)
		expect(raw).toBeTruthy()

		removeItem(product.id)
		expect(cartStore.state.items).toEqual([])
	})
})
