import { motion } from 'framer-motion'

import { formatPrice } from '@/shared/lib'

import { getCategoryLabel, truncateDescription } from '../lib/formatProduct'
import type { Product } from '../model/types'
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
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.04 }}
			className={`group relative ${featured ? 'col-span-2 row-span-2' : ''}`}
		>
			<a href={`/products/${product.id}`} className="block">
				{/* Image container with corner markers */}
				<div className="relative aspect-square overflow-hidden border border-border bg-card">
					{/* Corner markers */}
					<div className="absolute top-0 left-0 z-10 h-4 w-4 border-t-2 border-l-2 border-foreground/20 transition-colors group-hover:border-primary" />
					<div className="absolute top-0 right-0 z-10 h-4 w-4 border-t-2 border-r-2 border-foreground/20 transition-colors group-hover:border-primary" />
					<div className="absolute bottom-0 left-0 z-10 h-4 w-4 border-b-2 border-l-2 border-foreground/20 transition-colors group-hover:border-primary" />
					<div className="absolute right-0 bottom-0 z-10 h-4 w-4 border-r-2 border-b-2 border-foreground/20 transition-colors group-hover:border-primary" />

					{/* Product image */}
					<img
						src={product.image}
						alt={product.title}
						className="h-full w-full object-contain p-8 transition-all duration-500 group-hover:scale-95 group-hover:grayscale"
						loading="lazy"
					/>

					{/* Grain overlay */}
					<div className="grain-overlay pointer-events-none absolute inset-0" />
				</div>

				{/* Product info */}
				<div className="mt-3 space-y-1.5">
					<span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
						{getCategoryLabel(product.category)}
					</span>
					<h3 className="font-mono text-sm leading-tight font-medium">
						{featured ? product.title : truncateDescription(product.title, 50)}
					</h3>
					<ProductRating
						rate={product.rating.rate}
						count={product.rating.count}
					/>
					<p className="font-mono text-sm font-bold">
						{formatPrice(product.price)}
					</p>
				</div>
			</a>
		</motion.div>
	)
}
