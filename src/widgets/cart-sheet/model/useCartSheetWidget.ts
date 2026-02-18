import { useNavigate } from '@tanstack/react-router'
import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

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
	const lenis = useLenis()

	const cartItems = useCartLineItems({
		handleCartItemQuantityUpdate,
		handleCartItemRemove,
		items,
	})

	/**
	 * Pause / resume Lenis in sync with the cart sheet open state.
	 *
	 * Radix UI Dialog adds `overflow: hidden` to <body> when open, which blocks
	 * native scroll. But Lenis runs on RAF independently of that CSS flag, so
	 * without this effect the background page continues scrolling behind the
	 * open drawer. `lenis.stop()` instructs Lenis to call preventDefault() on
	 * all incoming wheel/touch events, completing the scroll lock.
	 */
	useEffect(() => {
		if (isOpen) {
			lenis?.stop()
		} else {
			lenis?.start()
		}
	}, [isOpen, lenis])

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

	/**
	 * Called when the user clicks a product image or title inside a CartItem
	 * while the sheet is open. Closes the sheet so the navigation feels clean.
	 */
	const handleCartItemNavigate = () => {
		handleCartSheetClose()
	}

	return {
		discount,
		isOpen,
		items,
		rewardSnapshot,
		cartItems,
		handleCartCheckoutNavigate,
		handleCartViewNavigate,
		handleCartItemNavigate,
		subtotal,
		tax,
		total,
		handleCartStartShopping,
		handleCartSheetOpenChange,
	}
}
