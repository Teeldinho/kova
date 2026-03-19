import { ClientOnly } from '@tanstack/react-router'
import { lazy, type ReactNode, Suspense } from 'react'

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

interface AppShellProps {
	children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
	return (
		<div className="flex min-h-dvh flex-col bg-background selection:bg-primary/20 selection:text-foreground">
			<ClientOnly fallback={null}>
				<Suspense fallback={null}>
					<CustomCursor />
				</Suspense>
			</ClientOnly>

			<Header />

			<main className="flex-1">{children}</main>

			<Footer />

			<ClientOnly fallback={null}>
				<Suspense fallback={null}>
					<CartSheet />
					<Toaster position="bottom-left" closeButton />
				</Suspense>
			</ClientOnly>
		</div>
	)
}
