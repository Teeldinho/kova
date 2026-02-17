import { Minus, Plus, ShoppingBag } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

import type { CartRewardSnapshot } from '@/entities/cart'
import type { Product } from '@/entities/product'
import { ProductRating } from '@/entities/product'
import { Button } from '@/shared/ui'

import { useProductDetailInfo } from '../model/useProductDetailInfo'

interface ProductDetailInfoProps {
	product: Product
	projectedRewardSnapshot: CartRewardSnapshot
	quantity: number
	handleProductQuantityIncrease: () => void
	handleProductQuantityDecrease: () => void
	handleProductAddToCart: () => void
}

export function ProductDetailInfo({
	product,
	projectedRewardSnapshot,
	quantity,
	handleProductQuantityIncrease,
	handleProductQuantityDecrease,
	handleProductAddToCart,
}: ProductDetailInfoProps) {
	const {
		addToCartLabel,
		categoryLabel,
		decreaseQuantityLabel,
		descriptionLabel,
		displayPrice,
		estimatedDelivery,
		estimatedDeliveryPrefix,
		increaseQuantityLabel,
		quantityLabel,
		rewardProgressPercentage,
		rewardStatusLabel,
		rewardUnlockHintLabel,
	} = useProductDetailInfo({
		product,
		projectedRewardSnapshot,
	})

	return (
		<section className="space-y-5 border border-border bg-card p-6 md:sticky md:top-24 md:p-8">
			<span className="inline-flex border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
				{categoryLabel}
			</span>

			<h1 className="font-mono text-2xl leading-tight font-black tracking-tight md:text-3xl">
				{product.title}
			</h1>

			<ProductRating rate={product.rating.rate} count={product.rating.count} />

			<p className="font-mono text-2xl font-bold">{displayPrice}</p>

			<div className="space-y-2 border-y border-border py-4">
				<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
					{quantityLabel}
				</p>
				<div className="inline-flex items-center border border-border">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="h-10 w-10 rounded-none"
						onClick={handleProductQuantityDecrease}
						aria-label={decreaseQuantityLabel}
					>
						<Minus size={16} />
					</Button>
					<span className="inline-flex h-10 min-w-12 items-center justify-center font-mono text-sm font-bold">
						{quantity}
					</span>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="h-10 w-10 rounded-none"
						onClick={handleProductQuantityIncrease}
						aria-label={increaseQuantityLabel}
					>
						<Plus size={16} />
					</Button>
				</div>
			</div>

			<motion.div whileTap={{ scale: 0.98 }}>
				<Button
					type="button"
					className="h-11 w-full rounded-none font-mono text-[10px] uppercase tracking-widest"
					onClick={handleProductAddToCart}
				>
					<ShoppingBag size={14} className="mr-2" />
					{addToCartLabel}
				</Button>
			</motion.div>

			<div className="space-y-2 border border-border bg-muted/40 p-3">
				<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
					{rewardStatusLabel}
				</p>

				{rewardUnlockHintLabel ? (
					<p className="font-mono text-[10px] uppercase tracking-widest text-foreground">
						{rewardUnlockHintLabel}
					</p>
				) : null}

				<div className="h-1.5 w-full bg-border">
					<div
						className="h-full bg-primary transition-all duration-300"
						style={{ width: `${rewardProgressPercentage}%` }}
					/>
				</div>
			</div>

			<div className="space-y-2">
				<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
					{descriptionLabel}
				</p>
				<p className="text-sm leading-relaxed text-muted-foreground">
					{product.description}
				</p>
			</div>

			<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
				{estimatedDeliveryPrefix} {estimatedDelivery}
			</p>
		</section>
	)
}
