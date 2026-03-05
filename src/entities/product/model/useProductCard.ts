import { ANIMATION } from '@/shared/config'
import {
	formatPrice,
	getOptimizedImageSrcSet,
	getOptimizedImageUrl,
} from '@/shared/lib'

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
	const imageSrc = getOptimizedImageUrl(product.image, {
		width: PRODUCT.IMAGE.DEFAULT_WIDTH,
	})
	const imageSrcSet = getOptimizedImageSrcSet(
		product.image,
		PRODUCT.IMAGE.SRCSET_WIDTHS,
	)

	return {
		categoryLabel,
		displayPrice,
		displayTitle,
		imageAlt: product.title,
		imageSizes: PRODUCT.IMAGE.SIZES,
		imageSrc,
		imageSrcSet,
		motionDelay: index * ANIMATION.STAGGER_DELAY,
		motionDuration: ANIMATION.FADE_DURATION,
		productId: String(product.id),
		shouldPrioritizeImage: index === 0,
	}
}
