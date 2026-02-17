import { useState } from 'react'

import { CART, getCartRewardSnapshot, useCart } from '@/entities/cart'
import { useProduct } from '@/entities/product'

import {
	decreaseProductQuantity,
	increaseProductQuantity,
} from '../lib/productDetailQuantity'

export function useProductDetail(productId: number) {
	const { data: product } = useProduct(productId)
	const { handleCartItemAdd, subtotal } = useCart()
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
		handleCartItemAdd(product, quantity)
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
