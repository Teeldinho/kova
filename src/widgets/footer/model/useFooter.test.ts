import { describe, expect, test } from 'vitest'

import { useFooter } from './useFooter'

describe('useFooter', () => {
	test('returns footer metadata', () => {
		const result = useFooter()

		expect(result.appName).toBe('KOVA')
		expect(result.tagline).toBe('Every detail, considered.')
		expect(result.links).toHaveLength(3)
		expect(result.currentYear).toBeGreaterThanOrEqual(2026)
	})
})
