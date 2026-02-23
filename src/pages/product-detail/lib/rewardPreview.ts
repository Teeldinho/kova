import type { CartRewardSnapshot } from '@/entities/cart'
import { CURRENCY } from '@/shared/config'
import { formatPrice } from '@/shared/lib'

import { PRODUCT_DETAIL } from '../config/constants'

interface RewardPreview {
	rewardProgressPercentage: number
	rewardStatusLabel: string
	rewardUnlockHintLabel: string | null
}

export const formatRewardPreview = (
	projectedRewardSnapshot: CartRewardSnapshot,
): RewardPreview => {
	const rewardProgressPercentage = Math.round(
		projectedRewardSnapshot.progressToNextTier * 100,
	)

	const amountToNextReward =
		projectedRewardSnapshot.amountToNextTierInZar / CURRENCY.EXCHANGE_RATE

	const nextTierLabel = projectedRewardSnapshot.nextTier?.label ?? ''
	const activeTierLabel = projectedRewardSnapshot.activeTier?.label ?? ''

	const rewardUnlockHintLabel =
		amountToNextReward > 0
			? `${PRODUCT_DETAIL.REWARD.UNLOCK_HINT_PREFIX} ${formatPrice(amountToNextReward)} ${PRODUCT_DETAIL.REWARD.UNLOCK_HINT_INFIX} ${nextTierLabel}`
			: null

	const rewardStatusLabel = projectedRewardSnapshot.hasUnlockedReward
		? `${PRODUCT_DETAIL.REWARD.UNLOCKED_PREFIX} ${activeTierLabel}`
		: `${PRODUCT_DETAIL.REWARD.NEXT_PREFIX} ${nextTierLabel}`

	return {
		rewardProgressPercentage,
		rewardStatusLabel,
		rewardUnlockHintLabel,
	}
}
