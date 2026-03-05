import { ANIMATION } from '@/shared/config'
import { formatPrice } from '@/shared/lib'

import { PRODUCT } from '../config/constants'
import { getCategoryLabel, truncateDescription } from '../lib/formatProduct'
import type { Product } from './types'

interface UseProductCardParams {
	product: Product
	index: number
}

export function useProductCard({ product, index }: UseProductCardParams) {
	const categoryLabel = getCategoryLabel(product.category)
	const displayPrice = formatPrice(product.price)
	const displayTitle = truncateDescription(
		product.title,
		PRODUCT.CARD_TITLE_TRUNCATE_LENGTH,
	)

	return {
		categoryLabel,
		displayPrice,
		displayTitle,
		motionDelay: index * ANIMATION.STAGGER_DELAY,
		motionDuration: ANIMATION.FADE_DURATION,
		productId: String(product.id),
	}
}
