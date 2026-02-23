import { Info, ShieldCheck, ShoppingBag, Truck } from '@phosphor-icons/react'
import { m as motion } from 'framer-motion'

import type { CartRewardSnapshot } from '@/entities/cart'
import type { Product } from '@/entities/product'
import { ProductRating } from '@/entities/product'
import { Button, Card, CardContent, QuantitySelector } from '@/shared/ui'

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
		descriptionLabel,
		displayPrice,
		estimatedDelivery,
		estimatedDeliveryPrefix,
		quantityLabel,
		rewardProgressPercentage,
		rewardStatusLabel,
		rewardUnlockHintLabel,
	} = useProductDetailInfo({
		product,
		projectedRewardSnapshot,
	})

	return (
		<section className="space-y-8 lg:sticky lg:top-32">
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<span className="bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-background">
						{categoryLabel}
					</span>
					<span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest opacity-60">
						ID: #{product.id.toString().padStart(4, '0')}
					</span>
				</div>

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
					className="font-mono text-4xl font-black uppercase tracking-tighter text-foreground md:text-6xl"
				>
					{product.title}
				</motion.h1>

				<div className="flex items-center gap-8 border-y border-border/40 py-6">
					<ProductRating
						rate={product.rating.rate}
						count={product.rating.count}
					/>
					<div className="h-6 w-[1px] bg-border" />
					<p className="font-mono text-3xl font-black tracking-tighter text-primary">
						{displayPrice}
					</p>
				</div>

				<div className="space-y-4 pt-1">
					<label
						htmlFor="quantity-selector"
						className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground"
					>
						{quantityLabel}
					</label>
					<QuantitySelector
						value={quantity}
						onChange={(val: number) => {
							if (val > quantity) handleProductQuantityIncrease()
							else handleProductQuantityDecrease()
						}}
						className="w-full max-w-[220px]"
					/>
					<Button
						variant="default"
						size="lg"
						className="h-14 w-full cursor-pointer border-2 border-primary text-sm font-black uppercase shadow-xl shadow-primary/15 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-2xl hover:shadow-primary/30"
						onClick={handleProductAddToCart}
						data-cursor-label="ADD"
					>
						<ShoppingBag size={20} className="mr-3" weight="bold" />
						{addToCartLabel}
					</Button>
				</div>
			</div>

			<Card className="border border-border">
				<CardContent className="space-y-8 p-6">
					<div className="space-y-4">
						<p className="flex items-center gap-3 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-primary">
							<ShieldCheck size={18} weight="bold" />
							{rewardStatusLabel}
						</p>

						<div className="relative h-1.5 w-full bg-border/30">
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: `${rewardProgressPercentage}%` }}
								transition={{
									delay: 0.5,
									duration: 1.5,
									ease: [0.23, 1, 0.32, 1],
								}}
								className="h-full bg-primary"
							/>
						</div>

						{rewardUnlockHintLabel && (
							<p className="font-mono text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
								{rewardUnlockHintLabel}
							</p>
						)}
					</div>

					<div className="space-y-3">
						<p className="flex items-center gap-3 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
							<Info size={18} weight="bold" />
							{descriptionLabel}
						</p>
						<p className="text-sm leading-relaxed text-muted-foreground">
							{product.description}
						</p>
					</div>

					<div className="flex items-center gap-4 border-t border-border pt-6 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
						<Truck size={20} weight="bold" />
						<span>
							{estimatedDeliveryPrefix} {estimatedDelivery}
						</span>
					</div>
				</CardContent>
			</Card>
		</section>
	)
}
