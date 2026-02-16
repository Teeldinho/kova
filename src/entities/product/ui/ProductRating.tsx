import { Star } from '@phosphor-icons/react'

import { PRODUCT } from '../config/constants'
import { formatRating } from '../lib/formatProduct'

interface ProductRatingProps {
	rate: number
	count: number
	className?: string
}

export function ProductRating({
	rate,
	count,
	className = '',
}: ProductRatingProps) {
	const ratingSteps = [1, 2, 3, 4, 5]

	return (
		<div className={`flex items-center gap-1.5 ${className}`}>
			<div className="flex items-center gap-0.5">
				{ratingSteps.slice(0, PRODUCT.MAX_RATING).map((step) => (
					<Star
						key={`star-${step}`}
						size={12}
						weight={step <= Math.round(rate) ? 'fill' : 'regular'}
						className={
							step <= Math.round(rate)
								? 'text-primary'
								: 'text-muted-foreground/40'
						}
					/>
				))}
			</div>
			<span className="font-mono text-[10px] text-muted-foreground">
				{formatRating(rate)} ({count})
			</span>
		</div>
	)
}
