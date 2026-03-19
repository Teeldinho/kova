import { useState } from 'react'
import { toast } from 'sonner'

import { createCheckoutSession } from '../api/createCheckoutSession'
import { STRIPE_CHECKOUT } from '../config/constants'
import { mapStripeCheckoutError } from '../lib/mapStripeCheckoutError'
import type { CheckoutPayload } from './types'

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
			const mappedError = mapStripeCheckoutError(error)

			console.error('[stripe-checkout] unable to start checkout', {
				errorMessage: error instanceof Error ? error.message : 'unknown',
			})

			setStripeCheckoutError(mappedError)
			toast.error(STRIPE_CHECKOUT.TOAST.ERROR_TITLE, {
				description: mappedError,
			})
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
