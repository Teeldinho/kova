import { useCart } from '@/entities/cart'
import type { Product } from '@/entities/product'
import { useCartSheet } from '@/shared/model'

import { QUICK_ADD } from '../config/constants'

export function useQuickAddToCart() {
	const { handleCartItemAdd } = useCart()
	const { handleCartSheetOpen } = useCartSheet()

	const handleProductQuickAdd = (product: Product) => {
		handleCartItemAdd(product, QUICK_ADD.DEFAULT_QUANTITY)
		handleCartSheetOpen()
	}

	return { handleProductQuickAdd }
}
