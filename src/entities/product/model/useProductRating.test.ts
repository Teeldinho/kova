import { describe, expect, test } from 'vitest'

import { useProductRating } from './useProductRating'

describe('useProductRating', () => {
	test('returns rounded rating and formatted display', () => {
		const result = useProductRating(4.26)

		expect(result.ratingRounded).toBe(4)
		expect(result.displayRating).toBe('4.3')
	})

	test('returns max rating step list', () => {
		const result = useProductRating(2.5)

		expect(result.ratingSteps).toEqual([1, 2, 3, 4, 5])
	})
})
