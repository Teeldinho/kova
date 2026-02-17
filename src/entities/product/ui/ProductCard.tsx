import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

import { PRODUCT } from '../config/constants'
import type { Product } from '../model/types'
import { useProductCard } from '../model/useProductCard'
import { useProductCardPrefetch } from '../model/useProductCardPrefetch'
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
	const { handleProductCardFocus, handleProductCardPointerEnter } =
		useProductCardPrefetch({ productId: product.id })

	return (
		<motion.div
			initial={{ opacity: 0, y: motionOffsetY }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: motionDuration, delay: motionDelay }}
			className={`group relative ${featuredClassName}`}
		>
			<Link
				to="/products/$productId"
				params={{ productId }}
				className="block"
				preload="intent"
				preloadDelay={PRODUCT.CARD_PREFETCH_INTENT_DELAY_MS}
				onFocus={handleProductCardFocus}
				onPointerEnter={handleProductCardPointerEnter}
			>
				<div className="product-image-surface relative aspect-square overflow-hidden border border-border">
					<div className="absolute top-0 left-0 z-10 h-4 w-4 border-t-2 border-l-2 border-foreground/20 transition-colors group-hover:border-primary" />
					<div className="absolute top-0 right-0 z-10 h-4 w-4 border-t-2 border-r-2 border-foreground/20 transition-colors group-hover:border-primary" />
					<div className="absolute bottom-0 left-0 z-10 h-4 w-4 border-b-2 border-l-2 border-foreground/20 transition-colors group-hover:border-primary" />
					<div className="absolute right-0 bottom-0 z-10 h-4 w-4 border-r-2 border-b-2 border-foreground/20 transition-colors group-hover:border-primary" />
					<div className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/8" />
					<img
						src={product.image}
						alt={product.title}
						className="relative z-10 h-full w-full object-contain p-8 transition-all duration-500 group-hover:scale-95 group-hover:grayscale"
						loading="lazy"
					/>
					<div className="grain-overlay pointer-events-none absolute inset-0" />
				</div>
				<div className="mt-3 space-y-1.5">
					<span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
						{categoryLabel}
					</span>
					<h3 className="font-mono text-sm leading-tight font-medium transition-colors group-hover:text-primary">
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
