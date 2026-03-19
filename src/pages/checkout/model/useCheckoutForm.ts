import { useForm } from '@tanstack/react-form'
import type { FormEvent } from 'react'

import {
	checkoutCustomerSchema,
	getCheckoutDefaultValues,
} from '../lib/checkoutValidation'
import type { CheckoutCustomer } from './types'

interface UseCheckoutFormParams {
	handleCheckoutSubmit: (customer: CheckoutCustomer) => Promise<void>
}

export function useCheckoutForm({
	handleCheckoutSubmit,
}: UseCheckoutFormParams) {
	const form = useForm({
		defaultValues: getCheckoutDefaultValues(),
		validators: {
			onSubmit: checkoutCustomerSchema,
		},
		onSubmit: async ({ value }) => {
			await handleCheckoutSubmit(value)
		},
	})

	const handleCheckoutFormSubmit = async (
		event: FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault()
		await form.handleSubmit()
	}

	return {
		handleCheckoutFormSubmit,
		form,
	}
}

export type CheckoutFormApi = ReturnType<typeof useCheckoutForm>['form']
