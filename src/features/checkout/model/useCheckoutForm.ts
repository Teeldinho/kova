import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'

import type { CheckoutCustomer } from '@/entities/order'

import {
	getCheckoutDefaultValues,
	hasCheckoutErrors,
	validateCheckoutCustomer,
} from '../lib/checkoutValidation'

export interface CheckoutFieldHandlers {
	handleCheckoutAddressChange: (event: ChangeEvent<HTMLInputElement>) => void
	handleCheckoutCityChange: (event: ChangeEvent<HTMLInputElement>) => void
	handleCheckoutCountryChange: (event: ChangeEvent<HTMLInputElement>) => void
	handleCheckoutEmailChange: (event: ChangeEvent<HTMLInputElement>) => void
	handleCheckoutFullNameChange: (event: ChangeEvent<HTMLInputElement>) => void
	handleCheckoutPostalCodeChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function useCheckoutForm() {
	const [customer, setCustomer] = useState<CheckoutCustomer>(
		getCheckoutDefaultValues,
	)
	const [errors, setErrors] = useState<
		Partial<Record<keyof CheckoutCustomer, string>>
	>({})

	const updateField = (field: keyof CheckoutCustomer, value: string) => {
		setCustomer((previous) => ({
			...previous,
			[field]: value,
		}))
		setErrors((previous) => ({
			...previous,
			[field]: undefined,
		}))
	}

	const handleCheckoutFullNameChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		updateField('fullName', event.currentTarget.value)
	}

	const handleCheckoutEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		updateField('email', event.currentTarget.value)
	}

	const handleCheckoutAddressChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		updateField('address', event.currentTarget.value)
	}

	const handleCheckoutCityChange = (event: ChangeEvent<HTMLInputElement>) => {
		updateField('city', event.currentTarget.value)
	}

	const handleCheckoutCountryChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		updateField('country', event.currentTarget.value)
	}

	const handleCheckoutPostalCodeChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		updateField('postalCode', event.currentTarget.value)
	}

	const handleCheckoutFormSubmit = (
		event: FormEvent<HTMLFormElement>,
	): CheckoutCustomer | null => {
		event.preventDefault()

		const nextErrors = validateCheckoutCustomer(customer)
		setErrors(nextErrors)

		if (hasCheckoutErrors(nextErrors)) {
			return null
		}

		return customer
	}

	const resetCheckoutForm = () => {
		setCustomer(getCheckoutDefaultValues())
		setErrors({})
	}

	return {
		customer,
		errors,
		handleCheckoutAddressChange,
		handleCheckoutCityChange,
		handleCheckoutCountryChange,
		handleCheckoutEmailChange,
		handleCheckoutFormSubmit,
		handleCheckoutFullNameChange,
		handleCheckoutPostalCodeChange,
		resetCheckoutForm,
	}
}
