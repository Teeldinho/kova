import { useNavigate } from '@tanstack/react-router'

import { useCart, useCartLineItems } from '@/entities/cart'
import { ROUTES } from '@/shared/config'
import { useCartSheet } from '@/shared/model'

export function useCartSheetWidget() {
	const {
		discount,
		items,
		rewardSnapshot,
		subtotal,
		tax,
		total,
		handleCartItemQuantityUpdate,
		handleCartItemRemove,
	} = useCart()
	const { isOpen, handleCartSheetOpenChange, handleCartSheetClose } =
		useCartSheet()
	const navigate = useNavigate()

	const cartItems = useCartLineItems({
		handleCartItemQuantityUpdate,
		handleCartItemRemove,
		items,
	})

	const handleCartStartShopping = () => {
		handleCartSheetClose()
	}

	const handleCartCheckoutNavigate = () => {
		handleCartSheetClose()
		navigate({ to: ROUTES.CHECKOUT })
	}

	const handleCartViewNavigate = () => {
		handleCartSheetClose()
		navigate({ to: ROUTES.CART })
	}

	return {
		discount,
		isOpen,
		items,
		rewardSnapshot,
		cartItems,
		handleCartCheckoutNavigate,
		handleCartViewNavigate,
		subtotal,
		tax,
		total,
		handleCartStartShopping,
		handleCartSheetOpenChange,
	}
}
