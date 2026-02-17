import { act, renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { productQueries } from '../api/queries'
import { useProductCardPrefetch } from './useProductCardPrefetch'

const { prefetchQueryMock } = vi.hoisted(() => ({
	prefetchQueryMock: vi.fn(),
}))

vi.mock('@tanstack/react-query', async () => {
	const actual = await vi.importActual<typeof import('@tanstack/react-query')>(
		'@tanstack/react-query',
	)

	return {
		...actual,
		useQueryClient: () => ({
			prefetchQuery: prefetchQueryMock,
		}),
	}
})

describe('useProductCardPrefetch', () => {
	test('prefetches product detail query on pointer intent and focus', () => {
		const productId = 7
		const { result } = renderHook(() => useProductCardPrefetch({ productId }))

		act(() => {
			result.current.handleProductCardPointerEnter()
			result.current.handleProductCardFocus()
		})

		expect(prefetchQueryMock).toHaveBeenCalledTimes(2)
		expect(prefetchQueryMock).toHaveBeenCalledWith(
			expect.objectContaining({
				queryKey: productQueries.detail(productId).queryKey,
			}),
		)
	})
})
