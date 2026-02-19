import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { STRIPE_CHECKOUT } from '@/features/stripe'
import { CheckoutSuccessPage } from '@/pages/checkout-success'
import { APP_NAME, SEO } from '@/shared/config'
import { getCanonicalUrl } from '@/shared/lib'

const checkoutSuccessSearchSchema = z.object({
	[STRIPE_CHECKOUT.SESSION_QUERY_KEY]: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/checkout/success')({
	ssr: false,
	validateSearch: checkoutSuccessSearchSchema,
	head: () => {
		const canonicalUrl = getCanonicalUrl('/checkout/success')

		return {
			meta: [
				{
					title: `Checkout Complete - ${APP_NAME}`,
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
	component: CheckoutSuccessRoute,
})

function CheckoutSuccessRoute() {
	const search = Route.useSearch()

	return (
		<CheckoutSuccessPage
			sessionId={search[STRIPE_CHECKOUT.SESSION_QUERY_KEY]}
		/>
	)
}
