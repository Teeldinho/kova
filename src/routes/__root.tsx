import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'

import { GlobalErrorPage, NotFoundPage } from '@/pages/not-found'
import { APP_NAME, APP_TAGLINE, SEO } from '@/shared/config'
import { getOgImageUrl } from '@/shared/lib'
import appCss from '../styles.css?url'
import { RootDocument } from './-RootDocument'
import { RootLayout } from './-RootLayout'

interface RouterAppContext {
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => {
		const ogImageUrl = getOgImageUrl()

		return {
			meta: [
				{
					charSet: 'utf-8',
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					title: `${APP_NAME} - ${APP_TAGLINE}`,
				},
				{
					name: 'description',
					content: SEO.DEFAULT_DESCRIPTION,
				},
				{
					name: 'robots',
					content: SEO.DEFAULT_ROBOTS_CONTENT,
				},
				{
					name: 'theme-color',
					content: '#0f172a',
				},
				{
					property: 'og:site_name',
					content: APP_NAME,
				},
				{
					property: 'og:type',
					content: 'website',
				},
				{
					property: 'og:title',
					content: `${APP_NAME} - ${APP_TAGLINE}`,
				},
				{
					property: 'og:description',
					content: SEO.DEFAULT_DESCRIPTION,
				},
				...(ogImageUrl
					? [
							{
								property: 'og:image',
								content: ogImageUrl,
							},
						]
					: []),
				{
					name: 'twitter:card',
					content: SEO.TWITTER_CARD,
				},
				{
					name: 'twitter:title',
					content: `${APP_NAME} - ${APP_TAGLINE}`,
				},
				{
					name: 'twitter:description',
					content: SEO.DEFAULT_DESCRIPTION,
				},
				...(ogImageUrl
					? [
							{
								name: 'twitter:image',
								content: ogImageUrl,
							},
						]
					: []),
			],
			links: [
				{
					rel: 'stylesheet',
					href: appCss,
				},
				{
					rel: 'icon',
					href: '/favicon.ico',
				},
				{
					rel: 'manifest',
					href: '/manifest.json',
				},
			],
		}
	},
	component: RootLayout,
	errorComponent: GlobalErrorPage,
	notFoundComponent: NotFoundPage,
	shellComponent: RootDocument,
})
