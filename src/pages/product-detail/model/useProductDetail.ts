import { useState } from 'react'
import { toast } from 'sonner'

import { CART, getCartRewardSnapshot, useCart } from '@/entities/cart'
import { useProduct } from '@/entities/product'
import { formatPrice } from '@/shared/lib'
import { useCartSheet } from '@/shared/model'

import { PRODUCT_DETAIL } from '../config/constants'
import {
	decreaseProductQuantity,
	increaseProductQuantity,
} from '../lib/productDetailQuantity'

export function useProductDetail(productId: number) {
	const { data: product } = useProduct(productId)
	const { handleCartItemAdd, subtotal } = useCart()
	const { handleCartSheetOpen } = useCartSheet()
	const [quantity, setQuantity] = useState<number>(CART.MIN_ITEM_QUANTITY)
	const projectedSubtotal = product
		? subtotal + product.price * quantity
		: subtotal
	const projectedRewardSnapshot = getCartRewardSnapshot(projectedSubtotal)

	const handleProductQuantityIncrease = () => {
		setQuantity((current) => increaseProductQuantity(current))
	}

	const handleProductQuantityDecrease = () => {
		setQuantity((current) => decreaseProductQuantity(current))
	}

	const handleProductAddToCart = () => {
		if (!product) {
			return
		}

		handleCartItemAdd(product, quantity)

		toast.success(PRODUCT_DETAIL.TOAST.TITLE, {
			description: `${product.title} · ${formatPrice(product.price)}`,
			action: {
				label: PRODUCT_DETAIL.TOAST.ACTION_LABEL,
				onClick: handleCartSheetOpen,
			},
		})

		setQuantity(CART.MIN_ITEM_QUANTITY)
	}

	return {
		product,
		projectedRewardSnapshot,
		quantity,
		handleProductQuantityIncrease,
		handleProductQuantityDecrease,
		handleProductAddToCart,
	}
}
