import { act, renderHook } from '@testing-library/react'
import type { ChangeEvent, FormEvent } from 'react'
import { describe, expect, test } from 'vitest'

import { useCheckoutForm } from './useCheckoutForm'

const createMockEvent = () =>
	({
		preventDefault: () => undefined,
	}) as unknown as FormEvent<HTMLFormElement>

describe('useCheckoutForm', () => {
	test('validates and returns null for empty submission', () => {
		const { result } = renderHook(() => useCheckoutForm())

		let submission: ReturnType<typeof result.current.handleCheckoutFormSubmit> =
			null

		act(() => {
			submission = result.current.handleCheckoutFormSubmit(createMockEvent())
		})

		expect(submission).toBeNull()
		expect(result.current.errors.fullName).toBeDefined()
	})

	test('returns customer data for valid submission', () => {
		const { result } = renderHook(() => useCheckoutForm())

		act(() => {
			result.current.handleCheckoutFullNameChange({
				currentTarget: { value: 'Jane Doe' },
			} as ChangeEvent<HTMLInputElement>)
			result.current.handleCheckoutEmailChange({
				currentTarget: { value: 'jane@example.com' },
			} as ChangeEvent<HTMLInputElement>)
			result.current.handleCheckoutAddressChange({
				currentTarget: { value: '1 Main Street' },
			} as ChangeEvent<HTMLInputElement>)
			result.current.handleCheckoutCityChange({
				currentTarget: { value: 'Johannesburg' },
			} as ChangeEvent<HTMLInputElement>)
			result.current.handleCheckoutCountryChange({
				currentTarget: { value: 'South Africa' },
			} as ChangeEvent<HTMLInputElement>)
			result.current.handleCheckoutPostalCodeChange({
				currentTarget: { value: '2000' },
			} as ChangeEvent<HTMLInputElement>)
		})

		let submission: ReturnType<typeof result.current.handleCheckoutFormSubmit> =
			null

		act(() => {
			submission = result.current.handleCheckoutFormSubmit(createMockEvent())
		})

		expect(submission).toEqual({
			address: '1 Main Street',
			city: 'Johannesburg',
			country: 'South Africa',
			email: 'jane@example.com',
			fullName: 'Jane Doe',
			postalCode: '2000',
		})
	})
})
