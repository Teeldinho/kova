import { formatPrice } from '@/shared/lib'

import { CART } from '../config/constants'
import type { CartItem } from './types'

export function useCartItem(item: CartItem) {
	return {
		displayPrice: formatPrice(item.product.price),
		imageAlt: item.product.title,
		imageSrc: item.product.image,
		quantity: item.quantity,
		title: item.product.title,
		decreaseQuantityLabel: CART.A11Y.DECREASE_QUANTITY_LABEL,
		increaseQuantityLabel: CART.A11Y.INCREASE_QUANTITY_LABEL,
		removeLabel: CART.REMOVE_LABEL,
	}
}
