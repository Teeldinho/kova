import type { Product } from '@/entities/product'
import { PRODUCT, ProductCard } from '@/entities/product'

interface ProductGridProps {
	products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
	if (products.length === 0) {
		return (
			<div className="border border-border bg-card px-6 py-16 text-center">
				<p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
					No products match your filters.
				</p>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{products.map((product, index) => (
				<ProductCard
					key={product.id}
					product={product}
					index={index}
					featured={index === PRODUCT.FEATURED_INDEX}
				/>
			))}
		</div>
	)
}
