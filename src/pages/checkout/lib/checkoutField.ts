export const getCheckoutFieldErrorId = (fieldId: string) => `${fieldId}-error`

export const getCheckoutFieldErrorMessage = (errors: unknown[] | undefined) => {
	if (!errors || errors.length === 0) {
		return undefined
	}

	const firstError = errors[0]
	return typeof firstError === 'string' ? firstError : undefined
}
