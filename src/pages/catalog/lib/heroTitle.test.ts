import { describe, expect, test } from 'vitest'

import { createHeroTitleCharacters } from './heroTitle'

describe('createHeroTitleCharacters', () => {
	test('creates one character entry per title character', () => {
		const characters = createHeroTitleCharacters('THE EDIT')

		expect(characters).toHaveLength(8)
		expect(characters[0]).toEqual({
			character: 'T',
			id: 'hero-letter-0',
			isSpace: false,
		})
		expect(characters[3]).toEqual({
			character: ' ',
			id: 'hero-letter-3',
			isSpace: true,
		})
	})

	test('returns an empty array for empty title', () => {
		expect(createHeroTitleCharacters('')).toEqual([])
	})
})
