import { afterEach, describe, expect, test, vi } from 'vitest'

import {
	createDecryptFrame,
	createMaskedText,
	DECRYPT_TEXT_CONFIG,
} from './decryptText'

describe('decryptText', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('masks non-space characters', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0)

		expect(createMaskedText('AB CD')).toBe('AA AA')
	})

	test('reveals current character after enough cycles', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0)

		expect(
			createDecryptFrame({
				previousText: 'AAAA',
				targetText: 'AB CD',
				currentIndex: 1,
				cycleCount: DECRYPT_TEXT_CONFIG.CYCLES_PER_CHARACTER,
			}),
		).toBe('AB AA')
	})

	test('keeps current character randomized before reveal cycle', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0)

		expect(
			createDecryptFrame({
				previousText: 'ZZ',
				targetText: 'AB',
				currentIndex: 1,
				cycleCount: 0,
			}),
		).toBe('ZA')
	})
})
