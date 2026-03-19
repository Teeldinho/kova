import { useNavigate } from '@tanstack/react-router'
import type { FormEvent } from 'react'

import { useCart } from '@/entities/cart'
import { ROUTES } from '@/shared/config'

import { buildCheckoutLineItems } from '../lib/buildCheckoutLineItems'
import type { CheckoutCustomer } from './types'
import { useCheckoutForm } from './useCheckoutForm'
import { useStripeCheckout } from './useStripeCheckout'

export function useCheckoutPage() {
	const { isCartEmpty, items, subtotal, tax, discount, rewardSnapshot, total } =
		useCart()
	const navigate = useNavigate()
	const {
		handleStripeCheckoutStart,
		isStripeCheckoutPending,
		stripeCheckoutError,
	} = useStripeCheckout()
	const { form, handleCheckoutFormSubmit } = useCheckoutForm({
		handleCheckoutSubmit: async (customer: CheckoutCustomer) => {
			await handleStripeCheckoutStart({
				customer,
				items: buildCheckoutLineItems(items, discount),
				origin: window.location.origin,
			})
		},
	})

	const handleCheckoutPageSubmit = async (
		event: FormEvent<HTMLFormElement>,
	) => {
		if (isCartEmpty) {
			event.preventDefault()
			navigate({ to: ROUTES.CART })
			return
		}

		await handleCheckoutFormSubmit(event)
	}

	const handleCheckoutBackToCart = () => {
		navigate({ to: ROUTES.CART })
	}

	return {
		handleCheckoutBackToCart,
		handleCheckoutPageSubmit,
		form,
		isCartEmpty,
		isStripeCheckoutPending,
		isSubmitDisabled: isCartEmpty || isStripeCheckoutPending,
		stripeCheckoutError,
		subtotal,
		tax,
		discount,
		rewardSnapshot,
		total,
	}
}
