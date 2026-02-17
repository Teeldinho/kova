import type { Product } from '@/entities/product'
import { ProductCard } from '@/entities/product'
import { QuickAddToCartButton } from '@/features/quick-add-to-cart'

import { getCatalogGridItemClass } from '../lib/catalogGrid'

interface ProductGridProps {
	products: Product[]
}

const renderQuickAddAction = (product: Product) => (
	<QuickAddToCartButton product={product} />
)

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
		<div className="grid grid-cols-2 gap-4 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-10">
			{products.map((product, index) => (
				<ProductCard
					key={product.id}
					product={product}
					index={index}
					layoutClassName={getCatalogGridItemClass(index)}
					renderActions={renderQuickAddAction}
				/>
			))}
		</div>
	)
}
