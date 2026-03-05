import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

import { useRouteScrollTop } from '@/shared/model'
import { MotionProvider } from './MotionProvider'

interface AppProvidersProps {
	children: ReactNode
}

function AppProvidersContent({ children }: AppProvidersProps) {
	useRouteScrollTop()

	return <MotionProvider>{children}</MotionProvider>
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
				wheelMultiplier: 1,
			}}
		>
			<AppProvidersContent>{children}</AppProvidersContent>
		</ReactLenis>
	)
}
