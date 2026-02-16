import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { useCatalogFiltersMock, useProductsMock } = vi.hoisted(() => ({
	useCatalogFiltersMock: vi.fn(),
	useProductsMock: vi.fn(),
}))

vi.mock('@/entities/product', () => ({
	useProducts: useProductsMock,
}))

vi.mock('@/features/catalog-filters', async () => {
	const actual = await vi.importActual<
		typeof import('@/features/catalog-filters')
	>('@/features/catalog-filters')

	return {
		...actual,
		useCatalogFilters: useCatalogFiltersMock,
	}
})

import { useCatalogPage } from './useCatalogPage'

describe('useCatalogPage', () => {
	test('returns filtered, sorted, and paginated products', () => {
		useProductsMock.mockReturnValue({
			data: [
				{
					id: 1,
					title: 'Alpha',
					price: 100,
					description: 'alpha description',
					category: 'electronics',
					image: '/alpha.jpg',
					rating: { count: 10, rate: 4.2 },
				},
				{
					id: 2,
					title: 'Beta',
					price: 50,
					description: 'beta description',
					category: 'electronics',
					image: '/beta.jpg',
					rating: { count: 20, rate: 4.8 },
				},
			],
		})

		useCatalogFiltersMock.mockReturnValue({
			handleCatalogCategoryChange: vi.fn(),
			handleCatalogPageChange: vi.fn(),
			handleCatalogSearchChange: vi.fn(),
			handleCatalogSortChange: vi.fn(),
			search: {
				category: 'electronics',
				limit: 12,
				page: 1,
				q: '',
				sort: 'price-asc',
			},
		})

		const { result } = renderHook(() => useCatalogPage())

		expect(result.current.products.map((product) => product.id)).toEqual([2, 1])
		expect(result.current.totalItems).toBe(2)
		expect(result.current.currentPage).toBe(1)
	})
})
