import { Minus, Plus, ShoppingBag } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { Product } from '@/entities/product'
import { ProductRating } from '@/entities/product'
import { formatPrice } from '@/shared/lib'
import { Button } from '@/shared/ui/button'

import { PRODUCT_DETAIL } from '../config/constants'

interface ProductDetailInfoProps {
	product: Product
	quantity: number
	handleProductQuantityIncrease: () => void
	handleProductQuantityDecrease: () => void
	handleProductAddToCart: () => void
}

export function ProductDetailInfo({
	product,
	quantity,
	handleProductQuantityIncrease,
	handleProductQuantityDecrease,
	handleProductAddToCart,
}: ProductDetailInfoProps) {
	return (
		<section className="space-y-5 border border-border bg-card p-6 md:sticky md:top-24 md:p-8">
			<span className="inline-flex border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
				{product.category}
			</span>

			<h1 className="font-mono text-2xl leading-tight font-black tracking-tight md:text-3xl">
				{product.title}
			</h1>

			<ProductRating rate={product.rating.rate} count={product.rating.count} />

			<p className="font-mono text-2xl font-bold">
				{formatPrice(product.price)}
			</p>

			<div className="space-y-2 border-y border-border py-4">
				<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
					{PRODUCT_DETAIL.QUANTITY_LABEL}
				</p>
				<div className="inline-flex items-center border border-border">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="h-10 w-10 rounded-none"
						onClick={handleProductQuantityDecrease}
						aria-label="Decrease quantity"
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
						aria-label="Increase quantity"
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
					{PRODUCT_DETAIL.ADD_TO_CART_LABEL}
				</Button>
			</motion.div>

			<div className="space-y-2">
				<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
					{PRODUCT_DETAIL.DESCRIPTION_LABEL}
				</p>
				<p className="text-sm leading-relaxed text-muted-foreground">
					{product.description}
				</p>
			</div>

			<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
				Estimated delivery: {PRODUCT_DETAIL.ESTIMATED_DELIVERY}
			</p>
		</section>
	)
}
