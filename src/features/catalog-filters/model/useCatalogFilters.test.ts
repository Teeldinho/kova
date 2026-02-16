import { act, renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { navigateMock, useNavigateMock, useSearchMock } = vi.hoisted(() => ({
	navigateMock: vi.fn(),
	useNavigateMock: vi.fn(),
	useSearchMock: vi.fn(),
}))

vi.mock('@tanstack/react-router', () => ({
	useNavigate: useNavigateMock,
	useSearch: useSearchMock,
}))

import { useCatalogFilters } from './useCatalogFilters'

describe('useCatalogFilters', () => {
	test('updates search params through handlers', () => {
		useSearchMock.mockReturnValue({
			category: 'all',
			limit: 12,
			page: 1,
			q: '',
			sort: 'default',
		})
		useNavigateMock.mockReturnValue(navigateMock)

		const { result } = renderHook(() => useCatalogFilters())

		act(() => {
			result.current.handleCatalogSearchChange('jacket')
			result.current.handleCatalogCategoryChange('electronics')
			result.current.handleCatalogSortChange('price-asc')
			result.current.handleCatalogPageChange(3)
		})

		expect(navigateMock).toHaveBeenCalledTimes(4)
	})
})
