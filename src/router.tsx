import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { createQueryClient } from '@/shared/api'
import { ROUTER } from '@/shared/config'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
	const queryClient = createQueryClient()

	const router = createRouter({
		routeTree,
		context: { queryClient },
		/**
		 * Disabled so Lenis owns all scroll position management.
		 * With scrollRestoration: true, TanStack Router calls window.scrollTo(0,0)
		 * on every new navigation — this syncs Lenis's internal position to 0 before
		 * our lenis.scrollTo() useEffect fires, making the easeOutBack animation
		 * always run from 0→0 (invisible). Lenis handles scroll-to-top via
		 * useProductDetail and handles back/forward via stopInertiaOnNavigate.
		 */
		scrollRestoration: false,
		defaultPreloadStaleTime: ROUTER.PRELOAD_STALE_TIME_MS,
	})

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	})

	return router
}
