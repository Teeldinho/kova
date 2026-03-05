import { useMemo } from 'react'

import { useProductsQuery } from '@/entities/product'
import {
	filterProducts,
	paginateProducts,
	sortProducts,
	useCatalogFilters,
} from '@/features/catalog-filters'

export function useCatalogPage() {
	const { data: productsData, isPending } = useProductsQuery()
	const products = productsData ?? []
	const {
		search,
		handleCatalogCategoryChange,
		handleCatalogPageChange,
		handleCatalogSearchChange,
		handleCatalogSortChange,
	} = useCatalogFilters()

	const filteredProducts = useMemo(
		() =>
			filterProducts(products, {
				searchTerm: search.q,
				category: search.category,
			}),
		[products, search.category, search.q],
	)

	const sortedProducts = useMemo(
		() => sortProducts(filteredProducts, search.sort),
		[filteredProducts, search.sort],
	)

	const paginatedProducts = useMemo(
		() =>
			paginateProducts(sortedProducts, {
				page: search.page,
				limit: search.limit,
			}),
		[search.limit, search.page, sortedProducts],
	)

	return {
		isProductsPending: isPending && productsData === undefined,
		products: paginatedProducts.items,
		totalItems: paginatedProducts.totalItems,
		totalPages: paginatedProducts.totalPages,
		currentPage: paginatedProducts.currentPage,
		search,
		handleCatalogSearchChange,
		handleCatalogCategoryChange,
		handleCatalogSortChange,
		handleCatalogPageChange,
	}
}
