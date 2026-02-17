import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useCart } from '@/entities/cart'
import { ROUTES } from '@/shared/config'

import { CHECKOUT_SUCCESS } from '../config/constants'

interface UseCheckoutSuccessPageParams {
	sessionId?: string
}

export function useCheckoutSuccessPage({
	sessionId,
}: UseCheckoutSuccessPageParams) {
	const navigate = useNavigate()
	const { handleCartClear } = useCart()

	useEffect(() => {
		if (!sessionId) {
			return
		}

		handleCartClear()
	}, [handleCartClear, sessionId])

	const handleCheckoutSuccessContinue = () => {
		navigate({ to: ROUTES.HOME })
	}

	const orderId = sessionId
		? `${CHECKOUT_SUCCESS.ORDER_ID_PREFIX}-${sessionId.slice(-8).toUpperCase()}`
		: CHECKOUT_SUCCESS.FALLBACK_ORDER_ID

	return {
		handleCheckoutSuccessContinue,
		orderDetails: [
			{
				label: CHECKOUT_SUCCESS.ORDER_ID_LABEL,
				value: orderId,
			},
			{
				label: CHECKOUT_SUCCESS.STATUS_LABEL,
				value: CHECKOUT_SUCCESS.STATUS_VALUE,
			},
			{
				label: CHECKOUT_SUCCESS.DELIVERY_LABEL,
				value: CHECKOUT_SUCCESS.DELIVERY_VALUE,
			},
		],
	}
}
