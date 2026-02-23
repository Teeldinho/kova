import { createFileRoute } from '@tanstack/react-router'

import { CheckoutPage, CheckoutPending } from '@/pages/checkout'
import { APP_NAME, SEO } from '@/shared/config'
import { getCanonicalUrl } from '@/shared/lib'

export const Route = createFileRoute('/checkout/')({
	ssr: false,
	head: () => {
		const canonicalUrl = getCanonicalUrl('/checkout')

		return {
			meta: [
				{
					title: `Checkout - ${APP_NAME}`,
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
	pendingComponent: CheckoutPending,
	component: CheckoutPage,
})
