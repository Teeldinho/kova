import { describe, expect, test } from 'vitest'

import {
	getCategoryLabelByValue,
	getSortLabelByValue,
} from './catalogFilterLabels'

describe('catalogFilterLabels', () => {
	test('returns category label for known category values', () => {
		expect(getCategoryLabelByValue("men's clothing")).toBe("Men's Clothing")
		expect(getCategoryLabelByValue('electronics')).toBe('Electronics')
	})

	test('returns category placeholder for unknown values', () => {
		expect(getCategoryLabelByValue('unknown-category')).toBe('Category')
	})

	test('returns sort label for known sort values', () => {
		expect(getSortLabelByValue('default')).toBe('Default')
		expect(getSortLabelByValue('price-desc')).toBe('Price: High to Low')
	})
})
