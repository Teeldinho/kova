import type { CartItem } from '@/entities/cart/@x/order'
import { CURRENCY } from '@/shared/config'

import { ORDER } from '../config/constants'
import type { CheckoutLineItem } from '../model/types'

export const buildCheckoutLineItems = (
	cartItems: CartItem[],
): CheckoutLineItem[] =>
	cartItems.map((item) => ({
		description: item.product.description,
		image: item.product.image,
		name: item.product.title,
		quantity: item.quantity,
		unitAmountInCents: Math.max(
			Math.round(item.product.price * CURRENCY.EXCHANGE_RATE * 100),
			ORDER.MIN_UNIT_AMOUNT,
		),
	}))
