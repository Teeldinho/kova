import { CURRENCY } from '@/shared/config'

import { CART } from '../config/constants'

type RewardTier = (typeof CART.REWARDS.TIERS)[number]

export interface CartRewardSnapshot {
	activeTier: RewardTier | null
	nextTier: RewardTier | null
	amountToNextTierInZar: number
	progressToNextTier: number
	discountRate: number
	hasUnlockedReward: boolean
}

const getSubtotalInZar = (subtotalInUsd: number) =>
	subtotalInUsd * CURRENCY.EXCHANGE_RATE

const resolveActiveTier = (subtotalInZar: number): RewardTier | null =>
	[...CART.REWARDS.TIERS]
		.reverse()
		.find((tier) => subtotalInZar >= tier.thresholdInZar) ?? null

const resolveNextTier = (subtotalInZar: number): RewardTier | null =>
	CART.REWARDS.TIERS.find((tier) => subtotalInZar < tier.thresholdInZar) ?? null

export const getRewardDiscountRate = (subtotalInUsd: number): number => {
	const subtotalInZar = getSubtotalInZar(subtotalInUsd)
	const activeTier = resolveActiveTier(subtotalInZar)

	return activeTier?.discountRate ?? 0
}

export const calculateRewardDiscount = (subtotalInUsd: number): number =>
	subtotalInUsd * getRewardDiscountRate(subtotalInUsd)

export const calculateRewardDiscountInCents = (subtotalInUsd: number): number =>
	Math.round(
		calculateRewardDiscount(subtotalInUsd) * CURRENCY.EXCHANGE_RATE * 100,
	)

export const getCartRewardSnapshot = (
	subtotalInUsd: number,
): CartRewardSnapshot => {
	const subtotalInZar = getSubtotalInZar(subtotalInUsd)
	const activeTier = resolveActiveTier(subtotalInZar)
	const nextTier = resolveNextTier(subtotalInZar)

	const amountToNextTierInZar = nextTier
		? Math.max(nextTier.thresholdInZar - subtotalInZar, 0)
		: 0

	const progressToNextTier = nextTier
		? Math.min(subtotalInZar / nextTier.thresholdInZar, 1)
		: 1

	return {
		activeTier,
		nextTier,
		amountToNextTierInZar,
		progressToNextTier,
		discountRate: activeTier?.discountRate ?? 0,
		hasUnlockedReward: Boolean(activeTier),
	}
}
