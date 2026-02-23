import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { CheckoutErrorPage } from '@/pages/checkout-error'
import { APP_NAME, SEO } from '@/shared/config'
import { getCanonicalUrl } from '@/shared/lib'

const checkoutErrorSearchSchema = z.object({
	reason: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/checkout/error')({
	ssr: false,
	validateSearch: checkoutErrorSearchSchema,
	head: () => {
		const canonicalUrl = getCanonicalUrl('/checkout/error')

		return {
			meta: [
				{
					title: `Checkout Error - ${APP_NAME}`,
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
	component: CheckoutErrorRoute,
})

function CheckoutErrorRoute() {
	const search = Route.useSearch()

	return <CheckoutErrorPage reason={search.reason} />
}
