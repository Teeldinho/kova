import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { CART, getCartRewardSnapshot, useCart } from '@/entities/cart'
import { useProduct } from '@/entities/product'
import { formatPrice } from '@/shared/lib'
import { useCartSheet, useLenis } from '@/shared/model'

import { PRODUCT_DETAIL } from '../config/constants'
import {
	decreaseProductQuantity,
	increaseProductQuantity,
} from '../lib/productDetailQuantity'

export function useProductDetail(productId: number) {
	const { data: product } = useProduct(productId)
	const { handleCartItemAdd, subtotal } = useCart()
	const { handleCartSheetOpen } = useCartSheet()
	const lenis = useLenis()
	const [quantity, setQuantity] = useState<number>(CART.MIN_ITEM_QUANTITY)
	const projectedSubtotal = product
		? subtotal + product.price * quantity
		: subtotal
	const projectedRewardSnapshot = getCartRewardSnapshot(projectedSubtotal)

	useEffect(() => {
		if (productId < 1) {
			return
		}

		/**
		 * Scroll to top via Lenis on every product page arrival.
		 *
		 * `immediate: true` bypasses Lenis's animate pipeline and calls
		 * setScroll(0) directly — this wins the race against TanStack Router's
		 * own window.scrollTo(0,0) call (which fires in onRendered and syncs
		 * Lenis's animatedScroll to 0 before our effect, making any easing
		 * animation run 0→0 and appear invisible).
		 *
		 * `force: true` ensures the call fires even if Lenis is in a stopped
		 * or locked state from a previous in-flight navigation.
		 *
		 * Global smooth scrolling (wheel/touch) is unaffected — Lenis handles
		 * that independently via its RAF loop and virtual scroll listeners.
		 */
		lenis?.scrollTo(0, { immediate: true, force: true })
	}, [productId, lenis])

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
