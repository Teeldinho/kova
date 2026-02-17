import type { CartRewardSnapshot } from '@/entities/cart'
import type { Product } from '@/entities/product'
import { getCategoryLabel } from '@/entities/product'
import { CURRENCY } from '@/shared/config'
import { formatPrice } from '@/shared/lib'

import { PRODUCT_DETAIL } from '../config/constants'

interface UseProductDetailInfoParams {
	product: Product
	projectedRewardSnapshot: CartRewardSnapshot
}

export function useProductDetailInfo({
	product,
	projectedRewardSnapshot,
}: UseProductDetailInfoParams) {
	const rewardProgressPercentage = Math.round(
		projectedRewardSnapshot.progressToNextTier * 100,
	)

	const amountToNextReward =
		projectedRewardSnapshot.amountToNextTierInZar / CURRENCY.EXCHANGE_RATE

	const rewardUnlockHintLabel =
		amountToNextReward > 0
			? `${PRODUCT_DETAIL.REWARD.UNLOCK_HINT_PREFIX} ${formatPrice(amountToNextReward)} ${PRODUCT_DETAIL.REWARD.UNLOCK_HINT_INFIX} ${projectedRewardSnapshot.nextTier?.label}`
			: null

	const rewardStatusLabel = projectedRewardSnapshot.hasUnlockedReward
		? `${PRODUCT_DETAIL.REWARD.UNLOCKED_PREFIX} ${projectedRewardSnapshot.activeTier?.label}`
		: `${PRODUCT_DETAIL.REWARD.NEXT_PREFIX} ${projectedRewardSnapshot.nextTier?.label}`

	return {
		addToCartLabel: PRODUCT_DETAIL.ADD_TO_CART_LABEL,
		categoryLabel: getCategoryLabel(product.category),
		decreaseQuantityLabel: PRODUCT_DETAIL.DECREASE_QUANTITY_LABEL,
		descriptionLabel: PRODUCT_DETAIL.DESCRIPTION_LABEL,
		displayPrice: formatPrice(product.price),
		estimatedDelivery: PRODUCT_DETAIL.ESTIMATED_DELIVERY,
		estimatedDeliveryPrefix: PRODUCT_DETAIL.ESTIMATED_DELIVERY_PREFIX,
		increaseQuantityLabel: PRODUCT_DETAIL.INCREASE_QUANTITY_LABEL,
		quantityLabel: PRODUCT_DETAIL.QUANTITY_LABEL,
		rewardProgressPercentage,
		rewardStatusLabel,
		rewardUnlockHintLabel,
	}
}
