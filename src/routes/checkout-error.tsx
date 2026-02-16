import { createFileRoute } from '@tanstack/react-router'

import { CheckoutErrorPage } from '@/pages/checkout-error'

export const Route = createFileRoute('/checkout-error')({
	component: CheckoutErrorPage,
})
