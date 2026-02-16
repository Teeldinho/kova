import { act, renderHook } from '@testing-library/react'
import type { FormEvent } from 'react'
import { describe, expect, test, vi } from 'vitest'

import { useCheckoutForm } from './useCheckoutForm'

const createMockEvent = () =>
	({
		preventDefault: vi.fn(),
	}) as unknown as FormEvent<HTMLFormElement>

describe('useCheckoutForm', () => {
	test('does not submit checkout when form values are invalid', async () => {
		const handleCheckoutSubmit = vi.fn().mockResolvedValue(undefined)
		const { result } = renderHook(() =>
			useCheckoutForm({ handleCheckoutSubmit }),
		)

		const event = createMockEvent()

		await act(async () => {
			await result.current.handleCheckoutFormSubmit(event)
		})

		expect(event.preventDefault).toHaveBeenCalled()
		expect(handleCheckoutSubmit).not.toHaveBeenCalled()
	})

	test('submits checkout when customer fields are valid', async () => {
		const handleCheckoutSubmit = vi.fn().mockResolvedValue(undefined)
		const { result } = renderHook(() =>
			useCheckoutForm({ handleCheckoutSubmit }),
		)

		act(() => {
			result.current.form.setFieldValue('fullName', 'Jane Doe')
			result.current.form.setFieldValue('email', 'jane@example.com')
			result.current.form.setFieldValue('address', '1 Main Street')
			result.current.form.setFieldValue('city', 'Johannesburg')
			result.current.form.setFieldValue('country', 'South Africa')
			result.current.form.setFieldValue('postalCode', '2000')
		})

		await act(async () => {
			await result.current.handleCheckoutFormSubmit(createMockEvent())
		})

		expect(handleCheckoutSubmit).toHaveBeenCalledWith({
			address: '1 Main Street',
			city: 'Johannesburg',
			country: 'South Africa',
			email: 'jane@example.com',
			fullName: 'Jane Doe',
			postalCode: '2000',
		})
	})
})
