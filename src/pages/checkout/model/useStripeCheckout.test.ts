import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const { createCheckoutSessionMock } = vi.hoisted(() => ({
	createCheckoutSessionMock: vi.fn(),
}))

const { toastErrorMock } = vi.hoisted(() => ({
	toastErrorMock: vi.fn(),
}))

const { consoleErrorMock } = vi.hoisted(() => ({
	consoleErrorMock: vi.fn(),
}))

vi.mock('../api/createCheckoutSession', () => ({
	createCheckoutSession: createCheckoutSessionMock,
}))

vi.mock('sonner', () => ({
	toast: {
		error: toastErrorMock,
	},
}))

import { useStripeCheckout } from './useStripeCheckout'

describe('useStripeCheckout', () => {
	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(consoleErrorMock)
		createCheckoutSessionMock.mockReset()
		toastErrorMock.mockReset()
		consoleErrorMock.mockReset()
	})

	afterEach(() => {
		vi.restoreAllMocks()
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
		expect(toastErrorMock).not.toHaveBeenCalled()
		expect(consoleErrorMock).not.toHaveBeenCalled()

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
		expect(toastErrorMock).toHaveBeenCalledWith('Checkout failed', {
			description: 'Unable to start secure checkout. Please retry.',
		})
		expect(consoleErrorMock).toHaveBeenCalledWith(
			'[stripe-checkout] unable to start checkout',
			{ errorMessage: 'Stripe error' },
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
		expect(toastErrorMock).toHaveBeenCalledWith('Checkout failed', {
			description:
				'Secure checkout is currently unavailable. Please contact support.',
		})
		expect(consoleErrorMock).toHaveBeenCalledWith(
			'[stripe-checkout] unable to start checkout',
			{ errorMessage: 'STRIPE_CHECKOUT_MISSING_SECRET_KEY' },
		)
	})
})
