import { CaretLeft, CaretRight } from '@phosphor-icons/react'

import { Button } from '@/shared/ui'

import { CATALOG_PAGINATION } from '../config/constants'
import { usePagination } from '../model/usePagination'

interface PaginationProps {
	currentPage: number
	totalPages: number
	handlePageChange: (page: number) => void
}

export function Pagination({
	currentPage,
	totalPages,
	handlePageChange,
}: PaginationProps) {
	const {
		hasNextPage,
		hasPreviousPage,
		handlePaginationNext,
		handlePaginationPrevious,
		pageItems,
	} = usePagination({ currentPage, handlePageChange, totalPages })

	if (totalPages <= 1) return null

	return (
		<nav
			className="flex items-center justify-center gap-1 pt-2"
			aria-label={CATALOG_PAGINATION.NAVIGATION_LABEL}
		>
			<Button
				type="button"
				variant="outline"
				size="icon"
				className="h-8 w-8 rounded-none"
				onClick={handlePaginationPrevious}
				disabled={!hasPreviousPage}
				aria-label={CATALOG_PAGINATION.PREVIOUS_LABEL}
			>
				<CaretLeft size={14} />
			</Button>

			{pageItems.map((pageItem) => (
				<Button
					key={`page-${pageItem.page}`}
					type="button"
					variant={pageItem.isCurrent ? 'default' : 'outline'}
					size="sm"
					className="h-8 min-w-8 rounded-none px-2 font-mono text-[10px]"
					onClick={pageItem.handlePageSelect}
					aria-label={pageItem.label}
					aria-current={pageItem.isCurrent ? 'page' : undefined}
				>
					{pageItem.page}
				</Button>
			))}

			<Button
				type="button"
				variant="outline"
				size="icon"
				className="h-8 w-8 rounded-none"
				onClick={handlePaginationNext}
				disabled={!hasNextPage}
				aria-label={CATALOG_PAGINATION.NEXT_LABEL}
			>
				<CaretRight size={14} />
			</Button>
		</nav>
	)
}
