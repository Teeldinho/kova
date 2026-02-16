import { Store } from '@tanstack/store'

import type { Product } from '@/entities/product/@x/cart'

import { CART } from '../config/constants'
import type { CartItem, CartState } from './types'

const INITIAL_STATE: CartState = { items: [] }

function loadFromStorage(): CartState {
	if (typeof window === 'undefined') return INITIAL_STATE
	try {
		const raw = localStorage.getItem(CART.STORAGE_KEY)
		return raw ? JSON.parse(raw) : INITIAL_STATE
	} catch {
		return INITIAL_STATE
	}
}

function saveToStorage(state: CartState): void {
	if (typeof window === 'undefined') return
	try {
		localStorage.setItem(CART.STORAGE_KEY, JSON.stringify(state))
	} catch {
		// Storage quota exceeded or unavailable — silently ignore
	}
}

export const cartStore = new Store<CartState>(loadFromStorage(), {
	onUpdate: () => {
		saveToStorage(cartStore.state)
	},
})

export function addItem(product: Product, quantity = 1): void {
	cartStore.setState((prev) => {
		const existingIndex = prev.items.findIndex(
			(item) => item.product.id === product.id,
		)

		if (existingIndex >= 0) {
			const updated = [...prev.items]
			const existing = updated[existingIndex]
			updated[existingIndex] = {
				...existing,
				quantity: Math.min(
					existing.quantity + quantity,
					CART.MAX_ITEM_QUANTITY,
				),
			}
			return { items: updated }
		}

		const newItem: CartItem = {
			product,
			quantity: Math.min(quantity, CART.MAX_ITEM_QUANTITY),
		}
		return { items: [...prev.items, newItem] }
	})
}

export function removeItem(productId: number): void {
	cartStore.setState((prev) => ({
		items: prev.items.filter((item) => item.product.id !== productId),
	}))
}

export function updateQuantity(productId: number, quantity: number): void {
	if (quantity < CART.MIN_ITEM_QUANTITY) {
		removeItem(productId)
		return
	}

	cartStore.setState((prev) => ({
		items: prev.items.map((item) =>
			item.product.id === productId
				? {
						...item,
						quantity: Math.min(quantity, CART.MAX_ITEM_QUANTITY),
					}
				: item,
		),
	}))
}

export function clearCart(): void {
	cartStore.setState(() => INITIAL_STATE)
}
