import { QueryClient } from '@tanstack/react-query'

import { QUERY } from '@/shared/config'

export const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: QUERY.DEFAULT_STALE_TIME_MS,
				refetchOnWindowFocus: QUERY.REFETCH_ON_WINDOW_FOCUS,
			},
		},
	})
