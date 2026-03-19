import type { MouseEvent } from 'react'
import { toast } from 'sonner'

import { useCart } from '@/entities/cart'
import type { Product } from '@/entities/product'
import { formatPrice } from '@/shared/lib'
import { useCartSheet } from '@/shared/model'

import { QUICK_ADD } from '../config/constants'

export function useQuickAddToCart() {
	const { handleCartItemAdd } = useCart()
	const { handleCartSheetOpen } = useCartSheet()

	const handleProductQuickAdd = (product: Product) => {
		handleCartItemAdd(product, QUICK_ADD.DEFAULT_QUANTITY)

		toast.success(QUICK_ADD.TOAST.TITLE, {
			description: `${product.title} · ${formatPrice(product.price)}`,
			action: {
				label: QUICK_ADD.TOAST.ACTION_LABEL,
				onClick: handleCartSheetOpen,
			},
		})
	}

	const handleProductQuickAddButtonClick =
		(product: Product) => (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault()
			event.stopPropagation()
			handleProductQuickAdd(product)
		}

	return { handleProductQuickAdd, handleProductQuickAddButtonClick }
}
