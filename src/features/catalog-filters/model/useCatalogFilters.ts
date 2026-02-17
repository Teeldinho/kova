import { useNavigate, useSearch } from '@tanstack/react-router'
import type { ChangeEvent } from 'react'

import { PAGINATION } from '@/shared/config'

import type { CatalogSearch } from '../config/searchSchema'
import {
	getCategoryLabelByValue,
	getSortLabelByValue,
} from '../lib/catalogFilterLabels'
import { buildCatalogSearch } from '../lib/searchParams'

export function useCatalogFilters() {
	const search = useSearch({ from: '/' }) as CatalogSearch
	const navigate = useNavigate({ from: '/' })
	const selectedCategoryLabel = getCategoryLabelByValue(search.category)
	const selectedSortLabel = getSortLabelByValue(search.sort)

	const handleCatalogSearchChange = (value: string) => {
		navigate({
			search: (previous) => ({
				...buildCatalogSearch(previous as CatalogSearch, {
					q: value,
					page: PAGINATION.DEFAULT_PAGE,
				}),
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
				...buildCatalogSearch(previous as CatalogSearch, {
					category: value,
					page: PAGINATION.DEFAULT_PAGE,
				}),
			}),
		})
	}

	const handleCatalogSortChange = (value: CatalogSearch['sort'] | null) => {
		if (!value) return

		navigate({
			search: (previous) => ({
				...buildCatalogSearch(previous as CatalogSearch, {
					sort: value,
					page: PAGINATION.DEFAULT_PAGE,
				}),
			}),
		})
	}

	const handleCatalogPageChange = (page: number) => {
		navigate({
			search: (previous) => ({
				...buildCatalogSearch(previous as CatalogSearch, {
					page,
				}),
			}),
		})
	}

	return {
		search,
		selectedCategoryLabel,
		selectedSortLabel,
		handleCatalogSearchInputChange,
		handleCatalogSearchChange,
		handleCatalogCategoryChange,
		handleCatalogSortChange,
		handleCatalogPageChange,
	}
}
