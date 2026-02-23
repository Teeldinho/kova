import { describe, expect, test } from 'vitest'

import { SCROLL_EASING } from './useLenis'

/**
 * The useLenis hook itself is now provided by lenis/react (ReactLenis context).
 * We test what we own: the SCROLL_EASING utilities — specifically the easing
 * function, which is a pure function with well-defined boundary behaviour.
 */
describe('SCROLL_EASING', () => {
	test('easing function returns 0 at t=0', () => {
		// Floating point: easeOutBack polynomial produces a near-zero result (~2e-16)
		expect(SCROLL_EASING.EASING(0)).toBeCloseTo(0, 10)
	})

	test('easing function returns 1 at t=1', () => {
		expect(SCROLL_EASING.EASING(1)).toBeCloseTo(1, 10)
	})

	test('easing function overshoots (>1) at midpoint — the bounce', () => {
		// easeOutBack peaks above 1 before settling — this is the spring overshoot
		const midValue = SCROLL_EASING.EASING(0.7)
		expect(midValue).toBeGreaterThan(1)
	})

	test('duration is a positive number in seconds', () => {
		expect(SCROLL_EASING.DURATION).toBeGreaterThan(0)
	})
})
