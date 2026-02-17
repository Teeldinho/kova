import type { Product } from '@/entities/product'

interface ProductDetailImageProps {
	product: Product
}

export function ProductDetailImage({ product }: ProductDetailImageProps) {
	return (
		<div className="product-image-surface relative h-[26rem] overflow-hidden border border-border p-8 sm:h-[30rem] md:h-[34rem] lg:h-[38rem] md:p-10">
			<div className="grain-overlay pointer-events-none absolute inset-0" />
			<img
				src={product.image}
				alt={product.title}
				className="relative z-10 h-full w-full object-contain"
			/>
		</div>
	)
}
