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
