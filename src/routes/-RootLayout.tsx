import { ClientOnly, Outlet } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { AppProviders } from '@/app/providers'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

const CustomCursor = lazy(() =>
	import('@/shared/ui').then((module) => ({ default: module.CustomCursor })),
)

const Toaster = lazy(() =>
	import('@/shared/ui').then((module) => ({ default: module.Toaster })),
)

const CartSheet = lazy(() =>
	import('@/widgets/cart-sheet').then((module) => ({
		default: module.CartSheet,
	})),
)

const RootDevtools = import.meta.env.DEV
	? lazy(() =>
			import('./-RootDevtools').then((module) => ({
				default: module.RootDevtools,
			})),
		)
	: null

export function RootLayout() {
	return (
		<AppProviders>
			<div className="flex min-h-dvh flex-col bg-background selection:bg-primary/20 selection:text-foreground">
				<ClientOnly fallback={null}>
					<Suspense fallback={null}>
						<CustomCursor />
					</Suspense>
				</ClientOnly>

				<Header />

				<main className="flex-1">
					<Outlet />
				</main>

				<Footer />

				<ClientOnly fallback={null}>
					<Suspense fallback={null}>
						<CartSheet />
						<Toaster position="bottom-left" closeButton />
					</Suspense>
				</ClientOnly>
			</div>

			{RootDevtools ? (
				<Suspense fallback={null}>
					<RootDevtools />
				</Suspense>
			) : null}
		</AppProviders>
	)
}
