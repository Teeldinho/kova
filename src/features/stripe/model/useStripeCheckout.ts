import { useState } from 'react'

import type { CheckoutPayload } from '@/entities/order'

import { createCheckoutSession } from '../api/createCheckoutSession'

export function useStripeCheckout() {
	const [isStripeCheckoutPending, setIsStripeCheckoutPending] = useState(false)
	const [stripeCheckoutError, setStripeCheckoutError] = useState<string | null>(
		null,
	)

	const handleStripeCheckoutStart = async (payload: CheckoutPayload) => {
		setIsStripeCheckoutPending(true)
		setStripeCheckoutError(null)

		try {
			const { checkoutUrl } = await createCheckoutSession({ data: payload })

			if (typeof window !== 'undefined') {
				window.location.assign(checkoutUrl)
			}
		} catch {
			setStripeCheckoutError('Unable to start secure checkout. Please retry.')
		} finally {
			setIsStripeCheckoutPending(false)
		}
	}

	return {
		handleStripeCheckoutStart,
		isStripeCheckoutPending,
		stripeCheckoutError,
	}
}
