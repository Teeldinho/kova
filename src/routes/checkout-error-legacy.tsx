import { createFileRoute, Navigate } from '@tanstack/react-router'
import { z } from 'zod'

import { ROUTES } from '@/shared/config'

const legacyCheckoutErrorSearchSchema = z.object({
	reason: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/checkout-error-legacy')({
	validateSearch: legacyCheckoutErrorSearchSchema,
	component: LegacyCheckoutErrorRoute,
})

function LegacyCheckoutErrorRoute() {
	const search = Route.useSearch()

	return (
		<Navigate
			to={ROUTES.CHECKOUT_ERROR}
			search={{
				reason: search.reason,
			}}
			replace
		/>
	)
}
