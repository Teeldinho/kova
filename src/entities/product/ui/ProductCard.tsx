import { Link } from '@tanstack/react-router'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
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

	const actionNode = renderActions?.(product)
	const hasActionNode = Boolean(actionNode)

	// Soft 3D Tilt
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 })
	const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 })
	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg'])
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg'])

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (hasActionNode) {
			return
		}

		const rect = e.currentTarget.getBoundingClientRect()
		x.set((e.clientX - rect.left) / rect.width - 0.5)
		y.set((e.clientY - rect.top) / rect.height - 0.5)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: motionOffsetY }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{
				duration: motionDuration,
				delay: motionDelay,
				ease: [0.23, 1, 0.32, 1],
			}}
			className={`group relative ${layoutClassName}`}
			onMouseMove={handleMouseMove}
			onMouseLeave={() => {
				if (hasActionNode) {
					return
				}

				x.set(0)
				y.set(0)
			}}
			style={
				hasActionNode
					? undefined
					: { rotateX, rotateY, transformStyle: 'preserve-3d' }
			}
		>
			<Link
				to="/products/$productId"
				params={{ productId }}
				className="relative block border border-border bg-card p-0 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5"
				preload="intent"
				preloadDelay={PRODUCT.CARD_PREFETCH_INTENT_DELAY_MS}
				onFocus={handleProductCardFocus}
				onPointerEnter={handleProductCardPointerEnter}
				data-cursor-label="VIEW"
			>
				{/* Minimal Label */}
				<div className="absolute top-4 left-4 z-20 flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-primary">
					<div className="h-1 w-1 bg-current" />
					<span>Archive_#{product.id.toString().padStart(3, '0')}</span>
				</div>

				<div className="product-image-surface relative flex h-72 items-center justify-center overflow-hidden bg-background md:h-80 lg:h-96">
					<div className="scanning-line z-20" />

					<motion.img
						src={product.image}
						alt={product.title}
						className="relative z-10 h-full w-full object-contain p-12 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
						loading="lazy"
						style={
							hasActionNode ? undefined : { transform: 'translateZ(40px)' }
						}
					/>

					<div className="absolute inset-0 z-10 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/[0.02]" />
				</div>

				<div className="relative z-20 space-y-4 border-t border-border bg-card p-6 transition-colors group-hover:bg-background">
					<div className="space-y-1">
						<span className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary/60 font-bold">
							{categoryLabel}
						</span>
						<h3 className="font-mono text-sm leading-tight font-black uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors line-clamp-1">
							{displayTitle}
						</h3>
					</div>

					<div className="flex flex-col gap-3 border-t border-border/40 pt-4 lg:flex-row lg:items-center lg:justify-between">
						<ProductRating
							rate={product.rating.rate}
							count={product.rating.count}
							className="min-w-0"
						/>
						<p className="font-mono text-sm font-black tracking-tighter text-foreground whitespace-nowrap transition-colors group-hover:text-primary md:text-base">
							{displayPrice}
						</p>
					</div>
				</div>
			</Link>

			{hasActionNode ? (
				<div className="product-card-action-layer absolute top-0 right-2 z-30 flex h-72 items-end pb-2 md:h-80 lg:h-96">
					<div>{actionNode}</div>
				</div>
			) : null}
		</motion.div>
	)
}
