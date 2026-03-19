import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { usePagination } from './usePagination'

describe('usePagination', () => {
	test('creates page items with current page metadata', () => {
		const handlePageChange = vi.fn()
		const { result } = renderHook(() =>
			usePagination({
				currentPage: 2,
				handlePageChange,
				totalPages: 4,
			}),
		)

		expect(result.current.pageItems).toHaveLength(4)
		expect(result.current.pageItems[1]?.isCurrent).toBe(true)
		expect(result.current.hasPreviousPage).toBe(true)
		expect(result.current.hasNextPage).toBe(true)
	})

	test('calls provided page-change handler', () => {
		const handlePageChange = vi.fn()
		const { result } = renderHook(() =>
			usePagination({
				currentPage: 2,
				handlePageChange,
				totalPages: 4,
			}),
		)

		result.current.handlePaginationPrevious()
		result.current.handlePaginationNext()
		result.current.pageItems[2]?.handlePageSelect()

		expect(handlePageChange).toHaveBeenNthCalledWith(1, 1)
		expect(handlePageChange).toHaveBeenNthCalledWith(2, 3)
		expect(handlePageChange).toHaveBeenNthCalledWith(3, 3)
	})
})
