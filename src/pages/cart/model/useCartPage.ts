import { useNavigate } from '@tanstack/react-router'

import { useCart, useCartLineItems } from '@/entities/cart'
import { ROUTES } from '@/shared/config'

export function useCartPage() {
	const {
		handleCartItemQuantityUpdate,
		handleCartItemRemove,
		isCartEmpty,
		items,
		subtotal,
		tax,
		total,
	} = useCart()
	const navigate = useNavigate()

	const cartItems = useCartLineItems({
		handleCartItemQuantityUpdate,
		handleCartItemRemove,
		items,
	})

	const handleCartCheckoutNavigate = () => {
		navigate({ to: ROUTES.CHECKOUT })
	}

	const handleCartContinueShopping = () => {
		navigate({ to: ROUTES.HOME })
	}

	return {
		cartItems,
		isCartEmpty,
		handleCartCheckoutNavigate,
		handleCartContinueShopping,
		subtotal,
		tax,
		total,
	}
}
