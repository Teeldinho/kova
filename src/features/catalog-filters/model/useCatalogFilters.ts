import { useNavigate, useSearch } from '@tanstack/react-router'
import type { ChangeEvent } from 'react'

import { PAGINATION } from '@/shared/config'

import type { CatalogSearch } from '../config/searchSchema'

export function useCatalogFilters() {
	const search = useSearch({ from: '/' }) as CatalogSearch
	const navigate = useNavigate({ from: '/' })

	const handleCatalogSearchChange = (value: string) => {
		navigate({
			search: (previous) => ({
				...previous,
				q: value,
				page: PAGINATION.DEFAULT_PAGE,
			}),
		})
	}

	const handleCatalogSearchInputChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		handleCatalogSearchChange(event.currentTarget.value)
	}

	const handleCatalogCategoryChange = (value: string | null) => {
		if (!value) return

		navigate({
			search: (previous) => ({
				...previous,
				category: value,
				page: PAGINATION.DEFAULT_PAGE,
			}),
		})
	}

	const handleCatalogSortChange = (value: CatalogSearch['sort'] | null) => {
		if (!value) return

		navigate({
			search: (previous) => ({
				...previous,
				sort: value,
				page: PAGINATION.DEFAULT_PAGE,
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
		handleCatalogSearchInputChange,
		handleCatalogSearchChange,
		handleCatalogCategoryChange,
		handleCatalogSortChange,
		handleCatalogPageChange,
	}
}
