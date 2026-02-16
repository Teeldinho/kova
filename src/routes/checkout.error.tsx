import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { CheckoutErrorPage } from '@/pages/checkout-error'

const checkoutErrorSearchSchema = z.object({
	reason: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/checkout/error')({
	validateSearch: checkoutErrorSearchSchema,
	component: CheckoutErrorRoute,
})

function CheckoutErrorRoute() {
	const search = Route.useSearch()

	return <CheckoutErrorPage reason={search.reason} />
}
