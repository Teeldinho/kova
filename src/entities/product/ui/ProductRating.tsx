import { Star } from '@phosphor-icons/react'

import { useProductRating } from '../model/useProductRating'

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
	const { displayRating, ratingRounded, ratingSteps } = useProductRating(rate)

	return (
		<div className={`flex items-center gap-1.5 ${className}`}>
			<div className="flex items-center gap-0.5">
				{ratingSteps.map((step) => (
					<Star
						key={`star-${step}`}
						size={12}
						weight={step <= ratingRounded ? 'fill' : 'regular'}
						className={
							step <= ratingRounded
								? 'text-primary'
								: 'text-muted-foreground/40'
						}
					/>
				))}
			</div>
			<span className="font-mono text-[10px] text-muted-foreground">
				{displayRating} ({count})
			</span>
		</div>
	)
}
