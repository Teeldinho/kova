import { createRouter } from '@tanstack/react-router'

import { queryClient } from '@/shared/api'
import { ROUTER } from '@/shared/config'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
	const router = createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: ROUTER.PRELOAD_STALE_TIME_MS,
	})

	return router
}
