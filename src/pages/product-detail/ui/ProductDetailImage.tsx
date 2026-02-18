import { motion } from 'framer-motion'
import type { Product } from '@/entities/product'
import { ImageMagnifier } from '@/shared/ui'

interface ProductDetailImageProps {
	product: Product
}

export function ProductDetailImage({ product }: ProductDetailImageProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
			className="product-image-surface relative h-[30rem] overflow-hidden border-2 border-border p-8 sm:h-[35rem] md:h-[40rem] lg:h-[45rem] md:p-12 lg:p-16"
		>
			<div className="scanning-line" />

			<div className="absolute top-6 left-6 z-20 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 md:top-8 md:left-8">
				<span>{product.category}</span>
				<span className="text-primary/60">
					#{product.id.toString().padStart(4, '0')}
				</span>
			</div>

			<ImageMagnifier
				src={product.image}
				alt={product.title}
				className="relative z-10 h-full w-full p-4 md:p-8"
				zoomLevel={2}
			/>
		</motion.div>
	)
}
