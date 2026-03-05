import {
	formatPrice,
	getOptimizedImageSrcSet,
	getOptimizedImageUrl,
} from '@/shared/lib'

import { CART } from '../config/constants'
import type { CartItem } from './types'

export function useCartItem(item: CartItem) {
	const imageSrc = getOptimizedImageUrl(item.product.image, {
		width: CART.IMAGE.SIZE_PX,
	})
	const imageSrcSet = getOptimizedImageSrcSet(
		item.product.image,
		CART.IMAGE.SRCSET_WIDTHS,
	)

	return {
		displayPrice: formatPrice(item.product.price),
		imageAlt: item.product.title,
		imageSizes: CART.IMAGE.SIZES,
		imageSrc,
		imageSrcSet,
		productId: String(item.product.id),
		quantity: item.quantity,
		title: item.product.title,
		decreaseQuantityLabel: CART.A11Y.DECREASE_QUANTITY_LABEL,
		increaseQuantityLabel: CART.A11Y.INCREASE_QUANTITY_LABEL,
		removeLabel: CART.REMOVE_LABEL,
	}
}
