import { Outlet } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { AppProviders, AppShell } from '@/app'

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
			<AppShell>
				<Outlet />
			</AppShell>

			{RootDevtools ? (
				<Suspense fallback={null}>
					<RootDevtools />
				</Suspense>
			) : null}
		</AppProviders>
	)
}
