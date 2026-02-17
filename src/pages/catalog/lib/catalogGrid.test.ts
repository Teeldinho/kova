import { describe, expect, test } from 'vitest'

import { getCatalogGridItemClass } from './catalogGrid'

describe('getCatalogGridItemClass', () => {
	test('returns desktop pattern class for early indices', () => {
		expect(getCatalogGridItemClass(0)).toBe('col-span-1 lg:col-span-6')
		expect(getCatalogGridItemClass(1)).toBe('col-span-1 lg:col-span-6')
		expect(getCatalogGridItemClass(2)).toBe('col-span-1 lg:col-span-4')
	})

	test('repeats pattern after pattern length', () => {
		expect(getCatalogGridItemClass(5)).toBe('col-span-1 lg:col-span-6')
		expect(getCatalogGridItemClass(7)).toBe('col-span-1 lg:col-span-4')
	})
})
