import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

import type { Product } from '../model/types'
import { useProductCard } from '../model/useProductCard'
import { ProductRating } from './ProductRating'

interface ProductCardProps {
	product: Product
	index?: number
	featured?: boolean
}

export function ProductCard({
	product,
	index = 0,
	featured = false,
}: ProductCardProps) {
	const {
		categoryLabel,
		displayPrice,
		displayTitle,
		featuredClassName,
		motionDelay,
		motionDuration,
		motionOffsetY,
		productId,
	} = useProductCard({ featured, index, product })

	return (
		<motion.div
			initial={{ opacity: 0, y: motionOffsetY }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: motionDuration, delay: motionDelay }}
			className={`group relative ${featuredClassName}`}
		>
			<Link to="/products/$productId" params={{ productId }} className="block">
				<div className="relative aspect-square overflow-hidden border border-border bg-card">
					<div className="absolute top-0 left-0 z-10 h-4 w-4 border-t-2 border-l-2 border-foreground/20 transition-colors group-hover:border-primary" />
					<div className="absolute top-0 right-0 z-10 h-4 w-4 border-t-2 border-r-2 border-foreground/20 transition-colors group-hover:border-primary" />
					<div className="absolute bottom-0 left-0 z-10 h-4 w-4 border-b-2 border-l-2 border-foreground/20 transition-colors group-hover:border-primary" />
					<div className="absolute right-0 bottom-0 z-10 h-4 w-4 border-r-2 border-b-2 border-foreground/20 transition-colors group-hover:border-primary" />
					<img
						src={product.image}
						alt={product.title}
						className="h-full w-full object-contain p-8 transition-all duration-500 group-hover:scale-95 group-hover:grayscale"
						loading="lazy"
					/>
					<div className="grain-overlay pointer-events-none absolute inset-0" />
				</div>
				<div className="mt-3 space-y-1.5">
					<span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
						{categoryLabel}
					</span>
					<h3 className="font-mono text-sm leading-tight font-medium">
						{displayTitle}
					</h3>
					<ProductRating
						rate={product.rating.rate}
						count={product.rating.count}
					/>
					<p className="font-mono text-sm font-bold">{displayPrice}</p>
				</div>
			</Link>
		</motion.div>
	)
}
