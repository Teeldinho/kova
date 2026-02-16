import { useMemo } from 'react'

import type { CartItem } from './types'

interface UseCartLineItemsParams {
	handleCartItemQuantityUpdate: (productId: number, quantity: number) => void
	handleCartItemRemove: (productId: number) => void
	items: CartItem[]
}

interface CartLineItem {
	item: CartItem
	handleCartItemDecrease: () => void
	handleCartItemIncrease: () => void
	handleCartItemRemove: () => void
}

export function useCartLineItems({
	handleCartItemQuantityUpdate,
	handleCartItemRemove,
	items,
}: UseCartLineItemsParams) {
	return useMemo<CartLineItem[]>(
		() =>
			items.map((item) => ({
				item,
				handleCartItemDecrease: () =>
					handleCartItemQuantityUpdate(item.product.id, item.quantity - 1),
				handleCartItemIncrease: () =>
					handleCartItemQuantityUpdate(item.product.id, item.quantity + 1),
				handleCartItemRemove: () => handleCartItemRemove(item.product.id),
			})),
		[handleCartItemQuantityUpdate, handleCartItemRemove, items],
	)
}
