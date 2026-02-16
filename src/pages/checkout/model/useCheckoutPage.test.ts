import { act, renderHook } from '@testing-library/react'
import type { FormEvent } from 'react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

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
	beforeEach(() => {
		buildCheckoutLineItemsMock.mockReset()
		handleCheckoutFormSubmitMock.mockReset()
		handleStripeCheckoutStartMock.mockReset()
		navigateMock.mockReset()

		useNavigateMock.mockReturnValue(navigateMock)
		useCartMock.mockReturnValue({
			isCartEmpty: false,
			items: [{ id: 1 }],
			subtotal: 10,
			tax: 0,
			total: 10,
		})
		useCheckoutFormMock.mockReturnValue({
			customer: {
				address: '',
				city: '',
				country: '',
				email: '',
				fullName: '',
				postalCode: '',
			},
			errors: {},
			handleCheckoutAddressChange: vi.fn(),
			handleCheckoutCityChange: vi.fn(),
			handleCheckoutCountryChange: vi.fn(),
			handleCheckoutEmailChange: vi.fn(),
			handleCheckoutFormSubmit: handleCheckoutFormSubmitMock,
			handleCheckoutFullNameChange: vi.fn(),
			handleCheckoutPostalCodeChange: vi.fn(),
		})
		useStripeCheckoutMock.mockReturnValue({
			handleStripeCheckoutStart: handleStripeCheckoutStartMock,
			isStripeCheckoutPending: false,
			stripeCheckoutError: null,
		})
	})

	test('submits checkout payload to stripe flow', async () => {
		handleCheckoutFormSubmitMock.mockReturnValue({
			address: '1 Main Street',
			city: 'Johannesburg',
			country: 'South Africa',
			email: 'user@example.com',
			fullName: 'Jane Doe',
			postalCode: '2000',
		})
		buildCheckoutLineItemsMock.mockReturnValue([
			{ name: 'Item', quantity: 1, unitAmountInCents: 1000 },
		])

		const { result } = renderHook(() => useCheckoutPage())

		await act(async () => {
			await result.current.handleCheckoutPageSubmit({
				preventDefault: vi.fn(),
			} as unknown as FormEvent<HTMLFormElement>)
		})

		expect(buildCheckoutLineItemsMock).toHaveBeenCalledWith([{ id: 1 }])
		expect(handleStripeCheckoutStartMock).toHaveBeenCalled()
	})

	test('navigates back to cart when cart is empty', async () => {
		useCartMock.mockReturnValue({
			isCartEmpty: true,
			items: [],
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
	})
})
