export const CHECKOUT_PAGE = {
	BACK_TO_CART_LABEL: 'Back To Cart',
	EMPTY_CART_MESSAGE: 'Your cart is empty. Add products before checkout.',
	REVIEW_ARCHIVE_LABEL: 'Review Archive',
	ROUTE_PENDING_MS: 0,
	ROUTE_PENDING_MIN_MS: 300,
	DEMO_PAYMENT_ALERT: {
		TITLE: 'Demo checkout instructions',
		DESCRIPTION:
			'This project uses Stripe test mode. Use the details below before selecting Pay Securely.',
		FIELDS: [
			{ label: 'Card number', value: '4242 4242 4242 4242' },
			{ label: 'Expiry date', value: 'Any future date (e.g. 12/34)' },
			{ label: 'CVC', value: 'Any 3 digits (e.g. 123)' },
			{ label: 'Postal code', value: 'Any valid value (e.g. 2000)' },
		],
	},
} as const

export const CHECKOUT_FORM = {
	DESCRIPTION:
		'Complete your shipping details to continue to secure Stripe checkout.',
	LABELS: {
		ADDRESS: 'Address',
		CITY: 'City',
		COUNTRY: 'Country',
		EMAIL: 'Email',
		FULL_NAME: 'Full Name',
		POSTAL_CODE: 'Postal Code',
	},
	PLACEHOLDERS: {
		ADDRESS: 'Street address',
		CITY: 'City',
		COUNTRY: 'Country',
		EMAIL: 'name@example.com',
		FULL_NAME: 'Jane Doe',
		POSTAL_CODE: '0001',
	},
	SUBMIT_LABEL: 'Pay Securely',
	SUBMIT_INVALID_MESSAGE:
		'Please review the highlighted checkout details and try again.',
	SUBMIT_PENDING_LABEL: 'Redirecting To Stripe...',
	SUMMARY_TITLE: 'Payment Summary',
	TITLE: 'Checkout',
} as const

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

export const ORDER = {
	CURRENCY: 'zar',
	MIN_UNIT_AMOUNT: 50,
} as const
