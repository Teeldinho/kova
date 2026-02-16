import { CatalogFilters, Pagination } from '@/features/catalog-filters'

import { useCatalogPage } from '../model/useCatalogPage'
import { CatalogHero } from './CatalogHero'
import { CatalogMarquee } from './CatalogMarquee'
import { ProductGrid } from './ProductGrid'

export function CatalogPage() {
	const {
		currentPage,
		products,
		totalItems,
		totalPages,
		handleCatalogPageChange,
	} = useCatalogPage()

	return (
		<div className="space-y-8 pb-12 md:space-y-10 md:pb-16">
			<CatalogHero />
			<CatalogMarquee />

			<section className="mx-auto max-w-7xl space-y-5 px-4 md:space-y-6 md:px-6">
				<CatalogFilters />

				<div className="flex items-center justify-between gap-3">
					<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
						{totalItems} items
					</p>
					<p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
						Page {currentPage} of {totalPages}
					</p>
				</div>

				<ProductGrid products={products} />
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					handlePageChange={handleCatalogPageChange}
				/>
			</section>
		</div>
	)
}
