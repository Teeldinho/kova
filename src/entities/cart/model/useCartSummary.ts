import { CURRENCY } from '@/shared/config'
import { formatPrice } from '@/shared/lib'

import { CART } from '../config/constants'
import type { CartRewardSnapshot } from '../lib/cartRewards'

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
	const amountToNextRewardInUsd =
		rewardSnapshot.amountToNextTierInZar / CURRENCY.EXCHANGE_RATE

	return {
		checkoutLabel: checkoutLabel ?? CART.CHECKOUT_LABEL,
		displayAmountToNextReward: formatPrice(amountToNextRewardInUsd),
		displayDiscount: formatPrice(discount),
		displaySubtotal: formatPrice(subtotal),
		displayTax: formatPrice(tax),
		displayTotal: formatPrice(total),
		hasDiscount: discount > 0,
		hasUnlockedReward: rewardSnapshot.hasUnlockedReward,
		nextRewardLabel: rewardSnapshot.nextTier?.label ?? null,
		activeRewardLabel: rewardSnapshot.activeTier?.label ?? null,
		rewardProgressPercentage: Math.round(
			rewardSnapshot.progressToNextTier * 100,
		),
		shippingPlaceholder: CART.SHIPPING_PLACEHOLDER,
		rewardLabels: CART.REWARDS,
		summaryLabels: CART.SUMMARY,
	}
}
