import { useStore } from '@tanstack/react-store'

import type { Product } from '@/entities/product/@x/cart'
import { getCartRewardSnapshot } from '../lib/cartRewards'
import {
	calculateDiscount,
	calculateSubtotal,
	calculateTax,
	calculateTotal,
	getCartItemCount,
} from '../lib/cartUtils'
import {
	addItem,
	cartStore,
	clearCart,
	removeItem,
	updateQuantity,
} from './cartStore'

export function useCart() {
	const items = useStore(cartStore, (state) => state.items)

	const itemCount = getCartItemCount(items)
	const subtotal = calculateSubtotal(items)
	const tax = calculateTax(subtotal)
	const discount = calculateDiscount(subtotal)
	const total = calculateTotal(items)
	const rewardSnapshot = getCartRewardSnapshot(subtotal)

	const handleCartItemAdd = (product: Product, quantity = 1) => {
		addItem(product, quantity)
	}

	const handleCartItemRemove = (productId: number) => {
		removeItem(productId)
	}

	const handleCartItemQuantityUpdate = (
		productId: number,
		quantity: number,
	) => {
		updateQuantity(productId, quantity)
	}

	const handleCartClear = () => {
		clearCart()
	}

	return {
		items,
		itemCount,
		subtotal,
		tax,
		discount,
		total,
		rewardSnapshot,
		isCartEmpty: items.length === 0,
		handleCartItemAdd,
		handleCartItemRemove,
		handleCartItemQuantityUpdate,
		handleCartClear,
	}
}
