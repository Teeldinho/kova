import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { PRODUCT } from '../config/constants'
import type { Product } from '../model/types'
import { useProductCard } from '../model/useProductCard'
import { useProductCardPrefetch } from '../model/useProductCardPrefetch'
import { ProductRating } from './ProductRating'

interface ProductCardProps {
	product: Product
	index?: number
	layoutClassName?: string
	renderActions?: (product: Product) => ReactNode
}

export function ProductCard({
	product,
	index = 0,
	layoutClassName = 'col-span-1',
	renderActions,
}: ProductCardProps) {
	const {
		categoryLabel,
		displayPrice,
		displayTitle,
		motionDelay,
		motionDuration,
		motionOffsetY,
		productId,
	} = useProductCard({ index, product })
	const { handleProductCardFocus, handleProductCardPointerEnter } =
		useProductCardPrefetch({ productId: product.id })

	return (
		<motion.div
			initial={{ opacity: 0, y: motionOffsetY }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: motionDuration, delay: motionDelay }}
			className={`group relative ${layoutClassName}`}
		>
			<Link
				to="/products/$productId"
				params={{ productId }}
				className="block border border-border/70 bg-card p-3 transition-colors duration-200 hover:border-primary/50 hover:bg-card/90 md:p-4"
				preload="intent"
				preloadDelay={PRODUCT.CARD_PREFETCH_INTENT_DELAY_MS}
				onFocus={handleProductCardFocus}
				onPointerEnter={handleProductCardPointerEnter}
			>
				<div className="product-image-surface relative flex h-56 items-center justify-center overflow-hidden border border-border bg-secondary/35 sm:h-64 lg:h-72">
					<div className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/5" />
					<img
						src={product.image}
						alt={product.title}
						className="relative z-10 h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
					/>

					{renderActions?.(product)}
				</div>

				<div className="mt-4 space-y-2">
					<span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
						{categoryLabel}
					</span>

					<h3 className="font-mono text-sm leading-snug font-medium transition-colors group-hover:text-primary md:text-[15px]">
						{displayTitle}
					</h3>

					<ProductRating
						rate={product.rating.rate}
						count={product.rating.count}
					/>

					<p className="font-mono text-sm font-semibold tracking-tight">
						{displayPrice}
					</p>
				</div>
			</Link>
		</motion.div>
	)
}
