import { formatPrice } from '@/shared/lib'
import { Button } from '@/shared/ui/button'

import { CART } from '../config/constants'

interface CartSummaryProps {
	subtotal: number
	tax: number
	total: number
	handleCheckoutStart?: () => void
	checkoutLabel?: string
}

export function CartSummary({
	subtotal,
	tax,
	total,
	handleCheckoutStart,
	checkoutLabel = 'Checkout',
}: CartSummaryProps) {
	return (
		<section className="space-y-4 border border-border bg-card p-4">
			<h2 className="font-mono text-xs font-bold uppercase tracking-widest">
				Order Summary
			</h2>

			<div className="space-y-2 font-mono text-xs">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Subtotal</span>
					<span>{formatPrice(subtotal)}</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Shipping</span>
					<span>{CART.SHIPPING_PLACEHOLDER}</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Tax</span>
					<span>{formatPrice(tax)}</span>
				</div>
				<div className="flex items-center justify-between border-t border-border pt-2 font-bold">
					<span>Total</span>
					<span>{formatPrice(total)}</span>
				</div>
			</div>

			{handleCheckoutStart ? (
				<Button
					type="button"
					className="h-11 w-full rounded-none font-mono text-[10px] uppercase tracking-widest"
					onClick={handleCheckoutStart}
				>
					{checkoutLabel}
				</Button>
			) : null}
		</section>
	)
}
