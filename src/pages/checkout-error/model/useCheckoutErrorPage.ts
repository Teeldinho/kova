import { useNavigate } from '@tanstack/react-router'

import { ROUTES } from '@/shared/config'

import { CHECKOUT_ERROR_REASONS } from '../config/constants'

interface UseCheckoutErrorPageParams {
	reason?: string
}

export function useCheckoutErrorPage({ reason }: UseCheckoutErrorPageParams) {
	const navigate = useNavigate()
	const normalizedReason = reason?.trim().toLowerCase()

	const errorReason = normalizedReason
		? (CHECKOUT_ERROR_REASONS[
				normalizedReason as keyof typeof CHECKOUT_ERROR_REASONS
			] ?? CHECKOUT_ERROR_REASONS.UNKNOWN)
		: CHECKOUT_ERROR_REASONS.UNKNOWN

	const handleCheckoutErrorRetry = () => {
		navigate({ to: ROUTES.CHECKOUT })
	}

	const handleCheckoutErrorHome = () => {
		navigate({ to: ROUTES.HOME })
	}

	return {
		errorReason,
		handleCheckoutErrorHome,
		handleCheckoutErrorRetry,
	}
}
