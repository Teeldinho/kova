export interface CheckoutCustomer {
	address: string
	city: string
	country: string
	email: string
	fullName: string
	postalCode: string
}

export interface CheckoutLineItem {
	description: string
	image: string
	name: string
	quantity: number
	unitAmountInCents: number
}

export interface CheckoutPayload {
	customer: CheckoutCustomer
	items: CheckoutLineItem[]
	origin: string
}
