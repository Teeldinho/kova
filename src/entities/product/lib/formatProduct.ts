import { PRODUCT } from '../config/constants'

export const truncateDescription = (
	text: string,
	maxLength: number = PRODUCT.DESCRIPTION_TRUNCATE_LENGTH,
): string => {
	if (text.length <= maxLength) return text
	return `${text.slice(0, maxLength)}...`
}

export const formatRating = (rate: number): string => rate.toFixed(1)

export const getCategoryLabel = (category: string): string => {
	if (!category) return ''
	return category
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}
