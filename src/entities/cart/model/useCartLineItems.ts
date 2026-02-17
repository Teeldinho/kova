import { useMemo } from 'react'
import { toast } from 'sonner'

import { CART } from '../config/constants'

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
				handleCartItemDecrease: () => {
					handleCartItemQuantityUpdate(item.product.id, item.quantity - 1)

					if (item.quantity === CART.MIN_ITEM_QUANTITY) {
						toast.info(CART.TOAST.REMOVED_TITLE, {
							description: item.product.title,
						})
					}
				},
				handleCartItemIncrease: () =>
					handleCartItemQuantityUpdate(item.product.id, item.quantity + 1),
				handleCartItemRemove: () => {
					handleCartItemRemove(item.product.id)
					toast.info(CART.TOAST.REMOVED_TITLE, {
						description: item.product.title,
					})
				},
			})),
		[handleCartItemQuantityUpdate, handleCartItemRemove, items],
	)
}
