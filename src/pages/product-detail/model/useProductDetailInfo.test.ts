import { describe, expect, test } from 'vitest'

import { useProductDetailInfo } from './useProductDetailInfo'

describe('useProductDetailInfo', () => {
	test('returns formatted product detail display values', () => {
		const result = useProductDetailInfo({
			product: {
				id: 1,
				title: 'Product',
				price: 20,
				description: 'Description',
				category: "women's clothing",
				image: '/item.jpg',
				rating: { rate: 4.8, count: 40 },
			},
			projectedRewardSnapshot: {
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
			},
		})

		expect(result.categoryLabel).toBe("Women's Clothing")
		expect(result.displayPrice).toContain('R')
		expect(result.addToCartLabel).toBe('Add To Cart')
		expect(result.rewardProgressPercentage).toBe(87)
		expect(result.rewardStatusLabel).toBe('Next reward: 5% off')
		expect(result.rewardUnlockHintLabel).toContain('to unlock 5% off')
	})

	test('returns unlocked reward label without unlock hint when threshold met', () => {
		const result = useProductDetailInfo({
			product: {
				id: 1,
				title: 'Product',
				price: 20,
				description: 'Description',
				category: "women's clothing",
				image: '/item.jpg',
				rating: { rate: 4.8, count: 40 },
			},
			projectedRewardSnapshot: {
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
			},
		})

		expect(result.rewardStatusLabel).toBe('Reward unlocked: 15% off')
		expect(result.rewardUnlockHintLabel).toBeNull()
	})
})
