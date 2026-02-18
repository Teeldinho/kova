import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { AppProviders } from '@/app/providers'
import { CustomCursor, Toaster } from '@/shared/ui'
import { CartSheet } from '@/widgets/cart-sheet'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

export function RootLayout() {
	return (
		<AppProviders>
			<div className="flex min-h-dvh flex-col bg-background selection:bg-primary/20 selection:text-foreground">
				<CustomCursor />
				<Header />
				<main className="flex-1">
					<Outlet />
				</main>
				<Footer />
				<CartSheet />
				<Toaster position="bottom-left" closeButton />
			</div>
			<TanStackDevtools
				config={{
					position: 'bottom-right',
				}}
				plugins={[
					{
						name: 'TanStack Router',
						render: <TanStackRouterDevtoolsPanel />,
					},
					{
						name: 'TanStack Query',
						render: <ReactQueryDevtoolsPanel />,
					},
				]}
			/>
		</AppProviders>
	)
}
