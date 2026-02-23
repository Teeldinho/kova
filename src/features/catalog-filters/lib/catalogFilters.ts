import type { Product } from '@/entities/product'

import type { SortOption } from '@/shared/config'

interface FilterOptions {
	searchTerm: string
	category: string
}

interface PaginationOptions {
	page: number
	limit: number
}

interface PaginatedProducts {
	items: Product[]
	totalItems: number
	totalPages: number
	currentPage: number
}

export const filterProducts = (
	products: Product[],
	{ searchTerm, category }: FilterOptions,
): Product[] => {
	const normalizedSearch = searchTerm.trim().toLowerCase()

	return products.filter((product) => {
		const matchesSearch =
			normalizedSearch.length === 0 ||
			product.title.toLowerCase().includes(normalizedSearch) ||
			product.description.toLowerCase().includes(normalizedSearch)

		const matchesCategory = category === 'all' || product.category === category

		return matchesSearch && matchesCategory
	})
}

export const sortProducts = (
	products: Product[],
	sort: SortOption,
): Product[] => {
	const sortable = [...products]

	switch (sort) {
		case 'price-asc':
			return sortable.sort((a, b) => a.price - b.price)
		case 'price-desc':
			return sortable.sort((a, b) => b.price - a.price)
		case 'rating-desc':
			return sortable.sort((a, b) => b.rating.rate - a.rating.rate)
		case 'name-asc':
			return sortable.sort((a, b) => a.title.localeCompare(b.title))
		default:
			return sortable
	}
}

export const paginateProducts = (
	products: Product[],
	{ page, limit }: PaginationOptions,
): PaginatedProducts => {
	const totalItems = products.length
	const totalPages = Math.max(1, Math.ceil(totalItems / limit))
	const currentPage = Math.min(Math.max(1, page), totalPages)
	const startIndex = (currentPage - 1) * limit
	const endIndex = startIndex + limit

	return {
		items: products.slice(startIndex, endIndex),
		totalItems,
		totalPages,
		currentPage,
	}
}

export const getPageNumbers = (totalPages: number): number[] =>
	Array.from({ length: totalPages }, (_, index) => index + 1)
