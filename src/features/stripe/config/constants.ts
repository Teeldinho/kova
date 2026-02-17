export const STRIPE_CHECKOUT = {
	MODE: 'payment',
	SESSION_QUERY_KEY: 'session_id',
	ERROR_REASON_QUERY_KEY: 'reason',
	ERROR_REASONS: {
		PAYMENT_CANCELED: 'payment_canceled',
	},
	ERROR_CODES: {
		MISSING_SECRET_KEY: 'STRIPE_CHECKOUT_MISSING_SECRET_KEY',
		SESSION_CREATION_FAILED: 'STRIPE_CHECKOUT_SESSION_CREATION_FAILED',
		SESSION_URL_UNAVAILABLE: 'STRIPE_CHECKOUT_SESSION_URL_UNAVAILABLE',
	},
	ERROR_MESSAGES: {
		DEFAULT: 'Unable to start secure checkout. Please retry.',
		MISSING_SECRET_KEY:
			'Secure checkout is currently unavailable. Please contact support.',
	},
	TOAST: {
		ERROR_TITLE: 'Checkout failed',
	},
} as const
