export const CHECKOUT_FORM = {
	DESCRIPTION:
		'Complete your shipping details to continue to secure Stripe checkout.',
	IDS: {
		ADDRESS: 'checkout-address',
		CITY: 'checkout-city',
		COUNTRY: 'checkout-country',
		EMAIL: 'checkout-email',
		FULL_NAME: 'checkout-full-name',
		POSTAL_CODE: 'checkout-postal-code',
	},
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
	SUBMIT_PENDING_LABEL: 'Redirecting To Stripe...',
	SUMMARY_TITLE: 'Payment Summary',
	TITLE: 'Checkout',
} as const
