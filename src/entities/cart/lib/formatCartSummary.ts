import { CURRENCY } from '@/shared/config'
import { formatPrice } from '@/shared/lib'

import type { CartRewardSnapshot } from './cartRewards'

interface FormatCartSummaryParams {
	discount: number
	rewardSnapshot: CartRewardSnapshot
	subtotal: number
	tax: number
	total: number
}

export const formatCartSummary = ({
	discount,
	rewardSnapshot,
	subtotal,
	tax,
	total,
}: FormatCartSummaryParams) => {
	const amountToNextRewardInUsd =
		rewardSnapshot.amountToNextTierInZar / CURRENCY.EXCHANGE_RATE

	return {
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
	}
}
