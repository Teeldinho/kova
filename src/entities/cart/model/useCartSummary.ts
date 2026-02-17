import { CART } from '../config/constants'
import type { CartRewardSnapshot } from '../lib/cartRewards'
import { formatCartSummary } from '../lib/formatCartSummary'

interface UseCartSummaryParams {
	checkoutLabel?: string
	discount: number
	rewardSnapshot: CartRewardSnapshot
	subtotal: number
	tax: number
	total: number
}

export function useCartSummary({
	checkoutLabel,
	discount,
	rewardSnapshot,
	subtotal,
	tax,
	total,
}: UseCartSummaryParams) {
	const summaryDisplay = formatCartSummary({
		discount,
		rewardSnapshot,
		subtotal,
		tax,
		total,
	})

	return {
		checkoutLabel: checkoutLabel ?? CART.CHECKOUT_LABEL,
		...summaryDisplay,
		shippingPlaceholder: CART.SHIPPING_PLACEHOLDER,
		rewardLabels: CART.REWARDS,
		summaryLabels: CART.SUMMARY,
	}
}
