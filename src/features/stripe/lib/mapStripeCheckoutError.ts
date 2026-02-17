import { STRIPE_CHECKOUT } from '../config/constants'

export const mapStripeCheckoutError = (error: unknown): string => {
	if (!(error instanceof Error)) {
		return STRIPE_CHECKOUT.ERROR_MESSAGES.DEFAULT
	}

	if (error.message === STRIPE_CHECKOUT.ERROR_CODES.MISSING_SECRET_KEY) {
		return STRIPE_CHECKOUT.ERROR_MESSAGES.MISSING_SECRET_KEY
	}

	return STRIPE_CHECKOUT.ERROR_MESSAGES.DEFAULT
}
