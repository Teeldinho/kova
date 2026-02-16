import { useNavigate } from '@tanstack/react-router'
import type { FormEvent } from 'react'

import { useCart } from '@/entities/cart'
import { buildCheckoutLineItems } from '@/entities/order'
import { useCheckoutForm } from '@/features/checkout'
import { useStripeCheckout } from '@/features/stripe'
import { ROUTES } from '@/shared/config'

export function useCheckoutPage() {
	const { isCartEmpty, items, subtotal, tax, total } = useCart()
	const navigate = useNavigate()
	const {
		customer,
		errors,
		handleCheckoutAddressChange,
		handleCheckoutCityChange,
		handleCheckoutCountryChange,
		handleCheckoutEmailChange,
		handleCheckoutFormSubmit,
		handleCheckoutFullNameChange,
		handleCheckoutPostalCodeChange,
	} = useCheckoutForm()
	const {
		handleStripeCheckoutStart,
		isStripeCheckoutPending,
		stripeCheckoutError,
	} = useStripeCheckout()

	const handleCheckoutPageSubmit = async (
		event: FormEvent<HTMLFormElement>,
	) => {
		if (isCartEmpty) {
			event.preventDefault()
			navigate({ to: ROUTES.CART })
			return
		}

		const validatedCustomer = handleCheckoutFormSubmit(event)

		if (!validatedCustomer) {
			return
		}

		await handleStripeCheckoutStart({
			customer: validatedCustomer,
			items: buildCheckoutLineItems(items),
			origin: window.location.origin,
		})
	}

	const handleCheckoutBackToCart = () => {
		navigate({ to: ROUTES.CART })
	}

	return {
		customer,
		errors,
		handleCheckoutAddressChange,
		handleCheckoutBackToCart,
		handleCheckoutCityChange,
		handleCheckoutCountryChange,
		handleCheckoutEmailChange,
		handleCheckoutFullNameChange,
		handleCheckoutPageSubmit,
		handleCheckoutPostalCodeChange,
		isCartEmpty,
		isStripeCheckoutPending,
		isSubmitDisabled: isCartEmpty || isStripeCheckoutPending,
		stripeCheckoutError,
		subtotal,
		tax,
		total,
	}
}
