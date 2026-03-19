import { useCatalogPage } from '../model/useCatalogPage'
import { CatalogPending } from './CatalogPending'
import { CatalogResultsMeta } from './CatalogResultsMeta'
import { Pagination } from './Pagination'
import { ProductGrid } from './ProductGrid'

export function CatalogProductsSection() {
	const {
		currentPage,
		isProductsPending,
		products,
		totalItems,
		totalPages,
		handleCatalogPageChange,
	} = useCatalogPage()

	if (isProductsPending) {
		return <CatalogPending />
	}

	return (
		<div className="space-y-5 md:space-y-6">
			<CatalogResultsMeta
				currentPage={currentPage}
				totalItems={totalItems}
				totalPages={totalPages}
			/>

			<ProductGrid products={products} />
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				handlePageChange={handleCatalogPageChange}
			/>
		</div>
	)
}
