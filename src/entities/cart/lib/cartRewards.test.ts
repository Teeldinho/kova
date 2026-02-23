import { describe, expect, test } from 'vitest'

import {
	calculateRewardDiscount,
	calculateRewardDiscountInCents,
	getCartRewardSnapshot,
	getRewardDiscountRate,
} from './cartRewards'

describe('getRewardDiscountRate', () => {
	test('returns zero below first reward threshold', () => {
		expect(getRewardDiscountRate(50)).toBe(0)
	})

	test('returns highest unlocked reward rate for large subtotals', () => {
		expect(getRewardDiscountRate(250)).toBe(0.15)
	})
})

describe('calculateRewardDiscount', () => {
	test('calculates discount from active reward tier', () => {
		expect(calculateRewardDiscount(100)).toBe(5)
	})

	test('returns zero without an unlocked reward', () => {
		expect(calculateRewardDiscount(10)).toBe(0)
	})
})

describe('calculateRewardDiscountInCents', () => {
	test('returns rounded ZAR cents for checkout payloads', () => {
		expect(calculateRewardDiscountInCents(100)).toBe(8000)
	})
})

describe('getCartRewardSnapshot', () => {
	test('returns next reward details when no reward is unlocked', () => {
		const snapshot = getCartRewardSnapshot(40)

		expect(snapshot.activeTier).toBeNull()
		expect(snapshot.nextTier?.discountRate).toBe(0.05)
		expect(snapshot.amountToNextTierInZar).toBe(560)
		expect(snapshot.progressToNextTier).toBeCloseTo(0.53, 2)
	})

	test('returns completed progress when all rewards are unlocked', () => {
		const snapshot = getCartRewardSnapshot(300)

		expect(snapshot.activeTier?.discountRate).toBe(0.15)
		expect(snapshot.nextTier).toBeNull()
		expect(snapshot.amountToNextTierInZar).toBe(0)
		expect(snapshot.progressToNextTier).toBe(1)
	})
})
