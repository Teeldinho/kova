import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useCart } from '@/entities/cart'
import { ROUTES } from '@/shared/config'

interface UseCheckoutSuccessPageParams {
	sessionId?: string
}

export function useCheckoutSuccessPage({
	sessionId,
}: UseCheckoutSuccessPageParams) {
	const navigate = useNavigate()
	const { handleCartClear } = useCart()

	useEffect(() => {
		handleCartClear()
	}, [handleCartClear])

	const handleCheckoutSuccessContinue = () => {
		navigate({ to: ROUTES.HOME })
	}

	return {
		handleCheckoutSuccessContinue,
		sessionReference: sessionId ? sessionId.slice(-8).toUpperCase() : undefined,
	}
}
