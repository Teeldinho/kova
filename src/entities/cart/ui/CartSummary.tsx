import { Button } from '@/shared/ui'

import { useCartSummary } from '../model/useCartSummary'

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
	checkoutLabel,
}: CartSummaryProps) {
	const {
		checkoutLabel: checkoutActionLabel,
		displaySubtotal,
		displayTax,
		displayTotal,
		shippingPlaceholder,
		summaryLabels,
	} = useCartSummary({ checkoutLabel, subtotal, tax, total })

	return (
		<section className="space-y-4 border border-border bg-card p-4">
			<h2 className="font-mono text-xs font-bold uppercase tracking-widest">
				{summaryLabels.ORDER_LABEL}
			</h2>

			<div className="space-y-2 font-mono text-xs">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">
						{summaryLabels.SUBTOTAL_LABEL}
					</span>
					<span>{displaySubtotal}</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">
						{summaryLabels.SHIPPING_LABEL}
					</span>
					<span>{shippingPlaceholder}</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">
						{summaryLabels.TAX_LABEL}
					</span>
					<span>{displayTax}</span>
				</div>
				<div className="flex items-center justify-between border-t border-border pt-2 font-bold">
					<span>{summaryLabels.TOTAL_LABEL}</span>
					<span>{displayTotal}</span>
				</div>
			</div>

			{handleCheckoutStart ? (
				<Button
					type="button"
					className="h-11 w-full rounded-none font-mono text-[10px] uppercase tracking-widest"
					onClick={handleCheckoutStart}
				>
					{checkoutActionLabel}
				</Button>
			) : null}
		</section>
	)
}
