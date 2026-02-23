import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'

import type { Product } from '@/entities/product'

import { cartStore, clearCart } from './cartStore'
import { useCart } from './useCart'

const createMockProduct = (id: number, price: number): Product => ({
	id,
	title: `Product ${id}`,
	price,
	description: 'Test product description',
	category: 'electronics',
	image: 'https://example.com/product.jpg',
	rating: { rate: 4.5, count: 100 },
})

describe('useCart', () => {
	beforeEach(() => {
		clearCart()
		localStorage.clear()
		cartStore.setState(() => ({ items: [] }))
	})

	test('returns initial empty cart state', () => {
		const { result } = renderHook(() => useCart())

		expect(result.current.items).toEqual([])
		expect(result.current.itemCount).toBe(0)
		expect(result.current.subtotal).toBe(0)
		expect(result.current.tax).toBe(0)
		expect(result.current.discount).toBe(0)
		expect(result.current.total).toBe(0)
		expect(result.current.isCartEmpty).toBe(true)
	})

	test('adds product to cart', () => {
		const product = createMockProduct(1, 10)
		const { result } = renderHook(() => useCart())

		act(() => {
			result.current.handleCartItemAdd(product)
		})

		expect(result.current.items).toHaveLength(1)
		expect(result.current.itemCount).toBe(1)
		expect(result.current.subtotal).toBe(10)
		expect(result.current.discount).toBe(0)
		expect(result.current.total).toBe(10)
		expect(result.current.isCartEmpty).toBe(false)
	})

	test('increments quantity when adding same product', () => {
		const product = createMockProduct(1, 10)
		const { result } = renderHook(() => useCart())

		act(() => {
			result.current.handleCartItemAdd(product)
			result.current.handleCartItemAdd(product, 2)
		})

		expect(result.current.items).toHaveLength(1)
		expect(result.current.items[0]?.quantity).toBe(3)
		expect(result.current.itemCount).toBe(3)
		expect(result.current.subtotal).toBe(30)
	})

	test('removes product from cart', () => {
		const product = createMockProduct(1, 10)
		const { result } = renderHook(() => useCart())

		act(() => {
			result.current.handleCartItemAdd(product)
		})

		act(() => {
			result.current.handleCartItemRemove(product.id)
		})

		expect(result.current.items).toEqual([])
		expect(result.current.itemCount).toBe(0)
		expect(result.current.isCartEmpty).toBe(true)
	})

	test('updates product quantity', () => {
		const product = createMockProduct(1, 10)
		const { result } = renderHook(() => useCart())

		act(() => {
			result.current.handleCartItemAdd(product)
		})

		act(() => {
			result.current.handleCartItemQuantityUpdate(product.id, 5)
		})

		expect(result.current.items[0]?.quantity).toBe(5)
		expect(result.current.itemCount).toBe(5)
		expect(result.current.subtotal).toBe(50)
	})

	test('removes item when quantity updated below minimum', () => {
		const product = createMockProduct(1, 10)
		const { result } = renderHook(() => useCart())

		act(() => {
			result.current.handleCartItemAdd(product)
		})

		act(() => {
			result.current.handleCartItemQuantityUpdate(product.id, 0)
		})

		expect(result.current.items).toEqual([])
		expect(result.current.itemCount).toBe(0)
	})

	test('clears entire cart', () => {
		const first = createMockProduct(1, 10)
		const second = createMockProduct(2, 20)
		const { result } = renderHook(() => useCart())

		act(() => {
			result.current.handleCartItemAdd(first)
			result.current.handleCartItemAdd(second)
		})

		act(() => {
			result.current.handleCartClear()
		})

		expect(result.current.items).toEqual([])
		expect(result.current.itemCount).toBe(0)
		expect(result.current.total).toBe(0)
	})

	test('applies reward discount when threshold is reached', () => {
		const product = createMockProduct(1, 100)
		const { result } = renderHook(() => useCart())

		act(() => {
			result.current.handleCartItemAdd(product)
		})

		expect(result.current.discount).toBe(5)
		expect(result.current.total).toBe(95)
		expect(result.current.rewardSnapshot.activeTier?.discountRate).toBe(0.05)
	})
})
