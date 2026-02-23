import { CART } from '../config/constants'
import type { CartItem } from '../model/types'
import { calculateRewardDiscount } from './cartRewards'

export const calculateSubtotal = (items: CartItem[]): number =>
	items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

export const calculateTax = (
	subtotal: number,
	taxRate: number = CART.TAX_RATE,
): number => subtotal * taxRate

export const calculateDiscount = (subtotal: number): number =>
	calculateRewardDiscount(subtotal)

export const calculateTotal = (items: CartItem[]): number => {
	const subtotal = calculateSubtotal(items)
	const tax = calculateTax(subtotal)
	const discount = calculateDiscount(subtotal)

	return Math.max(subtotal + tax - discount, 0)
}

export const getCartItemCount = (items: CartItem[]): number =>
	items.reduce((count, item) => count + item.quantity, 0)
