import { act, renderHook } from '@testing-library/react'
import type { ChangeEvent } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { CATALOG_FILTER } from '../config/constants'

const {
	lenisMock,
	navigateMock,
	useLenisMock,
	useNavigateMock,
	useSearchMock,
} = vi.hoisted(() => ({
	lenisMock: {
		scrollTo: vi.fn(),
	},
	navigateMock: vi.fn(),
	useLenisMock: vi.fn(),
	useNavigateMock: vi.fn(),
	useSearchMock: vi.fn(),
}))

vi.mock('@tanstack/react-router', () => ({
	useNavigate: useNavigateMock,
	useSearch: useSearchMock,
}))

vi.mock('@/shared/model', () => ({
	SCROLL_EASING: {
		DURATION: 1.35,
		EASING: vi.fn(),
	},
	useLenis: useLenisMock,
}))

import { useCatalogFilters } from './useCatalogFilters'

describe('useCatalogFilters', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
		lenisMock.scrollTo.mockReset()
		navigateMock.mockReset()
		useLenisMock.mockReset()
		useNavigateMock.mockReset()
		useSearchMock.mockReset()
	})

	test('updates search params through handlers', () => {
		useLenisMock.mockReturnValue(lenisMock)
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
		useLenisMock.mockReturnValue(lenisMock)
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
		useLenisMock.mockReturnValue(lenisMock)
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
		useLenisMock.mockReturnValue(lenisMock)
		useSearchMock.mockReturnValue({
			category: 'all',
			limit: 12,
			page: 1,
			q: '',
			sort: 'default',
		})
		useNavigateMock.mockReturnValue(navigateMock)

		const productsSectionElement = document.createElement('section')
		const getElementByIdMock = vi
			.spyOn(document, 'getElementById')
			.mockReturnValue(productsSectionElement)

		const { result } = renderHook(() => useCatalogFilters())

		act(() => {
			result.current.handleCatalogPageChange(2)
		})

		expect(getElementByIdMock).toHaveBeenCalledWith(
			CATALOG_FILTER.IDS.PRODUCTS_SECTION,
		)
		expect(lenisMock.scrollTo).toHaveBeenCalledWith(productsSectionElement, {
			duration: 0.945,
			easing: expect.any(Function),
			force: true,
			offset: CATALOG_FILTER.PAGE_CHANGE_SCROLL_OFFSET_PX,
		})

		getElementByIdMock.mockRestore()
	})
})
