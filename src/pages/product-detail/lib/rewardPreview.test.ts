import { describe, expect, test } from 'vitest'

import { formatRewardPreview } from './rewardPreview'

describe('formatRewardPreview', () => {
	test('returns next reward labels and unlock hint', () => {
		const result = formatRewardPreview({
			activeTier: null,
			nextTier: {
				thresholdInZar: 1200,
				discountRate: 0.05,
				label: '5% off',
			},
			amountToNextTierInZar: 160,
			progressToNextTier: 0.87,
			discountRate: 0,
			hasUnlockedReward: false,
		})

		expect(result.rewardProgressPercentage).toBe(87)
		expect(result.rewardStatusLabel).toBe('Next reward: 5% off')
		expect(result.rewardUnlockHintLabel).toContain('to unlock 5% off')
	})

	test('returns unlocked reward labels without unlock hint', () => {
		const result = formatRewardPreview({
			activeTier: {
				thresholdInZar: 4000,
				discountRate: 0.15,
				label: '15% off',
			},
			nextTier: null,
			amountToNextTierInZar: 0,
			progressToNextTier: 1,
			discountRate: 0.15,
			hasUnlockedReward: true,
		})

		expect(result.rewardStatusLabel).toBe('Reward unlocked: 15% off')
		expect(result.rewardUnlockHintLabel).toBeNull()
	})
})
