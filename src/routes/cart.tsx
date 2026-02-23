import { createFileRoute } from '@tanstack/react-router'

import { CartPage, CartPending } from '@/pages/cart'
import { APP_NAME, SEO } from '@/shared/config'
import { getCanonicalUrl } from '@/shared/lib'

export const Route = createFileRoute('/cart')({
	ssr: false,
	head: () => {
		const canonicalUrl = getCanonicalUrl('/cart')

		return {
			meta: [
				{
					title: `Cart - ${APP_NAME}`,
				},
				{
					name: 'description',
					content: SEO.DEFAULT_DESCRIPTION,
				},
			],
			links: canonicalUrl
				? [
						{
							rel: 'canonical',
							href: canonicalUrl,
						},
					]
				: [],
		}
	},
	pendingComponent: CartPending,
	component: CartPage,
})
