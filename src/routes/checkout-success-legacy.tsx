import { createFileRoute, Navigate } from '@tanstack/react-router'
import { z } from 'zod'

import { STRIPE_CHECKOUT } from '@/pages/checkout'
import { ROUTES } from '@/shared/config'

const legacyCheckoutSuccessSearchSchema = z.object({
	[STRIPE_CHECKOUT.SESSION_QUERY_KEY]: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/checkout-success-legacy')({
	validateSearch: legacyCheckoutSuccessSearchSchema,
	component: LegacyCheckoutSuccessRoute,
})

function LegacyCheckoutSuccessRoute() {
	const search = Route.useSearch()

	return (
		<Navigate
			to={ROUTES.CHECKOUT_SUCCESS}
			search={{
				[STRIPE_CHECKOUT.SESSION_QUERY_KEY]:
					search[STRIPE_CHECKOUT.SESSION_QUERY_KEY],
			}}
			replace
		/>
	)
}
