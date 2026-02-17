import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'

import { GlobalErrorPage, NotFoundPage } from '@/pages/not-found'
import appCss from '../styles.css?url'
import { RootDocument } from './-RootDocument'
import { RootLayout } from './-RootLayout'

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
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
	}),
	component: RootLayout,
	errorComponent: GlobalErrorPage,
	notFoundComponent: NotFoundPage,
	shellComponent: RootDocument,
})
