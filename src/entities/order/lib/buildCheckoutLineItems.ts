import type { CartItem } from '@/entities/cart/@x/order'
import { CURRENCY } from '@/shared/config'

import { ORDER } from '../config/constants'
import type { CheckoutLineItem } from '../model/types'

interface CheckoutLineDraft {
	description: string
	image: string
	name: string
	quantity: number
	unitAmountInCents: number
	lineTotalInCents: number
	lineCapacityInCents: number
}

const toDraftLineItems = (cartItems: CartItem[]): CheckoutLineDraft[] =>
	cartItems.map((item) => {
		const unitAmountInCents = Math.max(
			Math.round(item.product.price * CURRENCY.EXCHANGE_RATE * 100),
			ORDER.MIN_UNIT_AMOUNT,
		)

		return {
			description: item.product.description,
			image: item.product.image,
			name: item.product.title,
			quantity: item.quantity,
			unitAmountInCents,
			lineTotalInCents: unitAmountInCents * item.quantity,
			lineCapacityInCents:
				(unitAmountInCents - ORDER.MIN_UNIT_AMOUNT) * item.quantity,
		}
	})

const getDiscountBudgetInCents = (
	lineItems: CheckoutLineDraft[],
	discountInUsd: number,
) => {
	const requestedDiscountInCents = Math.max(
		Math.round(discountInUsd * CURRENCY.EXCHANGE_RATE * 100),
		0,
	)

	const maxDiscountInCents = lineItems.reduce(
		(total, item) => total + item.lineCapacityInCents,
		0,
	)

	return Math.min(requestedDiscountInCents, maxDiscountInCents)
}

const distributeDiscountAcrossLines = (
	lineItems: CheckoutLineDraft[],
	totalDiscountInCents: number,
) => {
	if (totalDiscountInCents <= 0) {
		return lineItems.map(() => 0)
	}

	const totalAmountInCents = lineItems.reduce(
		(total, item) => total + item.lineTotalInCents,
		0,
	)

	const discounts = lineItems.map((item) =>
		Math.min(
			Math.floor(
				(item.lineTotalInCents / totalAmountInCents) * totalDiscountInCents,
			),
			item.lineCapacityInCents,
		),
	)

	let remaining =
		totalDiscountInCents - discounts.reduce((sum, value) => sum + value, 0)

	while (remaining > 0) {
		let allocatedInRound = 0

		for (const [index, lineItem] of lineItems.entries()) {
			if (remaining === 0) {
				break
			}

			const currentDiscount = discounts[index] ?? 0
			const availableCapacity = lineItem.lineCapacityInCents - currentDiscount

			if (availableCapacity <= 0) {
				continue
			}

			discounts[index] = currentDiscount + 1
			remaining -= 1
			allocatedInRound += 1
		}

		if (allocatedInRound === 0) {
			break
		}
	}

	return discounts
}

const toCheckoutLineItems = (
	lineItems: CheckoutLineDraft[],
	lineDiscountsInCents: number[],
): CheckoutLineItem[] => {
	const checkoutLineItems: CheckoutLineItem[] = []

	for (const [index, item] of lineItems.entries()) {
		const lineDiscountInCents = lineDiscountsInCents[index] ?? 0
		const discountedLineTotalInCents =
			item.lineTotalInCents - lineDiscountInCents
		const baseUnitAmountInCents = Math.floor(
			discountedLineTotalInCents / item.quantity,
		)
		const remainderQuantity =
			discountedLineTotalInCents - baseUnitAmountInCents * item.quantity
		const baseQuantity = item.quantity - remainderQuantity

		if (baseQuantity > 0) {
			checkoutLineItems.push({
				description: item.description,
				image: item.image,
				name: item.name,
				quantity: baseQuantity,
				unitAmountInCents: baseUnitAmountInCents,
			})
		}

		if (remainderQuantity > 0) {
			checkoutLineItems.push({
				description: item.description,
				image: item.image,
				name: item.name,
				quantity: remainderQuantity,
				unitAmountInCents: baseUnitAmountInCents + 1,
			})
		}
	}

	return checkoutLineItems
}

export const buildCheckoutLineItems = (
	cartItems: CartItem[],
	discountInUsd: number = 0,
): CheckoutLineItem[] => {
	const lineItems = toDraftLineItems(cartItems)
	const discountBudgetInCents = getDiscountBudgetInCents(
		lineItems,
		discountInUsd,
	)
	const lineDiscountsInCents = distributeDiscountAcrossLines(
		lineItems,
		discountBudgetInCents,
	)

	return toCheckoutLineItems(lineItems, lineDiscountsInCents)
}
