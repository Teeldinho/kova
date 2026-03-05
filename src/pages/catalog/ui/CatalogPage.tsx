import { CatalogFilters } from '@/features/catalog-filters'

import { CatalogHero } from './CatalogHero'
import { CatalogProductsSection } from './CatalogProductsSection'

export function CatalogPage() {
	return (
		<div className="space-y-6 pb-12 md:space-y-8 md:pb-16">
			<CatalogHero />

			<section
				id="products"
				className="mx-auto max-w-7xl space-y-5 px-4 md:space-y-6 md:px-6"
			>
				<CatalogFilters />
				<CatalogProductsSection />
			</section>
		</div>
	)
}
