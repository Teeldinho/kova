import { act, renderHook } from '@testing-library/react'
import type { FormEvent } from 'react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import type { CheckoutCustomer } from '@/entities/order'

const {
	buildCheckoutLineItemsMock,
	handleCheckoutFormSubmitMock,
	handleStripeCheckoutStartMock,
	navigateMock,
	useCartMock,
	useCheckoutFormMock,
	useNavigateMock,
	useStripeCheckoutMock,
} = vi.hoisted(() => ({
	buildCheckoutLineItemsMock: vi.fn(),
	handleCheckoutFormSubmitMock: vi.fn(),
	handleStripeCheckoutStartMock: vi.fn(),
	navigateMock: vi.fn(),
	useCartMock: vi.fn(),
	useCheckoutFormMock: vi.fn(),
	useNavigateMock: vi.fn(),
	useStripeCheckoutMock: vi.fn(),
}))

vi.mock('@/entities/cart', () => ({
	useCart: useCartMock,
}))

vi.mock('@/entities/order', () => ({
	buildCheckoutLineItems: buildCheckoutLineItemsMock,
}))

vi.mock('@/features/checkout', () => ({
	useCheckoutForm: useCheckoutFormMock,
}))

vi.mock('@/features/stripe', () => ({
	useStripeCheckout: useStripeCheckoutMock,
}))

vi.mock('@tanstack/react-router', () => ({
	useNavigate: useNavigateMock,
}))

import { useCheckoutPage } from './useCheckoutPage'

describe('useCheckoutPage', () => {
	let capturedCheckoutSubmit:
		| ((customer: CheckoutCustomer) => Promise<void>)
		| undefined

	beforeEach(() => {
		capturedCheckoutSubmit = undefined
		buildCheckoutLineItemsMock.mockReset()
		handleCheckoutFormSubmitMock.mockReset()
		handleStripeCheckoutStartMock.mockReset()
		navigateMock.mockReset()

		useNavigateMock.mockReturnValue(navigateMock)
		useCartMock.mockReturnValue({
			discount: 5,
			isCartEmpty: false,
			items: [{ id: 1 }],
			rewardSnapshot: {
				activeTier: null,
				nextTier: null,
				amountToNextTierInZar: 0,
				progressToNextTier: 1,
				discountRate: 0,
				hasUnlockedReward: false,
			},
			subtotal: 10,
			tax: 0,
			total: 10,
		})
		useCheckoutFormMock.mockImplementation(
			({
				handleCheckoutSubmit,
			}: {
				handleCheckoutSubmit: (customer: CheckoutCustomer) => Promise<void>
			}) => {
				capturedCheckoutSubmit = handleCheckoutSubmit

				return {
					form: { state: { values: {} } },
					handleCheckoutFormSubmit: handleCheckoutFormSubmitMock,
				}
			},
		)
		useStripeCheckoutMock.mockReturnValue({
			handleStripeCheckoutStart: handleStripeCheckoutStartMock,
			isStripeCheckoutPending: false,
			stripeCheckoutError: null,
		})
	})

	test('submits checkout payload to stripe flow', async () => {
		buildCheckoutLineItemsMock.mockReturnValue([
			{ name: 'Item', quantity: 1, unitAmountInCents: 1000 },
		])

		renderHook(() => useCheckoutPage())

		await act(async () => {
			await capturedCheckoutSubmit?.({
				address: '1 Main Street',
				city: 'Johannesburg',
				country: 'South Africa',
				email: 'user@example.com',
				fullName: 'Jane Doe',
				postalCode: '2000',
			})
		})

		expect(buildCheckoutLineItemsMock).toHaveBeenCalledWith([{ id: 1 }], 5)
		expect(handleStripeCheckoutStartMock).toHaveBeenCalledWith({
			customer: {
				address: '1 Main Street',
				city: 'Johannesburg',
				country: 'South Africa',
				email: 'user@example.com',
				fullName: 'Jane Doe',
				postalCode: '2000',
			},
			items: [{ name: 'Item', quantity: 1, unitAmountInCents: 1000 }],
			origin: window.location.origin,
		})
	})

	test('delegates form submit handling when cart has items', async () => {
		const { result } = renderHook(() => useCheckoutPage())

		await act(async () => {
			await result.current.handleCheckoutPageSubmit({
				preventDefault: vi.fn(),
			} as unknown as FormEvent<HTMLFormElement>)
		})

		expect(handleCheckoutFormSubmitMock).toHaveBeenCalled()
		expect(navigateMock).not.toHaveBeenCalled()
	})

	test('navigates back to cart when cart is empty', async () => {
		useCartMock.mockReturnValue({
			discount: 0,
			isCartEmpty: true,
			items: [],
			rewardSnapshot: {
				activeTier: null,
				nextTier: null,
				amountToNextTierInZar: 0,
				progressToNextTier: 1,
				discountRate: 0,
				hasUnlockedReward: false,
			},
			subtotal: 0,
			tax: 0,
			total: 0,
		})

		const { result } = renderHook(() => useCheckoutPage())

		await act(async () => {
			await result.current.handleCheckoutPageSubmit({
				preventDefault: vi.fn(),
			} as unknown as FormEvent<HTMLFormElement>)
		})

		expect(navigateMock).toHaveBeenCalledWith({ to: '/cart' })
		expect(handleCheckoutFormSubmitMock).not.toHaveBeenCalled()
	})
})
