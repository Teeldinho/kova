import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { AppProviders } from '@/app/providers'
import { CartSheet } from '@/widgets/cart-sheet'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import appCss from '../styles.css?url'

interface RouterAppContext {
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'KOVA - Every detail, considered.',
			},
		],
		links: [
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossOrigin: 'anonymous',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
			},
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
	}),
	component: RootLayout,
	shellComponent: RootDocument,
})

function RootLayout() {
	return (
		<AppProviders>
			<div className="flex min-h-dvh flex-col bg-background">
				<Header />
				<main className="flex-1">
					<Outlet />
				</main>
				<Footer />
				<CartSheet />
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

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	)
}
