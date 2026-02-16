import type { Product } from '@/entities/product'

interface ProductDetailImageProps {
	product: Product
}

export function ProductDetailImage({ product }: ProductDetailImageProps) {
	return (
		<div className="relative overflow-hidden border border-border bg-card p-8 md:p-10">
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.147_0.004_49.25_/_0.08)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.147_0.004_49.25_/_0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
			<div className="grain-overlay pointer-events-none absolute inset-0" />
			<img
				src={product.image}
				alt={product.title}
				className="relative z-10 h-full w-full object-contain"
			/>
		</div>
	)
}
