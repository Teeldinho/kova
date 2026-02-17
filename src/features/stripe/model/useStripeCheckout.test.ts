import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const { createCheckoutSessionMock } = vi.hoisted(() => ({
	createCheckoutSessionMock: vi.fn(),
}))

vi.mock('../api/createCheckoutSession', () => ({
	createCheckoutSession: createCheckoutSessionMock,
}))

import { useStripeCheckout } from './useStripeCheckout'

describe('useStripeCheckout', () => {
	beforeEach(() => {
		createCheckoutSessionMock.mockReset()
	})

	test('redirects to stripe checkout URL on success', async () => {
		const assignMock = vi.fn()
		const originalLocation = window.location

		Object.defineProperty(window, 'location', {
			configurable: true,
			value: {
				...originalLocation,
				assign: assignMock,
			},
		})

		createCheckoutSessionMock.mockResolvedValue({
			checkoutUrl: 'https://checkout.stripe.com/test-session',
		})

		const { result } = renderHook(() => useStripeCheckout())

		await act(async () => {
			await result.current.handleStripeCheckoutStart({
				customer: {
					address: '1 Main Street',
					city: 'Johannesburg',
					country: 'South Africa',
					email: 'user@example.com',
					fullName: 'Jane Doe',
					postalCode: '2000',
				},
				items: [
					{
						description: 'Item',
						image: 'https://example.com/item.jpg',
						name: 'Item',
						quantity: 1,
						unitAmountInCents: 2000,
					},
				],
				origin: 'http://localhost:3000',
			})
		})

		expect(assignMock).toHaveBeenCalledWith(
			'https://checkout.stripe.com/test-session',
		)
		expect(result.current.stripeCheckoutError).toBeNull()

		Object.defineProperty(window, 'location', {
			configurable: true,
			value: originalLocation,
		})
	})

	test('sets error message when checkout session fails', async () => {
		createCheckoutSessionMock.mockRejectedValue(new Error('Stripe error'))

		const { result } = renderHook(() => useStripeCheckout())

		await act(async () => {
			await result.current.handleStripeCheckoutStart({
				customer: {
					address: '1 Main Street',
					city: 'Johannesburg',
					country: 'South Africa',
					email: 'user@example.com',
					fullName: 'Jane Doe',
					postalCode: '2000',
				},
				items: [
					{
						description: 'Item',
						image: 'https://example.com/item.jpg',
						name: 'Item',
						quantity: 1,
						unitAmountInCents: 2000,
					},
				],
				origin: 'http://localhost:3000',
			})
		})

		expect(result.current.stripeCheckoutError).toBe(
			'Unable to start secure checkout. Please retry.',
		)
	})

	test('sets configuration error when secret key is unavailable', async () => {
		createCheckoutSessionMock.mockRejectedValue(
			new Error('STRIPE_CHECKOUT_MISSING_SECRET_KEY'),
		)

		const { result } = renderHook(() => useStripeCheckout())

		await act(async () => {
			await result.current.handleStripeCheckoutStart({
				customer: {
					address: '1 Main Street',
					city: 'Johannesburg',
					country: 'South Africa',
					email: 'user@example.com',
					fullName: 'Jane Doe',
					postalCode: '2000',
				},
				items: [
					{
						description: 'Item',
						image: 'https://example.com/item.jpg',
						name: 'Item',
						quantity: 1,
						unitAmountInCents: 2000,
					},
				],
				origin: 'http://localhost:3000',
			})
		})

		expect(result.current.stripeCheckoutError).toBe(
			'Secure checkout is currently unavailable. Please contact support.',
		)
	})
})
