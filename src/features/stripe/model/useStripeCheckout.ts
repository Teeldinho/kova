import { useState } from 'react'

import type { CheckoutPayload } from '@/entities/order'

import { createCheckoutSession } from '../api/createCheckoutSession'
import { mapStripeCheckoutError } from '../lib/mapStripeCheckoutError'

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
		} catch (error) {
			console.error('[stripe-checkout] unable to start checkout', {
				errorMessage: error instanceof Error ? error.message : 'unknown',
			})
			setStripeCheckoutError(mapStripeCheckoutError(error))
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
