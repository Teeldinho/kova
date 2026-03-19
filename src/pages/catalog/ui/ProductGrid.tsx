import type { Product } from '@/entities/product'
import { ProductCard } from '@/entities/product'
import { Card, CardContent } from '@/shared/ui'

import { getCatalogGridItemClass } from '../lib/catalogGrid'
import { QuickAddToCartButton } from './QuickAddToCartButton'

interface ProductGridProps {
	products: Product[]
}

const renderQuickAddAction = (product: Product) => (
	<QuickAddToCartButton product={product} />
)

export function ProductGrid({ products }: ProductGridProps) {
	if (products.length === 0) {
		return (
			<Card className="border border-border py-0 ring-0">
				<CardContent className="px-6 py-16 text-center">
					<p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
						No products match your filters.
					</p>
				</CardContent>
			</Card>
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
