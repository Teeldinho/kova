import { act, renderHook } from '@testing-library/react'
import type { ChangeEvent } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { CATALOG_FILTER } from '../config/constants'

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
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
		navigateMock.mockReset()
		useNavigateMock.mockReset()
		useSearchMock.mockReset()
	})

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
		expect(navigateMock).toHaveBeenNthCalledWith(
			1,
			expect.objectContaining({ resetScroll: false }),
		)
		expect(result.current.selectedCategoryLabel).toBe('All')
		expect(result.current.selectedSortLabel).toBe('Default')

		const searchUpdater = navigateMock.mock.calls[0]?.[0]?.search
		expect(searchUpdater).toBeTypeOf('function')

		expect(
			searchUpdater({
				category: 'all',
				limit: 12,
				page: 1,
				q: '',
				sort: 'default',
			}),
		).toEqual({
			page: undefined,
			limit: undefined,
			q: 'jacket',
			category: undefined,
			sort: undefined,
		})
	})

	test('debounces input search updates and keeps local search value', () => {
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
			result.current.handleCatalogSearchInputChange({
				currentTarget: { value: 'ja' },
			} as ChangeEvent<HTMLInputElement>)
			result.current.handleCatalogSearchInputChange({
				currentTarget: { value: 'jacket' },
			} as ChangeEvent<HTMLInputElement>)
		})

		expect(result.current.searchInputValue).toBe('jacket')
		expect(navigateMock).toHaveBeenCalledTimes(0)

		act(() => {
			vi.advanceTimersByTime(CATALOG_FILTER.SEARCH_DEBOUNCE_MS - 1)
		})

		expect(navigateMock).toHaveBeenCalledTimes(0)

		act(() => {
			vi.advanceTimersByTime(1)
		})

		expect(navigateMock).toHaveBeenCalledTimes(1)
		expect(navigateMock).toHaveBeenCalledWith(
			expect.objectContaining({ resetScroll: false }),
		)
	})

	test('returns placeholders when selected values are unknown', () => {
		useSearchMock.mockReturnValue({
			category: 'unknown',
			limit: 12,
			page: 1,
			q: '',
			sort: 'default',
		})
		useNavigateMock.mockReturnValue(navigateMock)

		const { result } = renderHook(() => useCatalogFilters())

		expect(result.current.selectedCategoryLabel).toBe('Category')
	})

	test('scrolls to catalog section when page changes', () => {
		useSearchMock.mockReturnValue({
			category: 'all',
			limit: 12,
			page: 1,
			q: '',
			sort: 'default',
		})
		useNavigateMock.mockReturnValue(navigateMock)

		const scrollIntoViewMock = vi.fn()
		const getElementByIdMock = vi
			.spyOn(document, 'getElementById')
			.mockReturnValue({
				scrollIntoView: scrollIntoViewMock,
			} as unknown as HTMLElement)

		const { result } = renderHook(() => useCatalogFilters())

		act(() => {
			result.current.handleCatalogPageChange(2)
		})

		expect(getElementByIdMock).toHaveBeenCalledWith(
			CATALOG_FILTER.IDS.PRODUCTS_SECTION,
		)
		expect(scrollIntoViewMock).toHaveBeenCalledWith({
			behavior: 'smooth',
			block: 'start',
		})

		getElementByIdMock.mockRestore()
	})
})
