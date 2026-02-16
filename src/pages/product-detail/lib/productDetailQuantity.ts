import { CART } from '@/entities/cart'

export const clampProductQuantity = (quantity: number): number =>
	Math.min(Math.max(quantity, CART.MIN_ITEM_QUANTITY), CART.MAX_ITEM_QUANTITY)

export const increaseProductQuantity = (quantity: number): number =>
	clampProductQuantity(quantity + 1)

export const decreaseProductQuantity = (quantity: number): number =>
	clampProductQuantity(quantity - 1)
