import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { STRIPE_CHECKOUT } from '@/features/stripe'
import { CheckoutSuccessPage } from '@/pages/checkout-success'

const checkoutSuccessSearchSchema = z.object({
	[STRIPE_CHECKOUT.SESSION_QUERY_KEY]: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/checkout/success')({
	validateSearch: checkoutSuccessSearchSchema,
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
