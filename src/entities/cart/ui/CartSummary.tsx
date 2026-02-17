import { Button } from '@/shared/ui'

import type { CartRewardSnapshot } from '../lib/cartRewards'
import { useCartSummary } from '../model/useCartSummary'

interface CartSummaryProps {
	discount: number
	rewardSnapshot: CartRewardSnapshot
	subtotal: number
	tax: number
	total: number
	handleCheckoutStart?: () => void
	checkoutLabel?: string
}

export function CartSummary({
	discount,
	rewardSnapshot,
	subtotal,
	tax,
	total,
	handleCheckoutStart,
	checkoutLabel,
}: CartSummaryProps) {
	const {
		activeRewardLabel,
		checkoutLabel: checkoutActionLabel,
		displayAmountToNextReward,
		displayDiscount,
		displaySubtotal,
		displayTax,
		displayTotal,
		hasDiscount,
		hasUnlockedReward,
		nextRewardLabel,
		rewardLabels,
		rewardProgressPercentage,
		shippingPlaceholder,
		summaryLabels,
	} = useCartSummary({
		checkoutLabel,
		discount,
		rewardSnapshot,
		subtotal,
		tax,
		total,
	})

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
				{hasDiscount ? (
					<div className="flex items-center justify-between text-primary">
						<span>{summaryLabels.REWARD_LABEL}</span>
						<span>-{displayDiscount}</span>
					</div>
				) : null}
				<div className="flex items-center justify-between border-t border-border pt-2 font-bold">
					<span>{summaryLabels.TOTAL_LABEL}</span>
					<span>{displayTotal}</span>
				</div>
			</div>

			<div className="space-y-2 border border-border bg-muted/40 p-2">
				<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
					{hasUnlockedReward
						? `${rewardLabels.UNLOCKED_LABEL}: ${activeRewardLabel}`
						: `${rewardLabels.PROGRESS_LABEL}: ${nextRewardLabel}`}
				</p>
				{!hasUnlockedReward ? (
					<p className="font-mono text-[10px] uppercase tracking-widest">
						Add {displayAmountToNextReward} to unlock {nextRewardLabel}
					</p>
				) : null}
				<div className="h-1.5 w-full bg-border">
					<div
						className="h-full bg-primary transition-all duration-300"
						style={{ width: `${rewardProgressPercentage}%` }}
					/>
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
