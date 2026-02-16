import { useState } from 'react'

import { CART, useCart } from '@/entities/cart'
import { useProduct } from '@/entities/product'

import {
	decreaseProductQuantity,
	increaseProductQuantity,
} from '../lib/productDetailQuantity'

export function useProductDetail(productId: number) {
	const { data: product } = useProduct(productId)
	const { handleCartItemAdd } = useCart()
	const [quantity, setQuantity] = useState<number>(CART.MIN_ITEM_QUANTITY)

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
		quantity,
		handleProductQuantityIncrease,
		handleProductQuantityDecrease,
		handleProductAddToCart,
	}
}
