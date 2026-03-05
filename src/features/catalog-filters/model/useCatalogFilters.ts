import { useNavigate, useSearch } from '@tanstack/react-router'
import { type ChangeEvent, useCallback, useEffect, useState } from 'react'

import { PAGINATION } from '@/shared/config'

import { CATALOG_FILTER } from '../config/constants'
import type { CatalogSearch } from '../config/searchSchema'
import {
	getCategoryLabelByValue,
	getSortLabelByValue,
} from '../lib/catalogFilterLabels'
import { scrollCatalogProductsSection } from '../lib/scrollCatalogProductsSection'
import { buildCatalogSearch } from '../lib/searchParams'

export function useCatalogFilters() {
	const search = useSearch({ from: '/' })
	const navigate = useNavigate({ from: '/' })
	const [searchInputValue, setSearchInputValue] = useState(search.q)
	const selectedCategoryLabel = getCategoryLabelByValue(search.category)
	const selectedSortLabel = getSortLabelByValue(search.sort)

	useEffect(() => {
		setSearchInputValue(search.q)
	}, [search.q])

	const handleCatalogSearchChange = useCallback(
		(value: string) => {
			navigate({
				resetScroll: false,
				search: (previous: CatalogSearch) => ({
					...buildCatalogSearch(previous, {
						q: value,
						page: PAGINATION.DEFAULT_PAGE,
					}),
				}),
			})
		},
		[navigate],
	)

	useEffect(() => {
		if (searchInputValue === search.q) {
			return
		}

		const timeoutId = window.setTimeout(() => {
			handleCatalogSearchChange(searchInputValue)
		}, CATALOG_FILTER.SEARCH_DEBOUNCE_MS)

		return () => {
			window.clearTimeout(timeoutId)
		}
	}, [handleCatalogSearchChange, search.q, searchInputValue])

	const handleCatalogSearchInputChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		setSearchInputValue(event.currentTarget.value)
	}

	const handleCatalogCategoryChange = (value: string | null) => {
		if (!value) return

		navigate({
			resetScroll: false,
			search: (previous: CatalogSearch) => ({
				...buildCatalogSearch(previous, {
					category: value,
					page: PAGINATION.DEFAULT_PAGE,
				}),
			}),
		})
	}

	const handleCatalogSortChange = (value: CatalogSearch['sort'] | null) => {
		if (!value) return

		navigate({
			resetScroll: false,
			search: (previous: CatalogSearch) => ({
				...buildCatalogSearch(previous, {
					sort: value,
					page: PAGINATION.DEFAULT_PAGE,
				}),
			}),
		})
	}

	const handleCatalogPageChange = (page: number) => {
		navigate({
			resetScroll: false,
			search: (previous: CatalogSearch) => ({
				...buildCatalogSearch(previous, {
					page,
				}),
			}),
		})

		scrollCatalogProductsSection()
	}

	return {
		search,
		searchInputValue,
		selectedCategoryLabel,
		selectedSortLabel,
		handleCatalogSearchInputChange,
		handleCatalogSearchChange,
		handleCatalogCategoryChange,
		handleCatalogSortChange,
		handleCatalogPageChange,
	}
}
