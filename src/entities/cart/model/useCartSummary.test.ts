import { describe, expect, test } from 'vitest'

import { CART } from '../config/constants'
import { useCartSummary } from './useCartSummary'

const BASE_REWARD_SNAPSHOT = {
	activeTier: null,
	nextTier: CART.REWARDS.TIERS[0],
	amountToNextTierInZar: 560,
	progressToNextTier: 0.53,
	discountRate: 0,
	hasUnlockedReward: false,
}

describe('useCartSummary', () => {
	test('formats all summary values and keeps default checkout label', () => {
		const result = useCartSummary({
			subtotal: 10,
			tax: 0,
			discount: 0,
			total: 10,
			rewardSnapshot: BASE_REWARD_SNAPSHOT,
		})

		expect(result.displaySubtotal).toContain('R')
		expect(result.displayTax).toContain('R')
		expect(result.displayTotal).toContain('R')
		expect(result.displayAmountToNextReward).toContain('R')
		expect(result.checkoutLabel).toBe('Checkout')
		expect(result.hasDiscount).toBe(false)
	})

	test('uses custom checkout label when provided', () => {
		const result = useCartSummary({
			checkoutLabel: 'Go To Checkout',
			subtotal: 10,
			tax: 0,
			discount: 0,
			total: 10,
			rewardSnapshot: BASE_REWARD_SNAPSHOT,
		})

		expect(result.checkoutLabel).toBe('Go To Checkout')
	})

	test('returns active reward details when discount is applied', () => {
		const result = useCartSummary({
			subtotal: 100,
			tax: 0,
			discount: 5,
			total: 95,
			rewardSnapshot: {
				activeTier: CART.REWARDS.TIERS[0],
				nextTier: CART.REWARDS.TIERS[1],
				amountToNextTierInZar: 900,
				progressToNextTier: 0.64,
				discountRate: 0.05,
				hasUnlockedReward: true,
			},
		})

		expect(result.hasDiscount).toBe(true)
		expect(result.activeRewardLabel).toBe('5% off')
		expect(result.nextRewardLabel).toBe('10% off')
		expect(result.rewardProgressPercentage).toBe(64)
	})
})
