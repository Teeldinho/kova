import { QueryClientProvider } from '@tanstack/react-query'
import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

import { queryClient } from '@/shared/api'

interface AppProvidersProps {
	children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
	return (
		<ReactLenis
			root
			options={{
				/**
				 * Stops any in-flight scroll inertia the moment an internal anchor
				 * is clicked — prevents the "landing mid-page" bug on SPA navigation.
				 */
				stopInertiaOnNavigate: true,
				wheelMultiplier: 1.2,
			}}
		>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ReactLenis>
	)
}
