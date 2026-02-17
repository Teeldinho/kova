export const PRODUCT_DETAIL = {
	QUANTITY_LABEL: 'Quantity',
	ADD_TO_CART_LABEL: 'Add To Cart',
	DECREASE_QUANTITY_LABEL: 'Decrease quantity',
	DESCRIPTION_LABEL: 'Description',
	ESTIMATED_DELIVERY: '2-5 business days',
	ESTIMATED_DELIVERY_PREFIX: 'Estimated delivery:',
	INCREASE_QUANTITY_LABEL: 'Increase quantity',
	REWARD: {
		UNLOCKED_PREFIX: 'Reward unlocked:',
		NEXT_PREFIX: 'Next reward:',
		UNLOCK_HINT_PREFIX: 'Add',
		UNLOCK_HINT_INFIX: 'to unlock',
	},
} as const

export const PRODUCT_DETAIL_ERROR = {
	DESCRIPTION: "We couldn't load this product right now. Please retry.",
	RETRY_LABEL: 'Retry',
	TITLE: 'Product unavailable',
} as const
