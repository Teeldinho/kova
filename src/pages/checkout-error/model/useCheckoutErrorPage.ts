import { useNavigate } from '@tanstack/react-router'

import { ROUTES } from '@/shared/config'

export function useCheckoutErrorPage() {
	const navigate = useNavigate()

	const handleCheckoutErrorBack = () => {
		navigate({ to: ROUTES.CART })
	}

	return {
		handleCheckoutErrorBack,
	}
}
