import { useQueryClient } from '@tanstack/react-query'

import { productQueries } from '../api/queries'

interface UseProductCardPrefetchParams {
	productId: number
}

export function useProductCardPrefetch({
	productId,
}: UseProductCardPrefetchParams) {
	const queryClient = useQueryClient()

	const handleProductCardPrefetchIntent = () => {
		void queryClient.prefetchQuery(productQueries.detail(productId))
	}

	return {
		handleProductCardFocus: handleProductCardPrefetchIntent,
		handleProductCardPointerEnter: handleProductCardPrefetchIntent,
	}
}
