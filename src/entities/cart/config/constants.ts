export const CART = {
	A11Y: {
		DECREASE_QUANTITY_LABEL: 'Decrease quantity',
		INCREASE_QUANTITY_LABEL: 'Increase quantity',
	},
	CHECKOUT_LABEL: 'Checkout',
	CHECKOUT_SHEET_LABEL: 'Go To Checkout',
	STORAGE_KEY: 'kova-store',
	MAX_ITEM_QUANTITY: 10,
	MIN_ITEM_QUANTITY: 1,
	REMOVE_LABEL: 'Remove',
	VIEW_CART_LABEL: 'View Cart',
	TOAST: {
		REMOVED_TITLE: 'Removed from bag',
		CLEARED_TITLE: 'Bag cleared',
	},
	SUMMARY: {
		ORDER_LABEL: 'Order Summary',
		REWARD_LABEL: 'Reward',
		SHIPPING_LABEL: 'Shipping',
		SUBTOTAL_LABEL: 'Subtotal',
		TAX_LABEL: 'Tax',
		TOTAL_LABEL: 'Total',
	},
	REWARDS: {
		PROGRESS_LABEL: 'Next reward',
		UNLOCKED_LABEL: 'Reward unlocked',
		TIERS: [
			{ thresholdInZar: 1200, discountRate: 0.05, label: '5% off' },
			{ thresholdInZar: 2500, discountRate: 0.1, label: '10% off' },
			{ thresholdInZar: 4000, discountRate: 0.15, label: '15% off' },
		],
	},
	EMPTY_LABEL: 'Your cart is empty',
	START_SHOPPING_LABEL: 'Start Shopping',
	SHIPPING_PLACEHOLDER: 'Free',
	TAX_RATE: 0,
	IMAGE: {
		SIZE_PX: 96,
		SIZES: '96px',
		SRCSET_WIDTHS: [96, 192],
	},
} as const
