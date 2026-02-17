import { CatalogFilters, Pagination } from '@/features/catalog-filters'

import { useCatalogPage } from '../model/useCatalogPage'
import { CatalogHero } from './CatalogHero'
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
		<div className="space-y-6 pb-12 md:space-y-8 md:pb-16">
			<CatalogHero totalItems={totalItems} />

			<section
				id="products"
				className="mx-auto max-w-7xl space-y-5 px-4 md:space-y-6 md:px-6"
			>
				<CatalogFilters />

				<div className="flex items-center justify-between gap-3">
					<p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
						<span className="h-1 w-1 bg-primary" />
						{totalItems} items
					</p>
					<p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
						<span className="h-1 w-1 bg-primary" />
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
