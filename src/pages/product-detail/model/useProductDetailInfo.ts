import type { CartRewardSnapshot } from '@/entities/cart'
import type { Product } from '@/entities/product'
import { getCategoryLabel } from '@/entities/product'
import { formatPrice } from '@/shared/lib'

import { PRODUCT_DETAIL } from '../config/constants'
import { formatRewardPreview } from '../lib/rewardPreview'

interface UseProductDetailInfoParams {
	product: Product
	projectedRewardSnapshot: CartRewardSnapshot
}

export function useProductDetailInfo({
	product,
	projectedRewardSnapshot,
}: UseProductDetailInfoParams) {
	const { rewardProgressPercentage, rewardStatusLabel, rewardUnlockHintLabel } =
		formatRewardPreview(projectedRewardSnapshot)

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
