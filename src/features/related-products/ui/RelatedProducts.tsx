import type { Product } from '@/entities/product'
import { ProductCard } from '@/entities/product'

import { RELATED_PRODUCTS } from '../config/constants'
import { useRelatedProducts } from '../model/useRelatedProducts'

interface RelatedProductsProps {
	currentProductId: number
	currentProductCategory: Product['category']
}

export function RelatedProducts({
	currentProductId,
	currentProductCategory,
}: RelatedProductsProps) {
	const { relatedProducts, hasRelatedProducts } = useRelatedProducts({
		currentProductId,
		currentProductCategory,
	})

	if (!hasRelatedProducts) {
		return null
	}

	return (
		<section className="space-y-6 border-t border-border pt-8 md:space-y-8 md:pt-10">
			<div className="flex flex-wrap items-end justify-between gap-3">
				<div className="space-y-1.5">
					<h2 className="font-mono text-lg font-black tracking-wide md:text-xl">
						{RELATED_PRODUCTS.TITLE}
					</h2>

					<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
						{RELATED_PRODUCTS.DESCRIPTION}
					</p>
				</div>

				<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
					{relatedProducts.length} {RELATED_PRODUCTS.COUNT_SUFFIX}
				</p>
			</div>

			<div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
				{relatedProducts.map((product, index) => (
					<ProductCard key={product.id} product={product} index={index} />
				))}
			</div>
		</section>
	)
}
