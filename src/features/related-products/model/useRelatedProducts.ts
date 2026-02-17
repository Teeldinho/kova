import { useMemo } from 'react'

import type { Product } from '@/entities/product'
import { useProducts } from '@/entities/product'

import { RELATED_PRODUCTS } from '../config/constants'

interface UseRelatedProductsProps {
	currentProductCategory: Product['category']
	currentProductId: number
}

export function useRelatedProducts({
	currentProductCategory,
	currentProductId,
}: UseRelatedProductsProps) {
	const { data: products = [] } = useProducts()

	const relatedProducts = useMemo(
		() =>
			products
				.filter(
					(product) =>
						product.category === currentProductCategory &&
						product.id !== currentProductId,
				)
				.slice(0, RELATED_PRODUCTS.MAX_COUNT),
		[currentProductCategory, currentProductId, products],
	)

	return {
		relatedProducts,
		hasRelatedProducts: relatedProducts.length > 0,
	}
}
