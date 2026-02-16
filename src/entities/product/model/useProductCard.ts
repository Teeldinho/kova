import { ANIMATION } from '@/shared/config'
import { formatPrice } from '@/shared/lib'

import { PRODUCT } from '../config/constants'
import { getCategoryLabel, truncateDescription } from '../lib/formatProduct'
import type { Product } from './types'

interface UseProductCardParams {
	product: Product
	index: number
	featured: boolean
}

export function useProductCard({
	product,
	index,
	featured,
}: UseProductCardParams) {
	const categoryLabel = getCategoryLabel(product.category)
	const displayPrice = formatPrice(product.price)
	const displayTitle = featured
		? product.title
		: truncateDescription(product.title, PRODUCT.CARD_TITLE_TRUNCATE_LENGTH)

	return {
		categoryLabel,
		displayPrice,
		displayTitle,
		featuredClassName: featured ? 'col-span-2 row-span-2' : '',
		motionDelay: index * ANIMATION.STAGGER_DELAY,
		motionDuration: ANIMATION.FADE_DURATION,
		productId: String(product.id),
		motionOffsetY: PRODUCT.CARD_ANIMATION_OFFSET_Y,
	}
}
