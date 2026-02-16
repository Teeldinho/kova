import { CaretLeft, CaretRight } from '@phosphor-icons/react'

import { Button } from '@/shared/ui/button'

import { getPageNumbers } from '../lib/catalogFilters'

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
	if (totalPages <= 1) return null

	const pages = getPageNumbers(totalPages)

	return (
		<nav
			className="flex items-center justify-center gap-1 pt-2"
			aria-label="Products pagination"
		>
			<Button
				type="button"
				variant="outline"
				size="icon"
				className="h-8 w-8 rounded-none"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage <= 1}
				aria-label="Previous page"
			>
				<CaretLeft size={14} />
			</Button>

			{pages.map((page) => (
				<Button
					key={`page-${page}`}
					type="button"
					variant={currentPage === page ? 'default' : 'outline'}
					size="sm"
					className="h-8 min-w-8 rounded-none px-2 font-mono text-[10px]"
					onClick={() => handlePageChange(page)}
					aria-label={`Go to page ${page}`}
					aria-current={currentPage === page ? 'page' : undefined}
				>
					{page}
				</Button>
			))}

			<Button
				type="button"
				variant="outline"
				size="icon"
				className="h-8 w-8 rounded-none"
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage >= totalPages}
				aria-label="Next page"
			>
				<CaretRight size={14} />
			</Button>
		</nav>
	)
}
