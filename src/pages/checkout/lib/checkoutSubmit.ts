export const shouldShowCheckoutSubmitError = (
	submissionAttempts: number,
	isValid: boolean,
) => submissionAttempts > 0 && !isValid
