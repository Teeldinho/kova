import { describe, expect, test } from 'vitest'

import { ROUTES } from '@/shared/config'

import { STRIPE_CHECKOUT } from '../config/constants'

import {
	buildCheckoutCancelUrl,
	buildCheckoutSuccessUrl,
} from './buildCheckoutRedirectUrls'

const ORIGIN = 'http://localhost:3000'

describe('buildCheckoutSuccessUrl', () => {
	test('includes success route and Stripe session placeholder', () => {
		expect(buildCheckoutSuccessUrl(ORIGIN)).toBe(
			`${ORIGIN}${ROUTES.CHECKOUT_SUCCESS}?${STRIPE_CHECKOUT.SESSION_QUERY_KEY}={CHECKOUT_SESSION_ID}`,
		)
	})
})

describe('buildCheckoutCancelUrl', () => {
	test('includes error route with payment_canceled reason', () => {
		expect(buildCheckoutCancelUrl(ORIGIN)).toBe(
			`${ORIGIN}${ROUTES.CHECKOUT_ERROR}?${STRIPE_CHECKOUT.ERROR_REASON_QUERY_KEY}=${STRIPE_CHECKOUT.ERROR_REASONS.PAYMENT_CANCELED}`,
		)
	})
})
