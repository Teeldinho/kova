import { formatPrice } from '@/shared/lib'

import { CART } from '../config/constants'

interface UseCartSummaryParams {
	checkoutLabel?: string
	subtotal: number
	tax: number
	total: number
}

export function useCartSummary({
	checkoutLabel,
	subtotal,
	tax,
	total,
}: UseCartSummaryParams) {
	return {
		checkoutLabel: checkoutLabel ?? CART.CHECKOUT_LABEL,
		displaySubtotal: formatPrice(subtotal),
		displayTax: formatPrice(tax),
		displayTotal: formatPrice(total),
		shippingPlaceholder: CART.SHIPPING_PLACEHOLDER,
		summaryLabels: CART.SUMMARY,
	}
}
