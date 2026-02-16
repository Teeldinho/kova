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
	return (
		<div className={`flex items-center gap-1.5 ${className}`}>
			<div className="flex items-center gap-0.5">
				{Array.from({ length: PRODUCT.MAX_RATING }).map((_, i) => (
					<Star
						key={`star-${rate}-${i}`}
						size={12}
						weight={i < Math.round(rate) ? 'fill' : 'regular'}
						className={
							i < Math.round(rate) ? 'text-primary' : 'text-muted-foreground/40'
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
