import { useMemo } from 'react'
import { CATALOG_PAGINATION } from '../config/constants'
import { getPageNumbers } from '../lib/catalogFilters'

interface UsePaginationParams {
	currentPage: number
	totalPages: number
	handlePageChange: (page: number) => void
}

interface PaginationItem {
	page: number
	isCurrent: boolean
	label: string
	handlePageSelect: () => void
}

export function usePagination({
	currentPage,
	handlePageChange,
	totalPages,
}: UsePaginationParams) {
	const pages = useMemo(() => getPageNumbers(totalPages), [totalPages])

	const pageItems = useMemo<PaginationItem[]>(
		() =>
			pages.map((page) => ({
				page,
				isCurrent: currentPage === page,
				label: `Go to page ${page}`,
				handlePageSelect: () => handlePageChange(page),
			})),
		[currentPage, handlePageChange, pages],
	)

	const hasPreviousPage = currentPage > CATALOG_PAGINATION.FIRST_PAGE
	const hasNextPage = currentPage < totalPages

	const handlePaginationPrevious = () => {
		handlePageChange(currentPage - 1)
	}

	const handlePaginationNext = () => {
		handlePageChange(currentPage + 1)
	}

	return {
		hasNextPage,
		hasPreviousPage,
		handlePaginationNext,
		handlePaginationPrevious,
		pageItems,
	}
}
