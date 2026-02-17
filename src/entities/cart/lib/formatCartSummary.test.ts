import { describe, expect, test } from 'vitest'

import { formatCartSummary } from './formatCartSummary'

describe('formatCartSummary', () => {
	test('formats totals and reward progress labels', () => {
		const result = formatCartSummary({
			discount: 5,
			rewardSnapshot: {
				activeTier: {
					thresholdInZar: 1200,
					discountRate: 0.05,
					label: '5% off',
				},
				nextTier: {
					thresholdInZar: 2500,
					discountRate: 0.1,
					label: '10% off',
				},
				amountToNextTierInZar: 900,
				progressToNextTier: 0.64,
				discountRate: 0.05,
				hasUnlockedReward: true,
			},
			subtotal: 100,
			tax: 0,
			total: 95,
		})

		expect(result.hasDiscount).toBe(true)
		expect(result.displayDiscount).toContain('R')
		expect(result.activeRewardLabel).toBe('5% off')
		expect(result.nextRewardLabel).toBe('10% off')
		expect(result.rewardProgressPercentage).toBe(64)
	})
})
