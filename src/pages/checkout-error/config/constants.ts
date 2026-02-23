export const CHECKOUT_ERROR = {
	HOME_LABEL: 'Go Home',
	REASON_LABEL: 'Reason',
	RETRY_LABEL: 'Retry Checkout',
	DESCRIPTION:
		'We could not complete your payment. Review the details below and try again.',
	TITLE: 'Checkout Interrupted',
} as const

export const CHECKOUT_ERROR_REASONS = {
	UNKNOWN: 'No reason provided by the payment provider.',
	card_declined: 'Your card was declined. Try another payment method.',
	expired_session:
		'Your checkout session expired. Start a new payment attempt.',
	insufficient_funds: 'Your card has insufficient funds for this purchase.',
	payment_canceled: 'Payment was canceled before completion.',
} as const
