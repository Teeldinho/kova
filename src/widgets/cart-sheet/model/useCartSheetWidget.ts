import { useNavigate } from '@tanstack/react-router'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'

import { useCart, useCartLineItems } from '@/entities/cart'
import { ROUTES } from '@/shared/config'
import { formatPrice } from '@/shared/lib'
import { useCartSheet } from '@/shared/model'

import { CART_SHEET } from '../config/constants'

const getSummaryExpandedDefault = (): boolean => {
	if (
		typeof window === 'undefined' ||
		typeof window.matchMedia !== 'function'
	) {
		return true
	}

	return window.matchMedia(CART_SHEET.SUMMARY.DESKTOP_MEDIA_QUERY).matches
}

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
	const [isSummaryExpanded, setIsSummaryExpanded] = useState(
		getSummaryExpandedDefault,
	)

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
			setIsSummaryExpanded(getSummaryExpandedDefault())
			lenis?.stop()
		} else {
			lenis?.start()
		}
	}, [isOpen, lenis])

	const handleCartSummaryToggle = () => {
		setIsSummaryExpanded((current) => !current)
	}

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
		compactSummaryLabel: CART_SHEET.SUMMARY.TITLE,
		compactSummaryTotalLabel: `Total ${formatPrice(total)}`,
		discount,
		expandSummaryLabel: CART_SHEET.SUMMARY.EXPAND_LABEL,
		isOpen,
		isSummaryExpanded,
		items,
		rewardSnapshot,
		cartItems,
		handleCartSummaryToggle,
		handleCartCheckoutNavigate,
		handleCartViewNavigate,
		handleCartItemNavigate,
		subtotal,
		tax,
		total,
		collapseSummaryLabel: CART_SHEET.SUMMARY.COLLAPSE_LABEL,
		handleCartStartShopping,
		handleCartSheetOpenChange,
	}
}
