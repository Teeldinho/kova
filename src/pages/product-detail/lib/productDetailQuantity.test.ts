import { describe, expect, test } from 'vitest'

import {
	clampProductQuantity,
	decreaseProductQuantity,
	increaseProductQuantity,
} from './productDetailQuantity'

describe('clampProductQuantity', () => {
	test('returns quantity when it is within cart bounds', () => {
		expect(clampProductQuantity(3)).toBe(3)
	})

	test('clamps quantity to minimum bound', () => {
		expect(clampProductQuantity(0)).toBe(1)
	})

	test('clamps quantity to maximum bound', () => {
		expect(clampProductQuantity(99)).toBe(10)
	})
})

describe('increaseProductQuantity', () => {
	test('increments quantity by one', () => {
		expect(increaseProductQuantity(2)).toBe(3)
	})

	test('does not exceed max quantity', () => {
		expect(increaseProductQuantity(10)).toBe(10)
	})
})

describe('decreaseProductQuantity', () => {
	test('decrements quantity by one', () => {
		expect(decreaseProductQuantity(5)).toBe(4)
	})

	test('does not go below min quantity', () => {
		expect(decreaseProductQuantity(1)).toBe(1)
	})
})
