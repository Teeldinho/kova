import { useNavigate } from '@tanstack/react-router'

import { ROUTES } from '@/shared/config'

export function useNotFoundPage() {
	const navigate = useNavigate()

	const handleNotFoundBackHome = () => {
		navigate({ to: ROUTES.HOME })
	}

	return {
		handleNotFoundBackHome,
	}
}
