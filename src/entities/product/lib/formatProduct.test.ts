import { describe, expect, test } from 'vitest'

import {
	formatRating,
	getCategoryLabel,
	truncateDescription,
} from './formatProduct'

describe('truncateDescription', () => {
	test('returns full text when shorter than max length', () => {
		const result = truncateDescription('Short text', 100)
		expect(result).toBe('Short text')
	})

	test('truncates text and adds ellipsis when longer than max', () => {
		const longText = 'A'.repeat(150)
		const result = truncateDescription(longText, 100)
		expect(result).toHaveLength(103) // 100 + '...'
		expect(result.endsWith('...')).toBe(true)
	})

	test('uses default max length of 100', () => {
		const longText = 'B'.repeat(150)
		const result = truncateDescription(longText)
		expect(result).toHaveLength(103)
	})

	test('handles empty string', () => {
		const result = truncateDescription('')
		expect(result).toBe('')
	})

	test('handles text exactly at max length', () => {
		const exactText = 'C'.repeat(100)
		const result = truncateDescription(exactText, 100)
		expect(result).toBe(exactText)
	})
})

describe('formatRating', () => {
	test('formats rating with one decimal place', () => {
		expect(formatRating(4.5)).toBe('4.5')
	})

	test('formats whole number rating with decimal', () => {
		expect(formatRating(4)).toBe('4.0')
	})

	test('formats zero rating', () => {
		expect(formatRating(0)).toBe('0.0')
	})

	test('formats high precision rating to one decimal', () => {
		expect(formatRating(3.789)).toBe('3.8')
	})
})

describe('getCategoryLabel', () => {
	test('capitalizes single word category', () => {
		expect(getCategoryLabel('electronics')).toBe('Electronics')
	})

	test('capitalizes multi-word category', () => {
		expect(getCategoryLabel("men's clothing")).toBe("Men's Clothing")
	})

	test('handles jewelery category', () => {
		expect(getCategoryLabel('jewelery')).toBe('Jewelery')
	})

	test('handles empty string', () => {
		expect(getCategoryLabel('')).toBe('')
	})
})
