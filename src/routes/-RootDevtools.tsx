import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export function RootDevtools() {
	return (
		<>
			<TanStackRouterDevtools position="bottom-right" />
			<ReactQueryDevtools
				initialIsOpen={false}
				buttonPosition="bottom-left"
				position="bottom"
			/>
		</>
	)
}
