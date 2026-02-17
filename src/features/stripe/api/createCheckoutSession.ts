import { createServerFn } from '@tanstack/react-start'
import Stripe from 'stripe'
import { z } from 'zod'

import { ORDER } from '@/entities/order'
import { ROUTES } from '@/shared/config'

import { STRIPE_CHECKOUT } from '../config/constants'

const stripeServerEnvSchema = z.object({
	STRIPE_SECRET_KEY: z.string().min(1),
})

const stripeCheckoutPayloadSchema = z.object({
	customer: z.object({
		address: z.string().min(1),
		city: z.string().min(1),
		country: z.string().min(1),
		email: z.string().email(),
		fullName: z.string().min(1),
		postalCode: z.string().min(1),
	}),
	items: z
		.array(
			z.object({
				description: z.string().min(1),
				image: z.string().url(),
				name: z.string().min(1),
				quantity: z.number().int().min(1),
				unitAmountInCents: z.number().int().min(ORDER.MIN_UNIT_AMOUNT),
			}),
		)
		.min(1),
	origin: z.string().url(),
})

const getStripeClient = () => {
	try {
		const environment = stripeServerEnvSchema.parse(process.env)

		return new Stripe(environment.STRIPE_SECRET_KEY)
	} catch {
		console.error('[stripe-checkout] missing server configuration', {
			hasSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
		})
		throw new Error(STRIPE_CHECKOUT.ERROR_CODES.MISSING_SECRET_KEY)
	}
}

export const createCheckoutSession = createServerFn({ method: 'POST' })
	.inputValidator(stripeCheckoutPayloadSchema)
	.handler(async ({ data }) => {
		const stripe = getStripeClient()

		try {
			const session = await stripe.checkout.sessions.create({
				cancel_url: `${data.origin}${ROUTES.CHECKOUT_ERROR}`,
				customer_email: data.customer.email,
				line_items: data.items.map((item) => ({
					price_data: {
						currency: ORDER.CURRENCY,
						product_data: {
							description: item.description,
							images: [item.image],
							name: item.name,
						},
						unit_amount: item.unitAmountInCents,
					},
					quantity: item.quantity,
				})),
				metadata: {
					address: data.customer.address,
					city: data.customer.city,
					country: data.customer.country,
					fullName: data.customer.fullName,
					postalCode: data.customer.postalCode,
				},
				mode: STRIPE_CHECKOUT.MODE,
				success_url: `${data.origin}${ROUTES.CHECKOUT_SUCCESS}?${STRIPE_CHECKOUT.SESSION_QUERY_KEY}={CHECKOUT_SESSION_ID}`,
			})

			if (!session.url) {
				throw new Error(STRIPE_CHECKOUT.ERROR_CODES.SESSION_URL_UNAVAILABLE)
			}

			return {
				checkoutUrl: session.url,
			}
		} catch (error) {
			console.error('[stripe-checkout] session creation failed', {
				itemCount: data.items.length,
				errorMessage: error instanceof Error ? error.message : 'unknown',
			})
			throw new Error(STRIPE_CHECKOUT.ERROR_CODES.SESSION_CREATION_FAILED)
		}
	})
