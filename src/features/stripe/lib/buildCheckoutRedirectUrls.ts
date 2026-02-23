import { ROUTES } from '@/shared/config'

import { STRIPE_CHECKOUT } from '../config/constants'

export const buildCheckoutSuccessUrl = (origin: string): string =>
	`${origin}${ROUTES.CHECKOUT_SUCCESS}?${STRIPE_CHECKOUT.SESSION_QUERY_KEY}={CHECKOUT_SESSION_ID}`

export const buildCheckoutCancelUrl = (origin: string): string =>
	`${origin}${ROUTES.CHECKOUT_ERROR}?${STRIPE_CHECKOUT.ERROR_REASON_QUERY_KEY}=${STRIPE_CHECKOUT.ERROR_REASONS.PAYMENT_CANCELED}`
