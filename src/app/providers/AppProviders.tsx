import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { queryClient } from '@/shared/api'
import { useLenis } from '@/shared/model'
import { CustomCursor } from '@/shared/ui'

interface AppProvidersProps {
	children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
	useLenis()

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<CustomCursor />
		</QueryClientProvider>
	)
}
