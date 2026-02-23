import { PRODUCT } from '../config/constants'
import { formatRating } from '../lib/formatProduct'

export function useProductRating(rate: number) {
	const ratingRounded = Math.round(rate)
	const ratingSteps = Array.from(
		{ length: PRODUCT.MAX_RATING },
		(_, index) => index + 1,
	)

	return {
		displayRating: formatRating(rate),
		ratingRounded,
		ratingSteps,
	}
}
