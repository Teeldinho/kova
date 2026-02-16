import { useNavigate, useSearch } from '@tanstack/react-router'

import type { CatalogSearch } from '../config/searchSchema'

export function useCatalogFilters() {
	const search = useSearch({ from: '/' }) as CatalogSearch
	const navigate = useNavigate({ from: '/' })

	const handleCatalogSearchChange = (value: string) => {
		navigate({
			search: (previous) => ({
				...previous,
				q: value,
				page: 1,
			}),
		})
	}

	const handleCatalogCategoryChange = (value: string | null) => {
		if (!value) return

		navigate({
			search: (previous) => ({
				...previous,
				category: value,
				page: 1,
			}),
		})
	}

	const handleCatalogSortChange = (value: CatalogSearch['sort'] | null) => {
		if (!value) return

		navigate({
			search: (previous) => ({
				...previous,
				sort: value,
				page: 1,
			}),
		})
	}

	const handleCatalogPageChange = (page: number) => {
		navigate({
			search: (previous) => ({
				...previous,
				page,
			}),
		})
	}

	return {
		search,
		handleCatalogSearchChange,
		handleCatalogCategoryChange,
		handleCatalogSortChange,
		handleCatalogPageChange,
	}
}
