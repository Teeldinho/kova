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
